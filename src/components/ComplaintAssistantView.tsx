import React, { useState, useRef } from 'react';
import { 
  AlertTriangle, 
  Camera, 
  UploadCloud, 
  FileText, 
  Store, 
  MapPin, 
  Receipt, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  Edit3, 
  ShieldAlert,
  Loader2,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { Language, ComplaintDraft } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ComplaintAssistantViewProps {
  language: Language;
  prefillData?: {
    productName?: string;
    brand?: string;
    detectedLicenceNumber?: string;
    verificationStatus?: string;
    productImageUrl?: string;
  };
  onComplaintCreated: (draft: ComplaintDraft) => void;
}

export const ComplaintAssistantView: React.FC<ComplaintAssistantViewProps> = ({
  language,
  prefillData,
  onComplaintCreated,
}) => {
  const t = TRANSLATIONS[language];

  // Form State
  const [productName, setProductName] = useState(prefillData?.productName || '');
  const [brand, setBrand] = useState(prefillData?.brand || '');
  const [shopName, setShopName] = useState('');
  const [shopLocation, setShopLocation] = useState('');
  const [issueDescription, setIssueDescription] = useState(
    'Counterfeit ISI mark displayed on packaging. Product lacks proper insulation and heats up dangerously. Licence number is unverified.'
  );
  const [detectedLicenceNumber, setDetectedLicenceNumber] = useState(
    prefillData?.detectedLicenceNumber || 'CM/L-0099887'
  );
  const [verificationStatus, setVerificationStatus] = useState<any>(
    prefillData?.verificationStatus || 'not_verified'
  );

  // Evidence Files
  const [productPhoto, setProductPhoto] = useState<string | null>(
    prefillData?.productImageUrl || null
  );
  const [billPhoto, setBillPhoto] = useState<string | null>(null);
  const [billOcrData, setBillOcrData] = useState<any>(null);
  const [isProcessingBillOcr, setIsProcessingBillOcr] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedDraft, setSubmittedDraft] = useState<ComplaintDraft | null>(null);

  const billInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Handle Bill Upload & Simulate Bill OCR Extraction (Section 8)
  const handleBillUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setBillPhoto(base64);
        runBillOcr(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const runBillOcr = (base64: string) => {
    setIsProcessingBillOcr(true);
    // Simulate smart bill OCR extraction
    setTimeout(() => {
      const extracted = {
        invoiceNo: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toLocaleDateString('en-GB'),
        sellerName: shopName || 'Shree Balaji Electricals & Hardware',
        amount: '₹ 1,250.00',
      };
      setBillOcrData(extracted);
      if (!shopName) setShopName(extracted.sellerName);
      if (!shopLocation) setShopLocation('Shop 14, Main Market, Chandni Chowk, Delhi');
      setIsProcessingBillOcr(false);
    }, 900);
  };

  const handleQuickFillSample = () => {
    setProductName('EverPower 2.5 sq mm PVC Electrical Wire');
    setBrand('EverPower Cables');
    setShopName('Shree Balaji Electricals & Hardware');
    setShopLocation('Shop 14, Main Market, Chandni Chowk, Old Delhi - 110006');
    setIssueDescription(
      'Counterfeit ISI mark displayed on outer packaging. Wire started heating and smoking under standard 10A domestic load. CM/L number 0099887 is non-existent on the BIS Manakonline database.'
    );
    setDetectedLicenceNumber('CM/L-0099887');
    setVerificationStatus('not_verified');
    setBillOcrData({
      invoiceNo: 'INV-2026/894',
      date: '28-Feb-2026',
      sellerName: 'Shree Balaji Electricals',
      amount: '₹ 1,450.00',
    });
  };

  const handleSubmitDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !shopName || !issueDescription) return;

    setIsSubmitting(true);
    try {
      const evidenceFiles: any[] = [];
      if (productPhoto) {
        evidenceFiles.push({ name: 'product_photo.jpg', type: 'product_photo' });
      }
      if (billPhoto) {
        evidenceFiles.push({ name: 'purchase_bill.jpg', type: 'invoice_bill' });
      }

      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          brand,
          shopName,
          shopLocation,
          issueDescription,
          detectedLicenceNumber,
          verificationStatus,
          evidenceFiles,
          billOcrData,
        }),
      });

      if (response.ok) {
        const saved = await response.json();
        setSubmittedDraft(saved);
        onComplaintCreated(saved);
      }
    } catch (err) {
      console.error('Error creating complaint draft:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>STEP 5 — ACT (COMPLAINT ASSISTANT)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {language === 'hi' ? 'संदिग्ध अथवा नकली उत्पाद शिकायत सहायक' : 'Suspicious Product Complaint Assistant'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          {language === 'hi'
            ? 'नकली ISI मार्क, अप्रमाणित उत्पाद या घटिया सामग्री की संरचित शिकायत तैयार करें और साक्ष्य एकत्रित करें।'
            : 'Assemble an evidence-backed complaint draft with photos, shop details, bill OCR, and licence verification audit.'}
        </p>

        {!submittedDraft && (
          <button
            type="button"
            onClick={handleQuickFillSample}
            className="text-xs text-rose-600 font-semibold bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            ⚡ Click to Auto-fill Demo Counterfeit Evidence
          </button>
        )}
      </div>

      {submittedDraft ? (
        /* Submission Success & Official Channel Transition (Section 8) */
        <div className="bg-white rounded-3xl border border-emerald-200 p-8 shadow-sm space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 shrink-0">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wide">
                Complaint Draft Created Successfully
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Draft ID: <span className="font-mono text-emerald-700">{submittedDraft.id}</span>
              </h2>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 space-y-2">
            <p className="font-bold text-sm">Ready for submission through the official complaint channel:</p>
            <p className="leading-relaxed">
              Your structured draft is saved and ready for filing through the official <strong>BIS Care Mobile App</strong> or <strong>e-Daakhil National Consumer Grievance Portal</strong>. Under the Bureau of Indian Standards Act, 2016, counterfeit certification marks carry strict penalties.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 block text-[10px]">Product:</span>
                <span className="font-bold text-slate-800">{submittedDraft.productName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Seller / Shop:</span>
                <span className="font-bold text-slate-800">{submittedDraft.shopName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Audit Licence:</span>
                <span className="font-mono font-bold text-rose-700">{submittedDraft.detectedLicenceNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Status:</span>
                <span className="font-bold text-emerald-700">Ready For Official Filing</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setSubmittedDraft(null)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
            >
              Create Another Complaint
            </button>
            <a
              href="https://edaakhil.nic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow flex items-center gap-1.5 cursor-pointer"
            >
              <span>File on e-Daakhil Portal</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      ) : (
        /* Multi-Step Evidence Collection Form */
        <form onSubmit={handleSubmitDraft} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step 1 & 2: Product Photo & Name */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-blue-600" />
                <span>1. Product Evidence</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g., EverPower 2.5 sq mm PVC Electrical Wire"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Brand / Manufacturer Name
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g., EverPower Cables"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Product Label Photo
                  </label>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProductPhotoUpload}
                    className="hidden"
                  />
                  <div
                    onClick={() => photoInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-3 text-center cursor-pointer bg-slate-50 transition-colors"
                  >
                    {productPhoto ? (
                      <div className="flex items-center justify-center gap-2 text-xs text-emerald-700 font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        <span>Product Photo Attached</span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500">
                        Click to upload photo of product & fake markings
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 & 4: Shop / Seller & Purchase Location */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Store className="w-4 h-4 text-indigo-600" />
                <span>2. Seller & Location</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Shop / Seller Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="e.g., Shree Balaji Electricals & Hardware"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Shop Address & City
                  </label>
                  <input
                    type="text"
                    value={shopLocation}
                    onChange={(e) => setShopLocation(e.target.value)}
                    placeholder="e.g., Shop 14, Main Market, Chandni Chowk, Delhi - 110006"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Suspected Licence / CM/L Number
                  </label>
                  <input
                    type="text"
                    value={detectedLicenceNumber}
                    onChange={(e) => setDetectedLicenceNumber(e.target.value)}
                    placeholder="e.g., CM/L-0099887"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Bill Upload & Bill OCR (Section 8) */}
          <div className="border-t border-slate-200 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-emerald-600" />
                <span>3. Purchase Bill & Automated OCR Extraction (Section 8)</span>
              </h3>
              {isProcessingBillOcr && (
                <span className="text-[11px] text-blue-600 font-medium flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Extracting Invoice Data...</span>
                </span>
              )}
            </div>

            <input
              ref={billInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleBillUpload}
              className="hidden"
            />

            <div
              onClick={() => billInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer bg-slate-50 transition-colors"
            >
              {billPhoto ? (
                <div className="flex items-center justify-center gap-2 text-xs text-emerald-700 font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Purchase Bill Attached (OCR Processed)</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <UploadCloud className="w-6 h-6 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-600 font-medium">
                    Upload purchase bill or cash memo to auto-extract invoice fields
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Supports JPG, PNG, or PDF invoice scans
                  </p>
                </div>
              )}
            </div>

            {billOcrData && (
              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-emerald-700 block">Invoice No:</span>
                  <span className="font-mono font-bold text-slate-900">{billOcrData.invoiceNo}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-700 block">Bill Date:</span>
                  <span className="font-bold text-slate-900">{billOcrData.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-700 block">Seller Name:</span>
                  <span className="font-bold text-slate-900 truncate block">{billOcrData.sellerName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-700 block">Total Amount:</span>
                  <span className="font-mono font-bold text-slate-900">{billOcrData.amount}</span>
                </div>
              </div>
            )}
          </div>

          {/* Step 6: Problem Description */}
          <div className="space-y-2 border-t border-slate-200 pt-4">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              4. Description of Violation / Issue *
            </label>
            <textarea
              required
              rows={3}
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="Describe why the product is suspicious (e.g. heated up, fake logo, no registration number)..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-[11px] text-slate-400">
              * Draft is formatted for submission to the National Consumer Helpline & BIS Enforcement.
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !productName || !shopName}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating Draft...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Submit Complaint Draft</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
