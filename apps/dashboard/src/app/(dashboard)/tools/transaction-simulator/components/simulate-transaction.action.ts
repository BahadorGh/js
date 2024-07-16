"use server";
import { thirdwebClient } from "@/constants/client";
import "server-only";
import {
  defineChain,
  getContract,
  prepareContractCall,
  resolveMethod,
  simulateTransaction,
  toSerializableTransaction,
} from "thirdweb";
import type { SimulateTransactionForm } from "./TransactionSimulator";

type State = {
  success: boolean;
  message: string;
  codeExample: string;
  shareUrl: string;
};

export const simulateTransactionAction = async (
  previousState: State,
  formData: FormData,
): Promise<State> => {
  const parsedData: SimulateTransactionForm = {
    chainId: Number.parseInt(formData.get("chainId") as string),
    from: formData.get("from") as string,
    to: formData.get("to") as string,
    functionName: formData.get("functionName") as string,
    functionArgs: formData.get("functionArgs") as string,
    value: formData.get("value") as string,
  };

  const codeExample = getCodeExample(parsedData);
  const shareUrl = getShareUrl(parsedData);

  const chain = defineChain(parsedData.chainId);
  const contract = getContract({
    client: thirdwebClient,
    chain,
    address: parsedData.to,
  });
  const transaction = await prepareContractCall({
    contract,
    method: resolveMethod(parsedData.functionName),
    params: parsedData.functionArgs.split(/[\n,]+/),
    value: BigInt(parsedData.value),
  });

  try {
    const simulateResult = await simulateTransaction({
      from: parsedData.from,
      transaction,
    });
    const populatedTransaction = await toSerializableTransaction({
      from: parsedData.from,
      transaction,
    });
    return {
      success: true,
      message: `result: ${simulateResult.length > 0 ? simulateResult.join(",") : "Method did not return a result."}
data: ${populatedTransaction.data}
gas: ${populatedTransaction.gas}
maxFeePerGas: ${populatedTransaction.maxFeePerGas}
maxPriorityFeePerGas: ${populatedTransaction.maxPriorityFeePerGas}
value: ${populatedTransaction.value}`,
      codeExample,
      shareUrl,
    };
  } catch (e: unknown) {
    return {
      success: false,
      message: `${e}`,
      codeExample,
      shareUrl,
    };
  }
};

// Generate code example with input values.
const getCodeExample = (parsedData: SimulateTransactionForm) =>
  `const contract = getContract({
  client,
  chain,
  address: "${parsedData.to}",
});

const transaction = await prepareContractCall({
  contract,
  method: resolveMethod("${parsedData.functionName}"),
  params: [${parsedData.functionArgs.split(/[\n,]+/).map((v) => `"${v}"`)}],
  value: ${parsedData.value}n,
});

await simulateTransaction({
  from: "${parsedData.from}",
  transaction,
});`;

// Generate share link from input values.
const getShareUrl = (parsedData: SimulateTransactionForm) => {
  const url = new URL("https://thirdweb.com/tools/transaction-simulator");
  url.searchParams.set("chainId", parsedData.chainId.toString());
  url.searchParams.set("from", parsedData.from);
  url.searchParams.set("to", parsedData.to);
  url.searchParams.set("functionName", parsedData.functionName);
  url.searchParams.set(
    "functionArgs",
    encodeURIComponent(parsedData.functionArgs),
  );
  url.searchParams.set("value", parsedData.value);
  return url.href;
};
