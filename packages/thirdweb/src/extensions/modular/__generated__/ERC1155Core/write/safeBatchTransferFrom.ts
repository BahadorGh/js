import type { AbiParameterToPrimitiveType } from "abitype";
import type {
  BaseTransactionOptions,
  WithOverrides,
} from "../../../../../transaction/types.js";
import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { once } from "../../../../../utils/promise/once.js";
import type { ThirdwebContract } from "../../../../../contract/contract.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";

/**
 * Represents the parameters for the "safeBatchTransferFrom" function.
 */
export type SafeBatchTransferFromParams = WithOverrides<{
  from: AbiParameterToPrimitiveType<{
    name: "from";
    type: "address";
    internalType: "address";
  }>;
  to: AbiParameterToPrimitiveType<{
    name: "to";
    type: "address";
    internalType: "address";
  }>;
  tokenIds: AbiParameterToPrimitiveType<{
    name: "tokenIds";
    type: "uint256[]";
    internalType: "uint256[]";
  }>;
  values: AbiParameterToPrimitiveType<{
    name: "values";
    type: "uint256[]";
    internalType: "uint256[]";
  }>;
  data: AbiParameterToPrimitiveType<{
    name: "data";
    type: "bytes";
    internalType: "bytes";
  }>;
}>;

export const FN_SELECTOR = "0x2eb2c2d6" as const;
const FN_INPUTS = [
  {
    name: "from",
    type: "address",
    internalType: "address",
  },
  {
    name: "to",
    type: "address",
    internalType: "address",
  },
  {
    name: "tokenIds",
    type: "uint256[]",
    internalType: "uint256[]",
  },
  {
    name: "values",
    type: "uint256[]",
    internalType: "uint256[]",
  },
  {
    name: "data",
    type: "bytes",
    internalType: "bytes",
  },
] as const;
const FN_OUTPUTS = [] as const;

/**
 * Checks if the `safeBatchTransferFrom` method is supported by the given contract.
 * @param contract The ThirdwebContract.
 * @returns A promise that resolves to a boolean indicating if the `safeBatchTransferFrom` method is supported.
 * @extension MODULAR
 * @example
 * ```ts
 * import { isSafeBatchTransferFromSupported } from "thirdweb/extensions/modular";
 *
 * const supported = await isSafeBatchTransferFromSupported(contract);
 * ```
 */
export async function isSafeBatchTransferFromSupported(
  contract: ThirdwebContract<any>,
) {
  return detectMethod({
    contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
  });
}

/**
 * Encodes the parameters for the "safeBatchTransferFrom" function.
 * @param options - The options for the safeBatchTransferFrom function.
 * @returns The encoded ABI parameters.
 * @extension MODULAR
 * @example
 * ```ts
 * import { encodeSafeBatchTransferFromParams } "thirdweb/extensions/modular";
 * const result = encodeSafeBatchTransferFromParams({
 *  from: ...,
 *  to: ...,
 *  tokenIds: ...,
 *  values: ...,
 *  data: ...,
 * });
 * ```
 */
export function encodeSafeBatchTransferFromParams(
  options: SafeBatchTransferFromParams,
) {
  return encodeAbiParameters(FN_INPUTS, [
    options.from,
    options.to,
    options.tokenIds,
    options.values,
    options.data,
  ]);
}

/**
 * Encodes the "safeBatchTransferFrom" function into a Hex string with its parameters.
 * @param options - The options for the safeBatchTransferFrom function.
 * @returns The encoded hexadecimal string.
 * @extension MODULAR
 * @example
 * ```ts
 * import { encodeSafeBatchTransferFrom } "thirdweb/extensions/modular";
 * const result = encodeSafeBatchTransferFrom({
 *  from: ...,
 *  to: ...,
 *  tokenIds: ...,
 *  values: ...,
 *  data: ...,
 * });
 * ```
 */
export function encodeSafeBatchTransferFrom(
  options: SafeBatchTransferFromParams,
) {
  // we do a "manual" concat here to avoid the overhead of the "concatHex" function
  // we can do this because we know the specific formats of the values
  return (FN_SELECTOR +
    encodeSafeBatchTransferFromParams(options).slice(
      2,
    )) as `${typeof FN_SELECTOR}${string}`;
}

/**
 * Prepares a transaction to call the "safeBatchTransferFrom" function on the contract.
 * @param options - The options for the "safeBatchTransferFrom" function.
 * @returns A prepared transaction object.
 * @extension MODULAR
 * @example
 * ```ts
 * import { safeBatchTransferFrom } from "thirdweb/extensions/modular";
 *
 * const transaction = safeBatchTransferFrom({
 *  contract,
 *  from: ...,
 *  to: ...,
 *  tokenIds: ...,
 *  values: ...,
 *  data: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function safeBatchTransferFrom(
  options: BaseTransactionOptions<
    | SafeBatchTransferFromParams
    | {
        asyncParams: () => Promise<SafeBatchTransferFromParams>;
      }
  >,
) {
  const asyncOptions = once(async () => {
    return "asyncParams" in options ? await options.asyncParams() : options;
  });

  return prepareContractCall({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
    params: async () => {
      const resolvedOptions = await asyncOptions();
      return [
        resolvedOptions.from,
        resolvedOptions.to,
        resolvedOptions.tokenIds,
        resolvedOptions.values,
        resolvedOptions.data,
      ] as const;
    },
    value: async () => (await asyncOptions()).overrides?.value,
    accessList: async () => (await asyncOptions()).overrides?.accessList,
    gas: async () => (await asyncOptions()).overrides?.gas,
    gasPrice: async () => (await asyncOptions()).overrides?.gasPrice,
    maxFeePerGas: async () => (await asyncOptions()).overrides?.maxFeePerGas,
    maxPriorityFeePerGas: async () =>
      (await asyncOptions()).overrides?.maxPriorityFeePerGas,
    nonce: async () => (await asyncOptions()).overrides?.nonce,
    extraGas: async () => (await asyncOptions()).overrides?.extraGas,
  });
}
