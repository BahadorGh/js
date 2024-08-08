import type { AbiParameterToPrimitiveType } from "abitype";
import { readContract } from "../../../../../transaction/read-contract.js";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { decodeAbiParameters } from "viem";
import type { Hex } from "../../../../../utils/encoding/hex.js";
import type { ThirdwebContract } from "../../../../../contract/contract.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";

/**
 * Represents the parameters for the "quorumNumerator" function.
 */
export type QuorumNumeratorParams = {
  blockNumber: AbiParameterToPrimitiveType<{
    type: "uint256";
    name: "blockNumber";
  }>;
};

export const FN_SELECTOR = "0x60c4247f" as const;
const FN_INPUTS = [
  {
    type: "uint256",
    name: "blockNumber",
  },
] as const;
const FN_OUTPUTS = [
  {
    type: "uint256",
  },
] as const;

/**
 * Checks if the `quorumNumerator` method is supported by the given contract.
 * @param contract The ThirdwebContract.
 * @returns A promise that resolves to a boolean indicating if the `quorumNumerator` method is supported.
 * @extension VOTE
 * @example
 * ```ts
 * import { isQuorumNumeratorSupported } from "thirdweb/extensions/vote";
 *
 * const supported = await isQuorumNumeratorSupported(contract);
 * ```
 */
export async function isQuorumNumeratorSupported(
  contract: ThirdwebContract<any>,
) {
  return detectMethod({
    contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
  });
}

/**
 * Encodes the parameters for the "quorumNumerator" function.
 * @param options - The options for the quorumNumerator function.
 * @returns The encoded ABI parameters.
 * @extension VOTE
 * @example
 * ```ts
 * import { encodeQuorumNumeratorParams } "thirdweb/extensions/vote";
 * const result = encodeQuorumNumeratorParams({
 *  blockNumber: ...,
 * });
 * ```
 */
export function encodeQuorumNumeratorParams(options: QuorumNumeratorParams) {
  return encodeAbiParameters(FN_INPUTS, [options.blockNumber]);
}

/**
 * Encodes the "quorumNumerator" function into a Hex string with its parameters.
 * @param options - The options for the quorumNumerator function.
 * @returns The encoded hexadecimal string.
 * @extension VOTE
 * @example
 * ```ts
 * import { encodeQuorumNumerator } "thirdweb/extensions/vote";
 * const result = encodeQuorumNumerator({
 *  blockNumber: ...,
 * });
 * ```
 */
export function encodeQuorumNumerator(options: QuorumNumeratorParams) {
  // we do a "manual" concat here to avoid the overhead of the "concatHex" function
  // we can do this because we know the specific formats of the values
  return (FN_SELECTOR +
    encodeQuorumNumeratorParams(options).slice(
      2,
    )) as `${typeof FN_SELECTOR}${string}`;
}

/**
 * Decodes the result of the quorumNumerator function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension VOTE
 * @example
 * ```ts
 * import { decodeQuorumNumeratorResult } from "thirdweb/extensions/vote";
 * const result = decodeQuorumNumeratorResult("...");
 * ```
 */
export function decodeQuorumNumeratorResult(result: Hex) {
  return decodeAbiParameters(FN_OUTPUTS, result)[0];
}

/**
 * Calls the "quorumNumerator" function on the contract.
 * @param options - The options for the quorumNumerator function.
 * @returns The parsed result of the function call.
 * @extension VOTE
 * @example
 * ```ts
 * import { quorumNumerator } from "thirdweb/extensions/vote";
 *
 * const result = await quorumNumerator({
 *  contract,
 *  blockNumber: ...,
 * });
 *
 * ```
 */
export async function quorumNumerator(
  options: BaseTransactionOptions<QuorumNumeratorParams>,
) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
    params: [options.blockNumber],
  });
}
