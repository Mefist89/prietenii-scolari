import Link from 'next/link';

export default function ContactePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-cyan-100 flex items-center justify-center p-8">
      <div className="max-w-3xl bg-white rounded-3xl shadow-2xl p-12">
        <Link
          href="/"
          className="inline-block mb-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
        >
          ← Înapoi
        </Link>

        <h1 className="text-5xl font-bold text-blue-800 mb-8 text-center">
          ✉️ Contacte
        </h1>

        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <p className="text-center text-xl">
            Ai întrebări sau sugestii? Ne-ar plăcea să auzim de la tine!
          </p>

          <div className="bg-blue-50 p-8 rounded-xl space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">📧</div>
              <div>
                <h3 className="font-bold text-xl text-blue-800 mb-2">Email</h3>
                <p className="text-gray-700">contact@prietenii-scolari.ro</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-4xl">📱</div>
              <div>
                <h3 className="font-bold text-xl text-blue-800 mb-2">Telefon</h3>
                <p className="text-gray-700">+40 123 456 789</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-4xl">🏢</div>
              <div>
                <h3 className="font-bold text-xl text-blue-800 mb-2">Adresă</h3>
                <p className="text-gray-700">
                  Str. Educației nr. 123<br />
                  București, România
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-4xl">⏰</div>
              <div>
                <h3 className="font-bold text-xl text-blue-800 mb-2">Program</h3>
                <p className="text-gray-700">
                  Luni - Vineri: 09:00 - 17:00<br />
                  Sâmbătă - Duminică: Închis
                </p>
              </div>
            </div>
          </div>

          <div className="bg-cyan-50 p-6 rounded-xl text-center">
            <p className="font-semibold text-cyan-800">
              Răspundem de obicei în maxim 24 de ore! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
