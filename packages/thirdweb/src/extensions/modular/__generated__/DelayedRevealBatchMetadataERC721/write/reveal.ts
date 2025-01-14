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
 * Represents the parameters for the "reveal" function.
 */
export type RevealParams = WithOverrides<{
  index: AbiParameterToPrimitiveType<{
    name: "_index";
    type: "uint256";
    internalType: "uint256";
  }>;
  key: AbiParameterToPrimitiveType<{
    name: "_key";
    type: "bytes";
    internalType: "bytes";
  }>;
}>;

export const FN_SELECTOR = "0xce805642" as const;
const FN_INPUTS = [
  {
    name: "_index",
    type: "uint256",
    internalType: "uint256",
  },
  {
    name: "_key",
    type: "bytes",
    internalType: "bytes",
  },
] as const;
const FN_OUTPUTS = [
  {
    name: "revealedURI",
    type: "string",
    internalType: "string",
  },
] as const;

/**
 * Checks if the `reveal` method is supported by the given contract.
 * @param contract The ThirdwebContract.
 * @returns A promise that resolves to a boolean indicating if the `reveal` method is supported.
 * @extension MODULAR
 * @example
 * ```ts
 * import { isRevealSupported } from "thirdweb/extensions/modular";
 *
 * const supported = await isRevealSupported(contract);
 * ```
 */
export async function isRevealSupported(contract: ThirdwebContract<any>) {
  return detectMethod({
    contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
  });
}

/**
 * Encodes the parameters for the "reveal" function.
 * @param options - The options for the reveal function.
 * @returns The encoded ABI parameters.
 * @extension MODULAR
 * @example
 * ```ts
 * import { encodeRevealParams } "thirdweb/extensions/modular";
 * const result = encodeRevealParams({
 *  index: ...,
 *  key: ...,
 * });
 * ```
 */
export function encodeRevealParams(options: RevealParams) {
  return encodeAbiParameters(FN_INPUTS, [options.index, options.key]);
}

/**
 * Encodes the "reveal" function into a Hex string with its parameters.
 * @param options - The options for the reveal function.
 * @returns The encoded hexadecimal string.
 * @extension MODULAR
 * @example
 * ```ts
 * import { encodeReveal } "thirdweb/extensions/modular";
 * const result = encodeReveal({
 *  index: ...,
 *  key: ...,
 * });
 * ```
 */
export function encodeReveal(options: RevealParams) {
  // we do a "manual" concat here to avoid the overhead of the "concatHex" function
  // we can do this because we know the specific formats of the values
  return (FN_SELECTOR +
    encodeRevealParams(options).slice(2)) as `${typeof FN_SELECTOR}${string}`;
}

/**
 * Prepares a transaction to call the "reveal" function on the contract.
 * @param options - The options for the "reveal" function.
 * @returns A prepared transaction object.
 * @extension MODULAR
 * @example
 * ```ts
 * import { reveal } from "thirdweb/extensions/modular";
 *
 * const transaction = reveal({
 *  contract,
 *  index: ...,
 *  key: ...,
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
export function reveal(
  options: BaseTransactionOptions<
    | RevealParams
    | {
        asyncParams: () => Promise<RevealParams>;
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
      return [resolvedOptions.index, resolvedOptions.key] as const;
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
