'use client'
import Navbar from './components/navbar';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { abi } from './abi';
import { useState } from 'react';

function Page() {
  const { isConnected, address } = useAccount();
  const { 
    data: hash, 
    writeContract, 
    isPending, 
    error 
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });
  
  // Your Pinata-hosted metadata URI
  const tokenURI = "ipfs://bafkreidbryst4v3gqfcjfinazyoqzbis7x42zkswiinj7g7navtlnhp7ma";

  const handleMint = async () => {
    writeContract({
      address: '0x0e60198dda39a4101390a29d6b25184726357c3c',
      abi,
      functionName: 'mintNFT',
      args: [address, tokenURI],
    });
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Navbar/>
      {
        isConnected && 
        <div className='bg-white flex h-[30rem] min-w-xl flex-col items-center justify-center p-4 gap-5 rounded-xl'>
          <h1 className='text-black text-3xl'>Your wallet has been connected</h1>
          
          {/* Display NFT preview info */}
          <div className="text-center">
            <p className="text-lg text-gray-700">Minting KEY NFT with metadata:</p>
            <p className="text-sm text-blue-500 break-all px-4">
              {tokenURI}
            </p>
          </div>
          
          <button 
            onClick={handleMint}
            disabled={isPending || isConfirming}
            className={`text-3xl p-5 rounded-2xl transition-all ${
              isPending || isConfirming 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:scale-110'
            }`}
          >
            {isPending ? 'Confirm in Wallet...' : 
             isConfirming ? 'Minting...' : 
             isConfirmed ? '✓ Minted Successfully!' : 'MINT KEY NFT'}
          </button>
          
          {error && (
            <div className="text-red-500 text-sm max-w-md text-center">
              Error: {error.message}
            </div>
          )}
          
          {hash && (
            <div className="text-sm text-gray-600">
              Transaction: {hash.substring(0, 6)}...{hash.substring(hash.length - 4)}
            </div>
          )}
          
          <a 
            href='https://cloud.google.com/application/web3/faucet/ethereum/sepolia' 
            className='text-lg text-amber-200 hover:underline'
            target="_blank"
            rel="noopener noreferrer"
          >
            Don't have sepolia ETH? Click Here
          </a>
          <a className='text-emerald-400 text-3xl' href='/private'> Check Hidden Route </a>
        </div>
      }
    </div>
  );
}

export default Page;