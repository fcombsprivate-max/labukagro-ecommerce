import React from 'react';
import { LEADERSHIP_TEAM, PILLARS } from '../data/products';
import { CheckCircle2, Factory, MapPin } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white border-b border-[#e5e1d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-5">
            <h2 
              style={{ textWrap: 'balance' }}
              className="text-3xl sm:text-4xl font-extrabold text-[#143224] tracking-tight leading-tight"
            >
              Commercial Agro-Processing at Technology Incubation Centre
            </h2>

            <p className="text-base text-stone-700 leading-relaxed font-normal">
              At <strong className="text-stone-900 font-semibold">Labuk Agro Ltd</strong>, we advance Nigerian agriculture through sustainable agro-production, certified cold-press processing, outgrower coordination, and regional commodity distribution.
            </p>

            <p className="text-base text-stone-700 leading-relaxed font-normal">
              Operating out of <strong className="text-stone-900 font-semibold">Unit 22, Technology Incubation Center (TIC), Ajilosun Ikere Road, Ado Ekiti</strong>, we produce NAFDAC-certified cold-pressed castor oils (edible and topical grades), virgin neem essential oil, raw forest honey, and destoned staple grains that supply both domestic food manufacturers and regional West African markets.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 text-xs font-semibold text-stone-900">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#faf9f5] border border-[#e5e1d5]">
                <MapPin className="w-4 h-4 text-[#2d6a4f] shrink-0" strokeWidth={1.75} />
                <span>Unit 22, TIC, Ado-Ekiti, Ekiti State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#faf9f5] border border-[#e5e1d5]">
                <Factory className="w-4 h-4 text-[#2d6a4f] shrink-0" strokeWidth={1.75} />
                <span>Certified Cold-Press Extraction Plant</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase: Real Farm & Crop Photography */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#e5e1d5] bg-[#f7f5ef] aspect-4/5">
                <img 
                  src="/images/IMG-20261106-WA0036.jpg" 
                  alt="Labuk Agro CEO Omolara Bukola inspecting castor crop in Ekiti" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#e5e1d5] bg-[#f7f5ef] aspect-4/5">
                <img 
                  src="/images/IMG-20261106-WA0043.jpg" 
                  alt="High Yield Castor Plants on Labuk Agro plantation" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Executive Leadership Section */}
        <div className="mt-16 pt-16 border-t border-[#f1efe7]">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 
              style={{ textWrap: 'balance' }}
              className="text-2xl sm:text-3xl font-extrabold text-[#143224]"
            >
              Executive Leadership & Governance
            </h3>
            <p className="text-sm text-stone-600 font-normal">
              Directing Labuk Agro Ltd with agronomic experience, industrial quality control, and commitment to Nigerian agribusiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Woman: Founder & CEO (Omolara Bukola) */}
            <div className="bg-[#faf9f5] rounded-3xl p-6 sm:p-8 border border-[#e5e1d5] flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5 text-center sm:text-left">
                  <div className="w-28 h-36 rounded-xl overflow-hidden shrink-0 border border-[#e5e1d5] shadow-xs">
                    <img
                      src={LEADERSHIP_TEAM[0].image}
                      alt={LEADERSHIP_TEAM[0].name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#b45309] bg-amber-100/60 px-2.5 py-0.5 rounded-full inline-block">
                      {LEADERSHIP_TEAM[0].role}
                    </span>
                    <h4 className="text-xl font-extrabold text-stone-900 mt-1.5">
                      {LEADERSHIP_TEAM[0].name}
                    </h4>
                    <div className="text-xs font-bold text-[#2d6a4f]">
                      {LEADERSHIP_TEAM[0].title}
                    </div>
                    <div className="text-xs text-stone-600 mt-1">
                      Delegate at 10th Nigeria-EU Business Forum (Global Gateway)
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-5 font-normal">
                  {LEADERSHIP_TEAM[0].bio}
                </p>

                <div className="space-y-2 border-t border-[#e5e1d5] pt-4">
                  {LEADERSHIP_TEAM[0].highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-stone-800">
                      <CheckCircle2 className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" strokeWidth={1.75} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* The Man: COO / Second in Command */}
            <div className="bg-[#faf9f5] rounded-3xl p-6 sm:p-8 border border-[#e5e1d5] flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5 text-center sm:text-left">
                  <div className="w-28 h-36 rounded-xl overflow-hidden shrink-0 border border-[#e5e1d5] shadow-xs">
                    <img
                      src={LEADERSHIP_TEAM[1].image}
                      alt={LEADERSHIP_TEAM[1].name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1b4332] bg-emerald-100/60 px-2.5 py-0.5 rounded-full inline-block">
                      {LEADERSHIP_TEAM[1].role}
                    </span>
                    <h4 className="text-xl font-extrabold text-stone-900 mt-1.5">
                      {LEADERSHIP_TEAM[1].name}
                    </h4>
                    <div className="text-xs font-bold text-[#2d6a4f]">
                      {LEADERSHIP_TEAM[1].title}
                    </div>
                    <div className="text-xs text-stone-600 mt-1">
                      Head of Agricultural Engineering, Logistics & Processing
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-5 font-normal">
                  {LEADERSHIP_TEAM[1].bio}
                </p>

                <div className="space-y-2 border-t border-[#e5e1d5] pt-4">
                  {LEADERSHIP_TEAM[1].highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-stone-800">
                      <CheckCircle2 className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" strokeWidth={1.75} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Foundations */}
        <div className="mt-16 pt-16 border-t border-[#f1efe7]">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 
              style={{ textWrap: 'balance' }}
              className="text-2xl sm:text-3xl font-extrabold text-[#143224]"
            >
              Operational Foundations & Standards
            </h3>
            <p className="text-sm text-stone-600 font-normal">
              Rooted in scientific agronomy, verified lab purity, and authentic ethical processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((p, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#faf9f5] border border-[#e5e1d5] hover:border-[#1b4332]/40 transition-colors"
              >
                <div className="text-xs font-bold text-[#2d6a4f] tabular-nums mb-2">
                  {p.number}
                </div>
                <h4 className="text-base font-bold text-stone-900 mb-1">
                  {p.title}
                </h4>
                <div className="text-xs font-medium text-stone-600 mb-2">
                  {p.tagline}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
