import { ProductContext } from '../types';
import electricDryIronImg from '../assets/images/electric_dry_iron_1788623921528.jpg';

export const DEMO_PRODUCTS: (ProductContext & {
  tag: string;
  description: string;
  hindiDescription: string;
  recommendedQuery: string;
  hindiRecommendedQuery: string;
})[] = [
  {
    id: 'demo-electric-iron',
    name: 'Crompton FabriTech Electric Dry Iron (1000W)',
    brand: 'Crompton',
    model: 'FabriTech 1000',
    category: 'Electrical Appliances',
    rawOcrText: 'CROMPTON FABRITECH 1000W\n230V AC 50Hz\nIS 302-2-3\nCM/L-8123456\nMADE IN INDIA\nSR NO: 2026/04/9912',
    detectedMarkings: {
      isiMarkDetected: true,
      isNumber: 'IS 302-2-3',
      cmlNumber: 'CM/L-8123456',
      brand: 'Crompton',
      model: 'FabriTech 1000',
      manufacturer: 'Crompton Greaves Consumer Electricals Ltd'
    },
    confidence: 'high',
    confidenceScore: 96,
    imageUrl: electricDryIronImg,
    tag: 'Verified ISI Mark',
    description: 'Dry iron showing prominent ISI stamp with CM/L license number and voltage rating.',
    hindiDescription: 'इलेक्ट्रिक आयरन जिस पर वैध ISI मार्क और CM/L लाइसेंस नंबर स्पष्ट दिखाई दे रहा है।',
    recommendedQuery: 'What safety standards and certification apply to this electric iron?',
    hindiRecommendedQuery: 'इस इलेक्ट्रिक आयरन के लिए कौन से BIS सुरक्षा मानक और प्रमाणन लागू होते हैं?'
  },
  {
    id: 'demo-packaged-water',
    name: 'Bisleri Packaged Drinking Water (1 Litre)',
    brand: 'Bisleri',
    model: '1000 ml Bottle',
    category: 'Food & Packaged Goods',
    rawOcrText: 'BISLERI PACKAGED DRINKING WATER\nWITH ADDED MINERALS\nIS 14543\nCM/L-9192834\nNET QTY: 1L\nMFG: 02/09/2026\nBEST BEFORE 6 MONTHS',
    detectedMarkings: {
      isiMarkDetected: true,
      isNumber: 'IS 14543',
      cmlNumber: 'CM/L-9192834',
      brand: 'Bisleri',
      model: '1L',
      manufacturer: 'Bisleri International Pvt Ltd'
    },
    confidence: 'high',
    confidenceScore: 94,
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80',
    tag: 'Mandatory Food Grade',
    description: 'Packaged drinking water bottle with mandatory ISI mark and manufacturer batch details.',
    hindiDescription: 'पैकेज्ड पेयजल बोतल जिस पर अनिवार्य ISI मार्क और बैच विवरण मौजूद है।',
    recommendedQuery: 'Is BIS certification mandatory for packaged drinking water, and what are testing limits?',
    hindiRecommendedQuery: 'क्या पैकेज्ड पानी के लिए BIS सर्टिफिकेशन अनिवार्य है और इसकी टेस्टिंग सीमाएं क्या हैं?'
  },
  {
    id: 'demo-gold-jewellery',
    name: 'Tanishq 22K Gold Bangle (Hallmarked)',
    brand: 'Tanishq',
    model: 'Floral Carved 22K Bangle',
    category: 'Jewellery & Precious Metals',
    rawOcrText: 'BIS LOGO [TRIANGLE]\n22K916\nHUID: AH897K\nTANISHQ\nWT: 18.420g',
    detectedMarkings: {
      isiMarkDetected: true,
      isNumber: 'IS 1417',
      huid: 'AH897K',
      brand: 'Tanishq',
      model: '22K916',
      manufacturer: 'Titan Company Ltd'
    },
    confidence: 'high',
    confidenceScore: 92,
    imageUrl: 'https://images.unsplash.com/photo-1611591475880-99436159265f?w=600&auto=format&fit=crop&q=80',
    tag: 'Hallmark HUID 6-Digit',
    description: 'Gold ornament inscribed with 3 mandatory marks: BIS Logo, 22K916 purity mark, and 6-digit HUID.',
    hindiDescription: 'सोने का आभूषण जिस पर BIS लोगो, 22K916 शुद्धता और 6-अंकीय HUID कोड अंकित है।',
    recommendedQuery: 'How do I verify this 6-digit HUID code and what is the legal gold purity standard?',
    hindiRecommendedQuery: 'इस 6-अंकीय HUID कोड को कैसे सत्यापित करें और सोने की शुद्धता का कानूनी नियम क्या है?'
  },
  {
    id: 'demo-phone-charger',
    name: 'Samsung 25W USB-C Fast Charger',
    brand: 'Samsung',
    model: 'EP-TA800',
    category: 'Electronics & IT Goods',
    rawOcrText: 'SAMSUNG TRAVEL ADAPTER\nMODEL: EP-TA800\nINPUT: 100-240V 50-60Hz 0.7A\nOUTPUT: 5.0V=3.0A or 9.0V=2.77A\nIS 13252 (Part 1)/IEC 60950-1\nR-41002345\nwww.bis.gov.in',
    detectedMarkings: {
      isiMarkDetected: false,
      isNumber: 'IS 13252 (Part 1)',
      rNumber: 'R-41002345',
      brand: 'Samsung',
      model: 'EP-TA800',
      manufacturer: 'Samsung India Electronics Pvt Ltd'
    },
    confidence: 'high',
    confidenceScore: 95,
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
    tag: 'CRS Electronics R-Number',
    description: 'Electronic adapter displaying MeitY CRS Self-Declaration mark with valid Registration R-41002345.',
    hindiDescription: 'इलेक्ट्रॉनिक एडेप्टर जिस पर MeitY CRS पंजीकरण संख्या R-41002345 अंकित है।',
    recommendedQuery: 'Is this charger covered under the Compulsory Registration Scheme (CRS)?',
    hindiRecommendedQuery: 'क्या यह चार्जर अनिवार्य पंजीकरण योजना (CRS) के तहत आता है?'
  },
  {
    id: 'demo-fake-cable',
    name: 'EverPower 2.5 sq mm PVC Electrical Wire (Suspicious)',
    brand: 'EverPower Cables',
    model: 'FR Wire 90m',
    category: 'Electrical Cables & Wires',
    rawOcrText: 'EVERPOWER INDUSTRIAL CABLE\n2.5 SQ MM 1100V\nIS 694\nCM/L-0099887 [MISALIGNED STAMP]\nBEST PRICE BAZAAR',
    detectedMarkings: {
      isiMarkDetected: true,
      isNumber: 'IS 694',
      cmlNumber: 'CM/L-0099887',
      brand: 'EverPower Cables',
      model: '2.5 sq mm'
    },
    confidence: 'medium',
    confidenceScore: 68,
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    tag: 'Suspicious / Forged ISI Mark',
    description: 'Counterfeit cable with misaligned ISI logo and invalid CM/L licence number 0099887.',
    hindiDescription: 'नकली बिजली का तार जिस पर गलत ISI लोगो और अमान्य CM/L लाइसेंस नंबर छपा है।',
    recommendedQuery: 'Is this CM/L number valid or should I report this suspicious product?',
    hindiRecommendedQuery: 'क्या यह CM/L नंबर वैध है या मुझे इस संदिग्ध उत्पाद की शिकायत दर्ज करनी चाहिए?'
  },
  {
    id: 'demo-blurry-image',
    name: 'Unclear / Out of Focus Product Photo',
    brand: 'Unknown',
    model: 'Unidentified',
    category: 'Unknown',
    rawOcrText: '... [UNREADABLE BLURRED TEXT] ...',
    detectedMarkings: {
      isiMarkDetected: false
    },
    confidence: 'low',
    confidenceScore: 28,
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
    isBlurryOrUnclear: true,
    tag: 'Low Confidence Fallback Demo',
    description: 'Demonstrates intelligent detection fallback when a photo is blurry, dark, or unreadable.',
    hindiDescription: 'जब फोटो धुंधली या अस्पष्ट हो तो सुरक्षित रूप से मैन्युअल या वॉयस इनपुट पर स्विच करने का प्रदर्शन।',
    recommendedQuery: 'Manual search fallback',
    hindiRecommendedQuery: 'मैन्युअल सर्च फॉलबैक'
  }
];
