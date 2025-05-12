import { useState, useCallback } from "react";
import { signIn, signOut, getCsrfToken } from "next-auth/react";
import { useSession } from "next-auth/react";
import { SignInButton, StatusAPIResponse } from "@farcaster/auth-kit";

export default function ConnectButtonFarcaster() {
  const { data: session, status } = useSession();
  const [error, setError] = useState(false);

  const handleSuccess = useCallback(
    (res: StatusAPIResponse) => {
      signIn("credentials", {
        message: res.message,
        signature: res.signature,
        name: res.username,
        pfp: res.pfpUrl,
        redirect: false,
      });
    },
    []
  );

  console.log(session);
  console.log(status);


  const getNonce = useCallback(async () => {
    const nonce = await getCsrfToken();
    if (!nonce) throw new Error("Unable to generate nonce");
    return nonce;
  }, []);

  return (
    <>
      <SignInButton
        nonce={getNonce}
        onSuccess={handleSuccess}
        onError={() => setError(true)}
        onSignOut={() => signOut()}
      />

      {session && (
        <div className="my-2 p-2 text-xs overflow-x-scroll bg-gray-100 rounded-lg font-mono">
          <div className="font-semibold text-gray-500 mb-1">Session</div>
          <div className="whitespace-pre">
            {JSON.stringify(session, null, 2)}
          </div>
        </div>
      )}

    </>
  );
}