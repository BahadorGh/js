import { readContract } from "../../../../../transaction/read-contract.js";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";

import { decodeAbiParameters } from "viem";
import type { Hex } from "../../../../../utils/encoding/hex.js";
import type { ThirdwebContract } from "../../../../../contract/contract.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";

export const FN_SELECTOR = "0xa2309ff8" as const;
const FN_INPUTS = [] as const;
const FN_OUTPUTS = [
  {
    name: "",
    type: "uint256",
    internalType: "uint256",
  },
] as const;

/**
 * Checks if the `totalMinted` method is supported by the given contract.
 * @param contract The ThirdwebContract.
 * @returns A promise that resolves to a boolean indicating if the `totalMinted` method is supported.
 * @extension MODULAR
 * @example
 * ```ts
 * import { isTotalMintedSupported } from "thirdweb/extensions/modular";
 *
 * const supported = await isTotalMintedSupported(contract);
 * ```
 */
export async function isTotalMintedSupported(contract: ThirdwebContract<any>) {
  return detectMethod({
    contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
  });
}

/**
 * Decodes the result of the totalMinted function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension MODULAR
 * @example
 * ```ts
 * import { decodeTotalMintedResult } from "thirdweb/extensions/modular";
 * const result = decodeTotalMintedResult("...");
 * ```
 */
export function decodeTotalMintedResult(result: Hex) {
  return decodeAbiParameters(FN_OUTPUTS, result)[0];
}

/**
 * Calls the "totalMinted" function on the contract.
 * @param options - The options for the totalMinted function.
 * @returns The parsed result of the function call.
 * @extension MODULAR
 * @example
 * ```ts
 * import { totalMinted } from "thirdweb/extensions/modular";
 *
 * const result = await totalMinted({
 *  contract,
 * });
 *
 * ```
 */
export async function totalMinted(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
    params: [],
  });
}
