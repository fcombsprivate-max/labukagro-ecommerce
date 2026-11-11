import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <aside aria-label="Support chat" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center group">
      {/* Tooltip on hover: hidden on touch/mobile */}
      <div className="hidden md:block mr-3 bg-white text-[#1b4332] text-xs font-bold py-1.5 px-3 rounded-xl shadow-lg border border-[#e5e1d5] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Chat with Labuk Agro Farm Desk
      </div>

      <a
        href="https://wa.me/2348060551016?text=Hello%20Labuk%20Agro,%20I'm%20visiting%20your%20website%20and%20would%20like%20to%20place%20an%20order%20or%20make%20an%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 hover:bg-[#20ba5a] transition-all cursor-pointer ring-4 ring-white/80"
        aria-label="Direct WhatsApp Chat with Labuk Agro"
      >
        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />
      </a>
    </aside>
  );
}
