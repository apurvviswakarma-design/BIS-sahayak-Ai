export type Language = 'en' | 'hi';

export type IdentificationConfidence = 'high' | 'medium' | 'low';

export interface DetectedMarkings {
  isiMarkDetected: boolean;
  isNumber?: string;
  cmlNumber?: string;
  rNumber?: string;
  huid?: string;
  brand?: string;
  model?: string;
  manufacturer?: string;
  mrp?: string;
}

export interface ProductContext {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  rawOcrText: string;
  detectedMarkings: DetectedMarkings;
  confidence: IdentificationConfidence;
  confidenceScore: number;
  imageUrl?: string;
  isBlurryOrUnclear?: boolean;
  notes?: string;
}

export interface BISSource {
  documentName: string;
  relevantSection: string;
  page?: string;
  url?: string;
  publisher?: string;
}

export interface StructuredAnswer {
  answer: string;
  applicableStandard: string;
  sources: BISSource[];
  recommendedAction: string;
  quickFollowUps?: string[];
  verificationStatus?: 'verified' | 'not_verified' | 'unable_to_verify' | 'manual_verification_required';
  verifiedDetails?: Record<string, string>;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  language: Language;
  timestamp: string;
  structuredResponse?: StructuredAnswer;
  productRef?: Partial<ProductContext>;
}

export interface BISStandard {
  isNumber: string;
  title: string;
  hindiTitle?: string;
  category: string;
  mandatory: boolean;
  qcoReference: string;
  scope: string;
  hindiScope?: string;
  certificationScheme: 'ISI Scheme-I' | 'CRS Scheme-II' | 'Hallmarking' | 'Eco Mark' | 'Voluntary';
  keyClauses: {
    clause: string;
    title: string;
    description: string;
  }[];
  testingRequirements: string[];
  recognizedLabs: string[];
  documents: BISSource[];
}

export interface BISVerificationResult {
  number: string;
  type: 'CML' | 'CRS_R_NUMBER' | 'HUID' | 'IS_NUMBER';
  status: 'verified' | 'not_verified' | 'unable_to_verify' | 'manual_verification_required';
  details?: {
    licenseeName?: string;
    brand?: string;
    productName?: string;
    standard?: string;
    validUntil?: string;
    factoryAddress?: string;
    scheme?: string;
    district?: string;
    statusDescription?: string;
  };
  disclaimer: string;
  officialPortalUrl: string;
}

export interface ComplaintDraft {
  id: string;
  createdAt: string;
  productName: string;
  brand: string;
  shopName: string;
  shopLocation: string;
  issueDescription: string;
  detectedLicenceNumber?: string;
  verificationStatus?: string;
  evidenceFiles: {
    name: string;
    type: 'product_photo' | 'purchase_bill' | 'other';
    dataUrl?: string;
  }[];
  billOcrData?: {
    invoiceNo?: string;
    date?: string;
    sellerName?: string;
    amount?: string;
    rawText?: string;
  };
  status: 'draft' | 'ready_for_submission';
}
