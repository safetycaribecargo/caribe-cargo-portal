'use client';

import { useState } from 'react';
import Image from 'next/image';

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
      if (!res.ok) throw new Error(data.error || 'No se encontró el reporte');
      setResultado(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative min-h-screen font-sans">
      {/* FONDO DIFUMINADO */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#1B365D]/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#1B365D]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-16 pb-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#1B365D] mb-4 tracking-tight">Portal de Reportes de Seguridad</h1>
          <p className="text-slate-500 text-lg">Ingrese el ID para verificar el estatus de su reporte.</p>
        </div>

        {/* BUSCADOR */}
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
            className="bg-[#1B365D] text-white px-10 py-4 font-bold rounded-xl hover:bg-[#132846] transition-all disabled:opacity-50"
          >
            {cargando ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {error && (
          <div className="p-4 mb-8 bg-red-50 text-red-600 border border-red-100 rounded-2xl text-center font-medium animate-in fade-in zoom-in duration-300">
            {error}
          </div>
        )}

        {/* RESULTADO DETALLADO */}
        {resultado && (
          <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="flex flex-wrap justify-between items-center mb-8 gap-4 border-b border-slate-100 pb-6">
              <div>
                <h3 className="text-2xl font-black text-[#1B365D]">Detalles del Reporte</h3>
                <p className="text-slate-400 font-mono text-sm">{resultado['ID del reporte']}</p>
              </div>
              <span className={`px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest ${resultado['Estado Inbox'] === 'Resuelto' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {resultado['Estado Inbox'] || 'Pendiente'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Estación y Área</label>
                  <p className="text-slate-800 font-bold">{resultado['Estación']} - {resultado['Area de Suceso']}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Fecha de Ingreso</label>
                  <p className="text-slate-800 font-bold">{resultado['Fecha de ingreso del reporte']}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Descripción</label>
                  <p className="text-slate-600 leading-relaxed italic">"{resultado['Descripción del Suceso']}"</p>
                </div>
              </div>

              {/* SECCIÓN DE EVIDENCIAS */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">Evidencias Adjuntas</label>
                <div className="grid grid-cols-2 gap-3">
                  {resultado['Evidencias']?.map((img: any, i: number) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-100 shadow-sm group">
                      <img src={img.url} alt="Evidencia" className="object-cover w-full h-full transition-transform group-hover:scale-110" />
                    </div>
                  )) || <p className="text-slate-400 text-xs italic">No hay imágenes adjuntas</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
