import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  FlaskConical, 
  ExternalLink, 
  FileText,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Building
} from 'lucide-react';
import { Language, BISStandard } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { BIS_STANDARDS } from '../data/bisDatabase';

interface SourcesReferenceViewProps {
  language: Language;
  onAskAboutStandard: (standard: BISStandard) => void;
}

export const SourcesReferenceView: React.FC<SourcesReferenceViewProps> = ({
  language,
  onAskAboutStandard,
}) => {
  const t = TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedStandardId, setExpandedStandardId] = useState<string | null>('IS 302-2-3');

  const categories = [
    'All',
    'Electrical Appliances',
    'Food & Packaged Goods',
    'Precious Metals & Hallmarking',
    'Electronics & IT Goods',
    'Electrical Cables & Wires',
    'Automotive Safety',
  ];

  const filteredStandards = BIS_STANDARDS.filter((s) => {
    const matchesSearch =
      s.isNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.hindiTitle && s.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || s.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>AUTHORIZED RAG KNOWLEDGE BASE</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {language === 'hi' ? 'भारतीय मानक एवं स्रोत निर्देशिका' : 'Indian Standards Catalog & RAG Source Repository'}
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          {language === 'hi'
            ? 'भारतीय मानक ब्यूरो (BIS) द्वारा प्रकाशित आधिकारिक विनिर्देश, गुणवत्ता नियंत्रण आदेश (QCO) और परीक्षण मानक।'
            : 'Explore official Indian Standards, technical clauses, mandatory Quality Control Orders (QCOs), and accredited testing laboratories.'}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by IS number (e.g. IS 302, IS 14543), product name, or keyword..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs text-slate-400 shrink-0 font-medium">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Standards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredStandards.length} authorized Indian Standards</span>
          <span>Zero-hallucination constraint active</span>
        </div>

        <div className="space-y-3">
          {filteredStandards.map((std) => {
            const isExpanded = expandedStandardId === std.isNumber;

            return (
              <div
                key={std.isNumber}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
              >
                {/* Standard Summary Header */}
                <div
                  onClick={() => setExpandedStandardId(isExpanded ? null : std.isNumber)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-sm px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                        {std.isNumber}
                      </span>
                      {std.mandatory ? (
                        <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px] uppercase tracking-wide">
                          QCO Mandatory
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold text-[10px] uppercase">
                          Voluntary
                        </span>
                      )}
                      <span className="text-xs text-slate-400">• {std.category}</span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 leading-snug">
                      {std.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0 self-start sm:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAskAboutStandard(std);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-semibold border border-blue-200 transition-all cursor-pointer"
                    >
                      Ask in AI Assistant
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50/60 space-y-5 text-xs">
                    {/* Scope & Overview */}
                    <div className="space-y-1">
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                        Scope & Regulatory Overview
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {std.scope}
                      </p>
                      {std.qcoReference && (
                        <p className="text-rose-800 font-medium pt-1">
                          <strong>Order:</strong> {std.qcoReference}
                        </p>
                      )}
                    </div>

                    {/* Technical Clauses & Specifications */}
                    <div className="space-y-2">
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                        Key Specification Clauses
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {std.keyClauses.map((clause, cIdx) => (
                          <div
                            key={cIdx}
                            className="p-3 bg-white rounded-xl border border-slate-200 space-y-1"
                          >
                            <span className="font-mono font-bold text-blue-700 text-[11px] block">
                              {clause.clause}
                            </span>
                            <p className="font-semibold text-slate-900 text-xs">
                              {clause.title}
                            </p>
                            <p className="text-slate-500 text-[11px] leading-relaxed">
                              {clause.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testing Requirements & Accredited Laboratories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Testing Requirements */}
                      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                          <FlaskConical className="w-4 h-4 text-amber-600" />
                          <span>Mandatory Testing Requirements</span>
                        </span>
                        <ul className="space-y-1 text-slate-600 list-disc list-inside">
                          {std.testingRequirements.map((req, rIdx) => (
                            <li key={rIdx} className="leading-relaxed">
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Laboratories */}
                      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                          <Building className="w-4 h-4 text-emerald-600" />
                          <span>Recognized Laboratories & Schemes</span>
                        </span>
                        <p className="text-slate-500 text-[11px]">
                          <strong>Conformity Scheme:</strong> {std.certificationScheme}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {std.recognizedLabs.map((lab, lIdx) => (
                            <span
                              key={lIdx}
                              className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-[10px] font-medium"
                            >
                              {lab}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Official Portal Link */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                      <span className="text-[11px] text-slate-500">
                        Published by: <strong>Bureau of Indian Standards (BIS)</strong>
                      </span>
                      <a
                        href={std.documents[0]?.url || 'https://www.services.bis.gov.in'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-semibold hover:underline flex items-center gap-1 text-xs"
                      >
                        <span>Access Standards Document on BIS Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
