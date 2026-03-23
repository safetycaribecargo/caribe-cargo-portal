// app/layout.tsx
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
        
        {/* HEADER ADAPTATIVO */}
        <header className="border-b border-gray-100 dark:border-slate-800 py-5 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm sticky top-0 z-50 transition-colors">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8">
                <Image src="/logo-caribe.png" alt="Logo Caribe Cargo" fill className="object-contain" priority />
              </div>
              <span className="font-bold text-xl text-brandBlue dark:text-blue-400 tracking-tight">
                CARIBE CARGO, S.R.L.
              </span>
            </Link>

            <nav className="flex gap-8 text-[15px] font-semibold text-slate-600 dark:text-slate-400">
              <Link href="/" className="hover:text-brandBlue dark:hover:text-blue-400 transition-colors">Inicio</Link>
              <Link href="/dashboard" className="hover:text-brandBlue dark:hover:text-blue-400 transition-colors">Dashboard</Link>
            </nav>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL CON FONDO DIFUMINADO ADAPTATIVO */}
        <main className="flex-grow relative overflow-hidden
          before:absolute before:top-[-20%] before:left-[-10%] before:w-[600px] before:h-[600px] 
          before:rounded-full before:bg-brandBlue/10 dark:before:bg-blue-500/5 before:blur-[120px] before:z-0
          
          after:absolute after:bottom-[-10%] after:right-[-5%] after:w-[500px] after:h-[500px] 
          after:rounded-full after:bg-brandBlue-light/10 dark:after:bg-blue-400/5 after:blur-[100px] after:z-0
        ">
          <div className="relative z-10">
            {children}
          </div>
        </main>

        {/* PIE DE PÁGINA (FOOTER) ADAPTATIVO */}
        <footer className="bg-[#f9fafb] dark:bg-slate-900/50 border-t border-gray-200 dark:border-slate-800 pt-10 pb-6 mt-20 transition-colors">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-sm">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-slate-100 mb-2">Caribe Cargo S.R.L.</h4>
              <p className="text-gray-500 dark:text-slate-400">Portal Interno de Reportes de Seguridad</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-slate-100 mb-2">Contacto</h4>
              <p className="text-gray-500 dark:text-slate-400 mb-1">Email: safety@caribecargo.net</p>
              <p className="text-gray-500 dark:text-slate-400">Tel: (809) 549-2720 ext. 726</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-slate-100 mb-2">Ubicación</h4>
              <p className="text-gray-500 dark:text-slate-400 mb-1">Aeropuerto Internacional Las Américas (AILA). Deposito #5</p>
              <p className="text-gray-500 dark:text-slate-400">Santo Domingo, RD</p>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-slate-800 pt-6 text-center text-xs text-gray-400 dark:text-slate-500">
            <p>© Caribe Cargo S.R.L. · Uso interno</p>
            <p className="mt-1">Portal de Reportes de Seguridad - Acceso Restringido</p>
          </div>
        </footer>

      </body>
    </html>
  );
}
