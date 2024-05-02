import { client } from "@passwordless-id/webauthn";
import type { ThirdwebClient } from "../../../../../client/client.js";
import { getClientFetch } from "../../../../../utils/fetch.js";
import { LocalStorage } from "../../utils/Storage/LocalStorage.js";

//const SERVER_URL = "https://www-qxmw-winston-iframe-flow.chainsaw-dev.zeet.app";
const SERVER_URL = "http://localhost:3001";
const VERIFICATION_URL = `${SERVER_URL}/api/2024-05-05/login/passkey/callback`;
function getChallengePath(type: "sign-in" | "sign-up", username?: string) {
  return `${SERVER_URL}/api/2024-05-05/login/passkey?type=${type}${
    username ? `&username=${username}` : ""
  }`;
}

export async function registerPasskey(options: {
  client: ThirdwebClient;
  authenticatorType?: string;
  username?: string;
}): Promise<string> {
  if (!client.isAvailable()) {
    throw new Error("Passkeys are not available on this device");
  }
  // TODO inject this
  const storage = new LocalStorage({ clientId: options.client.clientId });
  const fetchWithId = getClientFetch(options.client);
  const generatedName = options.username ?? `wallet-${options.client.clientId}`;
  // 1. request challenge from  server
  const res = await fetchWithId(getChallengePath("sign-up", generatedName));
  const challengeData = await res.json();
  if (!challengeData.challenge) {
    throw new Error("No challenge received");
  }
  const challenge = challengeData.challenge;
  // 2. initiate registration
  const registration = await client.register(generatedName, challenge, {
    authenticatorType: "roaming",
    userVerification: "required",
    attestation: true,
    debug: false,
  });
  // 3. store the credentialId in local storage
  await storage.savePasskeyCredentialId(registration.credential.id);

  // 4. send the registration object to the server
  const verifRes = await fetchWithId(VERIFICATION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "sign-up",
      authenticatorData: registration.authenticatorData,
      credentialId: registration.credential.id,
      serverVerificationId: challengeData.serverVerificationId,
      clientData: registration.clientData,
      username: generatedName,
      credential: {
        publicKey: registration.credential.publicKey,
        algorithm: registration.credential.algorithm,
      },
    }),
  });
  const verifData = await verifRes.json();

  if (!verifData.authToken) {
    throw new Error("No auth token received");
  }

  return verifData.authToken;
  // 5. returns back the IAW authentication token
  // 6. pass it to the iframe and call postLogin to store the auth token
  // 7. return the auth'd user type

  //return registration;
  // throw new Error("Not implemented");
}

export async function loginWithPasskey(options: {
  client: ThirdwebClient;
  username?: string;
}): Promise<string> {
  if (!client.isAvailable()) {
    throw new Error("Passkeys are not available on this device");
  }
  // TODO inject this
  const storage = new LocalStorage({ clientId: options.client.clientId });
  const fetchWithId = getClientFetch(options.client);
  const generatedName = options.username ?? `wallet-${options.client.clientId}`;
  // 1. request challenge from  server/iframe
  const res = await fetchWithId(getChallengePath("sign-in", generatedName));
  const challengeData = await res.json();
  if (!challengeData.challenge) {
    throw new Error("No challenge received");
  }
  const challenge = challengeData.challenge;
  // 1.2. find the user's credentialId in local storage
  const credentialId = await storage.getPasskeyCredentialId();
  const credentials = credentialId ? [credentialId] : [];
  // 2. initiate login
  const authentication = await client.authenticate(credentials, challenge, {
    authenticatorType: "roaming",
    userVerification: "required",
  });
  // 3. send the authentication object to the server/iframe
  // 4. return the auth'd user type
  const verifRes = await fetchWithId(VERIFICATION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "sign-in",
      authenticatorData: authentication.authenticatorData,
      credentialId: authentication.credentialId,
      serverVerificationId: challengeData.serverVerificationId,
      clientData: authentication.clientData,
      signature: authentication.signature,
    }),
  });
  const verifData = await verifRes.json();

  if (!verifData.authToken) {
    throw new Error("No auth token received");
  }
  return verifData.authToken;
}
