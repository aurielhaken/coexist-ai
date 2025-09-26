import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query, maxResults = 4 } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Pour l'instant, retourner des résultats simulés
    // Dans une vraie implémentation, vous utiliseriez une API de recherche comme Google Search API
    const mockResults = [
      {
        title: `Résultats pour "${query}"`,
        url: 'https://example.com/search',
        snippet: 'Informations récentes et vérifiées sur le sujet recherché.'
      },
      {
        title: `Actualités: ${query}`,
        url: 'https://news.example.com',
        snippet: 'Dernières actualités et développements récents.'
      },
      {
        title: `Guide complet: ${query}`,
        url: 'https://guide.example.com',
        snippet: 'Informations détaillées et guides pratiques.'
      },
      {
        title: `Ressources officielles: ${query}`,
        url: 'https://official.example.com',
        snippet: 'Sources officielles et documents de référence.'
      }
    ];

    return NextResponse.json({
      results: mockResults.slice(0, maxResults),
      query,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
