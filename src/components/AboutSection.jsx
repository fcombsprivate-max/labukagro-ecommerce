import React from 'react';
import { LEADERSHIP_TEAM, PILLARS } from '../data/products';
import { Award, CheckCircle2, Factory, HeartHandshake, MapPin, UserCheck, Shield } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white border-b border-[#e5e1d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#d8f3dc] text-[#1b4332] text-xs font-bold uppercase tracking-wider">
              <span>About Us • Labuk Agro Ltd</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1b4332] tracking-tight leading-tight">
              Advancing Nigerian Agriculture Through Sustainable Processing & Purity
            </h2>

            <p className="text-sm sm:text-base text-[#405646] leading-relaxed">
              At <strong>Labuk Agro Ltd</strong>, we are committed to advancing the agricultural sector through our comprehensive operations in agro production, processing, management, and marketing of agricultural commodities.
            </p>

            <p className="text-sm sm:text-base text-[#405646] leading-relaxed">
              Based out of <strong>Unit 22, Technology Incubation Center (TIC), Ajilosun Ikere Road, Ado Ekiti</strong>, we produce NAFDAC-certified cold-pressed castor oil (both edible and non-edible grades), neem essential oil, natural honey, and bulk staple grains that meet both domestic Nigerian demands and international export standards.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 text-xs font-semibold text-[#1b4332]">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#faf9f5] border border-[#e5e1d5]">
                <MapPin className="w-4 h-4 text-[#2d6a4f] shrink-0" />
                <span>Unit 22, TIC, Ado-Ekiti, Ekiti State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#faf9f5] border border-[#e5e1d5]">
                <Factory className="w-4 h-4 text-[#2d6a4f] shrink-0" />
                <span>Certified Cold-Press Extraction Plant</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase - Farm & Factory */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#e5e1d5] bg-[#f4f2e9] aspect-4/5">
                <img 
                  src="/images/IMG-20261106-WA0036.jpg" 
                  alt="CEO on Labuk Agro Farm Plantation" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#b7e4c7]">Field Work</span>
                  <span className="text-xs font-bold">Castor Plantations, Ekiti</span>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#e5e1d5] bg-[#f4f2e9] aspect-4/5">
                <img 
                  src="/images/IMG-20261106-WA0043.jpg" 
                  alt="High Yield Castor Plants" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#b7e4c7]">Crop Clusters</span>
                  <span className="text-xs font-bold">High-Yield Castor Trees</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Leadership Section */}
        <div className="mt-16 pt-16 border-t border-[#f1efe7]">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d8f3dc] text-[#1b4332] text-xs font-bold uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5 text-[#2d6a4f]" />
              <span>Leadership & Governance</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1b4332]">
              Meet Our Executive Leadership
            </h3>
            <p className="text-xs sm:text-sm text-[#52796f]">
              Guiding Labuk Agro Ltd with vision, agronomic rigor, and deep commitment to sustainable Nigerian enterprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Woman: CEO (Omolara Bukola) */}
            <div className="bg-[#faf9f5] rounded-3xl p-6 sm:p-8 border border-[#e5e1d5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5 text-center sm:text-left">
                  <div className="relative w-28 h-36 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-[#1b4332]">
                    <img
                      src={LEADERSHIP_TEAM[0].image}
                      alt={LEADERSHIP_TEAM[0].name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-[#1b4332] text-white text-[9px] font-bold uppercase py-0.5 text-center">
                      CEO
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#d97706] bg-[#d97706]/10 px-2 py-0.5 rounded-full">
                      {LEADERSHIP_TEAM[0].role}
                    </span>
                    <h4 className="text-xl font-extrabold text-[#1b4332] mt-1.5">
                      {LEADERSHIP_TEAM[0].name}
                    </h4>
                    <div className="text-xs font-bold text-[#2d6a4f]">
                      {LEADERSHIP_TEAM[0].title}
                    </div>
                    <div className="text-[11px] text-[#52796f] mt-1">
                      Delegate at 10th Nigeria-EU Business Forum (Global Gateway)
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#405646] leading-relaxed mb-4">
                  {LEADERSHIP_TEAM[0].bio}
                </p>

                <div className="space-y-1.5 border-t border-[#e5e1d5] pt-3">
                  {LEADERSHIP_TEAM[0].highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#1b4332]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* The Man: Second in Command (Executive Director & COO) */}
            <div className="bg-[#faf9f5] rounded-3xl p-6 sm:p-8 border border-[#e5e1d5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5 text-center sm:text-left">
                  <div className="relative w-28 h-36 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-[#1b4332]">
                    <img
                      src={LEADERSHIP_TEAM[1].image}
                      alt={LEADERSHIP_TEAM[1].name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-[#1b4332] text-white text-[9px] font-bold uppercase py-0.5 text-center">
                      COO
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2d6a4f] bg-[#2d6a4f]/10 px-2 py-0.5 rounded-full">
                      {LEADERSHIP_TEAM[1].role}
                    </span>
                    <h4 className="text-xl font-extrabold text-[#1b4332] mt-1.5">
                      {LEADERSHIP_TEAM[1].name}
                    </h4>
                    <div className="text-xs font-bold text-[#2d6a4f]">
                      {LEADERSHIP_TEAM[1].title}
                    </div>
                    <div className="text-[11px] text-[#52796f] mt-1">
                      Head of Agricultural Engineering, Logistics & Processing
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#405646] leading-relaxed mb-4">
                  {LEADERSHIP_TEAM[1].bio}
                </p>

                <div className="space-y-1.5 border-t border-[#e5e1d5] pt-3">
                  {LEADERSHIP_TEAM[1].highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#1b4332]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* "How Are We Different?" - 6 Pillars directly from labukagro.com */}
        <div className="mt-16 pt-16 border-t border-[#f1efe7]">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2d6a4f]">
              Our Foundation
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1b4332]">
              How Are We Different?
            </h3>
            <p className="text-xs sm:text-sm text-[#52796f]">
              Rooted in scientific agronomy, verified lab purity, and authentic ethical agro-processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((p, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#faf9f5] border border-[#e5e1d5] hover:border-[#1b4332] hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                  0{idx + 1}
                </div>
                <h4 className="text-lg font-bold text-[#1b4332] mb-1">
                  {p.title}
                </h4>
                <div className="text-xs font-semibold text-[#2d6a4f] mb-2">
                  {p.tagline}
                </div>
                <p className="text-xs text-[#52796f] leading-relaxed">
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
