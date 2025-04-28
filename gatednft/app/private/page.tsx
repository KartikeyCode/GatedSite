'use client'
import Navbar from "../components/navbar";
import { useAccount, useReadContract } from "wagmi";
import { abi } from "../abi";

export default function Private() {
  const { address, isConnected } = useAccount();
  const contractAddress = '0x0e60198dda39a4101390a29d6b25184726357c3c';

  // Check NFT balance
  const { data: balance, isLoading } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'balanceOf',
    args: [address],
    query: {
      enabled: !!address,
    }
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Navbar/>
        <div className="bg-white flex h-[30rem] min-w-xl flex-col items-center justify-center p-4 gap-5 rounded-xl">
          <h1 className="text-black text-3xl">Please connect your wallet</h1>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Navbar/>
        <div className="bg-white flex h-[30rem] min-w-xl flex-col items-center justify-center p-4 gap-5 rounded-xl">
          <h1 className="text-black text-3xl">Checking NFT ownership...</h1>
        </div>
      </div>
    );
  }

  const hasNFT = balance && Number(balance) > 0;

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Navbar/>
      <div className="bg-white flex h-[30rem] min-w-xl flex-col items-center justify-center p-4 gap-5 rounded-xl">
        {hasNFT ? (
          <h1 className="text-black text-3xl">ONLY NFT OWNERS CAN SEE THIS TEXT</h1>
        ) : (
          <>
            <h1 className="text-black text-3xl">You do not own the required NFT</h1>
            <p className="text-gray-600">You need to mint a KEY NFT to access this content</p>
          </>
        )}
      </div>
    </div>
  );
}