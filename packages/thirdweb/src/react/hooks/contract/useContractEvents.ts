import { useEffect, useMemo } from "react";
import type { Abi, AbiEvent } from "abitype";
import {
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import {
  watchContractEvents,
  type WatchContractEventsOptions,
} from "../../../event/actions/watch-events.js";
import { getContractEvents } from "../../../event/actions/get-events.js";
import type { ParseEventLogsResult } from "../../../event/actions/parse-logs.js";
import { getRpcClient } from "../../../rpc/rpc.js";
import { eth_blockNumber } from "../../../rpc/actions/eth_blockNumber.js";
import type { PreparedEvent } from "../../../event/prepare-event.js";

type UseContractEventsOptions<
  abi extends Abi,
  abiEvents extends PreparedEvent<AbiEvent>[],
> = Omit<WatchContractEventsOptions<abi, abiEvents, true>, "onEvents"> & {
  blockRange?: number;
  enabled?: boolean;
  watch?: boolean;
};

/**
 * Watches contract events and returns the logs.
 * @param options - The {@link UseContractEventsOptions | options} for watching contract events.
 * @returns The contract events of the watched contract events.
 * @example
 * ```jsx
 * import { useContractEvents } from "thirdweb/react";
 * const contractEvents = useContractEvents({contract});
 * ```
 */
export function useContractEvents<
  const abi extends Abi,
  const abiEvents extends PreparedEvent<AbiEvent>[],
>(
  options: UseContractEventsOptions<abi, abiEvents>,
): UseQueryResult<ParseEventLogsResult<abiEvents, true>, Error> {
  const {
    contract,
    events,
    blockRange = 2000,
    enabled = true,
    watch = true,
  } = options;

  const queryClient = useQueryClient();

  const eventsKey = useMemo(
    () =>
      events?.reduce((acc, curr) => {
        // we can use the event hash as a unique identifier?
        return acc + `${curr.hash}_`;
      }, "") || "__all__",
    [events],
  );

  const queryKey = useMemo(
    () => [contract.chain.id, contract.address, "logs", eventsKey] as const,
    [contract.address, contract.chain, eventsKey],
  );

  const query = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey,
    queryFn: async () => {
      const rpcRequest = getRpcClient(contract);
      const currentBlockNumber = await eth_blockNumber(rpcRequest);
      const initialEvents = await getContractEvents({
        contract,
        events: events,
        fromBlock: currentBlockNumber - BigInt(blockRange),
      });
      return initialEvents;
    },
    enabled,
  });

  useEffect(() => {
    if (!enabled || !watch) {
      // don't watch if not enabled or if watch is false
      return;
    }
    // the return is important here because it will unwatch the events
    return watchContractEvents<abi, abiEvents>({
      contract,
      onEvents: (newEvents) => {
        queryClient.setQueryData(queryKey, (oldEvents: any = []) => {
          const newLogs = [...oldEvents, ...newEvents];
          return newLogs;
        });
      },
      events,
    });
  }, [contract, enabled, events, blockRange, queryClient, queryKey, watch]);

  return query;
}
