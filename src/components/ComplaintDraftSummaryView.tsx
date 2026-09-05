import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Printer, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Store, 
  ShieldAlert, 
  CheckCircle2, 
  Download,
  AlertTriangle,
  Receipt
} from 'lucide-react';
import { Language, ComplaintDraft } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ComplaintDraftSummaryViewProps {
  language: Language;
  onNavigateToNewComplaint: () => void;
}

export const ComplaintDraftSummaryView: React.FC<ComplaintDraftSummaryViewProps> = ({
  language,
  onNavigateToNewComplaint,
}) => {
  const t = TRANSLATIONS[language];
  const [drafts, setDrafts] = useState<ComplaintDraft[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<ComplaintDraft | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      const response = await fetch('/api/complaints');
      if (response.ok) {
        const data = await response.json();
        setDrafts(data);
        if (data.length > 0) {
          setSelectedDraft(data[0]);
        }
      }
    } catch (err) {
      console.error('Failed to fetch drafts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-1">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>CASE ARCHIVE & REDRESSAL</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'तैयार शिकायत ड्राफ्ट रिकॉर्ड्स' : 'Prepared Complaint Draft Records'}
          </h1>
          <p className="text-xs text-slate-500">
            Structured counterfeit and non-compliance complaint packages ready for BIS Care / e-Dakhil submission.
          </p>
        </div>

        <button
          onClick={onNavigateToNewComplaint}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>New Complaint Draft</span>
        </button>
      </div>

      {/* Main Grid: Left Drawer Drafts List + Right Detailed Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* List of Drafts (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Saved Drafts ({drafts.length})
          </span>

          {drafts.map((d) => (
            <div
              key={d.id}
              onClick={() => setSelectedDraft(d)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedDraft?.id === d.id
                  ? 'bg-blue-50/70 border-blue-500 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold text-blue-700">{d.id}</span>
                <span className="text-[10px] text-slate-400">
                  {new Date(d.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{d.productName}</h4>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{d.shopName}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 uppercase font-mono">
                  {d.detectedLicenceNumber || 'Unverified'}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Ready</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Draft Full Dossier (8 cols) */}
        <div className="lg:col-span-8">
          {selectedDraft ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              {/* Dossier Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                    Ready for Filing • BIS Care / e-Dakhil
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Case File: <span className="font-mono text-blue-600">{selectedDraft.id}</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Drafted on {new Date(selectedDraft.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrint}
                    className="px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Dossier</span>
                  </button>
                  <a
                    href="https://edaakhil.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow cursor-pointer"
                  >
                    <span>File Online</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Product & Retailer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">Product Description</span>
                  <p className="font-bold text-slate-900 text-sm">{selectedDraft.productName}</p>
                  <p className="text-slate-600">Brand: <strong>{selectedDraft.brand}</strong></p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">Retailer / Seller Info</span>
                  <p className="font-bold text-slate-900 text-sm">{selectedDraft.shopName}</p>
                  <p className="text-slate-600 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{selectedDraft.shopLocation}</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">Suspected Licence Number</span>
                  <p className="font-mono font-bold text-rose-700 text-sm">
                    {selectedDraft.detectedLicenceNumber || 'None Specified'}
                  </p>
                  <p className="text-slate-500 text-[11px]">Audit Result: Not verified in BIS database</p>
                </div>

                {selectedDraft.billOcrData && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-400 uppercase font-bold text-[10px] block">Invoice OCR Data</span>
                    <p className="font-mono text-slate-900 font-semibold">
                      {selectedDraft.billOcrData.invoiceNo} • {selectedDraft.billOcrData.amount}
                    </p>
                    <p className="text-slate-500 text-[11px]">Bill Date: {selectedDraft.billOcrData.date}</p>
                  </div>
                )}
              </div>

              {/* Statement of Complaint */}
              <div className="space-y-1.5 text-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Statement of Violation
                </span>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed font-normal">
                  {selectedDraft.issueDescription}
                </div>
              </div>

              {/* Attached Evidence List */}
              <div className="space-y-1.5 text-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Evidence Records Attached
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedDraft.evidenceFiles.map((ev, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[11px] flex items-center gap-1.5"
                    >
                      <Receipt className="w-3.5 h-3.5 text-blue-600" />
                      <span>{ev.name} ({ev.type})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Legal Notice */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                <strong>Statutory Notice:</strong> Under Section 29 of the Bureau of Indian Standards Act, 2016, unauthorized use of the Standard Mark, falsification of licence numbers, or manufacturing non-compliant goods under mandatory QCOs is punishable with imprisonment or fine up to ten times the value of goods.
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              Select a complaint draft from the left to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
