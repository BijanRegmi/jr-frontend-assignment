import { Header } from "@/components/Header"
import "./globals.css"
import { Inter } from "next/font/google"
import { TrpcProvider } from "@/components/TrpcContext"
import { Sidebar } from "@/components/Sidebar"
import { RecoilContext } from "@/components/RecoilContext"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <TrpcProvider>
                    <div className="h-screen w-screen">
                        <Header />
                        <div className="flex h-[calc(100%-4rem)] overflow-scroll">
                            <Sidebar />
                            <div className="flex-grow h-full">
                                <RecoilContext>{children}</RecoilContext>
                            </div>
                        </div>
                    </div>
                </TrpcProvider>
            </body>
        </html>
    )
}
