import { BISStandard, BISVerificationResult, Language } from '../types';

export const BIS_STANDARDS: BISStandard[] = [
  {
    isNumber: 'IS 302-2-3:2014',
    title: 'Safety of Household and Similar Electrical Appliances - Particular Requirements for Electric Irons',
    hindiTitle: 'घरेलू और समान विद्युत उपकरणों की सुरक्षा - इलेक्ट्रिक आयरन के लिए विशेष आवश्यकताएं',
    category: 'Electrical Appliances',
    mandatory: true,
    qcoReference: 'Electrical Appliances (Quality Control) Order, 2023 under DPIIT / Ministry of Commerce',
    scope: 'Covers safety, electric shock protection, temperature limits, endurance, fire hazard, and cord flex tests for electric dry and steam irons.',
    hindiScope: 'इलेक्ट्रिक ड्राई और स्टीम आयरन के लिए विद्युत सुरक्षा, शॉक से बचाव, तापमान सीमा, स्थायित्व और अग्नि जोखिम से संबंधित नियम।',
    certificationScheme: 'ISI Scheme-I',
    keyClauses: [
      { clause: 'Clause 8', title: 'Protection Against Access to Live Parts', description: 'Mandates adequate enclosure insulation preventing accidental finger contact.' },
      { clause: 'Clause 11', title: 'Heating and Temperature Rise Limits', description: 'Ensures soleplate temperature does not exceed safety limits and thermal cutoff functions reliably.' },
      { clause: 'Clause 19', title: 'Abnormal Operation', description: 'Requires thermal cutout protection to act within specified cycles without flame ignition.' },
      { clause: 'Clause 25', title: 'Supply Connection and External Flexible Cords', description: 'Requires ISI-marked cord complying with IS 694 with high bend endurance (20,000 cycles).' },
    ],
    testingRequirements: [
      'High Voltage Dielectric Withstand Test (1500V AC)',
      'Earth Continuity (< 0.1 Ohm)',
      'Leakage Current Test (< 0.75 mA)',
      'Soleplate Temperature Control & Thermostat Test',
      'Flexing test on mains power cord'
    ],
    recognizedLabs: [
      'BIS Central Laboratory (Sahibabad, Ghaziabad)',
      'ERDA (Electrical Research and Development Association, Vadodara)',
      'CPRI (Central Power Research Institute, Bengaluru & Bhopal)',
      'National Test House (Kolkata / Mumbai / Chennai)',
      'BIS Western Regional Office Laboratory (Mumbai)'
    ],
    documents: [
      {
        documentName: 'Indian Standard IS 302-2-3:2014 (Second Revision)',
        relevantSection: 'Section 3: Particular Requirements for Electric Irons, Clauses 8, 11, 19',
        page: 'Pages 4–18',
        url: 'https://www.services.bis.gov.in',
        publisher: 'Bureau of Indian Standards, New Delhi'
      },
      {
        documentName: 'BIS Product Manual for Electric Irons (Doc: PM/302-2-3/1)',
        relevantSection: 'Scheme of Inspection and Testing (SIT), Guidelines for Grant of Licence',
        page: 'Annexure B',
        url: 'https://www.manakonline.in',
        publisher: 'Central Marks Department (CMD-III), BIS'
      }
    ]
  },
  {
    isNumber: 'IS 14543:2016',
    title: 'Packaged Drinking Water (Other Than Packaged Natural Mineral Water) - Specification',
    hindiTitle: 'पैकेज्ड पेयजल (पैकेज्ड प्राकृतिक खनिज जल के अलावा) - विशिष्टता',
    category: 'Food & Packaged Goods',
    mandatory: true,
    qcoReference: 'Mandatory under Food Safety and Standards (Prohibition and Restriction on Sales) Regulations & BIS Act 2016',
    scope: 'Prescribes physical, chemical, microbiological, and radioactive limits for water processed by filtration, reverse osmosis, UV, or ozonation and packed in clean, food-grade containers.',
    hindiScope: 'फिल्ट्रेशन, आरओ, यूवी या ओजोनेशन द्वारा उपचारित और खाद्य-ग्रेड पैकेजिंग में भरे पेयजल के भौतिक, रासायनिक और सूक्ष्मजीव मानक।',
    certificationScheme: 'ISI Scheme-I',
    keyClauses: [
      { clause: 'Clause 4.1', title: 'Processing & Treatment', description: 'Requires water to be derived from potable source and subjected to filtration, RO, demineralization and disinfection.' },
      { clause: 'Clause 5.1 (Table 1)', title: 'Organoleptic and Physical Characteristics', description: 'Color < 2 Hazen, Turbidity < 2 NTU, pH 6.5 to 8.5, Total Dissolved Solids max 500 mg/L.' },
      { clause: 'Clause 5.3 (Table 3)', title: 'Toxic Substances and Heavy Metals', description: 'Arsenic max 0.01 mg/L, Lead max 0.01 mg/L, Cadmium max 0.003 mg/L, Mercury max 0.001 mg/L.' },
      { clause: 'Clause 6.1 (Table 5)', title: 'Microbiological Requirements', description: 'Zero E. coli, Coliform bacteria, Faecal streptococci, Pseudomonas aeruginosa in 250ml sample.' },
      { clause: 'Clause 7', title: 'Marking and Labelling with ISI Logo & CM/L', description: 'Must display ISI standard mark, CM/L number, source, treatment method, best before date, batch number.' }
    ],
    testingRequirements: [
      'Microbiological Culture & Colony Count (Zero contamination test)',
      'ICP-MS Heavy Metal Analysis (Lead, Cadmium, Arsenic, Mercury)',
      'TDS, Turbidity, and pH Measurement',
      'Pesticide Residue Gas Chromatography analysis (IS 14543 Table 4)',
      'Migration & Leachability Test for Plastic Bottles (IS 9845 / IS 15410)'
    ],
    recognizedLabs: [
      'BIS Central Laboratory, Sahibabad',
      'CFRTI (Central Food Technological Research Institute, Mysuru)',
      'National Test House (Food & Water Division)',
      'SGS India Testing Laboratories (Gurugram / Chennai)',
      'TUV SUD South Asia Food Lab'
    ],
    documents: [
      {
        documentName: 'IS 14543:2016 (Third Revision)',
        relevantSection: 'Clauses 4 to 7, Tables 1–5',
        page: 'Pages 1–14',
        url: 'https://www.services.bis.gov.in',
        publisher: 'Food & Agriculture Division Council, BIS'
      },
      {
        documentName: 'BIS Product Manual for Packaged Drinking Water (PM/14543/1)',
        relevantSection: 'Guidelines for In-house Testing and Daily Quality Log Requirements',
        page: 'Section 4, SIT Log',
        url: 'https://www.manakonline.in',
        publisher: 'Bureau of Indian Standards'
      }
    ]
  },
  {
    isNumber: 'IS 1417:2016',
    title: 'Gold and Gold Alloys, Jewellery/Artefacts - Fineness and Marking (Hallmarking)',
    hindiTitle: 'स्वर्ण और स्वर्ण मिश्रधातु, आभूषण - शुद्धता और हॉलमार्किंग',
    category: 'Jewellery & Precious Metals',
    mandatory: true,
    qcoReference: 'Hallmarking of Gold Jewellery and Gold Artefacts Order, 2020 (Mandatory in notified districts)',
    scope: 'Specifies 6 recognized purity grades for gold jewellery (14K, 18K, 20K, 22K, 23K, 24K), testing by Fire Assay/XRF, and compulsory laser marking of 6-character alphanumeric HUID.',
    hindiScope: 'सोने के आभूषणों की 6 मान्य शुद्धता श्रेणियों (14K से 24K) और 6-अंकीय अल्फान्यूमेरिक HUID (हॉलमार्क यूनिक आइडेंटिफिकेशन) की अनिवार्यता।',
    certificationScheme: 'Hallmarking',
    keyClauses: [
      { clause: 'Clause 4', title: 'Grades of Gold Fineness', description: 'Recognizes 999 (24K), 958 (23K), 916 (22K), 833 (20K), 750 (18K), and 585 (14K).' },
      { clause: 'Clause 6', title: 'Hallmark Composition Components', description: 'Every hallmarked piece must bear 3 marks: 1) BIS Logo, 2) Purity & Fineness (e.g. 22K916), 3) 6-character HUID code.' },
      { clause: 'Clause 7', title: 'Assaying and Hallmarking Centre (AHC) Workflow', description: 'Laser inscription conducted exclusively at BIS-recognized Assaying and Hallmarking Centres with digital upload to Manakonline server.' }
    ],
    testingRequirements: [
      'X-ray Fluorescence (XRF) Preliminary Non-destructive Assay',
      'Fire Assay (Cupellation) as per IS 1418 for definitive purity determination',
      'Homogeneity verification across joint and solder areas'
    ],
    recognizedLabs: [
      'BIS Recognized Assaying and Hallmarking Centres (AHCs) across India',
      'NABL Accredited Precious Metal Testing Laboratories',
      'BIS Referral Assay Laboratory'
    ],
    documents: [
      {
        documentName: 'IS 1417:2016 Gold and Gold Alloys - Fineness and Marking',
        relevantSection: 'Clauses 4, 5, 6, 7',
        page: 'Pages 2–8',
        url: 'https://www.services.bis.gov.in',
        publisher: 'Bureau of Indian Standards'
      },
      {
        documentName: 'BIS Guidelines for Consumer Verification of Hallmarked Jewellery via BIS CARE App',
        relevantSection: 'HUID Verification Workflow & Redressal of Under-caratage',
        page: 'Consumer Bulletin 2024',
        url: 'https://www.bis.gov.in',
        publisher: 'Hallmarking Department, BIS'
      }
    ]
  },
  {
    isNumber: 'IS 13252 (Part 1):2010',
    title: 'Information Technology Equipment - Safety - General Requirements (Compulsory Registration Scheme)',
    hindiTitle: 'सूचना प्रौद्योगिकी उपकरण - सुरक्षा - सामान्य आवश्यकताएं (अनिवार्य पंजीकरण योजना - CRS)',
    category: 'Electronics & IT Goods',
    mandatory: true,
    qcoReference: 'Electronics and Information Technology Goods (Requirement for Compulsory Registration) Order under MeitY',
    scope: 'Covers safety against electrical shock, excessive heat, fire ignition, radiation, and mechanical hazards for laptop chargers, mobile phones, power adapters, and tablets.',
    hindiScope: 'मोबाइल फोन, चार्जर, एडेप्टर और लैपटॉप के लिए विद्युत सुरक्षा, आग के खतरे, ओवरहीटिंग और मैकेनिकल सुरक्षा संबंधी नियम।',
    certificationScheme: 'CRS Scheme-II',
    keyClauses: [
      { clause: 'Clause 1.5', title: 'Components Requirements', description: 'Capacitors, transformers, fuses and bridge rectifiers must be safety certified to respective IEC/IS standards.' },
      { clause: 'Clause 2.1', title: 'Protection Against Electric Shock', description: 'Clearance and creepage distances between primary high-voltage circuits and secondary output terminals.' },
      { clause: 'Clause 4.5', title: 'Thermal Requirements and Temperature Rise', description: 'Casing and electronic components must not exceed critical temperature thresholds under peak load.' },
      { clause: 'Clause 5.2', title: 'Electric Strength (Hi-Pot Test)', description: 'Must withstand 3000V AC breakdown test between mains plug and low-voltage output cable without dielectric puncture.' }
    ],
    testingRequirements: [
      'Dielectric Strength Test (3000V AC insulation check)',
      'Leakage Current and Touch Current Test',
      'Creepage and Clearance Distance Measurement',
      'Drop Test & Impact Resistance Test (from 1 meter onto hardwood surface)',
      'Abnormal operation and short circuit simulation'
    ],
    recognizedLabs: [
      'SAMEER (Society for Applied Microwave Electronics Engineering and Research, Mumbai/Chennai)',
      'ETDC (Electronic Test and Development Centre, Bengaluru/Hyderabad)',
      'TUV Rheinland India Electronics Safety Testing Laboratory',
      'UL India Testing Laboratory (Bengaluru)',
      'Intertek India Electronics Division'
    ],
    documents: [
      {
        documentName: 'IS 13252 (Part 1):2010 / IEC 60950-1:2005',
        relevantSection: 'General Safety of IT Equipment, Clauses 1.5, 2.1, 4.5, 5.2',
        page: 'Pages 21–64',
        url: 'https://www.crsbis.in',
        publisher: 'Bureau of Indian Standards & MeitY'
      },
      {
        documentName: 'MeitY Compulsory Registration Scheme Guidelines (CRS-2023)',
        relevantSection: 'Guidelines for Series Approval & Standard Marking with R-Number',
        page: 'Section 2, Marking Rules',
        url: 'https://www.crsbis.in',
        publisher: 'Ministry of Electronics and Information Technology'
      }
    ]
  },
  {
    isNumber: 'IS 694:2010',
    title: 'Polyvinyl Chloride (PVC) Insulated Unsheathed and Sheathed Cables/Cords with Rigid and Flexible Conductor for Working Voltages up to 1100V',
    hindiTitle: '1100V तक के वोल्टेज के लिए पीवीसी इंसुलेटेड केबल्स और कॉर्ड्स',
    category: 'Electrical Cables & Wires',
    mandatory: true,
    qcoReference: 'Electrical Wires and Cables (Quality Control) Order under DPIIT',
    scope: 'Covers domestic and industrial wiring cables, conductor resistance, tensile strength, elongation of PVC insulation, spark testing, and flame retardance.',
    hindiScope: 'घरेलू और औद्योगिक बिजली तारों के लिए कंडक्टर रेजिस्टेंस, इंसुलेशन ताकत और आग से बचाव के सुरक्षा नियम।',
    certificationScheme: 'ISI Scheme-I',
    keyClauses: [
      { clause: 'Clause 5', title: 'Conductor Quality and Resistance', description: 'Requires high purity electrolytic grade copper annealed wire meeting maximum conductor resistance limits.' },
      { clause: 'Clause 8', title: 'Thickness and Elongation of Insulation', description: 'Minimum insulation thickness and > 150% elongation before breaking to prevent cracking.' },
      { clause: 'Clause 16', title: 'Spark Test and High Voltage Water Immersion Test', description: '100% of cable length must pass online spark test at 6kV peak during extrusion without pinhole faults.' }
    ],
    testingRequirements: [
      'Conductor Resistance Test via Kelvin Double Bridge',
      'Oxygen Index and Temperature Index Test (Flame retardant FR grade)',
      'High Voltage Water Immersion Test (3000V for 15 minutes)',
      'Thermal Stability of PVC insulation'
    ],
    recognizedLabs: [
      'CPRI (Central Power Research Institute, Bengaluru)',
      'ERDA (Vadodara)',
      'National Test House (Electrical Laboratory)'
    ],
    documents: [
      {
        documentName: 'IS 694:2010 Specification for PVC Insulated Cables',
        relevantSection: 'Clauses 5, 8, 16 and Annexure D',
        page: 'Pages 5–22',
        url: 'https://www.services.bis.gov.in',
        publisher: 'Electro-technical Division, BIS'
      }
    ]
  },
  {
    isNumber: 'IS 4151:2020',
    title: 'Protective Helmets for Motorcycle Riders - Specification',
    hindiTitle: 'दोपहिया वाहन चालकों के लिए सुरक्षात्मक हेलमेट - विशिष्टता',
    category: 'Automotive Safety',
    mandatory: true,
    qcoReference: 'Protective Helmets for Two Wheeler Riders (Quality Control) Order under Ministry of Road Transport and Highways (MoRTH)',
    scope: 'Specifies impact absorption, penetration resistance, retention system strength, peripheral vision, and mandatory ISI certification. Sale of non-ISI helmets is illegal in India.',
    hindiScope: 'मोटरसाइकिल सवारों के हेलमेट के लिए शॉक सोखने की क्षमता, स्ट्रैप की मजबूती और आईएसआई मार्क की अनिवार्यता। गैर-आईएसआई हेलमेट बेचना कानूनन अपराध है।',
    certificationScheme: 'ISI Scheme-I',
    keyClauses: [
      { clause: 'Clause 7.1', title: 'Shock Absorption Test', description: 'Peak acceleration transmitted to headform during drop impact from 3m must not exceed 300g.' },
      { clause: 'Clause 7.2', title: 'Penetration Resistance', description: '3kg metal conical striker dropped from 1m must not contact headform surface through outer shell.' },
      { clause: 'Clause 7.4', title: 'Retention System (Chinstrap Dynamic Test)', description: 'Chinstrap elongation under 100kg dynamic load must not exceed 25mm, and quick release buckle must not jam.' }
    ],
    testingRequirements: [
      'Drop Impact Absorption Test under Ambient, Low Temp (-10°C) and Wet Conditioning',
      'Dynamic Retention System Stretch Test',
      'Visor Optical Quality & Scratch Resistance Test',
      'Flammability and Rigidity Test'
    ],
    recognizedLabs: [
      'ARAI (Automotive Research Association of India, Pune)',
      'ICAT (International Centre for Automotive Technology, Manesar)',
      'CIRT (Central Institute of Road Transport, Pune)',
      'BIS Central Laboratory (Sahibabad)'
    ],
    documents: [
      {
        documentName: 'IS 4151:2020 (Fourth Revision) Protective Helmets',
        relevantSection: 'Clauses 5 to 8, Testing Protocols',
        page: 'Pages 6–30',
        url: 'https://www.services.bis.gov.in',
        publisher: 'Transport Engineering Division, BIS'
      }
    ]
  },
  {
    isNumber: 'IS 9873 (Part 1):2019',
    title: 'Safety of Toys - Mechanical and Physical Properties',
    hindiTitle: 'खिलौनों की सुरक्षा - यांत्रिक और भौतिक गुण',
    category: 'Consumer & Children Goods',
    mandatory: true,
    qcoReference: 'Toys (Quality Control) Order, 2020 under DPIIT',
    scope: 'Mandatory ISI mark on all toys manufactured or imported into India. Tests for small parts choking hazard, sharp edges, points, stability, toxic phthalates, and heavy metals.',
    hindiScope: 'भारत में बनने या आयात होने वाले सभी खिलौनों पर ISI मार्क अनिवार्य है। छोटे पुर्जों से दम घुटने, नुकीले किनारों और विषैले रसायनों की रोकथाम के नियम।',
    certificationScheme: 'ISI Scheme-I',
    keyClauses: [
      { clause: 'Clause 4.4', title: 'Small Parts Cylinder (Choking Hazard)', description: 'No toy designed for children under 36 months shall fit inside the standardized small-parts test cylinder.' },
      { clause: 'Clause 4.7', title: 'Sharp Edges and Points', description: 'Accessible edges must not cut or puncture child skin during tension/compression drops.' },
      { clause: 'Clause 4.14', title: 'Acoustics & Sound Pressure', description: 'Close-to-ear toys must not exceed 65 dBA sound pressure level.' }
    ],
    testingRequirements: [
      'Small Parts Choking Test Cylinder',
      'Torque and Tension Drop Test',
      'Sharp Edge Tester (PTFE tape wrap cut test)',
      'Migration of Certain Elements (Lead, Cadmium, Phthalate analysis)'
    ],
    recognizedLabs: [
      'BIS Recognized Toy Testing Laboratories',
      'Shriram Institute for Industrial Research (Delhi/Bengaluru)',
      'TUV Rheinland Toy Testing Division'
    ],
    documents: [
      {
        documentName: 'IS 9873 (Part 1):2019 Safety of Toys',
        relevantSection: 'Clauses 4, 5, 8',
        page: 'Pages 8–35',
        url: 'https://www.services.bis.gov.in',
        publisher: 'Bureau of Indian Standards'
      }
    ]
  },
  {
    isNumber: 'IS 4246:2002',
    title: 'Domestic Gas Stoves for Use with Liquefied Petroleum Gases (LPG) - Specification',
    hindiTitle: 'एलपीजी के उपयोग के लिए घरेलू गैस चूल्हा - विशिष्टता',
    category: 'Domestic Appliances',
    mandatory: true,
    qcoReference: 'LPG Domestic Gas Stoves (Quality Control) Order under Ministry of Petroleum & Natural Gas',
    scope: 'Thermal efficiency (> 68%), gas leakage safety, flame stability, carbon monoxide emission limits, and burner combustion performance.',
    hindiScope: 'घरेलू एलपीजी गैस चूल्हों की थर्मल दक्षता (68% से अधिक), गैस रिसाव से सुरक्षा और कार्बन मोनोऑक्साइड उत्सर्जन की सीमाएं।',
    certificationScheme: 'ISI Scheme-I',
    keyClauses: [
      { clause: 'Clause 6.1', title: 'Gas Soundness / Leakage Test', description: 'No gas leakage detectable at twice maximum normal supply gas pressure (up to 150 mbar).' },
      { clause: 'Clause 7.2', title: 'Thermal Efficiency', description: 'Each burner must achieve minimum 68% thermal efficiency to prevent excessive LPG wastage.' },
      { clause: 'Clause 8.1', title: 'Combustion Quality (CO/CO2 ratio)', description: 'CO/CO2 ratio of exhaust flue gases must not exceed 0.02 to protect indoor air quality.' }
    ],
    testingRequirements: [
      'Thermal Efficiency Test via Calibrated Water Heating Pot',
      'Gas Leakage Test with Manometer (High pressure hold for 5 minutes)',
      'Combustion Analyzer Test for Carbon Monoxide emission',
      'Flame Flashback and Extinction test'
    ],
    recognizedLabs: [
      'Indian Institute of Petroleum (IIP, Dehradun)',
      'BIS Central Laboratory, Sahibabad',
      'National Test House'
    ],
    documents: [
      {
        documentName: 'IS 4246:2002 Domestic Gas Stoves for LPG',
        relevantSection: 'Clauses 6, 7, 8 and Appendix B',
        page: 'Pages 3–17',
        url: 'https://www.services.bis.gov.in',
        publisher: 'Mechanical Engineering Division, BIS'
      }
    ]
  }
];

