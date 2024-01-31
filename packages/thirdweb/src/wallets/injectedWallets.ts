import { injectedWallet, type InjectedWalletOptions } from "./injected.js";

export type SpecificInjectedWalletOptions = Omit<
  InjectedWalletOptions,
  "walletId"
>;

export const metamaskMetadata = {
  id: "io.metamask",
  name: "Metamask",
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTIiIGZpbGw9IiNGRkU2Q0UiLz4KPHBhdGggZD0iTTY0Ljk3MTIgMTQuMTc5TDQzLjI5MDMgMzAuMjgxN0w0Ny4yOTk2IDIwLjc4MTRMNjQuOTcxMiAxNC4xNzlaIiBmaWxsPSIjRTI3NjFCIiBzdHJva2U9IiNFMjc2MUIiIHN0cm9rZS13aWR0aD0iMC4xMjQ1MTQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMTQuOTE5OCAxNC4xNzlMMzYuNDI2NCAzMC40MzQzTDMyLjYxMzIgMjAuNzgxNEwxNC45MTk4IDE0LjE3OVpNNTcuMTcwNCA1MS41MDUxTDUxLjM5NjEgNjAuMzUxOEw2My43NTEgNjMuNzUxTDY3LjMwMjcgNTEuNzAxMkw1Ny4xNzA0IDUxLjUwNTFaTTEyLjYzMTkgNTEuNzAxMkwxNi4xNjE5IDYzLjc1MUwyOC41MTY3IDYwLjM1MThMMjIuNzQyNCA1MS41MDUxTDEyLjYzMTkgNTEuNzAxMloiIGZpbGw9IiNFNDc2MUIiIHN0cm9rZT0iI0U0NzYxQiIgc3Ryb2tlLXdpZHRoPSIwLjEyNDUxNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yNy44MTk0IDM2LjU1NzJMMjQuMzc2NiA0MS43NjVMMzYuNjQ0NCA0Mi4zMDk3TDM2LjIwODYgMjkuMTI2OEwyNy44MTk0IDM2LjU1NzJaTTUyLjA3MTYgMzYuNTU3Mkw0My41NzM1IDI4Ljk3NDNMNDMuMjkwMyA0Mi4zMDk3TDU1LjUzNjIgNDEuNzY1TDUyLjA3MTYgMzYuNTU3MlpNMjguNTE2NyA2MC4zNTE3TDM1Ljg4MTcgNTYuNzU2NEwyOS41MTkxIDUxLjc4ODNMMjguNTE2NyA2MC4zNTE3Wk00NC4wMDkzIDU2Ljc1NjRMNTEuMzk2MSA2MC4zNTE3TDUwLjM3MiA1MS43ODgzTDQ0LjAwOTMgNTYuNzU2NFoiIGZpbGw9IiNFNDc2MUIiIHN0cm9rZT0iI0U0NzYxQiIgc3Ryb2tlLXdpZHRoPSIwLjEyNDUxNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik01MS4zOTYxIDYwLjM1MTdMNDQuMDA5MyA1Ni43NTY0TDQ0LjU5NzcgNjEuNTcyTDQ0LjUzMjMgNjMuNTk4NEw1MS4zOTYxIDYwLjM1MTdaTTI4LjUxNjcgNjAuMzUxN0wzNS4zODA1IDYzLjU5ODRMMzUuMzM3IDYxLjU3MkwzNS44ODE3IDU2Ljc1NjRMMjguNTE2NyA2MC4zNTE3WiIgZmlsbD0iI0Q3QzFCMyIgc3Ryb2tlPSIjRDdDMUIzIiBzdHJva2Utd2lkdGg9IjAuMTI0NTE0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTM1LjQ4OTUgNDguNjA3TDI5LjM0NDcgNDYuNzk4NEwzMy42ODA5IDQ0LjgxNTZMMzUuNDg5NSA0OC42MDdaTTQ0LjQwMTUgNDguNjA3TDQ2LjIxMDEgNDQuODE1Nkw1MC41NjgxIDQ2Ljc5ODRMNDQuNDAxNSA0OC42MDdaIiBmaWxsPSIjMjMzNDQ3IiBzdHJva2U9IiMyMzM0NDciIHN0cm9rZS13aWR0aD0iMC4xMjQ1MTQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMjguNTE2NyA2MC4zNTE3TDI5LjU2MjYgNTEuNTA1TDIyLjc0MjQgNTEuNzAxMUwyOC41MTY3IDYwLjM1MTdaTTUwLjM1MDIgNTEuNTA1TDUxLjM5NjEgNjAuMzUxN0w1Ny4xNzA0IDUxLjcwMTFMNTAuMzUwMiA1MS41MDVaTTU1LjUzNjIgNDEuNzY1TDQzLjI5MDMgNDIuMzA5N0w0NC40MjMzIDQ4LjYwN0w0Ni4yMzE5IDQ0LjgxNTVMNTAuNTg5OSA0Ni43OTg0TDU1LjUzNjIgNDEuNzY1Wk0yOS4zNDQ3IDQ2Ljc5ODRMMzMuNzAyNyA0NC44MTU1TDM1LjQ4OTUgNDguNjA3TDM2LjY0NDMgNDIuMzA5N0wyNC4zNzY2IDQxLjc2NUwyOS4zNDQ3IDQ2Ljc5ODRaIiBmaWxsPSIjQ0Q2MTE2IiBzdHJva2U9IiNDRDYxMTYiIHN0cm9rZS13aWR0aD0iMC4xMjQ1MTQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMjQuMzc2NiA0MS43NjVMMjkuNTE5MSA1MS43ODgzTDI5LjM0NDcgNDYuNzk4NEwyNC4zNzY2IDQxLjc2NVpNNTAuNTg5OSA0Ni43OTg0TDUwLjM3MiA1MS43ODgzTDU1LjUzNjIgNDEuNzY1TDUwLjU4OTkgNDYuNzk4NFpNMzYuNjQ0NCA0Mi4zMDk3TDM1LjQ4OTUgNDguNjA3TDM2LjkyNzYgNTYuMDM3M0wzNy4yNTQ1IDQ2LjI1MzdMMzYuNjQ0NCA0Mi4zMDk3Wk00My4yOTAzIDQyLjMwOTdMNDIuNzAxOSA0Ni4yMzE5TDQyLjk2MzQgNTYuMDM3M0w0NC40MjMzIDQ4LjYwN0w0My4yOTAzIDQyLjMwOTdaIiBmaWxsPSIjRTQ3NTFGIiBzdHJva2U9IiNFNDc1MUYiIHN0cm9rZS13aWR0aD0iMC4xMjQ1MTQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNNDQuNDIzMyA0OC42MDdMNDIuOTYzNCA1Ni4wMzc0TDQ0LjAwOTMgNTYuNzU2NEw1MC4zNzIgNTEuNzg4M0w1MC41ODk5IDQ2Ljc5ODVMNDQuNDIzMyA0OC42MDdaTTI5LjM0NDcgNDYuNzk4NUwyOS41MTkgNTEuNzg4M0wzNS44ODE3IDU2Ljc1NjRMMzYuOTI3NiA1Ni4wMzc0TDM1LjQ4OTUgNDguNjA3TDI5LjM0NDcgNDYuNzk4NVoiIGZpbGw9IiNGNjg1MUIiIHN0cm9rZT0iI0Y2ODUxQiIgc3Ryb2tlLXdpZHRoPSIwLjEyNDUxNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik00NC41MzIzIDYzLjU5ODRMNDQuNTk3NyA2MS41NzJMNDQuMDUyOSA2MS4wOTI2SDM1LjgzODFMMzUuMzM3IDYxLjU3MkwzNS4zODA1IDYzLjU5ODRMMjguNTE2NyA2MC4zNTE3TDMwLjkxMzYgNjIuMzEyOEwzNS43NzI4IDY1LjY5MDNINDQuMTE4M0w0OC45OTkyIDYyLjMxMjhMNTEuMzk2MSA2MC4zNTE3TDQ0LjUzMjMgNjMuNTk4NFoiIGZpbGw9IiNDMEFEOUUiIHN0cm9rZT0iI0MwQUQ5RSIgc3Ryb2tlLXdpZHRoPSIwLjEyNDUxNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik00NC4wMDkzIDU2Ljc1NjRMNDIuOTYzNCA1Ni4wMzc0SDM2LjkyNzZMMzUuODgxNyA1Ni43NTY0TDM1LjMzNyA2MS41NzJMMzUuODM4MSA2MS4wOTI2SDQ0LjA1MjlMNDQuNTk3NyA2MS41NzJMNDQuMDA5MyA1Ni43NTY0WiIgZmlsbD0iIzE2MTYxNiIgc3Ryb2tlPSIjMTYxNjE2IiBzdHJva2Utd2lkdGg9IjAuMTI0NTE0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTY1Ljg4NjQgMzEuMzI3N0w2Ny43Mzg1IDIyLjQzNzRMNjQuOTcxMiAxNC4xNzlMNDQuMDA5MyAyOS43MzdMNTIuMDcxNiAzNi41NTcyTDYzLjQ2NzcgMzkuODkxMUw2NS45OTUzIDM2Ljk0OTRMNjQuOTA1OCAzNi4xNjVMNjYuNjQ5IDM0LjU3NDNMNjUuMjk4MSAzMy41Mjg0TDY3LjA0MTIgMzIuMTk5Mkw2NS44ODY0IDMxLjMyNzdaTTEyLjE3NDMgMjIuNDM3NEwxNC4wMjY1IDMxLjMyNzdMMTIuODQ5OCAzMi4xOTkyTDE0LjU5MyAzMy41Mjg0TDEzLjI2MzggMzQuNTc0M0wxNS4wMDcgMzYuMTY1TDEzLjkxNzUgMzYuOTQ5NEwxNi40MjMzIDM5Ljg5MTFMMjcuODE5NSAzNi41NTcyTDM1Ljg4MTcgMjkuNzM3TDE0LjkxOTggMTQuMTc5TDEyLjE3NDMgMjIuNDM3NFoiIGZpbGw9IiM3NjNEMTYiIHN0cm9rZT0iIzc2M0QxNiIgc3Ryb2tlLXdpZHRoPSIwLjEyNDUxNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik02My40Njc3IDM5Ljg5MUw1Mi4wNzE2IDM2LjU1NzJMNTUuNTM2MiA0MS43NjVMNTAuMzcyIDUxLjc4ODNMNTcuMTcwNCA1MS43MDEySDY3LjMwMjdMNjMuNDY3NyAzOS44OTFaTTI3LjgxOTQgMzYuNTU3MkwxNi40MjMzIDM5Ljg5MUwxMi42MzE5IDUxLjcwMTJIMjIuNzQyNEwyOS41MTkxIDUxLjc4ODNMMjQuMzc2NiA0MS43NjVMMjcuODE5NCAzNi41NTcyWk00My4yOTAzIDQyLjMwOTdMNDQuMDA5MyAyOS43MzdMNDcuMzIxNCAyMC43ODEzSDMyLjYxMzJMMzUuODgxNyAyOS43MzdMMzYuNjQ0MyA0Mi4zMDk3TDM2LjkwNTggNDYuMjc1NUwzNi45Mjc2IDU2LjAzNzNINDIuOTYzNEw0My4wMDcgNDYuMjc1NUw0My4yOTAzIDQyLjMwOTdaIiBmaWxsPSIjRjY4NTFCIiBzdHJva2U9IiNGNjg1MUIiIHN0cm9rZS13aWR0aD0iMC4xMjQ1MTQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K",
};

