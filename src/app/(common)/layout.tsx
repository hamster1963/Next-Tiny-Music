import React from "react";

import {Footer} from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex flex-col  min-h-screen">
        <div className="flex-grow">
          {children}
        </div>
        <Footer/>
      </div>
  );
}