// Mock Verification Database mapping to authentic BIS licensing registry structures
export const MOCK_VERIFICATION_RECORDS: Record<string, Partial<BISVerificationResult>> = {
  // Crompton Electric Iron
  'CM/L-8123456': {
    number: 'CM/L-8123456',
    type: 'CML',
    status: 'verified',
    details: {
      licenseeName: 'Crompton Greaves Consumer Electricals Limited',
      brand: 'Crompton',
      productName: 'Electric Dry Iron (Model: Brio / FabriTech)',
      standard: 'IS 302-2-3:2014',
      validUntil: '31-Dec-2027',
      factoryAddress: 'Plot No. 42, Industrial Area, Sector 5, Haridwar, Uttarakhand - 249403',
      scheme: 'Product Certification Scheme-I (ISI Mark)',
      district: 'Haridwar',
      statusDescription: 'Active and in good standing with periodic surveillance passed.'
    }
  },
  '8123456': {
    number: 'CM/L-8123456',
    type: 'CML',
    status: 'verified',
    details: {
      licenseeName: 'Crompton Greaves Consumer Electricals Limited',
      brand: 'Crompton',
      productName: 'Electric Dry Iron (Model: Brio / FabriTech)',
      standard: 'IS 302-2-3:2014',
      validUntil: '31-Dec-2027',
      factoryAddress: 'Plot No. 42, Industrial Area, Sector 5, Haridwar, Uttarakhand - 249403',
      scheme: 'Product Certification Scheme-I (ISI Mark)',
      district: 'Haridwar',
      statusDescription: 'Active and in good standing with periodic surveillance passed.'
    }
  },
  // Bisleri Packaged Drinking Water
  'CM/L-9192834': {
    number: 'CM/L-9192834',
    type: 'CML',
    status: 'verified',
    details: {
      licenseeName: 'Bisleri International Private Limited',
      brand: 'Bisleri',
      productName: 'Packaged Drinking Water (Other than mineral water)',
      standard: 'IS 14543:2016',
      validUntil: '15-Aug-2028',
      factoryAddress: 'Village Kajiwala, National Highway 58, Meerut, Uttar Pradesh - 250001',
      scheme: 'Product Certification Scheme-I (ISI Mark - Mandatory)',
      district: 'Meerut',
      statusDescription: 'Active. Daily in-house microbiological logs verified.'
    }
  },
  '9192834': {
    number: 'CM/L-9192834',
    type: 'CML',
    status: 'verified',
    details: {
      licenseeName: 'Bisleri International Private Limited',
      brand: 'Bisleri',
      productName: 'Packaged Drinking Water',
      standard: 'IS 14543:2016',
      validUntil: '15-Aug-2028',
      factoryAddress: 'Village Kajiwala, National Highway 58, Meerut, Uttar Pradesh - 250001',
      scheme: 'Product Certification Scheme-I (ISI Mark)',
      district: 'Meerut',
      statusDescription: 'Active.'
    }
  },
  // Gold Jewellery HUID
  'AH897K': {
    number: 'AH897K',
    type: 'HUID',
    status: 'verified',
    details: {
      licenseeName: 'Tanishq Jewellers (Titan Company Ltd)',
      brand: 'Tanishq',
      productName: '22 Karat Gold Bangle / Ring',
      standard: 'IS 1417:2016 (22K916)',
      validUntil: 'Lifetime Hallmarked Validity',
      factoryAddress: 'Assaying & Hallmarking Centre: Sri Balaji Assay Lab (AHC Code: DL-041)',
      scheme: 'Compulsory Hallmarking Scheme (HUID)',
      district: 'Central Delhi',
      statusDescription: 'Verified genuine 22K (91.6% purity gold) registered on Manakonline HUID ledger.'
    }
  },
  // CRS Electronics Charger
  'R-41002345': {
    number: 'R-41002345',
    type: 'CRS_R_NUMBER',
    status: 'verified',
    details: {
      licenseeName: 'Samsung India Electronics Pvt. Ltd.',
      brand: 'Samsung',
      productName: 'Power Adapter / Fast Charger (EP-TA800)',
      standard: 'IS 13252 (Part 1):2010',
      validUntil: '22-Oct-2027',
      factoryAddress: 'Sector 81, Phase II, Noida, Gautam Buddha Nagar, Uttar Pradesh - 201305',
      scheme: 'Compulsory Registration Scheme (CRS) MeitY',
      district: 'Gautam Buddha Nagar',
      statusDescription: 'Valid Registration under CRS Portal.'
    }
  },
  '41002345': {
    number: 'R-41002345',
    type: 'CRS_R_NUMBER',
    status: 'verified',
    details: {
      licenseeName: 'Samsung India Electronics Pvt. Ltd.',
      brand: 'Samsung',
      productName: 'Power Adapter / Fast Charger (EP-TA800)',
      standard: 'IS 13252 (Part 1):2010',
      validUntil: '22-Oct-2027',
      factoryAddress: 'Sector 81, Phase II, Noida, Gautam Buddha Nagar, UP - 201305',
      scheme: 'Compulsory Registration Scheme (CRS) MeitY',
      district: 'Gautam Buddha Nagar',
      statusDescription: 'Valid Registration under CRS Portal.'
    }
  },
  // Fake / Invalid demo number on counterfeit cable
  'CM/L-0099887': {
    number: 'CM/L-0099887',
    type: 'CML',
    status: 'not_verified',
    details: {
      brand: 'EverPower Cables (Counterfeit)',
      productName: 'PVC Insulated Wire 2.5 sq mm',
      standard: 'Purporting IS 694',
      statusDescription: 'FRAUDULENT / INVALID: This CM/L number does not exist in the National BIS Licensee Register or has been revoked for non-compliance.'
    }
  },
  '0099887': {
    number: 'CM/L-0099887',
    type: 'CML',
    status: 'not_verified',
    details: {
      brand: 'EverPower Cables (Counterfeit)',
      productName: 'PVC Insulated Wire 2.5 sq mm',
      standard: 'Purporting IS 694',
      statusDescription: 'FRAUDULENT / INVALID: This CM/L number does not exist in the National BIS Licensee Register.'
    }
  }
};

