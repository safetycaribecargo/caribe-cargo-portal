import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col font-sans text-gray-800">
        
        {/* NAVEGACIÓN (HEADER) */}
        <header className="border-b border-gray-200 py-4">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            {/* Reemplaza src con "/logo.png" cuando subas tu logo */}
            <div className="flex items-center gap-2">
              <div className="font-bold text-xl text-brandBlue tracking-wide flex items-center gap-2">
                 <span className="text-2xl">▲</span> CARIBE CARGO, S.R.L.
              </div>
            </div>
            <nav className="flex gap-6 text-sm text-gray-600 font-medium">
              <Link href="/" className="hover:text-brandBlue">Inicio</Link>
              <Link href="/dashboard" className="hover:text-brandBlue">Dashboard (KPIs/SPI)</Link>
            </nav>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-grow">
          {children}
        </main>

        {/* PIE DE PÁGINA (FOOTER) */}
        <footer className="bg-[#f9fafb] border-t border-gray-200 pt-10 pb-6 mt-20">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-sm">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Caribe Cargo</h4>
              <p className="text-gray-500">Portal Interno de Reportes de Seguridad</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Contacto</h4>
              <p className="text-gray-500 mb-1">Email: safety@caribecargo.net</p>
              <p className="text-gray-500">Tel: +1 (placeholder)</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Ubicación</h4>
              <p className="text-gray-500 mb-1">Aeropuerto Internacional Las Américas (AILA)</p>
              <p className="text-gray-500">Santo Domingo, RD</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
            <p>© Caribe Cargo · Uso interno</p>
            <p className="mt-1">Portal de Reportes de Seguridad - Acceso Restringido</p>
          </div>
        </footer>

      </body>
    </html>
  );
}
