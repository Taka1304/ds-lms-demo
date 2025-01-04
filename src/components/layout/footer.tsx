import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center py-6 bg-gray-800 text-gray-300">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Somni</h3>
            <p className="text-sm">プログラミング学習の新時代</p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
            <Link href="/terms" className="hover:underline">利用規約</Link>
            <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
            <Link href="/contact" className="hover:underline">お問い合わせ</Link>
          </nav>
        </div>
        <div className="mt-6 text-center text-sm">
          &copy; 2025 Data Dreamers. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

