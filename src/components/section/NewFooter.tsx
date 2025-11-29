export default function NewFooter() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2">MyWebsite</h2>
          <p className="text-sm text-gray-300">Platform modern untuk kebutuhan digital Anda.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Navigasi</h3>
          <ul className="space-y-1 text-gray-300">
            <li>
              <a href="#" className="hover:text-white">
                Beranda
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Tentang
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Layanan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Kontak
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Kontak</h3>
          <p className="text-gray-300 text-sm">Email: info@mywebsite.com</p>
          <p className="text-gray-300 text-sm">Phone: +62 812 3456 7890</p>
        </div>
      </div>

      <div className="text-center mt-8 border-t border-gray-700 pt-4 text-gray-400 text-sm">© 2025 MyWebsite. All rights reserved.</div>
    </footer>
  );
}
