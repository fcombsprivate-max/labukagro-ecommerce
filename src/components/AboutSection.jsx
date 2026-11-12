import React from 'react';
import { LEADERSHIP_TEAM, PILLARS } from '../data/products';
import { CheckCircle2, Factory, MapPin, Calendar, Droplets, Leaf, Package } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-transparent border-b border-[#e5e1d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            {/* Timeline Milestones Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f1ea] border border-[#e5e1d5] text-[11px] sm:text-xs font-semibold text-stone-800">
              <Calendar className="w-3.5 h-3.5 text-[#2d6a4f]" strokeWidth={1.75} />
              <span>Operating Since 2016 • Registered 2018 • Incorporated 2022</span>
            </div>

            <h2 
              style={{ textWrap: 'balance' }}
              className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#143224] tracking-tight leading-tight"
            >
              Agricultural Processing, Dedicated Apiary & Bulk Farm Supply
            </h2>

            <p className="text-sm xs:text-base text-stone-700 leading-relaxed font-normal">
              Operating since 2016, registered in 2018, and formally incorporated in 2022, <strong className="text-stone-900 font-semibold">Labuk Agro Ltd</strong> is a diversified Nigerian agribusiness grounded in quality agricultural processing, 100% natural unadulterated products, and reliable, dependable supply.
            </p>

            <p className="text-sm xs:text-base text-stone-700 leading-relaxed font-normal">
              Headquartered at <strong className="text-stone-900 font-semibold">Unit 22, Technology Incubation Center (TIC), Ajilosun Ikere Road, Ado Ekiti</strong>, our agricultural operations extend across three core divisions:
            </p>

            {/* Three Core Agricultural Operations */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#faf9f5] border border-[#e5e1d5]">
                <Droplets className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" strokeWidth={1.75} />
                <div className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  <strong className="text-stone-900 font-semibold">Quality Agro-Processing:</strong> We mechanically cold-press agricultural seeds into NAFDAC-certified Castor Oil—producing both consumer-grade edible oil (for oral wellness and digestive detox) and specialized grades for external use (hair, skin, and wellness therapy)—as well as unrefined virgin Neem Oil.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#faf9f5] border border-[#e5e1d5]">
                <Leaf className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" strokeWidth={1.75} />
                <div className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  <strong className="text-stone-900 font-semibold">Dedicated Apiary & Original Honey:</strong> We operate our own managed apiary, where we sustainably source, harvest, and bottle 100% pure, original honey with zero sugar dilution or artificial adulteration.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#faf9f5] border border-[#e5e1d5]">
                <Package className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" strokeWidth={1.75} />
                <div className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  <strong className="text-stone-900 font-semibold">Wholesale & Bulk Supply:</strong> We supply agricultural produce in bulk quantities—including clean grains, castor seeds, soya beans, and 200L oil drums—to wholesalers, retailers, distributors, food processors, and businesses nationwide.
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3 text-xs font-semibold text-stone-900">
              <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-[#faf9f5] border border-[#e5e1d5]">
                <MapPin className="w-4 h-4 text-[#2d6a4f] shrink-0" strokeWidth={1.75} />
                <span>Unit 22, TIC, Ado-Ekiti, Ekiti State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-[#faf9f5] border border-[#e5e1d5]">
                <Factory className="w-4 h-4 text-[#2d6a4f] shrink-0" strokeWidth={1.75} />
                <span>Cold-Press Plant & Managed Apiaries</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase: Real Farm & Crop Photography */}
          <div className="lg:col-span-6 w-full">
            <div className="grid grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-xs border border-[#e5e1d5] bg-[#f7f5ef] aspect-4/5">
                <img 
                  src="/images/IMG-20261106-WA0036.jpg" 
                  alt="Labuk Agro CEO Omolara Bukola inspecting castor crop in Ekiti" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-xs border border-[#e5e1d5] bg-[#f7f5ef] aspect-4/5">
                <img 
                  src="/images/IMG-20261106-WA0043.jpg" 
                  alt="High Yield Castor Plants on Labuk Agro plantation" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Executive Leadership Section */}
        <div className="mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-[#f1efe7]">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
            <h3 
              style={{ textWrap: 'balance' }}
              className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#143224]"
            >
              Executive Leadership & Governance
            </h3>
            <p className="text-xs xs:text-sm text-stone-600 font-normal">
              Directing Labuk Agro Ltd with agronomic experience, industrial quality control, and commitment to Nigerian agribusiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* The Woman: Founder & CEO (Omolara Bukola) */}
            <div className="bg-[#faf9f5] rounded-3xl p-5 xs:p-6 sm:p-8 border border-[#e5e1d5] flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-5 text-center sm:text-left">
                  <div className="w-24 h-32 xs:w-28 xs:h-36 rounded-xl overflow-hidden shrink-0 border border-[#e5e1d5] shadow-xs">
                    <img
                      src={LEADERSHIP_TEAM[0].image}
                      alt={LEADERSHIP_TEAM[0].name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] xs:text-[11px] font-bold uppercase tracking-wider text-[#b45309] bg-amber-100/60 px-2.5 py-0.5 rounded-full inline-block">
                      {LEADERSHIP_TEAM[0].role}
                    </span>
                    <h4 className="text-lg xs:text-xl font-extrabold text-stone-900 mt-1.5">
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

                <p className="text-xs xs:text-sm text-stone-700 leading-relaxed mb-5 font-normal">
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
            <div className="bg-[#faf9f5] rounded-3xl p-5 xs:p-6 sm:p-8 border border-[#e5e1d5] flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-5 text-center sm:text-left">
                  <div className="w-24 h-32 xs:w-28 xs:h-36 rounded-xl overflow-hidden shrink-0 border border-[#e5e1d5] shadow-xs">
                    <img
                      src={LEADERSHIP_TEAM[1].image}
                      alt={LEADERSHIP_TEAM[1].name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] xs:text-[11px] font-bold uppercase tracking-wider text-[#1b4332] bg-emerald-100/60 px-2.5 py-0.5 rounded-full inline-block">
                      {LEADERSHIP_TEAM[1].role}
                    </span>
                    <h4 className="text-lg xs:text-xl font-extrabold text-stone-900 mt-1.5">
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

                <p className="text-xs xs:text-sm text-stone-700 leading-relaxed mb-5 font-normal">
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
        <div className="mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-[#f1efe7]">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
            <h3 
              style={{ textWrap: 'balance' }}
              className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#143224]"
            >
              Operational Foundations & Standards
            </h3>
            <p className="text-xs xs:text-sm text-stone-600 font-normal">
              Rooted in scientific agronomy, verified lab purity, and authentic ethical processing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PILLARS.map((p, idx) => (
              <div 
                key={idx}
                className="p-4.5 xs:p-5 sm:p-6 rounded-2xl bg-[#faf9f5] border border-[#e5e1d5] hover:border-[#1b4332]/40 transition-colors"
              >
                <div className="text-xs font-bold text-[#2d6a4f] tabular-nums mb-1.5 xs:mb-2">
                  {p.number}
                </div>
                <h4 className="text-sm xs:text-base font-bold text-stone-900 mb-1">
                  {p.title}
                </h4>
                <div className="text-xs font-medium text-stone-600 mb-1.5 xs:mb-2">
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
