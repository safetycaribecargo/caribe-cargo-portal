'use client';

import { useState } from 'react';

export default function Home() {
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarBusqueda = async () => {
    if (!busqueda) return;
    setCargando(true);
    setError('');
    setResultado(null);

    try {
      const res = await fetch(`/api/buscar?id=${busqueda.trim()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se encontró el reporte');
      setResultado(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Fondo Difuminado Adaptativo */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#1B365D]/10 dark:bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-[#1B365D] dark:text-blue-400 mb-4">Portal de Reportes de Seguridad</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Consulta de estatus Caribe Cargo S.R.L.</p>
        </div>

        {/* Buscador Adaptativo */}
        <div className="flex mb-10 shadow-xl rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2">
          <input 
            type="text" 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && manejarBusqueda()}
            placeholder="Ej: PUJ-220320261833" 
            className="flex-grow px-6 py-4 outline-none bg-transparent text-slate-700 dark:text-slate-200 text-lg"
          />
          <button 
            onClick={manejarBusqueda}
            disabled={cargando}
            className="bg-[#1B365D] dark:bg-blue-600 text-white px-10 py-4 font-bold rounded-xl hover:opacity-90 transition-all"
          >
            {cargando ? '...' : 'Buscar'}
          </button>
        </div>

        {error && (
          <div className="p-4 mb-8 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-2xl text-center">
            {error}
          </div>
        )}

        {/* Card de Resultado Completa */}
        {resultado && (
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center mb-8 border-b dark:border-slate-800 pb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#1B365D] dark:text-blue-400">Detalles del Reporte</h3>
                <p className="text-slate-400 font-mono text-sm">{resultado['ID del reporte']}</p>
              </div>
              <span className="px-4 py-1 bg-blue-100 dark:bg-blue-900/40 text-[#1B365D] dark:text-blue-300 rounded-full text-xs font-black uppercase">
                {resultado['Estado Inbox'] || 'En Proceso'}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ubicación</label>
                  <p className="text-slate-800 dark:text-slate-200 font-bold">{resultado['Estación']} - {resultado['Area de Suceso']}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Descripción</label>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    {resultado['Descripción del Suceso'] || 'Sin descripción detallada.'}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Evidencias</label>
                <div className="grid grid-cols-2 gap-3">
                  {resultado['Evidencias']?.map((img: any, i: number) => (
                    <img key={i} src={img.url} alt="Evidencia" className="rounded-xl object-cover h-24 w-full border dark:border-slate-800" />
                  )) || <p className="text-slate-400 text-xs italic">No hay evidencias cargadas.</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
