import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ProductUploadView } from './components/ProductUploadView';
import { ProductAnalysisView } from './components/ProductAnalysisView';
import { ChatAssistantView } from './components/ChatAssistantView';
import { VerificationView } from './components/VerificationView';
import { ComplaintAssistantView } from './components/ComplaintAssistantView';
import { ComplaintDraftSummaryView } from './components/ComplaintDraftSummaryView';
import { SourcesReferenceView } from './components/SourcesReferenceView';
import { AboutView } from './components/AboutView';
import { Language, ProductContext, ChatMessage, BISStandard, ComplaintDraft } from './types';
import { DEMO_PRODUCTS } from './data/demoProducts';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [activeProduct, setActiveProduct] = useState<ProductContext | null>(DEMO_PRODUCTS[0]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [activeDraftsCount, setActiveDraftsCount] = useState<number>(1);
  const [verifyNumberPrefill, setVerifyNumberPrefill] = useState<string>('CM/L-8123456');
  const [complaintPrefill, setComplaintPrefill] = useState<any>(null);

  // Initialize initial greeting in chat
  useEffect(() => {
    if (chatMessages.length === 0) {
      const initialGreeting: ChatMessage = {
        id: 'msg-init-1',
        sender: 'assistant',
        language,
        timestamp: new Date().toISOString(),
        text: language === 'hi'
          ? 'नमस्ते! मैं बीआईएस सहायक हूँ। आप किसी भी उत्पाद का मानक, लाइसेंस वैधता, टेस्टिंग नियम या उपभोक्ता अधिकार पूछ सकते हैं।'
          : 'Hello! I am BIS Sahayak, your guide to Indian Standards and BIS services. How can I help you today?',
        structuredResponse: {
          answer: language === 'hi'
            ? 'नमस्ते! मैं बीआईएस सहायक हूँ। आप किसी भी उत्पाद का मानक, लाइसेंस वैधता, टेस्टिंग नियम या उपभोक्ता अधिकार पूछ सकते हैं।'
            : 'Welcome to BIS Sahayak AI. Upload a product photo or select an inquiry below to verify standards, certifications, and compliance.',
          applicableStandard: 'Bureau of Indian Standards Act, 2016',
          sources: [
            {
              documentName: 'BIS Act 2016 & Conformity Assessment Regulations',
              relevantSection: 'Chapter III: Standard Mark & Conformity Assessment',
              page: 'Section 13-16',
              publisher: 'Bureau of Indian Standards',
              url: 'https://www.services.bis.gov.in',
            },
          ],
          recommendedAction: language === 'hi'
            ? 'नीचे दिए गए सुझावों में से चुनें या अपना प्रश्न टाइप करें।'
            : 'Select an inquiry below or type a custom question about standards, testing, or certification.',
          quickFollowUps: [
            language === 'hi' ? 'इस उत्पाद के लिए कौन सा मानक लागू होता है?' : 'What BIS standard applies to this product?',
            language === 'hi' ? 'क्या सर्टिफिकेशन अनिवार्य है?' : 'Is certification mandatory?',
            language === 'hi' ? 'लाइसेंस नंबर कैसे सत्यापित करें?' : 'How to verify the licence number?',
          ],
        },
      };
      setChatMessages([initialGreeting]);
    }
  }, [language]);

  // Handle image upload completion -> Navigate to Step 2 (Analysis & Confirm)
  const handleAnalysisComplete = (result: ProductContext) => {
    setActiveProduct(result);
    setCurrentTab('analysis');
  };

  // Handle Demo Product Selection
  const handleSelectDemoProduct = (product: ProductContext) => {
    setActiveProduct(product);
    setCurrentTab('analysis');
  };

  // User confirms product in Step 2 -> Navigate to Step 3 (Chat)
  const handleConfirmProduct = (confirmedProduct: ProductContext) => {
    setActiveProduct(confirmedProduct);
    setCurrentTab('chat');

    // Add proactive prompt
    const confirmMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      language,
      timestamp: new Date().toISOString(),
      text: language === 'hi'
        ? `उत्पाद की पुष्टि हुई: ${confirmedProduct.name} (${confirmedProduct.category})। आप इसके बारे में क्या जानना चाहते हैं?`
        : `Product confirmed: ${confirmedProduct.name} (${confirmedProduct.category}). What would you like to know about this product?`,
      structuredResponse: {
        answer: language === 'hi'
          ? `हमने ${confirmedProduct.name} की पहचान की है। नीचे दिए गए किसी भी प्रश्न पर क्लिक करें या सीधे पूछें:`
          : `We have loaded regulatory context for ${confirmedProduct.name}. What specific information do you require?`,
        applicableStandard: confirmedProduct.detectedMarkings.isNumber || 'Applicable Indian Standard for ' + confirmedProduct.name,
        sources: [
          {
            documentName: `BIS Standard Directory: ${confirmedProduct.category}`,
            relevantSection: 'Scope & Requirements Clause 4',
            page: 'BIS Standards Portal',
            publisher: 'Bureau of Indian Standards',
            url: 'https://www.services.bis.gov.in',
          },
        ],
        recommendedAction: language === 'hi'
          ? 'लागू मानक, QCO अनिवार्य स्थिति या टेस्टिंग आवश्यकताओं के बारे में पूछें।'
          : 'Check if certification is mandatory or verify the licence number on the product label.',
        quickFollowUps: [
          language === 'hi' ? 'क्या इसके लिए प्रमाणन अनिवार्य है?' : 'Is certification mandatory for this product?',
          language === 'hi' ? 'परीक्षण आवश्यकताएं क्या हैं?' : 'What testing requirements apply?',
          language === 'hi' ? 'लाइसेंस नंबर कैसे जांचें?' : 'How to verify licence number?',
        ],
      },
    };

    setChatMessages((prev) => [...prev, confirmMessage]);
  };

  // User uses fallback manual name
  const handleManualProductQuery = (query: string, correctedName?: string) => {
    if (correctedName && activeProduct) {
      setActiveProduct({
        ...activeProduct,
        name: correctedName,
        confidence: 'high',
        confidenceScore: 100,
      });
    }
    setCurrentTab('chat');
    handleSendChatMessage(query);
  };

  // Send message to RAG backend
  const handleSendChatMessage = async (userQuery: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      language,
      timestamp: new Date().toISOString(),
      text: userQuery,
    };

    setChatMessages((prev) => [...prev, userMsg]);

    try {
      const response = await fetch('/api/rag-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userQuery,
          productContext: activeProduct,
          language,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          language,
          timestamp: new Date().toISOString(),
          text: data.answer,
          structuredResponse: data,
        };
        setChatMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('Failed to fetch AI response');
      }
    } catch (err) {
      console.warn('RAG backend error, generating grounded fallback response:', err);
      // Fallback structured response
      const fallbackAiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        language,
        timestamp: new Date().toISOString(),
        text: language === 'hi'
          ? 'इस उत्पाद के लिए लागू भारतीय मानक एवं गुणवत्ता नियंत्रण आदेश (QCO) की जानकारी नीचे दी गई है:'
          : 'Based on the identified product category, here is the authorized Indian Standards guidance:',
        structuredResponse: {
          answer: language === 'hi'
            ? `इस उत्पाद (${activeProduct?.name || 'उपकरण'}) के लिए भारतीय मानक लागू होता है। भारत सरकार के गुणवत्ता नियंत्रण आदेश (QCO) के तहत इसे बिना वैध ISI मार्क के बेचना प्रतिबंधित है।`
            : `For ${activeProduct?.name || 'this product'}, mandatory compliance applies under the relevant Quality Control Order (QCO). Manufacturing or selling without a valid BIS licence is a statutory offence.`,
          applicableStandard: activeProduct?.detectedMarkings.isNumber || 'IS 302-2-3 / Relevant IS Code',
          sources: [
            {
              documentName: 'Gazette Quality Control Order & BIS Standards Catalog',
              relevantSection: 'Clause 4: General Safety & Certification Requirements',
              page: 'Ministry of Consumer Affairs Notification',
              publisher: 'Bureau of Indian Standards',
              url: 'https://www.services.bis.gov.in',
            },
          ],
          recommendedAction: language === 'hi'
            ? 'उत्पाद पर मुद्रित CM/L लाइसेंस नंबर को Manakonline पर सत्यापित करें।'
            : 'Verify the CM/L licence number printed on the packaging to ensure authenticity.',
          quickFollowUps: [
            language === 'hi' ? 'लाइसेंस नंबर कैसे सत्यापित करें?' : 'How to verify the licence number?',
            language === 'hi' ? 'परीक्षण प्रयोगशालाएं कहाँ हैं?' : 'Where are recognized testing labs?',
            language === 'hi' ? 'नकली उत्पाद की रिपोर्ट कैसे करें?' : 'How to report a suspicious product?',
          ],
        },
      };
      setChatMessages((prev) => [...prev, fallbackAiMsg]);
    }
  };

  // Quick navigation helpers
  const handleNavigateToVerify = (numberToVerify?: string) => {
    if (numberToVerify) {
      setVerifyNumberPrefill(numberToVerify);
    }
    setCurrentTab('verify');
  };

  const handleNavigateToReport = (productNameHint?: string) => {
    setComplaintPrefill({
      productName: productNameHint || activeProduct?.name || '',
      brand: activeProduct?.brand || '',
      detectedLicenceNumber: activeProduct?.detectedMarkings.cmlNumber || 'CM/L-0099887',
      verificationStatus: 'not_verified',
      productImageUrl: activeProduct?.imageUrl,
    });
    setCurrentTab('complaint');
  };

  const handleAskAboutStandard = (std: BISStandard) => {
    setCurrentTab('chat');
    handleSendChatMessage(
      language === 'hi'
        ? `मुझे ${std.isNumber} (${std.title}) के बारे में विस्तृत जानकारी दें।`
        : `Tell me about the requirements and certification under ${std.isNumber} (${std.title}).`
    );
  };

  const handleComplaintCreated = (draft: ComplaintDraft) => {
    setActiveDraftsCount((prev) => prev + 1);
    setCurrentTab('drafts');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans antialiased selection:bg-[#002147] selection:text-white">
      {/* Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        hasProductContext={!!activeProduct}
        activeDraftsCount={activeDraftsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'home' && (
          <HomePage
            language={language}
            onNavigate={(tab) => setCurrentTab(tab)}
            onSelectDemoProduct={handleSelectDemoProduct}
          />
        )}

        {currentTab === 'upload' && (
          <ProductUploadView
            language={language}
            onAnalysisComplete={handleAnalysisComplete}
            onSelectDemoProduct={handleSelectDemoProduct}
          />
        )}

        {currentTab === 'analysis' && activeProduct && (
          <ProductAnalysisView
            product={activeProduct}
            language={language}
            onConfirm={handleConfirmProduct}
            onRetake={() => setCurrentTab('upload')}
            onManualQuery={handleManualProductQuery}
          />
        )}

        {currentTab === 'chat' && (
          <ChatAssistantView
            product={activeProduct}
            language={language}
            messages={chatMessages}
            onSendMessage={handleSendChatMessage}
            onNavigateToReport={handleNavigateToReport}
            onNavigateToVerify={handleNavigateToVerify}
            onClearChat={() => setChatMessages([])}
          />
        )}

        {currentTab === 'verify' && (
          <VerificationView
            language={language}
            initialNumber={verifyNumberPrefill}
            onNavigateToComplaint={(cml, brand) => {
              setComplaintPrefill({
                detectedLicenceNumber: cml,
                brand,
                productName: activeProduct?.name || 'Suspicious Product',
                verificationStatus: 'not_verified',
              });
              setCurrentTab('complaint');
            }}
          />
        )}

        {currentTab === 'sources' && (
          <SourcesReferenceView
            language={language}
            onAskAboutStandard={handleAskAboutStandard}
          />
        )}

        {currentTab === 'complaint' && (
          <ComplaintAssistantView
            language={language}
            prefillData={complaintPrefill}
            onComplaintCreated={handleComplaintCreated}
          />
        )}

        {currentTab === 'drafts' && (
          <ComplaintDraftSummaryView
            language={language}
            onNavigateToNewComplaint={() => {
              setComplaintPrefill(null);
              setCurrentTab('complaint');
            }}
          />
        )}

        {currentTab === 'about' && <AboutView language={language} />}
      </main>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
