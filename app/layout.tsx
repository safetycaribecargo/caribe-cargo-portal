// app/layout.tsx
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col antialiased bg-white text-slate-900 font-sans">
        
        {/* HEADER (Se mantiene igual, sobre el fondo) */}
        <header className="border-b border-gray-100 py-5 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            {/* ... Contenido del Header (Logo y Nav) ... */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8">
                <Image src="/logo-caribe.png" alt="Logo Caribe Cargo" fill className="object-contain" priority />
              </div>
              <span className="font-bold text-xl text-brandBlue tracking-tight">
                CARIBE CARGO, S.R.L.
              </span>
            </Link>
            <nav className="flex gap-8 text-[15px] font-semibold text-slate-600">
              <Link href="/" className="hover:text-brandBlue transition-colors">Inicio</Link>
              <Link href="/dashboard" className="hover:text-brandBlue transition-colors">Dashboard</Link>
            </nav>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL CON FONDO DIFUMINADO */}
        {/* Usamos pseudoelementos (before/after) para crear las formas difuminadas detrás */}
        <main className="flex-grow relative overflow-hidden
          before:absolute before:top-[-20%] before:left-[-10%] before:w-[600px] before:h-[600px] 
          before:rounded-full before:bg-brandBlue/10 before:blur-[120px] before:z-0
          
          after:absolute after:bottom-[-10%] after:right-[-5%] after:w-[500px] after:h-[500px] 
          after:rounded-full after:bg-brandBlue-light/10 after:blur-[100px] after:z-0
        ">
          {/* El contenido real debe tener z-10 para estar SOBRE el difuminado */}
          <div className="relative z-10">
            {children}
          </div>
        </main>

        {/* PIE DE PÁGINA (FOOTER) */}
        <footer className="bg-[#f9fafb] border-t border-gray-200 pt-10 pb-6 mt-20">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-sm">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Caribe Cargo S.R.L.</h4>
              <p className="text-gray-500">Portal Interno de Reportes de Seguridad</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Contacto</h4>
              <p className="text-gray-500 mb-1">Email: safety@caribecargo.net</p>
              <p className="text-gray-500">Tel: +1 (placeholder)</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Ubicación</h4>
              <p className="text-gray-500 mb-1">Aeropuerto Internacional Las Américas (AILA). Depsosito #5</p>
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
