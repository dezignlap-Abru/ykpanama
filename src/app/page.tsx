import SnapScrollPage from "@/components/SnapScrollPage";
import SnapReveal from "@/components/SnapReveal";
import ScrollReveal from "@/components/ScrollReveal";
import ApplicationForm from "@/components/ApplicationForm";
import CountdownTimer from "@/components/CountdownTimer";
import { EarlyBirdPricingBar, EarlyBirdPricingForm } from "@/components/EarlyBirdPricing";

/* ─── Reusable wave SVG shapes ─── */

function WaveTop({ color = "white", className = "" }: { color?: string; className?: string }) {
  return (
    <div className={`absolute top-0 left-0 right-0 ${className}`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-12 sm:h-20 block">
        <path fill={color} d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,58.7C960,43,1056,21,1152,16C1248,11,1344,21,1392,26.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
      </svg>
    </div>
  );
}

function WaveBottom({ color = "white", className = "" }: { color?: string; className?: string }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 ${className}`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-12 sm:h-20 block">
        <path fill={color} d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" />
      </svg>
    </div>
  );
}

function WaveBottomAlt({ color = "white", className = "" }: { color?: string; className?: string }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 ${className}`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-12 sm:h-20 block">
        <path fill={color} d="M0,96L80,80C160,64,320,32,480,26.7C640,21,800,43,960,53.3C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
      </svg>
    </div>
  );
}

/* ───────────────────────────────────────────────
   SNAP SECTION 0 — HERO
   ─────────────────────────────────────────────── */

function HeroContent() {
  return (
    <>
      {/* Video background — drop your file at public/hero-video.mp4 */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero-video.mp4"
        muted
        autoPlay
        loop
        playsInline
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-teal-800/90 to-sky-900/90" />

      {/* Animated grain texture */}
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_20%_80%,white_1px,transparent_1px),radial-gradient(circle_at_80%_20%,white_1px,transparent_1px)] bg-[length:60px_60px]" />

      {/* Beach waves at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full" preserveAspectRatio="none">
          <path fill="rgba(255,255,255,0.05)" d="M0,160L40,170.7C80,181,160,203,240,197.3C320,192,400,160,480,149.3C560,139,640,149,720,170.7C800,192,880,224,960,218.7C1040,213,1120,171,1200,154.7C1280,139,1360,149,1400,154.7L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" />
          <path fill="rgba(255,255,255,0.04)" d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,229.3C840,235,960,213,1080,186.7C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          <path fill="rgba(255,255,255,0.03)" d="M0,288L48,272C96,256,192,224,288,218.7C384,213,480,235,576,245.3C672,256,768,256,864,234.7C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      {/* Blurred tropical orbs */}
      <div className="absolute top-16 -left-24 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-32 -right-24 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-300/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <SnapReveal sectionIndex={0} preset="fadeBlur" delay={0}>
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/70 mb-3 sm:mb-6 font-medium">
            Summer 5786
          </p>
        </SnapReveal>

        <SnapReveal sectionIndex={0} preset="scaleIn" delay={0.15}>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white tracking-tight leading-[1.05] mb-3 sm:mb-6">
            Yeshivas Kayitz
            <br />
            <span className="text-white/60">Panama</span>
          </h1>
        </SnapReveal>

        <SnapReveal sectionIndex={0} preset="fadeBlur" delay={0.35}>
          <p className="text-base sm:text-xl text-white/80 max-w-2xl mx-auto mb-2 sm:mb-3 leading-relaxed">
            Three weeks of growth, adventure &amp; real connection.
          </p>
          <p className="text-sm sm:text-base text-white/50 mb-4 sm:mb-6">June 22 — July 14, 2026</p>
        </SnapReveal>

        <SnapReveal sectionIndex={0} preset="fadeUp" delay={0.45}>
          <div className="mb-4 sm:mb-8">
            <CountdownTimer />
          </div>
        </SnapReveal>

        <SnapReveal sectionIndex={0} preset="fadeUp" delay={0.5}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#apply" className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 text-base">
              Apply Now
            </a>
            <a href="#about" className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-200 text-base">
              Learn More
            </a>
          </div>
        </SnapReveal>

        <SnapReveal sectionIndex={0} preset="fadeUp" delay={0.7}>
          <div className="mt-8 sm:mt-14 flex items-center justify-center gap-2 text-xs sm:text-sm text-white/50">
            <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            Scroll to explore
          </div>
        </SnapReveal>
      </div>
    </>
  );
}

/* ───────────────────────────────────────────────
   SNAP SECTION 1 — ABOUT
   ─────────────────────────────────────────────── */