export function lookupVerification(inputNumber: string): BISVerificationResult {
  const clean = inputNumber.trim().toUpperCase().replace(/\s+/g, '');
  const exact = MOCK_VERIFICATION_RECORDS[clean];
  
  if (exact) {
    return {
      number: exact.number || clean,
      type: exact.type || 'CML',
      status: exact.status || 'verified',
      details: exact.details,
      disclaimer: 'Live verification is not available in this prototype. This result demonstrates integration with the official BIS Manakonline & CRS verification registry API.',
      officialPortalUrl: 'https://www.manakonline.in/MANAK/SearchLicense'
    };
  }

  // Format checks
  const isCML = /^CM\/L-?\d{7,8}$/i.test(clean) || /^\d{7,8}$/.test(clean);
  const isCRS = /^R-\d{8}$/i.test(clean);
  const isHUID = /^[A-Z0-9]{6}$/.test(clean);

  if (isCML || isCRS || isHUID) {
    return {
      number: clean,
      type: isHUID ? 'HUID' : (isCRS ? 'CRS_R_NUMBER' : 'CML'),
      status: 'unable_to_verify',
      details: {
        statusDescription: 'Record not found in cached prototype demonstration index. An official live query to Manakonline / BIS Care web service is required for definitive confirmation.'
      },
      disclaimer: 'Live verification is not available in this prototype. This result should not be treated as official verification.',
      officialPortalUrl: 'https://www.manakonline.in'
    };
  }

  return {
    number: clean,
    type: 'IS_NUMBER',
    status: 'manual_verification_required',
    details: {
      statusDescription: 'The detected number does not follow standard 7-8 digit CM/L, 8-digit CRS R-Number, or 6-character HUID format. Manual verification by a BIS Quality Officer is recommended.'
    },
    disclaimer: 'Live verification is not available in this prototype. This result should not be treated as official verification.',
    officialPortalUrl: 'https://www.manakonline.in'
  };
}

// RAG Search Helper for finding relevant standards and answers
export function retrieveRelevantStandards(query: string, productContext?: string): BISStandard[] {
  const q = `${query} ${productContext || ''}`.toLowerCase();
  
  const results = BIS_STANDARDS.filter(std => {
    return (
      q.includes(std.isNumber.toLowerCase()) ||
      q.includes(std.category.toLowerCase()) ||
      std.title.toLowerCase().split(' ').some(w => w.length > 3 && q.includes(w)) ||
      (std.hindiTitle && std.hindiTitle.split(' ').some(w => w.length > 2 && q.includes(w))) ||
      std.testingRequirements.some(t => q.includes(t.toLowerCase())) ||
      std.scope.toLowerCase().split(' ').some(w => w.length > 4 && q.includes(w))
    );
  });

  return results.length > 0 ? results : [BIS_STANDARDS[0]]; // fallback to first standard
}
