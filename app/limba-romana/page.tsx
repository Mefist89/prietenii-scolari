import Link from 'next/link';

export default function LimbaRomanaPage() {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-8">
      <div className="text-center">
        <Link
          href="/"
          className="inline-block mb-8 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full transition-colors"
        >
          ← Înapoi
        </Link>
        <h1 className="text-4xl font-bold text-orange-800 mb-4">
          🦊 Limba Română cu Vulpița
        </h1>
        <p className="text-xl text-orange-700">
          Bine ai venit la lecțiile de limba română!
        </p>
      </div>
    </div>
  );
}