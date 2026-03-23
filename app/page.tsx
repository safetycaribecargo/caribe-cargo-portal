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
      // Llamamos a la API que creamos (asegúrate de que el archivo app/api/buscar/route.ts exista)
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
    <div className="relative min-h-screen">
      {/* FONDO DIFUMINADO ATRACTIVO */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#1B365D]/10 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#3D6FB6]/10 blur-[80px]" />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-16 pb-20">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#1B365D] mb-4">
            Portal de Reportes de Seguridad
          </h1>
          <p className="text-slate-600 text-lg">
            Busca el estado y detalles de tu reporte ingresando el ID asignado.
          </p>
        </div>

        {/* BARRA DE BÚSQUEDA */}
        <div className="flex mb-10 shadow-xl rounded-lg overflow-hidden border border-slate-200 bg-white">
          <input 
            type="text" 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && manejarBusqueda()}
            placeholder="Ej: SDQ-281120251142" 
            className="flex-grow px-6 py-4 outline-none text-slate-700 text-lg"
          />
          <button 
            onClick={manejarBusqueda}
            disabled={cargando}
            className="bg-[#1B365D] text-white px-10 py-4 font-bold hover:bg-[#132846] transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {cargando ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {/* MENSAJE DE ERROR */}
        {error && (
          <div className="p-4 mb-8 bg-red-50 text-red-700 border border-red-200 rounded-xl text-center animate-pulse">
            ⚠️ {error}
          </div>
        )}

        {/* RESULTADOS DE AIRTABLE */}
        {resultado && (
          <div className="p-8 border border-slate-200 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl mb-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h3 className="text-2xl font-bold text-[#1B365D]">Detalles del Reporte</h3>
              <span className="px-4 py-1 bg-blue-100 text-[#1B365D] rounded-full text-sm font-bold uppercase">
                {resultado.Estado || 'Procesando'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">ID Reporte</label>
                <p className="text-lg font-semibold text-slate-800">{resultado.ID_Reporte}</p>
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Fecha de Registro</label>
                <p className="text-lg font-semibold text-slate-800">{resultado.Fecha || 'No registrada'}</p>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Descripción del Suceso</label>
                <p className="text-slate-700 leading-relaxed mt-1">
                  {resultado.Descripcion || 'Sin descripción adicional en el sistema.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TARJETA INFORMATIVA */}
        {!resultado && !error && (
          <div className="w-full border border-slate-200 rounded-2xl p-8 bg-white/50 backdrop-blur-sm shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-[#1B365D] rounded-full"></span>
              ¿Cómo funciona?
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#1B365D] text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <p className="text-slate-600">Ingresa tu ID de reporte en el formato: <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">SDQ-281120251142</code></p>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#1B365D] text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <p className="text-slate-600">Nuestro sistema conectará con la base de datos de <strong>Airtable</strong> para verificar el estatus actual.</p>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#1B365D] text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <p className="text-slate-600">Para detalles confidenciales o investigación completa, usa tu acceso privado.</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
