import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { endpoint } = await request.json();
    
    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint manquant' },
        { status: 400 }
      );
    }
    
    console.log('📱 Désabonnement des notifications:', endpoint);
    
    // En production, vous devriez :
    // 1. Supprimer l'endpoint de la base de données
    // 2. Marquer comme inactif
    
    // Ici, vous pourriez supprimer de la base de données
    // await removeSubscription(endpoint);
    
    return NextResponse.json({
      success: true,
      message: 'Désabonnement réussi'
    });
    
  } catch (error) {
    console.error('Erreur lors du désabonnement:', error);
    return NextResponse.json(
      { error: 'Erreur lors du désabonnement' },
      { status: 500 }
    );
  }
}
