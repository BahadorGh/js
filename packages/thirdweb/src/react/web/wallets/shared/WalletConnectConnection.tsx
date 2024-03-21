import type { ConnectUIProps } from "../../../core/types/wallets.js";
import { ScanScreen } from "./ScanScreen.js";
import { useState, useRef, useEffect, useCallback } from "react";
import { isAndroid, isIOS, isMobile } from "../../../core/utils/isMobile.js";
import {
  handelWCSessionRequest,
  type PlatformURIs,
} from "../../../core/utils/handleWCSessionRequest.js";
import { ConnectingScreen } from "./ConnectingScreen.js";
import { openWindow } from "../../../core/utils/openWindow.js";
import { walletConnect } from "../../../../wallets/wallet-connect/index.js";
import { useWalletConnectionCtx } from "../../../core/hooks/others/useWalletConnectionCtx.js";
import type { InjectedWalletLocale } from "../injected/locale/types.js";

/**
 * QR Scan UI for connecting a specific wallet on desktop.
 * shows a "Connecting" screen and opens the app on mobile.
 * @internal
 */
export const WalletConnectConnection: React.FC<{
  onBack?: () => void;
  onGetStarted: () => void;
  connectUIProps: ConnectUIProps;
  projectId?: string;
  platformUris: PlatformURIs;
  locale: InjectedWalletLocale;
}> = (props) => {
  const {
    onBack,
    onGetStarted,
    connectUIProps,
    projectId,
    platformUris,
    locale,
  } = props;
  const { walletConfig } = connectUIProps;
  const { chain, done, chains } = connectUIProps.connection;
  const { client, appMetadata } = useWalletConnectionCtx();
  const [qrCodeUri, setQrCodeUri] = useState<string | undefined>();
  const [errorConnecting, setErrorConnecting] = useState(false);

  const connect = useCallback(() => {
    const wallet = walletConnect({
      client,
      appMetadata: appMetadata,
      metadata: walletConfig.metadata,
      projectId,
    });

    setErrorConnecting(false);

    const onSessionRequestSent = isMobile()
      ? () => handelWCSessionRequest(platformUris)
      : undefined;

    wallet
      .connect({
        chain,
        showQrModal: false,
        onDisplayUri(uri) {
          setQrCodeUri(uri);
          if (isMobile()) {
            if (isAndroid()) {
              openWindow(
                `${platformUris.android}wc?uri=${encodeURIComponent(uri)}`,
              );
            } else if (isIOS()) {
              openWindow(
                `${platformUris.ios}wc?uri=${encodeURIComponent(uri)}`,
              );
            } else {
              openWindow(
                `${platformUris.other}wc?uri=${encodeURIComponent(uri)}`,
              );
            }
          }
        },
        onSessionRequestSent,
        optionalChains: chains,
      })
      .then(() => {
        done(wallet);
      })
      .catch((e) => {
        setErrorConnecting(true);
        console.error(e);
      });
  }, [
    chain,
    client,
    appMetadata,
    done,
    platformUris,
    projectId,
    walletConfig.metadata,
    chains,
  ]);

  const scanStarted = useRef(false);
  useEffect(() => {
    if (scanStarted.current) {
      return;
    }
    scanStarted.current = true;
    connect();
  }, [connect]);

  if (isMobile()) {
    return (
      <ConnectingScreen
        locale={{
          getStartedLink: locale.getStartedLink,
          instruction: locale.connectionScreen.instruction,
          tryAgain: locale.connectionScreen.retry,
          inProgress: locale.connectionScreen.inProgress,
          failed: locale.connectionScreen.failed,
        }}
        onBack={onBack}
        walletName={walletConfig.metadata.name}
        walletIconURL={walletConfig.metadata.iconUrl}
        errorConnecting={errorConnecting}
        onRetry={connect}
        onGetStarted={onGetStarted}
      />
    );
  }

  return (
    <ScanScreen
      qrScanInstruction={locale.scanScreen.instruction}
      onBack={onBack}
      onGetStarted={onGetStarted}
      qrCodeUri={qrCodeUri}
      walletName={walletConfig.metadata.name}
      walletIconURL={walletConfig.metadata.iconUrl}
      getStartedLink={locale.getStartedLink}
    />
  );
};
