import React from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Camera, 
  MessageSquareText, 
  SearchCheck, 
  AlertTriangle, 
  FileText, 
  Info,
  Layers
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  hasProductContext: boolean;
  activeDraftsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  hasProductContext,
  activeDraftsCount,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-50 bg-[#002147] border-b border-[#FF9933] text-white shadow-lg">
      {/* Top Notification Bar for SIH 2026 */}
      <div className="bg-[#001733] px-4 py-1.5 text-xs text-slate-300 border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FF9933]/20 text-[#FF9933] border border-[#FF9933]/40">
            SIH 2026 • PS 26107
          </span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="font-medium text-slate-200">
            Smart Automation • Team <span className="text-[#FF9933] font-semibold">A5D Forge</span>
          </span>
        </div>

        <div className="flex items-center space-x-3 text-slate-300 text-[11px]">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium">RAG Grounded • No Hallucination Engine</span>
          </span>
          <span className="hidden md:inline text-white/30">•</span>
          <span className="hidden md:inline text-slate-300">Bureau of Indian Standards Architecture</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none group"
            onClick={() => setCurrentTab('home')}
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full border-2 border-[#002147] rounded flex items-center justify-center font-bold text-[#002147] text-xs tracking-wider">
                BIS
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#FF9933] transition-colors">
                  BIS Sahayak AI
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-[#FF9933] border border-[#FF9933]/30">
                  Prototype
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#FF9933] font-semibold">
                A5D Forge | Smart India Hackathon 2026
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-2" aria-label="Main Navigation">
            <button
              id="nav-home-btn"
              onClick={() => setCurrentTab('home')}
              className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                currentTab === 'home'
                  ? 'text-[#FF9933] border-b-2 border-[#FF9933] pb-1 font-semibold'
                  : 'text-white/80 hover:text-[#FF9933] pb-1 border-b-2 border-transparent'
              }`}
            >
              {t.navHome}
            </button>

            <button
              id="nav-upload-btn"
              onClick={() => setCurrentTab('upload')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                currentTab === 'upload' || currentTab === 'analysis'
                  ? 'text-[#FF9933] border-b-2 border-[#FF9933] pb-1 font-semibold'
                  : 'text-white/80 hover:text-[#FF9933] pb-1 border-b-2 border-transparent'
              }`}
            >
              <Camera className="w-4 h-4 text-[#FF9933]" />
              <span>{t.navUpload}</span>
            </button>

            <button
              id="nav-chat-btn"
              onClick={() => setCurrentTab('chat')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                currentTab === 'chat'
                  ? 'text-[#FF9933] border-b-2 border-[#FF9933] pb-1 font-semibold'
                  : 'text-white/80 hover:text-[#FF9933] pb-1 border-b-2 border-transparent'
              }`}
            >
              <MessageSquareText className="w-4 h-4 text-blue-300" />
              <span>{t.navChat}</span>
              {hasProductContext && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-0.5"></span>
              )}
            </button>

            <button
              id="nav-verify-btn"
              onClick={() => setCurrentTab('verify')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                currentTab === 'verify'
                  ? 'text-[#FF9933] border-b-2 border-[#FF9933] pb-1 font-semibold'
                  : 'text-white/80 hover:text-[#FF9933] pb-1 border-b-2 border-transparent'
              }`}
            >
              <SearchCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.navVerify}</span>
            </button>

            <button
              id="nav-sources-btn"
              onClick={() => setCurrentTab('sources')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                currentTab === 'sources'
                  ? 'text-[#FF9933] border-b-2 border-[#FF9933] pb-1 font-semibold'
                  : 'text-white/80 hover:text-[#FF9933] pb-1 border-b-2 border-transparent'
              }`}
            >
              <Layers className="w-4 h-4 text-slate-300" />
              <span>{t.navSources}</span>
            </button>

            <button
              id="nav-complaint-btn"
              onClick={() => setCurrentTab('complaint')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                currentTab === 'complaint'
                  ? 'text-rose-400 border-b-2 border-rose-500 pb-1 font-semibold'
                  : 'text-rose-300/80 hover:text-rose-300 pb-1 border-b-2 border-transparent'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-300" />
              <span>{t.navComplaint}</span>
            </button>

            <button
              id="nav-drafts-btn"
              onClick={() => setCurrentTab('drafts')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer relative ${
                currentTab === 'drafts'
                  ? 'text-[#FF9933] border-b-2 border-[#FF9933] pb-1 font-semibold'
                  : 'text-white/80 hover:text-[#FF9933] pb-1 border-b-2 border-transparent'
              }`}
            >
              <FileText className="w-4 h-4 text-slate-300" />
              <span>{t.navDrafts}</span>
              {activeDraftsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#FF9933] text-[#002147]">
                  {activeDraftsCount}
                </span>
              )}
            </button>

            <button
              id="nav-about-btn"
              onClick={() => setCurrentTab('about')}
              className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                currentTab === 'about'
                  ? 'text-[#FF9933] border-b-2 border-[#FF9933] pb-1 font-semibold'
                  : 'text-white/80 hover:text-[#FF9933] pb-1 border-b-2 border-transparent'
              }`}
            >
              <Info className="w-4 h-4 text-slate-300" />
              <span>{t.navAbout}</span>
            </button>
          </nav>

          {/* Right Section: Language Toggle */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-white/10 rounded-full px-3 py-1 gap-2 border border-white/20">
              <button
                id="lang-en-btn"
                onClick={() => setLanguage('en')}
                className={`text-xs font-bold transition-colors cursor-pointer ${
                  language === 'en' ? 'text-[#FF9933]' : 'text-white/60 hover:text-white'
                }`}
              >
                EN
              </button>
              <div className="w-[1px] h-3 bg-white/30"></div>
              <button
                id="lang-hi-btn"
                onClick={() => setLanguage('hi')}
                className={`text-xs font-bold transition-colors cursor-pointer ${
                  language === 'hi' ? 'text-[#FF9933]' : 'text-white/60 hover:text-white'
                }`}
              >
                HI
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Navigation Scroll */}
        <div className="lg:hidden flex items-center space-x-2 py-2 overflow-x-auto border-t border-white/10 text-xs no-scrollbar">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
              currentTab === 'home' ? 'bg-[#FF9933] text-[#002147] font-bold' : 'text-white/80 bg-white/5'
            }`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => setCurrentTab('upload')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium flex items-center gap-1 transition-colors ${
              currentTab === 'upload' ? 'bg-[#FF9933] text-[#002147] font-bold' : 'text-white/80 bg-white/5'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-[#FF9933]" />
            {t.navUpload}
          </button>
          <button
            onClick={() => setCurrentTab('chat')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium flex items-center gap-1 transition-colors ${
              currentTab === 'chat' ? 'bg-[#FF9933] text-[#002147] font-bold' : 'text-white/80 bg-white/5'
            }`}
          >
            <MessageSquareText className="w-3.5 h-3.5 text-blue-300" />
            {t.navChat}
          </button>
          <button
            onClick={() => setCurrentTab('verify')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium flex items-center gap-1 transition-colors ${
              currentTab === 'verify' ? 'bg-[#FF9933] text-[#002147] font-bold' : 'text-white/80 bg-white/5'
            }`}
          >
            <SearchCheck className="w-3.5 h-3.5 text-emerald-400" />
            {t.navVerify}
          </button>
          <button
            onClick={() => setCurrentTab('complaint')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium flex items-center gap-1 transition-colors ${
              currentTab === 'complaint' ? 'bg-rose-600 text-white font-bold' : 'text-rose-300 bg-rose-950/40'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            {t.navComplaint}
          </button>
          <button
            onClick={() => setCurrentTab('sources')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
              currentTab === 'sources' ? 'bg-[#FF9933] text-[#002147] font-bold' : 'text-white/80 bg-white/5'
            }`}
          >
            {t.navSources}
          </button>
          <button
            onClick={() => setCurrentTab('drafts')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
              currentTab === 'drafts' ? 'bg-[#FF9933] text-[#002147] font-bold' : 'text-white/80 bg-white/5'
            }`}
          >
            {t.navDrafts} ({activeDraftsCount})
          </button>
          <button
            onClick={() => setCurrentTab('about')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
              currentTab === 'about' ? 'bg-[#FF9933] text-[#002147] font-bold' : 'text-white/80 bg-white/5'
            }`}
          >
            {t.navAbout}
          </button>
        </div>
      </div>
    </header>
  );
};
