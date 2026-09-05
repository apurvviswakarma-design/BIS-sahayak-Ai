import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Sparkles, 
  Code, 
  Terminal, 
  ExternalLink,
  CheckCircle2,
  FileText,
  Users,
  Building,
  Target
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AboutViewProps {
  language: Language;
}

export const AboutView: React.FC<AboutViewProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-4">
      {/* SIH 2026 Project Hero Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-slate-800 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
              Smart India Hackathon 2026 Prototype
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
              Problem Statement 26107
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            AI-powered Intelligent Assistant for Indian Standards and BIS Services for Industries and Consumers
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Theme</span>
              <span className="font-bold text-slate-100 text-sm">Smart Automation</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Team Name</span>
              <span className="font-bold text-amber-400 text-sm">A5D Forge</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Supported Languages</span>
              <span className="font-bold text-slate-100 text-sm">English and Hindi (द्विभाषी)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Innovation: SHOW -> ASK -> VERIFY -> ACT */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">
            The SHOW → ASK → VERIFY → ACT Framework
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A human-centered regulatory AI workflow designed for consumers, MSMEs, startups, and students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
              1
            </span>
            <h3 className="font-bold text-slate-900 text-sm">SHOW</h3>
            <p className="text-slate-600 leading-relaxed">
              Users capture or upload product photos, labels, ISI markings, or bills without knowing complex Indian Standard numbers beforehand.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs">
              2
            </span>
            <h3 className="font-bold text-slate-900 text-sm">ASK</h3>
            <p className="text-slate-600 leading-relaxed">
              Multilingual conversational RAG assistant answers queries on applicable standards, QCO mandates, testing parameters, and licence workflows.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              3
            </span>
            <h3 className="font-bold text-slate-900 text-sm">VERIFY</h3>
            <p className="text-slate-600 leading-relaxed">
              Audits extracted 7-8 digit CM/L licence numbers, 8-digit CRS numbers, and 6-digit HUID against authorized national databases.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs">
              4
            </span>
            <h3 className="font-bold text-slate-900 text-sm">ACT</h3>
            <p className="text-slate-600 leading-relaxed">
              Generates structured complaint dossiers with bill OCR, seller location, and evidence photos for submission via BIS Care & e-Daakhil.
            </p>
          </div>
        </div>
      </section>

      {/* System Architecture Diagram */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-600" />
          <span>System Architecture & Technical Implementation</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Architecture Pillar 1: OCR & Vision */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>1. Multimodal OCR & Pattern Engine</span>
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Multimodal vision model parses product packaging, electrical ratings, and marks.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Regex pattern detection extracts standard numbers (IS XXXX), CM/L, and HUID codes.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Mandatory human-in-the-loop confirmation card prevents misclassification.</span>
              </li>
            </ul>
          </div>

          {/* Architecture Pillar 2: RAG Pipeline */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>2. Zero-Hallucination RAG Pipeline</span>
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Strict grounding in authorized Bureau of Indian Standards documents and Quality Control Orders.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>System prompt enforces citation of exact clauses, sections, and regulatory orders.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Fallback message triggers if reliable standards context is not found.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Target Beneficiaries */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Ecosystem Impact & Target Beneficiaries
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">Consumers & Citizens</h3>
            <p className="text-slate-600 leading-relaxed">
              Verify gold hallmarking HUID before purchasing jewellery; check if electric heaters or packaged water bottles carry valid ISI marks to prevent health hazards and fire risks.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <Building className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">MSMEs & Startups</h3>
            <p className="text-slate-600 leading-relaxed">
              Eliminate confusion regarding mandatory Quality Control Orders; find certified testing laboratories, sample size limits, and step-by-step Manakonline licensing pathways.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <Target className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">Enforcement & Market Surveillance</h3>
            <p className="text-slate-600 leading-relaxed">
              Structured complaint dossiers streamline citizen reporting directly to BIS branch offices and National Consumer Helpline, accelerating enforcement against counterfeit marks.
            </p>
          </div>
        </div>
      </section>

      {/* Official Portals Footer */}
      <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-2">
        <p className="font-bold text-slate-900">Official Government References:</p>
        <p>
          Developed in accordance with the Bureau of Indian Standards Act, 2016 and the Ministry of Consumer Affairs, Food & Public Distribution guidelines.
        </p>
      </div>
    </div>
  );
};