function AboutContent() {
  const highlights = [
    { label: "Daily structure", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { label: "Limited phones", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" },
    { label: "Morning workouts", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { label: "Farbrengens & hachlatos", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
    { label: "Outdoor challenges", icon: "M3 21l6-6m0 0l4-4m-4 4l-4-4m4 4l6-6m0 0l6 6M9 3l3 3m0 0l3-3" },
    { label: "Small group", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  ];

  return (
    <>
      {/* Warm sandy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100/80 via-orange-50/40 to-sky-100/50" />

      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-0 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl" />

      {/* Mountain silhouette background */}
      <div className="absolute bottom-0 left-0 right-0 opacity-[0.08]">
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="w-full h-40 sm:h-64">
          <path fill="currentColor" d="M0,400 L0,300 L120,200 L200,260 L320,120 L400,200 L500,80 L600,180 L720,40 L840,160 L920,100 L1040,220 L1160,80 L1280,200 L1360,140 L1440,240 L1440,400Z" />
        </svg>
      </div>

      {/* Wave bottom into next section */}
      <WaveBottom color="#f8fafc" />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
        <SnapReveal sectionIndex={1} preset="fadeBlur" delay={0}>
          <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-gray-400 mb-2 sm:mb-3">
            What We&apos;re About
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-6">
            Purpose. Growth. Adventure.
          </h2>
        </SnapReveal>

        <SnapReveal sectionIndex={1} preset="fadeBlur" delay={0.15}>
          <p className="text-gray-500 text-sm sm:text-lg leading-relaxed mb-4 sm:mb-8">
            A summer program in Panama for bochurim who want something real — daily
            structure, morning workouts, learning maamer V&apos;Ata Tetzave, farbrengens
            that lead to actual hachlatos, and serious outdoor adventures. No fluff,
            just a focused and meaningful few weeks.
          </p>
        </SnapReveal>

        <SnapReveal sectionIndex={1} preset="fadeUp" delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-8">
            {highlights.map((h) => (
              <span key={h.label} className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-full text-xs sm:text-sm text-gray-600 shadow-sm">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={h.icon} />
                </svg>
                {h.label}
              </span>
            ))}
          </div>
        </SnapReveal>

        <SnapReveal sectionIndex={1} preset="fadeUp" delay={0.45}>
          <p className="text-gray-400 italic text-xs sm:text-base">
            Last summer, bochurim from across the country summited Volcán Barú, island-hopped through Bocas del Toro, and tackled whitewater rapids &mdash; each one pushing past his own limits, whether that meant learning the maamer by heart, opening up at a farbrengen, or waking up early for a mountain workout.
          </p>
        </SnapReveal>
      </div>
    </>
  );
}

/* ───────────────────────────────────────────────
   SNAP SECTION 2 — THE EXPERIENCE
   ─────────────────────────────────────────────── */

function ExperienceContent() {
  const gallery = [
    { num: 1, title: "Volcan Baru Summit", detail: "11,401 ft — the highest point in Panama.", file: "summit.jpg" },
    { num: 2, title: "Bocas del Toro", detail: "Caribbean islands, snorkeling, beaches.", file: "bocas.jpg" },
    { num: 3, title: "Farbrengen Night", detail: "Real conversations. Real hachlatos.", file: "farbrengen.jpg" },
    { num: 4, title: "Adventures", detail: "Rafting, zip lining, horseback riding & more.", file: "adventure.jpg" },
  ];

  return (
    <>
      {/* Ocean-to-sand gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/70 via-cyan-50/30 to-emerald-100/50" />

      {/* Decorative orbs */}
      <div className="absolute top-10 left-0 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />

      {/* Wave top from previous section */}
      <WaveTop color="#f8fafc" />
      {/* Wave bottom into next section */}
      <WaveBottomAlt color="#f0fdfa" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        <SnapReveal sectionIndex={2} preset="fadeBlur" delay={0}>
          <div className="text-center mb-4 sm:mb-8">
            <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-gray-400 mb-2 sm:mb-3">Last Summer</p>
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">The Experience</h2>
          </div>
        </SnapReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {gallery.map((item) => (
            <SnapReveal key={item.num} sectionIndex={2} preset="scaleIn" delay={0.1 + item.num * 0.1}>
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 aspect-[3/4] group cursor-pointer">
                {/* Replace placeholder with: <Image src={`/${item.file}`} alt={item.title} fill className="object-cover" /> */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                  <span className="text-sm font-bold text-gray-900">{item.num}</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 pt-12">
                  <h3 className="text-white font-semibold text-base mb-0.5">{item.title}</h3>
                  <p className="text-white/70 text-xs leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </SnapReveal>
          ))}
        </div>
      </div>
    </>
  );
}

/* ───────────────────────────────────────────────
   SNAP SECTION 3 — JOURNEY + PRICING
   ─────────────────────────────────────────────── */

function JourneyPricingContent() {
  const locations = [
    { name: "Boquete", tag: "Home Base", description: "Mountains, coffee farms, cloud forest, hot springs.", icon: "M3 21l6-6m0 0l4-4m-4 4l-4-4m4 4l6-6m0 0l6 6M9 3l3 3m0 0l3-3" },
    { name: "Bocas del Toro", tag: "3-Day Trip", description: "Caribbean islands, snorkeling, beaches.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { name: "Panama City", tag: "Day Trip", description: "Casco Viejo, Panama Canal.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  ];

  return (
    <>
      {/* Tropical teal gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-100/70 via-emerald-50/40 to-sky-100/50" />

      {/* Decorative orbs */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-teal-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-0 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl" />

      {/* Mountain silhouette */}
      <div className="absolute bottom-0 left-0 right-0 opacity-[0.07]">
        <svg viewBox="0 0 1440 350" preserveAspectRatio="none" className="w-full h-32 sm:h-48">
          <path fill="currentColor" d="M0,350 L0,280 L100,200 L180,240 L300,100 L420,200 L540,60 L660,180 L780,80 L900,200 L1020,120 L1140,220 L1260,140 L1360,200 L1440,160 L1440,350Z" />
        </svg>
      </div>

      {/* Wave top */}
      <WaveTop color="#f0fdfa" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        <SnapReveal sectionIndex={3} preset="fadeBlur" delay={0}>
          <div className="text-center mb-4 sm:mb-8">
            <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-gray-400 mb-2 sm:mb-3">The Journey</p>
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">Where We Go</h2>
          </div>
        </SnapReveal>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-10">
          {locations.map((loc, i) => (
            <SnapReveal key={loc.name} sectionIndex={3} preset={i === 0 ? "slideRight" : i === 2 ? "slideLeft" : "scaleIn"} delay={0.12 + i * 0.12}>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 h-full">
                <div className="h-20 sm:h-28 bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center relative">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={loc.icon} />
                  </svg>
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/90 backdrop-blur-sm text-[9px] sm:text-[11px] font-medium text-gray-600 px-1.5 py-0.5 rounded-full">{loc.tag}</span>
                </div>
                <div className="p-2.5 sm:p-4">
                  <h3 className="font-semibold text-gray-900 text-xs sm:text-base mb-0.5 sm:mb-1">{loc.name}</h3>
                  <p className="text-[10px] sm:text-sm text-gray-500 leading-tight sm:leading-relaxed">{loc.description}</p>
                </div>
              </div>
            </SnapReveal>
          ))}
        </div>

        <SnapReveal sectionIndex={3} preset="fadeUp" delay={0.5}>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-center sm:text-left">
              <div>
                <p className="text-[10px] sm:text-xs tracking-[0.15em] uppercase text-gray-400 mb-0.5 sm:mb-1">Dates</p>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">June 22 – July 14, 2026</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-gray-200" />
              <EarlyBirdPricingBar />
              <a href="#apply" className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all text-xs sm:text-sm shrink-0">
                Apply Now
              </a>
            </div>
          </div>
        </SnapReveal>
      </div>
    </>
  );
}

/* ───────────────────────────────────────────────
   NORMAL SCROLL SECTIONS
   ─────────────────────────────────────────────── */

function ApplicationSection() {
  return (
    <section id="apply" className="relative py-16 sm:py-24 px-6">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/60 via-white to-teal-50/40" />

      {/* Decorative orbs */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-sm tracking-[0.2em] uppercase text-gray-400 mb-3">Join Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Apply Now</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Fill this out and we&apos;ll get back to you within a few days.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm">
            <ApplicationForm />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Ocean gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-teal-900 to-emerald-900" />

      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-12 sm:h-20 block">
          <path fill="#f8fafc" d="M0,64L80,58.7C160,53,320,43,480,53.3C640,64,800,96,960,96C1120,96,1280,64,1360,48L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
        </svg>
      </div>

      {/* Blurred orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-sm tracking-[0.2em] uppercase text-white/50 mb-3">Get in Touch</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Contact Us</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
            <a href="mailto:chabadboquete@gmail.com" className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-200 group flex-1">
              <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <div className="text-left">
                <p className="text-xs text-white/40">Email</p>
                <p className="text-sm text-white font-medium">chabadboquete@gmail.com</p>
              </div>
            </a>
            <a href="https://wa.me/50762430666" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-200 group flex-1">
              <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <div className="text-left">
                <p className="text-xs text-white/40">WhatsApp</p>
                <p className="text-sm text-white font-medium">+507 6243 0666</p>
              </div>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-6 bg-slate-900 border-t border-white/10">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-white/40">
          &copy; {new Date().getFullYear()} Yeshivas Kayitz Panama. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ───────────────────────────────────────────────
   PAGE EXPORT
   ─────────────────────────────────────────────── */

export default function Home() {
  return (
    <SnapScrollPage
      snapSections={[
        <HeroContent key="hero" />,
        <AboutContent key="about" />,
        <ExperienceContent key="experience" />,
        <JourneyPricingContent key="journey" />,
      ]}
      normalSections={[
        <ApplicationSection key="apply" />,
        <ContactSection key="contact" />,
        <Footer key="footer" />,
      ]}
      sectionIds={["", "about", "experience", "journey"]}
    />
  );
}
