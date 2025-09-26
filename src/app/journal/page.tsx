import PeaceJournal from '@/components/PeaceJournal';
import PeacefulParticles from '@/components/PeacefulParticles';

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-orange-50 dark:from-gray-900 dark:via-blue-900 dark:to-green-900 relative overflow-hidden">
      {/* Particules paisibles en arrière-plan */}
      <PeacefulParticles />
      
      {/* Contenu principal */}
      <div className="relative z-10 pt-8">
        <PeaceJournal />
      </div>
    </div>
  );
}
