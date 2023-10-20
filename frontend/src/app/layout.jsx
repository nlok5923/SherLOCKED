"use client";

import "./globals.css";
import { Inter } from "next/font/google";

import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import NavMenu from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

const chains = [
  {
    id: "0xa869",
    token: "AVAX",
    label: "Avalanche Fuji Testnet",
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
  },
];

const wallets = [injectedModule()];
const web3Onboard = init({
  wallets,
  chains,
  appMetadata: {
    name: "SherLOCKED",
    icon: "<svg>App Icon</svg>",
    description: "SherLOCKED",
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <body className={inter.className}>
          <NavMenu />
          {children}
        </body>
      </Web3OnboardProvider>
    </html>
  );
}
