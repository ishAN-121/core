import ReactQueryProvider from "@/lib/react-query/provider";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { GlobalWalletExtension } from "@dynamic-labs/global-wallet";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DynamicContextProvider
          settings={{
            environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID,
            walletConnectors: [EthereumWalletConnectors],
            walletConnectorExtensions: [GlobalWalletExtension],
          }}
        >
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </DynamicContextProvider>
      </body>
    </html>
  );
}
