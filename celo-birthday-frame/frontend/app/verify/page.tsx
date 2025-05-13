'use client';

import React, { useEffect, useCallback } from 'react';
import QrWrapper from '@/components/wrappers/QrWrapper';
import {
  useAppKitAccount,
} from '@reown/appkit/react'
import { ConnectButton } from "@/components/buttons/ConnectButton";
import { useReadContract } from "wagmi";
import { ContractAbi } from '@/lib/data/abi';
import { BirthdayRecord } from '@/lib/data/types';
import { useRouter } from 'next/navigation';
import { useFrame } from '@/providers/FrameProvider';
import { CONTRACT_ADDRESS } from '@/lib/constants';

function VerifyPage() {
  const router = useRouter();
  const { address, isConnected } = useAppKitAccount();
  const { safeAreaInsets } = useFrame();

  const readContract = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ContractAbi,
    functionName: "isCelebrantRegistered",
    args: [address],
    query: {
      enabled: false,
    },
  })

  const readBirthdayRecord = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ContractAbi,
    functionName: "getBirthdayRecord",
    args: [address],
    query: {
      enabled: false,
    },
  })

  const getBirthdayRecord = useCallback(async () => {
    const { data } = await readBirthdayRecord.refetch();
    const record = data as unknown as BirthdayRecord
    return record;
  }, [readBirthdayRecord]);

  const checkIfUserRegistered = useCallback(async () => {
    const { data } = await readContract.refetch();
    if (data) {
      const record = await getBirthdayRecord();
      if (record.route == 0) {
        router.push("/create")
      } else {
        router.push(`/birthday/${address}`)
      }

    }
  }, [address, getBirthdayRecord, readContract, router]);

  useEffect(() => {
    if (isConnected) {
      checkIfUserRegistered()
    }
  }, [isConnected, checkIfUserRegistered])

  return (
    <div className="h-screen bg-[#2D0C72] px-6 py-10 overflow-hidden"
      style={{
        marginTop: safeAreaInsets.top,
        marginBottom: safeAreaInsets.bottom,
        marginLeft: safeAreaInsets.left,
        marginRight: safeAreaInsets.right,
      }}
    >
      <div className="container mx-auto max-w-2xl px-4 py-8 text-center flex flex-col items-center justify-start">

        <div className="relative  flex flex-col items-center mb-4 mx-8">

          <h1 className="text-[#FFF8C9] text-4xl font-bold leading-tight z-2 mt-8">
            🎉 So It&apos;s your birthday?
          </h1>

          <h2 className="text-[#FFF8C9] text-3xl font-semibold mb-4 text-cente mt-3 ">
            Let&apos;s verify
          </h2>
        </div>
        <ConnectButton />
        {address && <QrWrapper address={address} />}
      </div>
    </div >
  );
}

export default VerifyPage;
