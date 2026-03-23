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
      // LLAMADA CRÍTICA: Asegúrate de que esta ruta sea /api/buscar
      const res = await fetch(`/api/buscar?id=${busqueda.trim()}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al consultar el reporte');
      
      setResultado(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50">
      {/* Fondo con los colores de la empresa Caribe Cargo */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#1B365D]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16">
        <h1 className="text-3xl font-bold text-[#1B365D] text-center mb-8">Portal de Reportes de Seguridad</h1>
        
        {/* Input de Búsqueda */}
        <div className="flex gap-2 mb-10 shadow-lg p-2 bg-white rounded-xl border border-slate-200">
          <input 
            type="text" 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Ej: PUJ-220320261833" 
            className="flex-grow px-4 py-3 outline-none rounded-lg text-lg"
          />
          <button 
            onClick={manejarBusqueda}
            disabled={cargando}
            className="bg-[#1B365D] text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-900 disabled:opacity-50 transition-colors"
          >
            {cargando ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {/* Visualización de Errores */}
        {error && (
          <div className="p-4 mb-8 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        {/* Resultados de Airtable */}
        {resultado && (
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h2 className="text-xl font-bold text-[#1B365D]">Detalles del Caso</h2>
              <span className="px-4 py-1 bg-blue-50 text-[#1B365D] rounded-full text-xs font-black uppercase">
                {resultado['Estado Inbox'] || 'Recibido'}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p><strong className="text-slate-400 text-xs uppercase block tracking-widest">ID Reporte:</strong> {resultado['ID del reporte']}</p>
                <p><strong className="text-slate-400 text-xs uppercase block tracking-widest">Fecha:</strong> {resultado['Fecha de ingreso del reporte']}</p>
                <p><strong className="text-slate-400 text-xs uppercase block tracking-widest">Descripción:</strong> <span className="italic">"{resultado['Descripción del Suceso']}"</span></p>
              </div>

              {/* Galería de Evidencias */}
              <div>
                <strong className="text-slate-400 text-xs uppercase block tracking-widest mb-3">Evidencias:</strong>
                <div className="grid grid-cols-2 gap-2">
                  {resultado['Evidencias']?.map((foto: any, index: number) => (
                    <img key={index} src={foto.url} className="w-full h-24 object-cover rounded-lg border border-slate-100 shadow-sm" alt="Evidencia" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
