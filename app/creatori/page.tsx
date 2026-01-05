import Link from 'next/link';

export default function CreatoriPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-orange-100 flex items-center justify-center p-8">
      <div className="max-w-4xl bg-white rounded-3xl shadow-2xl p-12">
        <Link
          href="/"
          className="inline-block mb-8 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full transition-colors"
        >
          ← Înapoi
        </Link>

        <h1 className="text-5xl font-bold text-amber-800 mb-8 text-center">
          👥 Creatori
        </h1>

        <div className="space-y-8">
          <p className="text-center text-xl text-gray-700 leading-relaxed">
            <strong>Prietenii Școlari</strong> a fost creat cu pasiune pentru educație și tehnologie de o echipă dedicată.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Creator 1 */}
            <div className="bg-amber-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4 text-center">👨‍💻</div>
              <h3 className="text-2xl font-bold text-amber-800 text-center mb-2">
                Ion Popescu
              </h3>
              <p className="text-center text-amber-700 font-semibold mb-4">
                Dezvoltator Principal
              </p>
              <p className="text-gray-700 text-center">
                Pasionat de tehnologie și educație, cu experiență în dezvoltarea aplicațiilor web interactive.
              </p>
            </div>

            {/* Creator 2 */}
            <div className="bg-orange-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4 text-center">👩‍🏫</div>
              <h3 className="text-2xl font-bold text-orange-800 text-center mb-2">
                Maria Ionescu
              </h3>
              <p className="text-center text-orange-700 font-semibold mb-4">
                Designer Educațional
              </p>
              <p className="text-gray-700 text-center">
                Profesor cu 10 ani de experiență, specializată în metode de învățare interactive pentru copii.
              </p>
            </div>

            {/* Creator 3 */}
            <div className="bg-yellow-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4 text-center">🎨</div>
              <h3 className="text-2xl font-bold text-yellow-800 text-center mb-2">
                Ana Georgescu
              </h3>
              <p className="text-center text-yellow-700 font-semibold mb-4">
                Designer Grafic
              </p>
              <p className="text-gray-700 text-center">
                Creatoare de personaje și ilustrații care fac învățarea mai colorată și mai distractivă.
              </p>
            </div>

            {/* Creator 4 */}
            <div className="bg-red-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4 text-center">📚</div>
              <h3 className="text-2xl font-bold text-red-800 text-center mb-2">
                Mihai Dumitrescu
              </h3>
              <p className="text-center text-red-700 font-semibold mb-4">
                Creator de Conținut
              </p>
              <p className="text-gray-700 text-center">
                Specialist în crearea de exerciții educaționale captivante și adaptate vârstei copiilor.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-8 rounded-xl text-center mt-8">
            <p className="text-lg text-gray-800 font-semibold mb-2">
              💡 Misiunea noastră
            </p>
            <p className="text-gray-700 leading-relaxed">
              Să facem educația accesibilă, distractivă și eficientă pentru toți copiii, transformând învățarea într-o aventură plăcută alături de prietenii lor școlari: Juja, Iepurașul și Vulpița!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
