import type { ThirdwebClient } from "../../client/client.js";
import { getClientFetch } from "../../utils/fetch.js";
import type { ChainsawResponse } from "../types.d.ts";
import { getLatestBlockNumberEndpoint } from "../urls.js";

export type GetLatestBlockNumberParams = {
  client: ThirdwebClient;
  chainId: number;
};

/**
 * Get latest block number for a chain
 *
 * @beta
 */
export async function getLatestBlockNumber(
  params: GetLatestBlockNumberParams,
): Promise<number> {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("chainId", params.chainId.toString());
    const url = `${getLatestBlockNumberEndpoint()}?${queryParams.toString()}`;

    const response = await getClientFetch(params.client)(url);
    if (!response.ok) {
      response.body?.cancel();
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ChainsawResponse<number> = await response.json();
    if (data.error) throw new Error(data.error);
    if (!data.data) throw new Error("unable to fetch latest block number");
    return data.data;
  } catch (error) {
    throw new Error(`Fetch failed: ${error}`);
  }
}
