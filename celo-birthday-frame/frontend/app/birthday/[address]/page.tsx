import BirthdayPage from "@/components/birthdays";

import { APP_URL, APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import { getFrameEmbedMetadata } from "@/lib/utils";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { fid: string } }): Promise<Metadata> {
  const fid = params.fid;
  const imageUrl = `${APP_URL}/api/opengraph-image?fid=${fid}`;

  return {
    title: `${APP_NAME} - Share`,
    openGraph: {
      title: APP_NAME,
      description: APP_DESCRIPTION,
      images: [imageUrl],
    },
    other: {
      "fc:frame": JSON.stringify(getFrameEmbedMetadata(imageUrl)),
    },
  };
}


export default async function Page({
  params,
}: {
  params: Promise<{ address: string }>
}) {
  const { address } = await params
  return (
    <div className="min-h-screen bg-[#2D0C72] px-6 py-10 overflow-hidden">
      <div className="container mx-auto max-w-2xl px-4 py-8 text-center flex flex-col items-center justify-start">
        <BirthdayPage address={address} />
      </div>
    </div>
  );
}