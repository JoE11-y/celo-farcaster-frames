import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  APP_BUTTON_TEXT,
  APP_DESCRIPTION,
  APP_ICON_URL,
  APP_NAME,
  APP_OG_IMAGE_URL,
  APP_PRIMARY_CATEGORY,
  APP_SPLASH_BACKGROUND_COLOR,
  APP_TAGS,
  APP_URL,
  APP_WEBHOOK_URL,
} from "./constants";
import { APP_SPLASH_URL } from "./constants";

interface FrameMetadata {
  version: string;
  name: string;
  iconUrl: string;
  homeUrl: string;
  imageUrl?: string;
  buttonTitle?: string;
  splashImageUrl?: string;
  splashBackgroundColor?: string;
  webhookUrl?: string;
  description?: string;
  primaryCategory?: string;
  tags?: string[];
}

interface FrameManifest {
  accountAssociation?: {
    header: string;
    payload: string;
    signature: string;
  };
  frame: FrameMetadata;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFrameEmbedMetadata(ogImageUrl?: string) {
  return {
    version: "next",
    imageUrl: ogImageUrl ?? APP_OG_IMAGE_URL,
    button: {
      title: APP_BUTTON_TEXT,
      action: {
        type: "launch_frame",
        name: APP_NAME,
        url: APP_URL,
        splashImageUrl: APP_SPLASH_URL,
        iconUrl: APP_ICON_URL,
        splashBackgroundColor: APP_SPLASH_BACKGROUND_COLOR,
        description: APP_DESCRIPTION,
        primaryCategory: APP_PRIMARY_CATEGORY,
        tags: APP_TAGS,
      },
    },
  };
}

export async function getFarcasterMetadata(): Promise<FrameManifest> {
  // First check for FRAME_METADATA in .env and use that if it exists
  if (process.env.FRAME_METADATA) {
    try {
      const metadata = JSON.parse(process.env.FRAME_METADATA);
      console.log("Using pre-signed frame metadata from environment");
      return metadata;
    } catch (error) {
      console.warn("Failed to parse FRAME_METADATA from environment:", error);
    }
  }

  const accountAssociation = {
    header:
      "eyJmaWQiOjEwNjE3NjksInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhCNGQzZDk3ZERGNjcyOWUxRjlmRDUwODE4MDAwMjBCYThBNGI4ZkY5In0",
    payload:
      "eyJkb21haW4iOiJjZWxvLWZhcmNhc3Rlci1mcmFtZXMtc2l4LnZlcmNlbC5hcHAifQ",
    signature:
      "MHhiODExYzYwMGZlZmIyMTMyN2I1NzlmNWJlYjI1MDczYmMyMzRjMDdhMTgyZTJmMjQzZTY1MDlhMjYwMjYwYzk2MGRhNTJjNmU3OTlmOTI4ZjlhMmJjYzdhN2JmZmFhMjRjMjM2NGYyZjZiZGMyOWIzNDIyYmRhMDhjN2JjYTM3MDFi",
  };

  return {
    accountAssociation,
    frame: {
      version: "1",
      name: APP_NAME ?? "Celo Birthday Frame",
      iconUrl: APP_ICON_URL,
      homeUrl: APP_URL,
      imageUrl: APP_OG_IMAGE_URL,
      buttonTitle: APP_BUTTON_TEXT ?? "Launch Frame",
      splashImageUrl: APP_SPLASH_URL,
      splashBackgroundColor: APP_SPLASH_BACKGROUND_COLOR,
      webhookUrl: APP_WEBHOOK_URL,
      description: APP_DESCRIPTION,
      primaryCategory: APP_PRIMARY_CATEGORY,
      tags: APP_TAGS,
    },
  };
}
