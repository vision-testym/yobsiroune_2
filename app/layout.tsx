import { Metadata } from 'next';
import './globals.css'
import { Noto_Kufi_Arabic } from 'next/font/google'

const inter = Noto_Kufi_Arabic({ subsets: ["arabic"] });


export const metadata: Metadata = {
  title: "يبصرون للعيون بمكة المكرمة",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
