import React from 'react';
import { 
  Camera, 
  MessageSquareText, 
  SearchCheck, 
  ShieldCheck, 
  BookOpen, 
  CheckCircle, 
  FlaskConical, 
  Gem, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles,
  Zap,
  Building2,
  Users,
  GraduationCap
} from 'lucide-react';
import { Language, ProductContext } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { DEMO_PRODUCTS } from '../data/demoProducts';

interface HomePageProps {
  language: Language;
  onNavigate: (tab: string) => void;
  onSelectDemoProduct: (product: ProductContext) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  onNavigate,
  onSelectDemoProduct,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-[#002147] border-b-4 border-[#FF9933] text-white p-8 sm:p-12 shadow-xl">
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#FF9933]/40 text-[#FF9933] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>Smart India Hackathon 2026 • Problem Statement 26107</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {t.heroHeading}
          </h1>

          <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed">
            {t.heroSubheading}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              id="hero-upload-cta"
              onClick={() => onNavigate('upload')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-[#FF9933] hover:bg-[#ff881a] text-[#002147] font-bold text-base shadow-lg shadow-orange-950/20 active:scale-95 transition-all cursor-pointer"
            >
              <Camera className="w-5 h-5 text-[#002147]" />
              <span>{t.uploadProductPhoto}</span>
            </button>

            <button
              id="hero-ask-cta"
              onClick={() => onNavigate('chat')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <MessageSquareText className="w-5 h-5 text-[#FF9933]" />
              <span>{t.askBisSahayak}</span>
            </button>
          </div>

          {/* Verification Badge */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-white">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Zero Hallucination Guarantee</span>
            </div>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-1.5 text-white">
              <ShieldCheck className="w-4 h-4 text-[#FF9933]" />
              <span>Quality Control Order (QCO) Grounding</span>
            </div>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-1.5 text-white">
              <SearchCheck className="w-4 h-4 text-blue-300" />
              <span>CM/L & HUID Direct Audit</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Innovation Journey: SHOW -> ASK -> VERIFY -> ACT */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {language === 'hi' ? 'मुख्य कार्यप्रणाली (SHOW → ASK → VERIFY → ACT)' : 'The Core Innovation: SHOW → ASK → VERIFY → ACT'}
            </h2>
            <p className="text-sm text-slate-500">
              {language === 'hi'
                ? 'उपयोगकर्ता को कहाँ खोजना है यह सोचने की आवश्यकता नहीं — सहायक हर चरण पर आपका मार्गदर्शन करता है।'
                : 'Empowering consumers & MSMEs without expecting prior knowledge of BIS standards.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1: SHOW */}
          <div 
            onClick={() => onNavigate('upload')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-bold flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Camera className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Step 1</span>
              <span className="text-xs text-slate-400">Scan</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
              {t.stepShow}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {t.stepShowDesc}
            </p>
          </div>

          {/* Step 2: ASK */}
          <div 
            onClick={() => onNavigate('chat')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <MessageSquareText className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Step 2</span>
              <span className="text-xs text-slate-400">RAG Q&A</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-700 transition-colors">
              {t.stepAsk}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {t.stepAskDesc}
            </p>
          </div>

          {/* Step 3: VERIFY */}
          <div 
            onClick={() => onNavigate('verify')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <SearchCheck className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Step 3</span>
              <span className="text-xs text-slate-400">Audit</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
              {t.stepVerify}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {t.stepVerifyDesc}
            </p>
          </div>

          {/* Step 4: ACT */}
          <div 
            onClick={() => onNavigate('complaint')}
            className="p-5 rounded-2xl bg-white border border-rose-200 hover:border-rose-500 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 font-bold flex items-center justify-center mb-3 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Step 4</span>
              <span className="text-xs text-slate-400">Redressal</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 group-hover:text-rose-700 transition-colors">
              {t.stepAct}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {t.stepActDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid (Section 11) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{t.quickActions}</h2>
            <p className="text-sm text-slate-500">
              {language === 'hi' ? 'भारतीय मानकों और सेवाओं के लिए सीधी सुविधाएं' : 'Fast-track pathways for common regulatory and consumer tasks'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Action 1: Know Your Standard */}
          <div
            id="action-know-standard"
            onClick={() => onNavigate('sources')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                {t.actionStandards}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'hi' ? 'अपने उत्पाद के लिए लागू भारतीय मानक (IS Number) और QCO निर्देश खोजें।' : 'Search applicable Indian Standards, specifications, and Quality Control Orders.'}
              </p>
            </div>
          </div>

          {/* Action 2: Verify Product Details */}
          <div
            id="action-verify-details"
            onClick={() => onNavigate('verify')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <SearchCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                {t.actionVerify}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'hi' ? '7-8 अंकों का CM/L नंबर या 8-अंकीय CRS R-नंबर दर्ज करके वैधता जांचें।' : 'Verify validity of CM/L licence numbers and MeitY CRS electronics registrations.'}
              </p>
            </div>
          </div>

          {/* Action 3: Certification Guidance */}
          <div
            id="action-cert-guidance"
            onClick={() => onNavigate('chat')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {t.actionGuidance}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'hi' ? 'MSME और स्टार्टअप्स के लिए BIS प्रमाणन लाइसेंस आवेदन प्रक्रिया की जानकारी।' : 'Step-by-step guidance for Scheme-I ISI Mark, FMCS foreign manufacturers & CRS.'}
              </p>
            </div>
          </div>

          {/* Action 4: Find Testing Information */}
          <div
            id="action-testing-labs"
            onClick={() => onNavigate('sources')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">
                {t.actionLabs}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'hi' ? 'BIS और NABL मान्यता प्राप्त परीक्षण प्रयोगशालाओं की सूची और टेस्ट पैरामीटर।' : 'Directory of BIS Central Laboratories, NABL testing labs, and test parameters.'}
              </p>
            </div>
          </div>

          {/* Action 5: Hallmarking Guide */}
          <div
            id="action-hallmarking"
            onClick={() => onNavigate('verify')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-yellow-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
              <Gem className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 group-hover:text-yellow-600 transition-colors">
                {t.actionHallmark}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'hi' ? 'सोने के आभूषणों पर 6-अंकीय HUID कोड की प्रमाणिकता और शुद्धता मानक (IS 1417)।' : '6-digit alphanumeric HUID verification and compulsory gold hallmarking regulations.'}
              </p>
            </div>
          </div>

          {/* Action 6: Report Suspicious Product */}
          <div
            id="action-report-suspicious"
            onClick={() => onNavigate('complaint')}
            className="p-5 rounded-2xl bg-white border border-rose-200 hover:border-rose-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 group-hover:text-rose-600 transition-colors">
                {t.actionReport}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'hi' ? 'नकली ISI मार्क या घटिया गुणवत्ता वाले उत्पादों की शिकायत का ड्राफ्ट तैयार करें।' : 'Conversational evidence gathering and draft creation for counterfeit or fake marks.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Evaluation Strip (SIH Evaluators / Hackathon Testing) */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="font-bold text-slate-900 text-base">
                {language === 'hi' ? 'हैकथॉन डेमो मोड (1-क्लिक परीक्षण)' : 'Hackathon Demo Evaluation Suite (1-Click Test Scenarios)'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'hi'
                ? 'मूल्यांकनकर्ता नीचे दिए गए किसी भी उत्पाद पर क्लिक करके पूरी प्रक्रिया तुरंत परख सकते हैं:'
                : 'Instantly load authentic products, edge cases, and counterfeit alerts to test the full SHOW → ASK → VERIFY → ACT pipeline:'}
            </p>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-1 rounded border border-slate-200 self-start sm:self-auto">
            SIH 2026 Ready
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DEMO_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectDemoProduct(prod)}
              className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex items-center gap-3 group"
            >
              <img
                src={prod.imageUrl}
                alt={prod.name}
                className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <div className="overflow-hidden space-y-0.5 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                    prod.confidence === 'low' 
                      ? 'bg-amber-100 text-amber-800'
                      : prod.id === 'demo-fake-cable'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {prod.tag}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                  {prod.name}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {language === 'hi' ? prod.hindiDescription : prod.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* Target Audiences Section */}
      <section className="border-t border-slate-200 pt-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 text-center">
          {language === 'hi' ? 'किनके लिए है बीआईएस सहायक एआई?' : 'Empowering India\'s Manufacturing & Consumer Ecosystem'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm space-y-2">
            <Users className="w-6 h-6 text-blue-600 mx-auto" />
            <h4 className="font-semibold text-sm text-slate-900">{language === 'hi' ? 'उपभोक्ता' : 'Consumers'}</h4>
            <p className="text-xs text-slate-500">{language === 'hi' ? 'असली ISI मार्क पहचानें और धोखाधड़ी से बचें' : 'Verify genuine ISI markings & HUID on everyday goods'}</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm space-y-2">
            <Building2 className="w-6 h-6 text-indigo-600 mx-auto" />
            <h4 className="font-semibold text-sm text-slate-900">{language === 'hi' ? 'MSME व निर्माता' : 'MSMEs & Startups'}</h4>
            <p className="text-xs text-slate-500">{language === 'hi' ? 'लाइसेंस प्रक्रिया और लैब टेस्टिंग का स्पष्ट मार्गदर्शन' : 'Streamline BIS licence requirements & testing protocols'}</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm space-y-2">
            <Zap className="w-6 h-6 text-amber-600 mx-auto" />
            <h4 className="font-semibold text-sm text-slate-900">{language === 'hi' ? 'उद्योग व निर्यातक' : 'Industries & Importers'}</h4>
            <p className="text-xs text-slate-500">{language === 'hi' ? 'CRS और QCO नियामक आदेशों का समय पर पालन' : 'Navigate MeitY CRS, FMCS, and mandatory QCOs'}</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm space-y-2">
            <GraduationCap className="w-6 h-6 text-emerald-600 mx-auto" />
            <h4 className="font-semibold text-sm text-slate-900">{language === 'hi' ? 'छात्र व शोधकर्ता' : 'Students & Researchers'}</h4>
            <p className="text-xs text-slate-500">{language === 'hi' ? 'भारतीय मानक ब्यूरो के दस्तावेज़ों का अध्ययन' : 'Access structured specifications and standards data'}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
