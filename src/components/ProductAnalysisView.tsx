import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Mic, 
  MicOff, 
  Edit3, 
  ArrowRight, 
  FileText, 
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Camera,
  Cpu,
  Layers
} from 'lucide-react';
import { Language, ProductContext } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { startSpeechRecognition, isSpeechRecognitionSupported } from '../utils/speech';

interface ProductAnalysisViewProps {
  product: ProductContext;
  language: Language;
  onConfirm: (confirmedProduct: ProductContext) => void;
  onRetake: () => void;
  onManualQuery: (query: string, correctedName?: string) => void;
}

export const ProductAnalysisView: React.FC<ProductAnalysisViewProps> = ({
  product,
  language,
  onConfirm,
  onRetake,
  onManualQuery,
}) => {
  const t = TRANSLATIONS[language];

  const [isCorrecting, setIsCorrecting] = useState(false);
  const [correctedName, setCorrectedName] = useState(product.name);
  const [correctedCategory, setCorrectedCategory] = useState(product.category);
  const [showRawOcr, setShowRawOcr] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [speechError, setSpeechError] = useState<string | null>(null);

  const isLowConfidence = product.confidence === 'low' || product.isBlurryOrUnclear;

  // Voice handler for fallback query
  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setSpeechError(null);
    setIsListening(true);

    startSpeechRecognition(
      language,
      (transcript) => {
        setVoiceQuery(transcript);
        setIsListening(false);
        onManualQuery(transcript, transcript);
      },
      (error) => {
        setSpeechError(error);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const handleApplyCorrection = () => {
    const updated: ProductContext = {
      ...product,
      name: correctedName,
      category: correctedCategory,
      confidence: 'high',
      confidenceScore: 100,
    };
    onConfirm(updated);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Step Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-1">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>STEP 2 — EXTRACT AND IDENTIFY</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'उत्पाद पहचान और सत्यापन' : 'Product Identification & OCR Validation'}
          </h1>
          <p className="text-xs text-slate-500">
            AI Vision + Pattern Extraction pipeline with mandatory human-in-the-loop verification.
          </p>
        </div>

        <button
          onClick={onRetake}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold self-start cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.btnRetake}</span>
        </button>
      </div>

      {/* Main Analysis Card: Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        {/* Left Column: Image with Scanner Reticle */}
        <div className="md:col-span-5 space-y-3">
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-square border border-slate-200 shadow-inner flex items-center justify-center">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-slate-400 text-xs font-mono">NO IMAGE PREVIEW</div>
            )}

            {/* Bounding Box Highlights for Detected ISI Mark */}
            {product.detectedMarkings.isiMarkDetected && (
              <div className="absolute top-4 right-4 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>ISI MARK DETECTED</span>
              </div>
            )}

            {/* Confidence Ribbon */}
            <div className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold shadow ${
              product.confidence === 'high'
                ? 'bg-emerald-600 text-white'
                : product.confidence === 'medium'
                ? 'bg-amber-500 text-white'
                : 'bg-rose-600 text-white'
            }`}>
              {product.confidence === 'high' && t.confidenceHigh}
              {product.confidence === 'medium' && t.confidenceMedium}
              {product.confidence === 'low' && t.confidenceLow}
              {' '}({product.confidenceScore}%)
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            {product.isBlurryOrUnclear 
              ? 'Warning: Low lighting or blurriness detected in frame.' 
              : 'OCR text extracted from packaging and markings.'}
          </p>
        </div>

        {/* Right Column: Identification Details & Confirmation Card */}
        <div className="md:col-span-7 space-y-6 flex flex-col justify-between">
          {!isLowConfidence && !isCorrecting ? (
            /* Confirmation Card (Section 2) */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  {t.confirmCardTitle}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {product.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                    {product.category}
                  </span>
                  {product.brand && (
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Brand: <strong>{product.brand}</strong>
                    </span>
                  )}
                  {product.model && (
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Model: <strong>{product.model}</strong>
                    </span>
                  )}
                </div>
              </div>

              {/* Detected Markings Summary Table */}
              <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 space-y-2 text-xs">
                <h4 className="font-bold text-slate-700 flex items-center justify-between">
                  <span>Detected BIS Markings</span>
                  <span className="text-[10px] text-slate-400 font-normal">Automated Regex / Vision</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Standard Number:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {product.detectedMarkings.isNumber || 'Not identified in frame'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Licence / CM/L:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {product.detectedMarkings.cmlNumber || 'None detected'}
                    </span>
                  </div>
                  {product.detectedMarkings.rNumber && (
                    <div>
                      <span className="text-slate-400 block text-[10px]">CRS Registration:</span>
                      <span className="font-mono font-bold text-indigo-700">
                        {product.detectedMarkings.rNumber}
                      </span>
                    </div>
                  )}
                  {product.detectedMarkings.huid && (
                    <div>
                      <span className="text-slate-400 block text-[10px]">Hallmark HUID:</span>
                      <span className="font-mono font-bold text-yellow-700">
                        {product.detectedMarkings.huid}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Mandatory Human Confirmation Question */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                <p className="font-semibold text-slate-900 text-sm">
                  {t.confirmQuestion}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    id="btn-confirm-yes"
                    onClick={() => onConfirm(product)}
                    className="flex-1 min-w-[140px] px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{t.btnYesContinue}</span>
                  </button>

                  <button
                    id="btn-confirm-no"
                    onClick={() => setIsCorrecting(true)}
                    className="flex-1 min-w-[140px] px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Edit3 className="w-4 h-4 text-slate-500" />
                    <span>{t.btnNoCorrect}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Fallback Flow (Section 2 & 10: If User selects No, or Confidence is Low) */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>{t.fallbackHeading}</span>
                </div>
                <p className="text-xs text-rose-700">
                  {t.fallbackSubheading}
                </p>
              </div>

              {/* Option A: Manual Product Name Correction Input */}
              <div className="space-y-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  {t.btnTypeManual}
                </h4>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={correctedName}
                    onChange={(e) => setCorrectedName(e.target.value)}
                    placeholder="e.g., Electric Iron, Packaged Water, Gold Bangle, Cable..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <div className="flex items-center gap-2">
                    <select
                      value={correctedCategory}
                      onChange={(e) => setCorrectedCategory(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white text-slate-700"
                    >
                      <option value="Electrical Appliances">Electrical Appliances</option>
                      <option value="Food & Packaged Goods">Food & Packaged Goods</option>
                      <option value="Jewellery & Precious Metals">Jewellery & Precious Metals</option>
                      <option value="Electronics & IT Goods">Electronics & IT Goods</option>
                      <option value="Electrical Cables & Wires">Electrical Cables & Wires</option>
                      <option value="Automotive Safety">Automotive Safety</option>
                      <option value="Consumer & Children Goods">Toys & Consumer Goods</option>
                      <option value="Other / General">Other / General</option>
                    </select>

                    <button
                      onClick={handleApplyCorrection}
                      disabled={!correctedName.trim()}
                      className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs transition-all cursor-pointer"
                    >
                      Save & Continue to Inquiries
                    </button>
                  </div>
                </div>
              </div>

              {/* Option B: Voice Query Input */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                    <Mic className="w-4 h-4 text-indigo-600" />
                    <span>{t.btnAskVoice}</span>
                  </h4>
                  {isListening && (
                    <span className="text-[10px] text-rose-600 font-bold animate-pulse">
                      Recording in {language === 'hi' ? 'हिन्दी' : 'English'}...
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleVoiceInput}
                    className={`p-3 rounded-full shadow transition-all cursor-pointer ${
                      isListening
                        ? 'bg-rose-600 text-white animate-bounce'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <p className="text-xs text-indigo-800">
                    {isListening 
                      ? 'Listening... Speak product name or your question clearly.'
                      : 'Tap the mic to say the product name in English or Hindi.'}
                  </p>
                </div>
                {speechError && (
                  <p className="text-[10px] text-rose-600">{speechError}</p>
                )}
              </div>

              {/* Option C: Retake / Upload Another Image */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={onRetake}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>{t.btnUploadAnother}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expandable OCR Pipeline Details (Section 9) */}
      <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
        <button
          onClick={() => setShowRawOcr(!showRawOcr)}
          className="w-full px-5 py-3.5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors text-xs font-bold text-slate-700"
        >
          <span className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Detected Information & OCR Pipeline Inspection (Section 9)</span>
          </span>
          {showRawOcr ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showRawOcr && (
          <div className="p-5 border-t border-slate-100 space-y-4 bg-slate-50/50 text-xs">
            {/* Pipeline Step Representation */}
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-600 pb-2 border-b border-slate-200">
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">1. Image</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">2. OCR Extraction</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">3. Text Cleaning</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">4. Pattern Detection</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">5. AI Validation</span>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-700">Raw Extracted OCR Text:</span>
              <pre className="p-3 bg-slate-900 text-emerald-400 rounded-xl font-mono text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {product.rawOcrText || '[No readable text extracted from uploaded frame]'}
              </pre>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Brand Regex Match</span>
                <span className="font-bold text-slate-800">{product.brand || 'None detected'}</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Standard Match</span>
                <span className="font-bold text-slate-800">{product.detectedMarkings.isNumber || 'None detected'}</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Licence Registry Format</span>
                <span className="font-bold text-slate-800">{product.detectedMarkings.cmlNumber || 'None detected'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
