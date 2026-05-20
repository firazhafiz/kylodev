import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ReactLenis from "lenis/react";

export const metadata: Metadata = {
  title: "KyloDev - Develope Your Digital Platform",
  description: "Website and App Development Agency",
  icons: {
    icon: "/assets/meta-kylo.svg",
  },
  verification: {
    other: {
      "facebook-domain-verification": "8d24a29xonz41f9yow2h81xwtxvxua",
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-neuehaas antialiased">

        {/* 2. PASANG SCRIPT BASE META PIXEL DI SINI */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2214822719334712');
            fbq('track', 'PageView');
          `}
        </Script>

        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  );
}