'use client'; // <-- ESTA LÍNEA ES VITAL. Debe ser la primera.

import { useState } from 'react';

export default function Home() {
  // 1. Aquí van los "Estados" (la memoria de la página)
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  // 2. Aquí va la función "manejarBusqueda" (la lógica que llama a la API)
  const manejarBusqueda = async () => {
    // ... código de la función ...
  };

  // 3. Aquí va el "return" (lo que se ve en pantalla: el HTML)
  return (
    <div className="max-w-3xl mx-auto px-4 pt-20">
      {/* El Buscador, el mensaje de Error y los Resultados */}
    </div>
  );
}
