import React from 'react';
import { ShieldCheck, ExternalLink, Award, FileCode, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-slate-100 text-slate-600 border-t border-slate-200 text-sm py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: SIH 2026 Details */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#002147] flex items-center justify-center text-white shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#FF9933]" />
              </div>
              <span className="font-bold text-base text-[#002147] tracking-tight">BIS Sahayak AI</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Smart India Hackathon 2026 Prototype for Problem Statement <strong>26107</strong>: 
              "AI-powered Intelligent Assistant for Indian Standards and BIS Services for Industries and Consumers".
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#002147] text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-[#FF9933]" />
              <span>Team: A5D Forge</span>
            </div>
          </div>

          {/* Column 2: The Core Innovation Flow */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#002147] mb-3 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-[#002147]" />
              <span>Core Innovation Workflow</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-slate-600">
                <span className="w-5 h-5 rounded bg-[#002147] text-white flex items-center justify-center font-bold text-[10px]">1</span>
                <span><strong>SHOW:</strong> Vision OCR scan of product & labels</span>
              </li>
              <li className="flex items-center gap-2 text-slate-600">
                <span className="w-5 h-5 rounded bg-[#002147] text-white flex items-center justify-center font-bold text-[10px]">2</span>
                <span><strong>ASK:</strong> RAG source-grounded intelligent Q&A</span>
              </li>
              <li className="flex items-center gap-2 text-slate-600">
                <span className="w-5 h-5 rounded bg-[#002147] text-white flex items-center justify-center font-bold text-[10px]">3</span>
                <span><strong>VERIFY:</strong> Real-time CM/L, CRS & HUID audit</span>
              </li>
              <li className="flex items-center gap-2 text-slate-600">
                <span className="w-5 h-5 rounded bg-rose-700 text-white flex items-center justify-center font-bold text-[10px]">4</span>
                <span><strong>ACT:</strong> Counterfeit complaint draft generator</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Authorized Portals & Regulatory Channels */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#002147] mb-3">
              Official BIS Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.manakonline.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#002147] hover:underline transition-colors flex items-center gap-1 text-slate-600"
                >
                  <span>Manakonline (e-BIS Portal)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.services.bis.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#002147] hover:underline transition-colors flex items-center gap-1 text-slate-600"
                >
                  <span>BIS Conformity Assessment Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.crsbis.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#002147] hover:underline transition-colors flex items-center gap-1 text-slate-600"
                >
                  <span>MeitY CRS Electronics Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://edaakhil.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#002147] hover:underline transition-colors flex items-center gap-1 text-slate-600"
                >
                  <span>e-Daakhil National Consumer Grievances</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Verification Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#002147]">
              Responsible AI Mandate
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.disclaimer}
            </p>
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-700 flex items-start gap-2 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Zero-hallucination constraint active. Answers cite authorized clauses and standards.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 Bureau of Indian Standards</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="font-medium text-slate-500">Disclaimer: Prototype for SIH 2026. AI results may vary.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Systems Online
            </span>
            <span className="w-[1px] h-3 bg-slate-300"></span>
            <span className="font-bold text-[#002147]">Smart India Hackathon</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
