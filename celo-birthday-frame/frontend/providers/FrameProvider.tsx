"use client";
import { Context, FrameNotificationDetails } from "@farcaster/frame-core";
import sdk from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { createStore } from "mipd";
import React from "react";

interface FrameContextType {
  isSDKLoaded: boolean;
  context: Context.FrameContext | null;
  notificationDetails: FrameNotificationDetails | null;
  lastEvent: string;
  safeAreaInsets: Context.SafeAreaInsets,
  error: string | null;
}

const FrameContext = React.createContext<FrameContextType | undefined>(undefined);

export const useFrame = () => {
  const [context, setContext] = useState<Context.FrameContext | null>(null);
  const [safeAreaInsets, setSafeAreaInsets] = useState<Context.SafeAreaInsets>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notificationDetails, setNotificationDetails] =
    useState<FrameNotificationDetails | null>(null);
  const [lastEvent, setLastEvent] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const context = await sdk.context;
        if (context) {
          if (context.client?.safeAreaInsets) {
            setSafeAreaInsets(context.client.safeAreaInsets);
          }
          setContext(context as Context.FrameContext);
        } else {
          setError("Failed to load Farcaster context");
        }

        sdk.on("notificationsEnabled", ({ notificationDetails }) => {
          console.log("Notifications enabled", notificationDetails);
          setNotificationDetails(notificationDetails ?? null);
          setLastEvent("Notifications enabled");
        });

        sdk.on("notificationsDisabled", () => {
          console.log("Notifications disabled");
          setNotificationDetails(null);
          setLastEvent("Notifications disabled");
        });

        await sdk.actions.ready();

        const store = createStore();
        store.subscribe((providerDetails) => {
          console.log("PROVIDER DETAILS", providerDetails);
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to initialize SDK"
        );
        console.error("SDK initialization error:", err);
      }
    };

    if (sdk && !isSDKLoaded) {
      console.log("Loading SDK");
      load().then(() => {
        setIsSDKLoaded(true);
        console.log("SDK loaded");
      });

      return () => {
        sdk.removeAllListeners();
      };
    }
  }, [isSDKLoaded]);

  return {
    context,
    safeAreaInsets,
    isSDKLoaded,
    error,
    notificationDetails,
    lastEvent,
  };
};

export function FrameProvider({ children }: { children: React.ReactNode }) {
  const frameContext = useFrame();

  if (!frameContext.isSDKLoaded) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-2">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        Loading...
      </div>
    );
  }

  return (
    <FrameContext.Provider value={frameContext}>
      {children}
    </FrameContext.Provider>
  );
} 