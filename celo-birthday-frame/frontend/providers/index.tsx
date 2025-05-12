"use client";

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiAdapter, projectId, networks } from '@/lib/config'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { createAppKit } from '@reown/appkit/react'
import { ApolloWrapper } from '@/apollo/apolloClient';
import { FrameProvider } from './FrameProvider';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import {
  AuthKitProvider,
} from "@farcaster/auth-kit";
import { APP_URL } from '@/lib/constants';
const config = {
  relay: "https://relay.farcaster.xyz",
};

// Set up queryClient
const queryClient = new QueryClient()

// Set up metadata
const metadata = {
  name: 'celo-birthday-frame',
  description: 'celo-birthday-frame',
  url: APP_URL, // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata,
  themeMode: 'dark',
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    '--w3m-accent': '#F97316',
  }

})

export function Providers({ children, cookies, session }: { children: React.ReactNode, cookies: string | null, session: Session | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
  return (
    <SessionProvider session={session}>
      <AuthKitProvider config={config}>
        <ApolloWrapper>
          <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
              <FrameProvider>
                {children}
              </FrameProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </ApolloWrapper>
      </AuthKitProvider>
    </SessionProvider>
  );
}