/**
 * Connect to Injected Metamask Wallet Provider
 * @param options - The options for connecting to the Injected MetaMask Wallet Provider.
 * @example
 * ```ts
 * const wallet = await metamaskWallet();
 * ```
 * @returns A Promise that resolves to a Wallet instance.
 */
export async function metamaskWallet(options?: SpecificInjectedWalletOptions) {
  return injectedWallet({
    ...options,
    walletId: metamaskMetadata.id,
    metadata: metamaskMetadata,
  });
}

export const rainbowWalletMetadata = {
  id: "me.rainbow",
  name: "Rainbow",
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzVfMTQ5KSI+CjxwYXRoIGQ9Ik04MCAwSDBWODBIODBWMFoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl81XzE0OSkiLz4KPHBhdGggZD0iTTEzLjMzMzMgMjUuMzMzNEgxNy4zMzMzQzM3Ljk1MTkgMjUuMzMzNCA1NC42NjY2IDQyLjA0ODEgNTQuNjY2NiA2Mi42NjY3VjY2LjY2NjdINjIuNjY2NkM2NC44NzU4IDY2LjY2NjcgNjYuNjY2NiA2NC44NzU4IDY2LjY2NjYgNjIuNjY2N0M2Ni42NjY2IDM1LjQyMDYgNDQuNTc5NCAxMy4zMzM0IDE3LjMzMzMgMTMuMzMzNEMxNS4xMjQyIDEzLjMzMzQgMTMuMzMzMyAxNS4xMjQyIDEzLjMzMzMgMTcuMzMzNFYyNS4zMzM0WiIgZmlsbD0idXJsKCNwYWludDFfcmFkaWFsXzVfMTQ5KSIvPgo8cGF0aCBkPSJNNTYgNjIuNjY2Nkg2Ni42NjY3QzY2LjY2NjcgNjQuODc1OCA2NC44NzU4IDY2LjY2NjYgNjIuNjY2NyA2Ni42NjY2SDU2VjYyLjY2NjZaIiBmaWxsPSJ1cmwoI3BhaW50Ml9saW5lYXJfNV8xNDkpIi8+CjxwYXRoIGQ9Ik0xNy4zMzMzIDEzLjMzMzRWMjRIMTMuMzMzM1YxNy4zMzM0QzEzLjMzMzMgMTUuMTI0MiAxNS4xMjQyIDEzLjMzMzQgMTcuMzMzMyAxMy4zMzM0WiIgZmlsbD0idXJsKCNwYWludDNfbGluZWFyXzVfMTQ5KSIvPgo8cGF0aCBkPSJNMTMuMzMzMyAyNEgxNy4zMzMzQzM4LjY4ODMgMjQgNTYgNDEuMzExNyA1NiA2Mi42NjY3VjY2LjY2NjdINDRWNjIuNjY2N0M0NCA0Ny45MzkxIDMyLjA2MDkgMzYgMTcuMzMzMyAzNkgxMy4zMzMzVjI0WiIgZmlsbD0idXJsKCNwYWludDRfcmFkaWFsXzVfMTQ5KSIvPgo8cGF0aCBkPSJNNDUuMzMzMyA2Mi42NjY2SDU2VjY2LjY2NjZINDUuMzMzM1Y2Mi42NjY2WiIgZmlsbD0idXJsKCNwYWludDVfbGluZWFyXzVfMTQ5KSIvPgo8cGF0aCBkPSJNMTMuMzMzMyAzNC42NjY3VjI0SDE3LjMzMzNWMzQuNjY2N0gxMy4zMzMzWiIgZmlsbD0idXJsKCNwYWludDZfbGluZWFyXzVfMTQ5KSIvPgo8cGF0aCBkPSJNMTMuMzMzMyA0MS4zMzMzQzEzLjMzMzMgNDMuNTQyNCAxNS4xMjQyIDQ1LjMzMzMgMTcuMzMzMyA0NS4zMzMzQzI2LjkwNjIgNDUuMzMzMyAzNC42NjY2IDUzLjA5MzcgMzQuNjY2NiA2Mi42NjY2QzM0LjY2NjYgNjQuODc1OCAzNi40NTc1IDY2LjY2NjYgMzguNjY2NiA2Ni42NjY2SDQ1LjMzMzNWNjIuNjY2NkM0NS4zMzMzIDQ3LjIwMjYgMzIuNzk3MyAzNC42NjY2IDE3LjMzMzMgMzQuNjY2NkgxMy4zMzMzVjQxLjMzMzNaIiBmaWxsPSJ1cmwoI3BhaW50N19yYWRpYWxfNV8xNDkpIi8+CjxwYXRoIGQ9Ik0zNC42NjY3IDYyLjY2NjZINDUuMzMzNFY2Ni42NjY2SDM4LjY2NjdDMzYuNDU3NiA2Ni42NjY2IDM0LjY2NjcgNjQuODc1OCAzNC42NjY3IDYyLjY2NjZaIiBmaWxsPSJ1cmwoI3BhaW50OF9yYWRpYWxfNV8xNDkpIi8+CjxwYXRoIGQ9Ik0xNy4zMzMzIDQ1LjMzMzNDMTUuMTI0MiA0NS4zMzMzIDEzLjMzMzMgNDMuNTQyNCAxMy4zMzMzIDQxLjMzMzNWMzQuNjY2NkgxNy4zMzMzVjQ1LjMzMzNaIiBmaWxsPSJ1cmwoI3BhaW50OV9yYWRpYWxfNV8xNDkpIi8+CjwvZz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl81XzE0OSIgeDE9IjQwIiB5MT0iMCIgeDI9IjQwIiB5Mj0iODAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzE3NDI5OSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDFFNTkiLz4KPC9saW5lYXJHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDFfcmFkaWFsXzVfMTQ5IiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDE3LjMzMzMgNjIuNjY2Nykgcm90YXRlKC05MCkgc2NhbGUoNDkuMzMzMykiPgo8c3RvcCBvZmZzZXQ9IjAuNzcwMjc3IiBzdG9wLWNvbG9yPSIjRkY0MDAwIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzg3NTRDOSIvPgo8L3JhZGlhbEdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Ml9saW5lYXJfNV8xNDkiIHgxPSI1NS4zMzMzIiB5MT0iNjQuNjY2NiIgeDI9IjY2LjY2NjciIHkyPSI2NC42NjY2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjQwMDAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjODc1NEM5Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQzX2xpbmVhcl81XzE0OSIgeDE9IjE1LjMzMzMiIHkxPSIxMy4zMzM0IiB4Mj0iMTUuMzMzMyIgeTI9IjI0LjY2NjciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzg3NTRDOSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjQwMDAiLz4KPC9saW5lYXJHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDRfcmFkaWFsXzVfMTQ5IiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDE3LjMzMzMgNjIuNjY2Nykgcm90YXRlKC05MCkgc2NhbGUoMzguNjY2NykiPgo8c3RvcCBvZmZzZXQ9IjAuNzIzOTI5IiBzdG9wLWNvbG9yPSIjRkZGNzAwIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGOTkwMSIvPgo8L3JhZGlhbEdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50NV9saW5lYXJfNV8xNDkiIHgxPSI0NS4zMzMzIiB5MT0iNjQuNjY2NiIgeDI9IjU2IiB5Mj0iNjQuNjY2NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkZGNzAwIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGOTkwMSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Nl9saW5lYXJfNV8xNDkiIHgxPSIxNS4zMzMzIiB5MT0iMzQuNjY2NyIgeDI9IjE1LjMzMzMiIHkyPSIyNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkZGNzAwIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGOTkwMSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50N19yYWRpYWxfNV8xNDkiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTcuMzMzMyA2Mi42NjY2KSByb3RhdGUoLTkwKSBzY2FsZSgyOCkiPgo8c3RvcCBvZmZzZXQ9IjAuNTk1MTMiIHN0b3AtY29sb3I9IiMwMEFBRkYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDFEQTQwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQ4X3JhZGlhbF81XzE0OSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgzNCA2NC42NjY2KSBzY2FsZSgxMS4zMzMzIDMwLjIyMjIpIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwQUFGRiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMURBNDAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDlfcmFkaWFsXzVfMTQ5IiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDE1LjMzMzMgNDYpIHJvdGF0ZSgtOTApIHNjYWxlKDExLjMzMzMgMjE0LjkxMykiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBBQUZGIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAxREE0MCIvPgo8L3JhZGlhbEdyYWRpZW50Pgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzVfMTQ5Ij4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTIiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==",
};

