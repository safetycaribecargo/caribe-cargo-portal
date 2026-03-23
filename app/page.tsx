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
      const res = await fetch(`/api/buscar?id=${busqueda}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResultado(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Fondo difuminado atractivo */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#1B365D]/5 blur-[100px]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#1B365D]/10 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-[#1B365D] mb-4">Portal de Reportes de Seguridad</h1>
          <p className="text-slate-500 text-lg">Consulta el estatus en tiempo real desde Airtable.</p>
        </div>

        {/* Buscador */}
        <div className="flex mb-10 shadow-2xl rounded-2xl overflow-hidden border border-slate-200 bg-white p-2">
          <input 
            type="text" 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && manejarBusqueda()}
            placeholder="Ej: PUJ-220320261833" 
            className="flex-grow px-6 py-4 outline-none text-slate-700 text-lg rounded-xl"
          />
          <button 
            onClick={manejarBusqueda}
            disabled={cargando}
            className="bg-[#1B365D] text-white px-10 py-4 font-bold rounded-xl hover:bg-[#132846] transition-all"
          >
            {cargando ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {error && <div className="p-4 mb-8 bg-red-50 text-red-600 border border-red-100 rounded-2xl text-center">{error}</div>}

        {resultado && (
          <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8 border-b pb-6">
              <div>
                <h3 className="text-2xl font-black text-[#1B365D]">Detalles del Reporte</h3>
                <p className="text-slate-400 font-mono text-sm">{resultado['ID del reporte']}</p>
              </div>
              <span className="px-5 py-2 bg-[#1B365D]/10 text-[#1B365D] rounded-full text-xs font-black uppercase tracking-widest">
                {resultado['Estado Inbox'] || 'Recibido'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ubicación</label>
                  <p className="text-slate-800 font-bold">{resultado['Estación']} - {resultado['Area de Suceso']}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Descripción del Suceso</label>
                  <p className="text-slate-600 leading-relaxed italic">"{resultado['Descripción del Suceso']}"</p>
                </div>
              </div>

              {/* Visualización de Evidencias (Fotos de Airtable) */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Evidencias Adjuntas</label>
                <div className="grid grid-cols-2 gap-3">
                  {resultado['Evidencias']?.map((img: any, i: number) => (
                    <a key={i} href={img.url} target="_blank" rel="noreferrer" className="relative aspect-square rounded-xl overflow-hidden border border-slate-100 group">
                      <img src={img.url} alt="Evidencia" className="object-cover w-full h-full transition-transform group-hover:scale-110" />
                    </a>
                  )) || <p className="text-slate-400 text-xs italic">Sin evidencias.</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
