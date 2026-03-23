import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME;

  // Filtro con el nombre exacto de tu columna
  const url = `https://api.airtable.com/v0/${baseId}/${table}?filterByFormula=({ID del reporte}='${id}')`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store'
    });

    const data = await res.json();

    if (!data.records || data.records.length === 0) {
      return NextResponse.json({ error: 'No se encontró el reporte' }, { status: 404 });
    }

    return NextResponse.json(data.records[0].fields);
  } catch (error) {
    return NextResponse.json({ error: 'Error de conexión' }, { status: 500 });
  }
}
