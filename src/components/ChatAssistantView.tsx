import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  AlertTriangle, 
  ChevronRight, 
  RotateCcw,
  Info,
  BookOpen,
  ArrowRight,
  FileCheck2,
  Building,
  CheckCircle2,
  Bot
} from 'lucide-react';
import { ChatMessage, Language, ProductContext, StructuredAnswer } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { startSpeechRecognition, speakText, stopSpeaking } from '../utils/speech';
import { retrieveRelevantStandards } from '../data/bisDatabase';

interface ChatAssistantViewProps {
  product: ProductContext | null;
  language: Language;
  messages: ChatMessage[];
  onSendMessage: (query: string) => Promise<void>;
  onNavigateToReport: (prefillIssue?: string) => void;
  onNavigateToVerify: (numberToVerify?: string) => void;
  onClearChat: () => void;
}

export const ChatAssistantView: React.FC<ChatAssistantViewProps> = ({
  product,
  language,
  messages,
  onSendMessage,
  onNavigateToReport,
  onNavigateToVerify,
  onClearChat,
}) => {
  const t = TRANSLATIONS[language];
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeSpeechIndex, setActiveSpeechIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedSourceDrawer, setSelectedSourceDrawer] = useState<any | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Quick suggestion chips defined in Problem Statement
  const suggestionChips = [
    { label: t.chipStandard, query: language === 'hi' ? 'इस उत्पाद के लिए कौन सा भारतीय मानक (IS Number) लागू होता है?' : 'What BIS standard applies to this product?' },
    { label: t.chipMandatory, query: language === 'hi' ? 'क्या इस उत्पाद के लिए BIS प्रमाणन अनिवार्य है?' : 'Is certification mandatory for this product?' },
    { label: t.chipVerify, query: language === 'hi' ? 'उत्पाद पर छपे BIS / लाइसेंस नंबर की सत्यता कैसे जांचें?' : 'How to verify the BIS licence number shown on this product?' },
    { label: t.chipProcess, query: language === 'hi' ? 'BIS प्रमाणन या लाइसेंस प्राप्त करने की प्रक्रिया क्या है?' : 'How can a manufacturer apply for a BIS certification licence?' },
    { label: t.chipTesting, query: language === 'hi' ? 'इस उत्पाद के लिए कौन से परीक्षण (Testing requirements) जरूरी हैं?' : 'What testing requirements apply to this product under Indian Standards?' },
    { label: t.chipLabs, query: language === 'hi' ? 'इस उत्पाद की जांच किन मान्यता प्राप्त प्रयोगशालाओं (Labs) में हो सकती है?' : 'Which laboratories are recognized to test this product?' },
    { label: t.chipConsumer, query: language === 'hi' ? 'उपभोक्ता सुरक्षा नियम और अधिकार क्या हैं?' : 'What consumer rights and safety precautions apply to this product?' },
    { label: t.chipReport, query: language === 'hi' ? 'यदि उत्पाद नकली या संदिग्ध लगे तो शिकायत कैसे करें?' : 'How do I report this suspicious or fake marked product?' },
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim() || isSending) return;

    setInputText('');
    setIsSending(true);
    try {
      await onSendMessage(textToSend);
    } finally {
      setIsSending(false);
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setSpeechError(null);
    setIsListening(true);

    startSpeechRecognition(
      language,
      (transcript) => {
        setIsListening(false);
        handleSend(transcript);
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

  const handleSpeak = (text: string, index: number) => {
    if (activeSpeechIndex === index) {
      stopSpeaking();
      setActiveSpeechIndex(null);
      return;
    }

    setActiveSpeechIndex(index);
    speakText(text, language, () => {
      setActiveSpeechIndex(null);
    });
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-2">
      {/* 3-Column Interface (Section 12 Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[750px]">
        {/* LEFT COLUMN: Navigation / Quick Commands & Active Context (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Active Product Card Context */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-[4px_0_15px_rgba(0,0,0,0.02)] space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Active Context
            </span>
            {product ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-xs text-slate-900 truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#002147] font-semibold truncate">
                      {product.category}
                    </p>
                  </div>
                </div>

                {product.detectedMarkings.cmlNumber && (
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono">CM/L:</span>
                    <button
                      onClick={() => onNavigateToVerify(product.detectedMarkings.cmlNumber)}
                      className="text-[#002147] font-mono font-bold hover:underline"
                    >
                      {product.detectedMarkings.cmlNumber}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-slate-500 py-2">
                {language === 'hi'
                  ? 'सामान्य बीआईएस परामर्श मोड। विशिष्ट उत्पाद संदर्भ के लिए फोटो अपलोड करें।'
                  : 'General BIS consultation mode. Upload a product photo to load product-specific standards.'}
              </div>
            )}
          </div>

          {/* Quick Commands / Suggestion Chips */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-[4px_0_15px_rgba(0,0,0,0.02)] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
                <span>{t.quickSuggestions}</span>
              </h3>
            </div>

            <div className="flex flex-col space-y-2">
              {suggestionChips.map((chip, idx) => {
                const dotColors = [
                  'bg-[#FF9933]',
                  'bg-blue-500',
                  'bg-emerald-500',
                  'bg-indigo-500',
                  'bg-amber-500',
                  'bg-teal-500',
                  'bg-purple-500',
                  'bg-red-500',
                ];
                return (
                  <button
                    key={idx}
                    onClick={() => handleSend(chip.query)}
                    disabled={isSending}
                    className="text-left p-3 text-xs font-medium rounded-xl border border-slate-100 hover:border-[#002147] hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between group disabled:opacity-50"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className={`w-2 h-2 rounded-full ${dotColors[idx % dotColors.length]} group-hover:scale-125 transition-transform shrink-0`}></span>
                      <span className="truncate pr-1 text-slate-700 font-medium group-hover:text-[#002147]">{chip.label}</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#002147] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Action: Report Suspicious item */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Suspicious Marking Detected?</span>
            </div>
            <p className="text-[11px] text-rose-700 leading-relaxed">
              If an ISI mark appears forged or unverified, draft an evidence-backed complaint.
            </p>
            <button
              onClick={() => onNavigateToReport(product?.name)}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              Report a Suspicious Product
            </button>
          </div>

          {/* Prototype Quote Section from Immersive UI */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-[11px] text-slate-500 italic mb-2 leading-relaxed">
              "Helping you navigate the landscape of Indian Standards with trust and transparency."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#002147] text-white flex items-center justify-center text-[10px] font-bold">
                AI
              </div>
              <span className="text-[10px] font-bold text-slate-600">v2.4 Prototype</span>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Conversation Stream (lg:col-span-6) */}
        <div className="lg:col-span-6 flex flex-col bg-[#f1f5f9] rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-[780px]">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#002147] text-white flex items-center justify-center shadow-md shadow-blue-950/20">
                <Bot className="w-5 h-5 text-[#FF9933]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>BIS Sahayak</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </h2>
                <p className="text-[11px] text-slate-500">
                  {language === 'hi' ? 'स्रोत-आधारित नियामक सहायक' : 'RAG Grounded BIS Standards Knowledge'}
                </p>
              </div>
            </div>

            <button
              onClick={onClearChat}
              title="Reset Conversation"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                  <ShieldCheck className="w-8 h-8 text-amber-500" />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h3 className="font-bold text-slate-800 text-sm">
                    {language === 'hi' ? 'प्रमाणित बीआईएस ज्ञान सहायक' : 'Welcome to BIS Sahayak AI'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'hi'
                      ? 'लागू मानक, अनिवार्य नियम, परीक्षण व प्रयोगशालाओं के बारे में पूछें अथवा बायीं ओर दिए गए सुझावों में से चुनें।'
                      : 'Ask about applicable standards, mandatory QCOs, testing limits, or click any suggested inquiry on the left.'}
                  </p>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  } space-y-1.5`}
                >
                  <div
                    className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-4 shadow-sm text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#002147] text-white rounded-br-none'
                        : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <p>{msg.text}</p>
                    ) : (
                      /* Structured BIS Answer (Section 5 & 6 Format) */
                      <div className="space-y-3.5">
                        {/* 1. Answer */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#002147] block">
                            Answer
                          </span>
                          <p className="text-slate-800 leading-relaxed font-normal">
                            {msg.structuredResponse?.answer || msg.text}
                          </p>
                        </div>

                        {/* 2. Applicable Standard / Service */}
                        {msg.structuredResponse?.applicableStandard && (
                          <div className="p-3 rounded-xl bg-[#fff9f2] border border-[#ffedd5] space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#c2410c] flex items-center gap-1">
                              <BookOpen className="w-3.5 h-3.5 text-[#FF9933]" />
                              <span>Applicable Standard / Service</span>
                            </span>
                            <p className="font-semibold text-xs text-slate-900">
                              {msg.structuredResponse.applicableStandard}
                            </p>
                          </div>
                        )}

                        {/* 3. Source / Reference (Section 6 Expandable Source Cards) */}
                        {msg.structuredResponse?.sources && msg.structuredResponse.sources.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                              Authorized Source & Reference
                            </span>
                            <div className="space-y-1.5">
                              {msg.structuredResponse.sources.map((src, sIdx) => (
                                <div
                                  key={sIdx}
                                  onClick={() => setSelectedSourceDrawer(src)}
                                  className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer flex items-center justify-between text-xs group"
                                >
                                  <div className="overflow-hidden pr-2">
                                    <p className="font-bold text-slate-800 truncate">
                                      {src.documentName}
                                    </p>
                                    <p className="text-[11px] text-slate-500 truncate">
                                      {src.relevantSection} {src.page ? `• ${src.page}` : ''}
                                    </p>
                                  </div>
                                  <span className="text-[10px] text-blue-600 font-semibold group-hover:underline shrink-0">
                                    View Source
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 4. Recommended Next Action */}
                        {msg.structuredResponse?.recommendedAction && (
                          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                            <span className="font-bold uppercase tracking-wider text-emerald-800 text-[10px] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Recommended Action</span>
                            </span>
                            <p className="text-slate-800">
                              {msg.structuredResponse.recommendedAction}
                            </p>
                          </div>
                        )}

                        {/* Contextual Follow-up Suggestions */}
                        {msg.structuredResponse?.quickFollowUps && msg.structuredResponse.quickFollowUps.length > 0 && (
                          <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              Ask Follow-up
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.structuredResponse.quickFollowUps.map((fu, fIdx) => (
                                <button
                                  key={fIdx}
                                  onClick={() => handleSend(fu)}
                                  className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-700 transition-colors text-left"
                                >
                                  {fu}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tool Actions: Copy, Listen/TTS, Sources */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-500">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleCopy(msg.structuredResponse?.answer || msg.text, index)}
                              className="flex items-center space-x-1 hover:text-slate-900 transition-colors cursor-pointer"
                              title="Copy Answer"
                            >
                              {copiedIndex === index ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                              <span>{copiedIndex === index ? 'Copied' : 'Copy'}</span>
                            </button>

                            <button
                              onClick={() => handleSpeak(msg.structuredResponse?.answer || msg.text, index)}
                              className="flex items-center space-x-1 hover:text-slate-900 transition-colors cursor-pointer"
                              title="Listen via Text-to-Speech"
                            >
                              {activeSpeechIndex === index ? (
                                <>
                                  <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                                  <span className="text-rose-600">Stop</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Listen</span>
                                </>
                              )}
                            </button>
                          </div>

                          <span className="text-[10px] text-slate-400">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {isSending && (
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-100 rounded-2xl rounded-bl-none p-3.5 text-xs text-slate-500 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                  <span>Retrieving BIS standards & synthesizing answer...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Regulatory Disclaimer Banner (Section 12) */}
          <div className="px-4 py-1.5 bg-slate-100 border-t border-slate-200 text-[10px] text-slate-500 text-center leading-tight">
            {t.disclaimer}
          </div>

          {/* Input Box Area with Voice Mic */}
          <div className="p-4 bg-white border-t border-slate-200 space-y-2">
            <div className="flex items-center gap-2 bg-slate-50 rounded-2xl px-3 py-2 border border-slate-200 focus-within:border-[#002147] transition-all">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={t.chatPlaceholder}
                disabled={isSending}
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-900 placeholder:text-slate-400 px-2"
              />

              {/* Speech-to-text Mic Button */}
              <button
                type="button"
                onClick={handleVoiceToggle}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'text-slate-500 hover:text-[#002147] hover:bg-slate-200'
                }`}
                title={isListening ? t.stopListening : t.listening}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!inputText.trim() || isSending}
                className="w-10 h-10 bg-[#002147] hover:bg-[#001733] disabled:opacity-40 text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-950/20 active:scale-95 transition-all cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4 text-[#FF9933]" />
              </button>
            </div>

            {speechError && (
              <p className="text-[10px] text-rose-600">{speechError}</p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Product Context / Sources / Detected Information (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-[4px_0_15px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-[#002147]" />
              <span>Intelligence Report</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Product Identity</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">VERIFIED</span>
                </div>
                <span className="font-bold text-slate-900 block text-xs">
                  {product?.name || 'General Product Session'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider mb-1">Certification Scheme</span>
                <span className="font-semibold text-slate-900 block">
                  {product?.category === 'Jewellery & Precious Metals'
                    ? 'Hallmarking (IS 1417)'
                    : product?.category === 'Electronics & IT Goods'
                    ? 'Compulsory Registration (CRS)'
                    : 'Product Certification Scheme-I (ISI)'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider mb-1">Regulatory Mandate</span>
                <span className="font-semibold text-slate-900 block">
                  Quality Control Order (QCO) Mandatory
                </span>
              </div>

              {/* RAG Source Highlight Box from Immersive UI */}
              <div className="p-4 bg-[#fff9f2] rounded-2xl border border-[#ffedd5] space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#FF9933]" />
                  <span className="text-xs font-bold text-[#c2410c]">RAG Source Library</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Extracted from Official BIS Standards Portal & Gazette Quality Control Order regulations.
                </p>
                <button
                  onClick={() => onNavigateToVerify(product?.detectedMarkings.cmlNumber || product?.detectedMarkings.rNumber || product?.detectedMarkings.huid)}
                  className="text-[11px] font-bold text-[#002147] underline underline-offset-2 hover:text-[#FF9933] transition-colors block pt-1"
                >
                  Verify on Official Portal →
                </button>
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Next Steps</h4>
              <button
                onClick={() => onNavigateToVerify(product?.detectedMarkings.cmlNumber)}
                className="w-full p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-100 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Check Validity</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigateToReport(product?.name)}
                className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Report Suspicious</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Expandable Source Preview Card */}
          {selectedSourceDrawer && (
            <div className="bg-[#002147] text-white rounded-2xl p-4 shadow-lg space-y-3 border border-slate-800">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF9933]">
                  Source Inspector
                </span>
                <button
                  onClick={() => setSelectedSourceDrawer(null)}
                  className="text-slate-300 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-white leading-tight">
                  {selectedSourceDrawer.documentName}
                </h4>
                <p className="text-slate-200 text-[11px]">
                  <strong>Section/Clause:</strong> {selectedSourceDrawer.relevantSection}
                </p>
                {selectedSourceDrawer.page && (
                  <p className="text-slate-300 text-[11px]">
                    <strong>Page:</strong> {selectedSourceDrawer.page}
                  </p>
                )}
                {selectedSourceDrawer.publisher && (
                  <p className="text-slate-300 text-[11px]">
                    <strong>Publisher:</strong> {selectedSourceDrawer.publisher}
                  </p>
                )}
              </div>

              <a
                href={selectedSourceDrawer.url || 'https://www.services.bis.gov.in'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-xl bg-[#FF9933] hover:bg-[#ff881a] text-[#002147] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Open in Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
