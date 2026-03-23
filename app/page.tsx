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
      // Forzamos la ruta correcta a la API
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
    <div className="max-w-4xl mx-auto px-6 pt-20 font-sans">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-[#1B365D]">Portal de Reportes de Seguridad</h1>
        <p className="text-slate-500 mt-2">Ingrese el ID para verificar el estatus en tiempo real.</p>
      </div>

      <div className="flex gap-2 shadow-xl p-2 bg-white rounded-2xl border border-slate-200 mb-10">
        <input 
          type="text" 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Ej: PUJ-220320261833" 
          className="flex-grow px-4 py-3 outline-none text-lg"
        />
        <button 
          onClick={manejarBusqueda}
          disabled={cargando}
          className="bg-[#1B365D] text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50"
        >
          {cargando ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-center mb-10 font-medium">
          ❌ {error}
        </div>
      )}

      {resultado && (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h3 className="text-2xl font-bold text-[#1B365D]">Detalles del Reporte</h3>
            <span className="px-4 py-1 bg-blue-100 text-[#1B365D] rounded-full text-xs font-black uppercase">
              {resultado['Estado Inbox'] || 'Pendiente'}
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p><span className="text-slate-400 text-[10px] uppercase font-black block">ID:</span> {resultado['ID del reporte']}</p>
              <p><span className="text-slate-400 text-[10px] uppercase font-black block">Ubicación:</span> {resultado['Estación']} - {resultado['Area de Suceso']}</p>
              <p><span className="text-slate-400 text-[10px] uppercase font-black block">Descripción:</span> <span className="italic">"{resultado['Descripción del Suceso']}"</span></p>
            </div>
            
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-black block mb-2">Evidencias:</span>
              <div className="grid grid-cols-2 gap-2">
                {resultado['Evidencias']?.map((foto: any, i: number) => (
                  <img key={i} src={foto.url} className="w-full h-24 object-cover rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
