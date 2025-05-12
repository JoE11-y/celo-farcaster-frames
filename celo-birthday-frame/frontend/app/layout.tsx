import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@farcaster/auth-kit/styles.css";
import "./globals.css";
import { Providers } from "@/providers";
import { headers } from 'next/headers';
import { APP_NAME, APP_DESCRIPTION, APP_OG_IMAGE_URL } from "@/lib/constants";
import { getFrameEmbedMetadata } from "@/lib/utils";
import { getSession } from "@/auth";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Self Happy Birthday",
//   description: "Happy Birthday!",
// };

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: APP_NAME,
    openGraph: {
      title: APP_NAME,
      description: APP_DESCRIPTION,
      images: [APP_OG_IMAGE_URL],
    },
    other: {
      "fc:frame": JSON.stringify(getFrameEmbedMetadata()),
    },
  };
}



// const appUrl = process.env.NEXT_PUBLIC_URL;

// const frame = {
//   version: "next",
//   imageUrl: `${appUrl}/frame.png`,
//   button: {
//     title: "Launch Frame",
//     action: {
//       type: "launch_frame",
//       name: "Celo Birthday Frame",
//       url: appUrl,
//       splashImageUrl: `${appUrl}/frame-logo.png`,
//       splashBackgroundColor: "#2D0C72",
//     },
//     backgroundColor: "#2D0C72"
//   },
// };

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "Celo Birthday Frame",
//     openGraph: {
//       title: "Celo Birthday Frame",
//       description: "Share your birthday with friends and family",
//     },
//     other: {
//       "fc:frame": JSON.stringify(frame),
//     },
//   };
// }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession()
  const headersData = await headers();
  const cookies = headersData.get('cookie');

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers cookies={cookies} session={session}>{children}</Providers>
      </body>
    </html>
  );
}
