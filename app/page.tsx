export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-20 pb-10 flex flex-col items-center">
      
      {/* Títulos */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        Portal de Reportes de Seguridad
      </h1>
      <p className="text-gray-600 mb-10 text-center text-lg">
        Busca el estado y detalles de tu reporte de seguridad ingresando el ID asignado.
      </p>

      {/* Barra de Búsqueda */}
      <div className="w-full flex max-w-2xl mb-12 shadow-sm">
        <input 
          type="text" 
          placeholder="Ej: SDQ-281120251142" 
          className="flex-grow px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brandBlue focus:border-transparent text-gray-700"
        />
        <button className="bg-brandBlue text-white px-8 py-3 rounded-r-md font-semibold hover:bg-blue-900 transition-colors">
          Buscar
        </button>
      </div>

      {/* Tarjeta de Instrucciones */}
      <div className="w-full max-w-2xl border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          ¿Cómo funciona?
        </h2>
        
        <ul className="space-y-5 text-gray-700">
          <li className="flex gap-3">
            <span className="font-bold text-brandBlue">1.</span>
            <span>Ingresa tu ID de reporte en el formato: <code className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm font-mono border border-gray-200">SDQ-281120251142</code></span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-brandBlue">2.</span>
            <span>Visualiza los detalles básicos del reporte y todas las evidencias adjuntas</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-brandBlue">3.</span>
            <span>Para acceder a la investigación completa, utiliza el acceso privado con tu contraseña</span>
          </li>
        </ul>
      </div>

    </div>
  );
}
