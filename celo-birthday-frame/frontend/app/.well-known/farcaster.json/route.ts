export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  // The .well-known/farcaster.json route is used to provide the configuration for the Frame.
  // You need to generate the accountAssociation payload and signature using this link:

  const config = {
    accountAssociation: {
      header: "",
      payload: "",
      signature: "",
    },
    frame: {
      version: "1",
      name: "Celo Birthday Frame",
      iconUrl: `${appUrl}/frame-logo.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/frame.png`,
      buttonTitle: "Launch Frame",
      splashImageUrl: `${appUrl}/frame-logo.png`,
      splashBackgroundColor: "#2D0C72",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}
