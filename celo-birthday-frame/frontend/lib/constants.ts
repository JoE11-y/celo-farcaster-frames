import { MainnetAddress, TestnetAddress } from "./data/abi";

export const APP_URL = process.env.NEXT_PUBLIC_URL!;
export const APP_NAME = "Celo Birthday Frame";
export const APP_DESCRIPTION = "Share your birthday with friends and family";
export const APP_PRIMARY_CATEGORY = "social";
export const APP_TAGS = ["birthday", "party", "gifts"];
export const APP_ICON_URL = `${APP_URL}/frame-logo.png`;
export const APP_OG_IMAGE_URL = `${APP_URL}/frame.png`;
export const APP_SPLASH_URL = `${APP_URL}/frame-logo.png`;
export const APP_SPLASH_BACKGROUND_COLOR = "#2D0C72";
export const APP_BUTTON_TEXT = "Launch Birthday Frame";
export const APP_WEBHOOK_URL =
  process.env.NEYNAR_API_KEY && process.env.NEYNAR_CLIENT_ID
    ? `https://api.neynar.com/f/app/${process.env.NEYNAR_CLIENT_ID}/event`
    : `${APP_URL}/api/webhook`;
export const NETWORK = process.env.NEXT_PUBLIC_CELO_NETWORK;

export const RPC_URL =
  NETWORK === "mainnet"
    ? process.env.NEXT_PUBLIC_MAINNET_RPC_URL!
    : NETWORK === "testnet"
    ? process.env.NEXT_PUBLIC_TESTNET_RPC_URL!
    : "https://forno.celo.org";

export const CONTRACT_ADDRESS =
  NETWORK === "mainnet" ? MainnetAddress : TestnetAddress;

export const SELF_WS_URL = process.env.NEXT_SELF_WS_URL!;
