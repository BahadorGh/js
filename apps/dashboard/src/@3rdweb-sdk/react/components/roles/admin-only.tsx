import {
  useIsAdminOrSelf,
  useIsAdminV2,
} from "@3rdweb-sdk/react/hooks/useContractRoles";
import type { ValidContractInstance } from "@thirdweb-dev/sdk";
import type { ThirdwebContract } from "thirdweb";
import type { ComponentWithChildren } from "types/component-with-children";

interface AdminOnlyProps {
  contract: ThirdwebContract;
  fallback?: JSX.Element;
}

export const AdminOnly: ComponentWithChildren<AdminOnlyProps> = ({
  children,
  contract,
  fallback,
}) => {
  const isAdmin = useIsAdminV2(contract);
  if (!isAdmin) {
    return fallback ?? null;
  }
  return <>{children}</>;
};

interface AdminOrSelfOnlyProps {
  contract?: ValidContractInstance;
  fallback?: JSX.Element;
  /**
   * The address of the account to check against
   */
  self: string;
}

export const AdminOrSelfOnly: ComponentWithChildren<AdminOrSelfOnlyProps> = ({
  children,
  self,
  fallback,
  contract,
}) => {
  const isAdminOrSelf = useIsAdminOrSelf(contract, self);

  if (!isAdminOrSelf) {
    return fallback ?? null;
  }
  return <>{children}</>;
};
