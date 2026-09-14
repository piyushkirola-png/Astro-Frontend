import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle, Sparkles } from "lucide-react";
import PageHero from "../../components/ui/PageHero";
import SectionHeading from "../../components/ui/SectionHeading";
import Reveal from "../../components/animations/Reveal";
import { usePublicHoroscopeHub } from "../../api/queries/usePublicHoroscope";

export type PublicHoroscopePeriod =
  | "today"
  | "tomorrow"
  | "yesterday"
  | "weekly"
  | "monthly"
  | "yearly";

const PLANETARY_MOVEMENTS_TEXT =
  "Different planets and their transits influence the day's energies and themes. If you want to know your emotional strengths and weaknesses, look for the Moon transit. Your love and married life will be impacted by the movement of Venus across different zodiac signs. Likewise, Jupiter will shape your prosperity, finances and growth, while the Sun and Mercury can impact areas related to your career, profession, and communication. Our expert astrologers carefully analyse these celestial movements to prepare your horoscope and provide meaningful astrological insights. Read now to know what these planets have in store for you!";

interface Props {
  period: PublicHoroscopePeriod;
  urlSlug?: string;
  badge: string;
  title: React.ReactNode;
  subtitle: string;
}

export default function PublicHoroscopeHub({
  period,
  urlSlug,
  badge,
  title,
  subtitle,
}: Props) {
  const slug = urlSlug ?? period;
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = usePublicHoroscopeHub(period);

  return (
    <>
      <PageHero badge={badge} title={title} subtitle={subtitle} />

      {/* Choose your sign */}
      <section className="section-pad bg-white">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Choose Your Sign"
              title="Pick Your Zodiac"
              subtitle="Read the prediction for all 12 zodiac signs."
            />
          </Reveal>

          {isLoading && (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
            </div>
          )}

          {isError && (
            <div className="bg-white rounded-2xl border border-ink-100 p-10 text-center max-w-md mx-auto mt-12">
              <AlertCircle className="h-7 w-7 text-danger-500 mx-auto mb-3" />
              <p className="text-sm text-ink-700 mb-3">
                Failed to load horoscope signs
              </p>
              <button
                onClick={() => refetch()}
                className="rounded-lg px-4 py-2 border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50"
              >
                Retry
              </button>
            </div>
          )}

          {data && data.length > 0 && (
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data.map((sign, i) => (
                <Reveal key={sign.zodiac} delay={i * 0.04}>
                  <button
                    onClick={() =>
                      navigate(
                        `/horoscope/${slug}-horoscope/${sign.zodiac.toLowerCase()}`,
                      )
                    }
                    className="group w-full bg-white rounded-2xl p-4 border border-ink-100 hover:border-accent-300 hover:shadow-lg transition-all text-center"
                  >
                    <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                      {sign.symbolEmoji}
                    </div>
                    <h3 className="text-sm font-bold text-ink-900 capitalize">
                      {sign.zodiac.charAt(0) +
                        sign.zodiac.slice(1).toLowerCase()}
                    </h3>
                    <p className="text-[11px] text-ink-500 mt-0.5">
                      {sign.dateRange}
                    </p>
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Planetary movements */}
      <section className="section-pad bg-ink-50">
        <div className="container-8xl">
          <Reveal>
            <SectionHeading
              badge="Cosmic Insights"
              title="Planetary Movements"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 max-w-4xl mx-auto bg-white rounded-2xl border border-ink-100 p-8 lg:p-10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 shrink-0">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm lg:text-base text-ink-600 leading-relaxed">
                  {PLANETARY_MOVEMENTS_TEXT}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}