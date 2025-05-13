import { NextRequest, NextResponse } from "next/server";
import { getUserIdentifier, SelfBackendVerifier } from "@selfxyz/core";
import { ethers } from "ethers";
import { ContractAbi, ContractAddress } from "@/lib/data/abi";

export const POST = async (req: NextRequest) => {
  try {
    const { proof, publicSignals } = await req.json();

    if (!proof || !publicSignals) {
      return NextResponse.json(
        { error: "Proof and publicSignals are required" },
        { status: 400 }
      );
    }

    console.log("Proof:", proof);
    console.log("Public signals:", publicSignals);

    const rpc = process.env.NEXT_PUBLIC_RPC_URL as string;

    // // Uncomment this to use the Self backend verifier for offchain verification instead
    // // const selfdVerifier = new SelfBackendVerifier(
    // //     rpc,
    // //     "Self-Denver-Birthday",
    // //     "your ngrok endpoint",
    // //     "hex",
    // // //  true // If you want to use mock passport
    // // );
    // // const result = await selfdVerifier.verify(proof, publicSignals);
    // // console.log("Verification result:", result);

    // const address = await getUserIdentifier(publicSignals, "hex");
    // console.log("Extracted address from verification result:", address);

    // // // Connect to Celo network
    // const provider = new ethers.JsonRpcProvider(rpc);
    // const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    // const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);

    // const proofData = {
    //   a: proof.a,
    //   b: [
    //     [proof.b[0][1], proof.b[0][0]],
    //     [proof.b[1][1], proof.b[1][0]],
    //   ],
    //   c: proof.c,
    //   pubSignals: publicSignals,
    // };

    // console.log(proofData);

    try {
      // VERIFY PROOF
      // const tx = await contract.verifySelfProof(proofData);
      // await tx.wait();
      // console.log("Successfully called verifySelfProof function");
      return NextResponse.json(
        {
          status: "suceess",
          result: true,
          success: true,
          credentialSubject: {},
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error calling verifySelfProof function:", error);
      return NextResponse.json(
        {
          error: "Verification failed or date of birth not disclosed",
          result: false,
          details: {},
          status: "error",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying proof:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Error verifying proof",
        result: false,
        details: {},
        status: "error",
      },
      { status: 500 }
    );
  }
};
