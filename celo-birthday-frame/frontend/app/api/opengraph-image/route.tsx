import { getNeynarUser } from "@/lib/neynar";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import React from "react";

export const dynamic = "force-dynamic";
const size = {
  width: 1200,
  height: 800,
};

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(request: NextRequest) {
  const fontData = await loadGoogleFont("Press+Start+2P", "Example image");

  const { searchParams } = new URL(request.url);
  const fid = searchParams.get('fid');

  const user = fid ? await getNeynarUser(Number(fid)) : null;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",
        }}
      >
        {user?.pfp_url && (
          <div style={{ display: 'flex', width: '24rem', height: '24rem', borderRadius: '9999px', overflow: 'hidden', marginBottom: '2rem', border: '8px solid white' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={user.pfp_url} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        <h1 style={{ fontSize: '6rem', color: 'white', fontFamily: "PressStart2P", }}>{user?.display_name ? `Celebrate Birthday with ${user.display_name ?? user.username}!` : 'Birthday Celebration!'}</h1>
        <p style={{ fontSize: '3rem', marginTop: '1rem', color: 'white', opacity: 0.8, fontFamily: "PressStart2P", }}>Celo Birthday Frames 🪐</p>
      </div>
    ) as React.ReactElement,
    {
      ...size,
      fonts: [
        {
          name: "PressStart2P",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
