'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function CreatoriPage() {
  const t = useTranslations('Creators');

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-orange-100 flex items-center justify-center p-8">
      <div className="max-w-4xl bg-white rounded-3xl shadow-2xl p-12">
        <Link
          href="/"
          className="inline-block mb-8 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full transition-colors"
        >
          {t('back')}
        </Link>

        <h1 className="text-5xl font-bold text-amber-800 mb-8 text-center">
          👥 {t('title')}
        </h1>

        <div className="space-y-8">
          <p className="text-center text-xl text-gray-700 leading-relaxed">
            {t.rich('intro', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Creator 1 */}
            <div className="bg-amber-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4 text-center">👨‍💻</div>
              <h3 className="text-2xl font-bold text-amber-800 text-center mb-2">
                {t('creator1Name')}
              </h3>
              <p className="text-center text-amber-700 font-semibold mb-4">
                {t('creator1Role')}
              </p>
              <p className="text-gray-700 text-center">
                {t('creator1Desc')}
              </p>
            </div>

            {/* Creator 2 */}
            <div className="bg-orange-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4 text-center">👩‍🏫</div>
              <h3 className="text-2xl font-bold text-orange-800 text-center mb-2">
                {t('creator2Name')}
              </h3>
              <p className="text-center text-orange-700 font-semibold mb-4">
                {t('creator2Role')}
              </p>
              <p className="text-gray-700 text-center">
                {t('creator2Desc')}
              </p>
            </div>

            {/* Creator 3 */}
            <div className="bg-yellow-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4 text-center">🎨</div>
              <h3 className="text-2xl font-bold text-yellow-800 text-center mb-2">
                {t('creator3Name')}
              </h3>
              <p className="text-center text-yellow-700 font-semibold mb-4">
                {t('creator3Role')}
              </p>
              <p className="text-gray-700 text-center">
                {t('creator3Desc')}
              </p>
            </div>

            {/* Creator 4 */}
            <div className="bg-red-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4 text-center">📚</div>
              <h3 className="text-2xl font-bold text-red-800 text-center mb-2">
                {t('creator4Name')}
              </h3>
              <p className="text-center text-red-700 font-semibold mb-4">
                {t('creator4Role')}
              </p>
              <p className="text-gray-700 text-center">
                {t('creator4Desc')}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-8 rounded-xl text-center mt-8">
            <p className="text-lg text-gray-800 font-semibold mb-2">
              💡 {t('missionTitle')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('missionText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
