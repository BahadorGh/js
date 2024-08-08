import { readContract } from "src/transaction/read-contract.js";
import type { BaseTransactionOptions } from "src/transaction/types.js";

export async function quorumNumeratorByBlockNumber(
  options: BaseTransactionOptions<{ blockNumber: bigint }>,
) {
  return readContract({
    contract: options.contract,
    method:
      "function quorumNumerator(uint256 blockNumber) view returns (uint256)",
    params: [options.blockNumber],
  });
}