/**
 * Connect to Injected Rainbow Wallet Provider
 * @param options - The options for connecting to the Injected MetaMask Wallet Provider.
 * @example
 * ```ts
 * const wallet = await rainbowWallet();
 * ```
 * @returns A Promise that resolves to a Wallet instance.
 */
export async function rainbowWallet(options?: SpecificInjectedWalletOptions) {
  return injectedWallet({
    ...options,
    walletId: rainbowWalletMetadata.id,
    metadata: rainbowWalletMetadata,
  });
}

export const zerionWalletMetadata = {
  id: "io.zerion.wallet",
  name: "Zerion Wallet",
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTIiIGZpbGw9IiMyMzYxRUMiLz4KPHBhdGggZD0iTTE3LjM3OSAyMEMxNi4wMDggMjAgMTUuNDc5OCAyMS42OTUyIDE2LjYzMDEgMjIuNDAzNEw0NS40MDk0IDM5Ljc1NjJDNDYuMTI2OCA0MC4xOTc4IDQ3LjA4MzUgNDAuMDIzNCA0Ny41Nzc0IDM5LjM2MDhMNjAuMjMwOSAyMi43NDlDNjEuMDkxMiAyMS41OTUgNjAuMjIyIDIwIDU4LjczMjkgMjBIMTcuMzc5WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTYyLjYxMTcgNjAuMDAwMUM2My45ODI3IDYwLjAwMDEgNjQuNTI0NSA1OC4yOTU1IDYzLjM3NDMgNTcuNTg3NUwzNC41ODY4IDQwLjIzNjlDMzMuODY5NCAzOS43OTUzIDMyLjkzNTkgMzkuOTkxOSAzMi40NDIxIDQwLjY1NDNMMTkuNzY0IDU3LjI2MjlDMTguOTAzOSA1OC40MTY3IDE5LjgwMDMgNjAuMDAwMSAyMS4yODkyIDYwLjAwMDFINjIuNjExN1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=",
};

/**
 * Connect to Injected Zerion Wallet Provider
 * @param options - The options for connecting to the Injected MetaMask Wallet Provider.
 * @example
 * ```ts
 * const wallet = await zerionWallet();
 * ```
 * @returns A Promise that resolves to a Wallet instance.
 */
export async function zerionWallet(options?: SpecificInjectedWalletOptions) {
  return injectedWallet({
    ...options,
    walletId: zerionWalletMetadata.id,
    metadata: zerionWalletMetadata,
  });
}
