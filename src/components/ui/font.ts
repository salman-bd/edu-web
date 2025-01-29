import { Geist, Geist_Mono, Roboto, Montserrat  } from "next/font/google";


export const geistSans = Geist({
variable: "--font-geist-sans",
subsets: ["latin"],
});

export  const geistMono = Geist_Mono({
variable: "--font-geist-mono",
subsets: ["latin"],
});

export  const roboto = Roboto({
weight: '400',
subsets: ['latin'],
})

export  const montserrat = Montserrat({
weight: '400',
subsets: ['latin'],
})