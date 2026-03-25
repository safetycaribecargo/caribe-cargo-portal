import { NextResponse } from 'next/server';

// 1. FORZAR MODO DINÁMICO: Esto evita que Vercel guarde una copia estática de la API.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME;

  // 2. MEJORA EN LA URL: Usamos encodeURIComponent para que el ID se envíe correctamente 
  // aunque tenga espacios o caracteres especiales.
  const formula = encodeURIComponent(`{ID del reporte}='${id}'`);
  const url = `https://api.airtable.com/v0/${baseId}/${table}?filterByFormula=${formula}`;

  try {
    const res = await fetch(url, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-store, max-age=0' // Refuerzo de limpieza de caché
      },
      next: { revalidate: 0 }
    });

    const data = await res.json();

    if (!data.records || data.records.length === 0) {
      return NextResponse.json({ error: 'Reporte no encontrado' }, { status: 404 });
    }

    // Retornamos los campos del primer registro encontrado
    return NextResponse.json(data.records[0].fields);
  } catch (error) {
    return NextResponse.json({ error: 'Error de conexión con Airtable' }, { status: 500 });
  }
}
