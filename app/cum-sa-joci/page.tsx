import Link from 'next/link';

export default function CumSaJociPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex items-center justify-center p-8">
      <div className="max-w-3xl bg-white rounded-3xl shadow-2xl p-12">
        <Link
          href="/"
          className="inline-block mb-8 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full transition-colors"
        >
          ← Înapoi
        </Link>

        <h1 className="text-5xl font-bold text-purple-800 mb-8 text-center">
          📖 Cum să joci
        </h1>

        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <p>
            Bine ai venit la <strong>Prietenii Școlari</strong>! Acest joc educativ te ajută să înveți diferite materii într-un mod distractiv.
          </p>

          <div className="bg-purple-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">🎯 Cum funcționează:</h2>
            <ol className="list-decimal list-inside space-y-3">
              <li>Alege materia ta preferată de pe pagina principală</li>
              <li>Întâlnește personajul tău ghid (Juja, Iepurașul sau Vulpița)</li>
              <li>Rezolvă exercițiile și răspunde la întrebări</li>
              <li>Acumulează puncte și învață lucruri noi!</li>
            </ol>
          </div>

          <div className="bg-pink-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-pink-800 mb-4">✨ Sfaturi utile:</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Ia-ți timpul să citești fiecare întrebare cu atenție</li>
              <li>Nu te teme să greșești - învățăm din greșeli!</li>
              <li>Încearcă să joci zilnic pentru a-ți îmbunătăți abilitățile</li>
              <li>Distrează-te și bucură-te de învățare!</li>
            </ul>
          </div>

          <p className="text-center text-xl font-semibold text-purple-800 mt-8">
            Mult succes și distracție plăcută! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}
