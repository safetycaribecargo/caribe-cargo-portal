'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  // ESTADO PARA CONTROLAR LA EXPANSIÓN DE DETALLES (Se usará más adelante)
  const [mostrarMas, setMostrarMas] = useState(false);

  // Función para dar formato amigable a la fecha
  const formatearFecha = (fechaRaw: string) => {
    if (!fechaRaw) return 'Fecha no disponible';
    
    const fecha = new Date(fechaRaw);
    
    // Formato: 22 de marzo de 2026
    const opcionesFecha: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
    
    // Formato: 18:45 (24 horas)
    const opcionesHora: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
  
    const fechaLegible = fecha.toLocaleDateString('es-ES', opcionesFecha);
    const horaLegible = fecha.toLocaleTimeString('es-ES', opcionesHora);
  
    return `${fechaLegible}, ${horaLegible}`;
  };
  
  const manejarBusqueda = async () => {
    if (!busqueda) return;
    setCargando(true);
    setError('');
    setResultado(null);
    setMostrarMas(false); // Resetear la vista expandida en cada búsqueda

    try {
      // Llamada a tu API existente (/api/buscar)
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
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-20">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-[#1B365D] dark:text-blue-400 mb-4 tracking-tighter">Portal de Reportes de Seguridad</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Consulta de estatus</p>
        </div>

        {/* BUSCADOR */}
        <div className="flex mb-10 shadow-2xl rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2">
          <input 
            type="text" 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && manejarBusqueda()}
            placeholder="Ej: PUJ-220320261845" 
            className="flex-grow px-6 py-4 outline-none bg-transparent text-slate-700 dark:text-slate-200 text-lg"
          />
          <button 
            onClick={manejarBusqueda}
            disabled={cargando}
            className="bg-[#1B365D] dark:bg-blue-600 text-white px-10 py-4 font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
          >
            {cargando ? '...' : 'Buscar'}
          </button>
        </div>
        
        {/* BANNER DE MANTENIMIENTO REUPERADO */}
        <div className="mb-10 flex items-start gap-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-2xl shadow-sm animate-pulse">
          <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-900/50 p-2 rounded-lg">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
  <div>
    <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide">Portal en Optimización</h4>
    <p className="text-sm text-amber-700 dark:text-amber-400/80 mt-1">
      Estamos realizando mejoras técnicas en nuestra base de datos. Es posible que algunos detalles o evidencias no se muestren temporalmente.
    </p>
  </div>
</div>
        
        {error && (
          <div className="p-4 mb-8 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-2xl text-center font-medium animate-pulse">
            ⚠️ {error}
          </div>
        )}

        {/* CARD DE RESULTADOS PRINCIPALES */}
        {resultado && (
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="flex justify-between items-center mb-8 border-b dark:border-slate-800 pb-6 gap-4 flex-wrap">
              <div>
                <h3 className="text-2xl font-black text-[#1B365D] dark:text-blue-400">Detalles del Reporte</h3>
                <p className="text-slate-400 font-mono text-sm tracking-tight">{resultado['ID del reporte']}</p>
              </div>
              <span className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest ${resultado['Estado Inbox'] === 'Resuelto' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-blue-100 dark:bg-blue-900/40 text-[#1B365D] dark:text-blue-300'}`}>
                {resultado['Estado Inbox'] || 'Clasificado'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                
                {/* SECCIÓN DE FECHA FORMATEADA */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                    Fecha de Ingreso del Reporte
                  </label>
                  <p className="text-slate-800 dark:text-slate-200 font-bold">
                    {formatearFecha(resultado['Fecha de ingreso del reporte (Sistema)'])}
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Ubicación</label>
                  <p className="text-slate-800 dark:text-slate-200 font-bold">{resultado['Estación']} - {resultado['Area de Suceso']}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Descripción</label>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic mt-1 font-medium">
                    {resultado['Descripcion del Suceso'] || 'Sin descripción detallada.'}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Evidencias Adjuntas</label>
                <div className="grid grid-cols-2 gap-3">
                  {resultado['Evidencias']?.map((img: any, i: number) => (
                    <a key={i} href={img.url} target="_blank" rel="noreferrer" className="block relative aspect-video rounded-xl overflow-hidden border dark:border-slate-800 group shadow-sm">
                      <img src={img.url} alt="Evidencia" className="object-cover w-full h-full transition-transform group-hover:scale-110" />
                    </a>
                  )) || <p className="text-slate-400 text-xs italic col-span-2 text-center py-6 bg-slate-100 dark:bg-slate-800/50 rounded-xl">No hay evidencias cargadas.</p>}
                </div>
              </div>
            </div>

            {/* 2. NUEVA SECCIÓN: BOTÓN VER MÁS DETALLES */}
            <div className="mt-12 pt-8 border-t dark:border-slate-800 flex justify-center">
              <button 
                onClick={() => setMostrarMas(!mostrarMas)}
                className="flex items-center gap-3 px-8 py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-[#1B365D] dark:text-blue-300 font-black rounded-2xl shadow-sm hover:shadow-lg transition-all hover:border-brandBlue/30 hover:scale-105 active:scale-95 group"
              >
                {mostrarMas ? 'Ver menos detalles' : 'Ver más detalles'}
                
                {/* Icono de Flecha animada (se voltea si mostrarMas es true) */}
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${mostrarMas ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* ESPACIO PARA LOS DETALLES CONFIDENCIALES (Se llenará más adelante) */}
            {mostrarMas && (
              <div className="mt-8 p-6 bg-slate-100/50 dark:bg-slate-950/50 rounded-2xl border dark:border-slate-800 animate-in fade-in duration-300">
                <p className="text-slate-500 dark:text-slate-400 text-sm text-center italic">
                  Detalles no dispibles temporalmente.
                </p>
              </div>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
}
