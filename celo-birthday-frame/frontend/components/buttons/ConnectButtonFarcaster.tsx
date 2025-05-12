import { useState, useCallback } from "react";
import { signIn, signOut, getCsrfToken } from "next-auth/react";
import { useSession } from "next-auth/react";
import { SignInButton, StatusAPIResponse } from "@farcaster/auth-kit";

export default function ConnectButtonFarcaster() {
  const { data: session } = useSession();
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

  const getNonce = useCallback(async () => {
    const nonce = await getCsrfToken();
    if (!nonce) throw new Error("Unable to generate nonce");
    return nonce;
  }, []);

  return (
    <>
      {session ? (
        <div className="flex flex-col">
          <div className="flex items-center mb-4 gap-4">
            <div className="flex">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <div>
                <div className="font-semibold">{session.user?.name}</div>
                <div className="text-sm text-gray-500">FID: {session.user?.fid}</div>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="p-2 hover:opacity-75 bg-red-800 text-white rounded ml-auto"
              aria-label="Sign Out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      ) :
        (
          <SignInButton
            nonce={getNonce}
            onSuccess={handleSuccess}
            onError={() => setError(true)}
            onSignOut={() => signOut()}
            hideSignOut={true}
          />

        )}

    </>
  );
}