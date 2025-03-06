import { Geist, Geist_Mono, Roboto, Roboto_Mono , Montserrat, Inconsolata, Source_Code_Pro, Lexend  } from "next/font/google";


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

export  const roboto_mono = Roboto_Mono ({
weight: '400',
subsets: ['latin'],
})

export  const montserrat = Montserrat({
weight: '400',
subsets: ['latin'],
})

export  const inconsolata = Inconsolata({
weight: '500',
subsets: ['latin'],
})

export  const source_code_pro = Source_Code_Pro({
weight: '500',
subsets: ['latin'],
})

export  const lexend = Lexend({
weight: '400',
subsets: ['latin'],
})