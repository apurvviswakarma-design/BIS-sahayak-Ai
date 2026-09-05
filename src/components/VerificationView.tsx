import React, { useState, useEffect } from 'react';
import { 
  SearchCheck, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  HelpCircle, 
  Building, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  ExternalLink,
  ArrowRight,
  Database,
  Cpu,
  Layers,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { Language, BISVerificationResult } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { lookupVerification } from '../data/bisDatabase';

interface VerificationViewProps {
  language: Language;
  initialNumber?: string;
  onNavigateToComplaint: (cmlNumber?: string, brand?: string) => void;
}

export const VerificationView: React.FC<VerificationViewProps> = ({
  language,
  initialNumber = '',
  onNavigateToComplaint,
}) => {
  const t = TRANSLATIONS[language];
  const [searchNumber, setSearchNumber] = useState(initialNumber);
  const [result, setResult] = useState<BISVerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialNumber) {
      handleVerify(initialNumber);
    }
  }, [initialNumber]);

  const handleVerify = (numberToAudit: string) => {
    const cleaned = numberToAudit.trim();
    if (!cleaned) return;

    setIsLoading(true);
    setTimeout(() => {
      const res = lookupVerification(cleaned);
      setResult(res);
      setIsLoading(false);
    }, 450);
  };

  const sampleNumbers = [
    { label: 'Valid ISI (Dry Iron)', num: 'CM/L-8123456', type: 'cml' },
    { label: 'Valid Packaged Water', num: 'CM/L-7234567', type: 'cml' },
    { label: 'Valid CRS (Charger)', num: 'R-41023456', type: 'crs' },
    { label: 'Valid Gold HUID', num: 'A9B2K4', type: 'huid' },
    { label: 'Counterfeit CM/L', num: 'CM/L-0099887', type: 'invalid' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <SearchCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>STEP 3 & 4 — VERIFY (AUDIT REGISTRY)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {language === 'hi' ? 'बीआईएस लाइसेंस एवं मार्क सत्यापन' : 'BIS Licence, Mark & HUID Verification'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          {language === 'hi'
            ? 'उत्पाद पर छपे 7-8 अंकों के CM/L लाइसेंस नंबर, 8-अंकीय CRS R-नंबर अथवा 6-अंकीय HUID की प्रामाणिकता जांचें।'
            : 'Audit the authenticity of ISI CM/L licences, MeitY CRS electronics registrations, and Gold 6-digit Hallmarking Unique Identifiers (HUID).'}
        </p>
      </div>

      {/* Verification Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleVerify(searchNumber);
              }}
              placeholder="e.g., CM/L-8123456, R-41023456, or HUID A9B2K4"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm uppercase"
            />
            <SearchCheck className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <button
            onClick={() => handleVerify(searchNumber)}
            disabled={!searchNumber.trim() || isLoading}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <span>Audit Number</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Quick Test Samples */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Quick Test Numbers:</span>
          {sampleNumbers.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchNumber(s.num);
                handleVerify(s.num);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-colors cursor-pointer ${
                s.type === 'invalid'
                  ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
              }`}
            >
              {s.num} ({s.label})
            </button>
          ))}
        </div>
      </div>

      {/* Verification Result Card */}
      {result && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden animate-in fade-in duration-300">
          {/* Header Banner with Status Badge */}
          <div className={`p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            result.status === 'verified'
              ? 'bg-emerald-50/70 border-emerald-200'
              : result.status === 'not_verified'
              ? 'bg-rose-50/70 border-rose-200'
              : 'bg-amber-50/70 border-amber-200'
          }`}>
            <div className="flex items-center space-x-3">
              {result.status === 'verified' && (
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
                  <CheckCircle className="w-6 h-6" />
                </div>
              )}
              {result.status === 'not_verified' && (
                <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/30">
                  <XCircle className="w-6 h-6" />
                </div>
              )}
              {result.status === 'unable_to_verify' && (
                <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-600/30">
                  <AlertCircle className="w-6 h-6" />
                </div>
              )}
              {result.status === 'manual_review_needed' && (
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <HelpCircle className="w-6 h-6" />
                </div>
              )}

              <div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    result.status === 'verified'
                      ? 'bg-emerald-100 text-emerald-800'
                      : result.status === 'not_verified'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {result.status === 'verified' && 'Verified Operative'}
                    {result.status === 'not_verified' && 'Not Verified / Counterfeit Suspect'}
                    {result.status === 'unable_to_verify' && 'Unable to Verify'}
                    {result.status === 'manual_verification_required' && 'Requires Manual Audit'}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    Format: {result.type.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-mono font-black text-slate-900 mt-0.5">
                  {result.number}
                </h3>
              </div>
            </div>

            {/* Quick Action if Suspicious */}
            {result.status === 'not_verified' && (
              <button
                onClick={() => onNavigateToComplaint(result.number, result.details?.brand)}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Report Counterfeit Product</span>
              </button>
            )}
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {result.status === 'verified' && result.details ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="space-y-1 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">Manufacturer / Licensee</span>
                  <p className="text-sm font-bold text-slate-900">{result.details.licenseeName}</p>
                  <p className="text-slate-600 flex items-start gap-1 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{result.details.factoryAddress}</span>
                  </p>
                </div>

                <div className="space-y-1 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">Standard & Product Scope</span>
                  <p className="text-sm font-bold text-slate-900">{result.details.standard}</p>
                  <p className="text-slate-600 pt-0.5">{result.details.productName}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-semibold text-[10px]">
                    Brand: {result.details.brand}
                  </span>
                </div>

                <div className="space-y-1 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">Operating Status</span>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-emerald-700 uppercase tracking-wide">{result.details.statusDescription || 'Operative'}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Valid Through: <strong>{result.details.validUntil}</strong></span>
                  </p>
                </div>

                <div className="space-y-1 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">Conformity Scheme</span>
                  <p className="font-semibold text-slate-800">{result.details.scheme}</p>
                  <a
                    href="https://www.manakonline.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:underline pt-1 text-[11px]"
                  >
                    <span>View Manakonline Public Record</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <p className="font-bold text-sm text-slate-900 mb-1">Audit Findings:</p>
                  <p>
                    The number <strong className="font-mono">{result.number}</strong> does not match any operative manufacturing licence or hallmarking record in the authorized national repository.
                  </p>
                  <p className="mt-2 text-rose-700 font-semibold">
                    Risk Warning: Goods bearing unauthorized or unverified marks violate the Bureau of Indian Standards Act, 2016 and Section 29 penalties apply.
                  </p>
                </div>
              </div>
            )}

            {/* Prototype API Gateway Notice */}
            <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
              <p className="font-bold text-slate-700">Demonstration Architecture (Section 7):</p>
              <p>{t.prototypeDisclaimer}</p>
            </div>
          </div>
        </div>
      )}

      {/* Manakonline Architecture Integration Flow */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-600" />
          <span>National Registry Verification Architecture</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-blue-600 block">1. Scheme-I (ISI Mark)</span>
            <p className="text-slate-600 leading-relaxed">
              Checked against the 7 or 8-digit CM/L (Certification Marks Licence) directory on Manakonline.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-indigo-600 block">2. Compulsory Registration (CRS)</span>
            <p className="text-slate-600 leading-relaxed">
              Audited against MeitY CRS portal for electronics, batteries, IT hardware, and solar inverters.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-yellow-600 block">3. Hallmarking (HUID)</span>
            <p className="text-slate-600 leading-relaxed">
              6-digit alphanumeric laser hallmark mapped directly to the Assaying and Hallmarking Centre (AHC).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
