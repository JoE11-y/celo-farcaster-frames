import { cookieStorage, createStorage, http } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { base, celoAlfajores } from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";

import { farcasterFrame } from "@farcaster/frame-wagmi-connector";

// Get projectId from https://cloud.reown.com
export const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694"; // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error("Project ID is not defined");
}

const RPC_URL =
  process.env.NEXT_PUBLIC_RPC_URL || "https://celo-alfajores.drpc.org";

export const networks = [base, celoAlfajores] as [
  AppKitNetwork,
  ...AppKitNetwork[]
];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [celoAlfajores.id]: http(RPC_URL),
  },
  projectId,
  networks,
  connectors: [farcasterFrame()],
});

export const config = wagmiAdapter.wagmiConfig;
export const page_url = process.env.NEXT_PUBLIC_URL;
