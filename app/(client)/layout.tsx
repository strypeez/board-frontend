import { CartStoreProvider } from "@/providers/cart-store-provider";

import type { Metadata } from "next";
import "../globals.scss";
import ClientHeader from "./components/clientHeader";
import ToastManager from "./components/toastManager";

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
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body className="flex flex-col items-center">
        <CartStoreProvider>
          <ClientHeader />
          <ToastManager />
          {children}
        </CartStoreProvider>
      </body>
    </html>
  );
}
