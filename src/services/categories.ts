export async function getCategoriesV3(query: string = ""): Promise<string[]> {
  // El dominio world.openfoodfacts.org es el estándar
  const baseUrl = "https://world.openfoodfacts.org/api/v3/taxonomy_suggestions";

  // Parámetros obligatorios en v3:
  // tagtype: qué tipo de datos queremos (categories)
  // lc: código de idioma (es para español)
  // string: el término de búsqueda
  const params = new URLSearchParams({
    tagtype: "categories",
    lc: "es",
    string: query,
    limit: "20",
  });
  // tagtype=categories&lc=es&string={query}&limit=20

  const response = await fetch(`${baseUrl}?${params.toString()}`, {
    headers: {
      "User-Agent": "UNTDF TNT 2026", // OFF
    },
  });

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  const data = await response.json();
  return data.suggestions as string[];
}
