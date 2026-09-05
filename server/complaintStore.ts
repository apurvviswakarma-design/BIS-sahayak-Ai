import { ComplaintDraft } from '../src/types';

const complaintDrafts: ComplaintDraft[] = [
  {
    id: 'CMP-2026-0819',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    productName: 'EverPower 2.5 sq mm PVC Electrical Wire',
    brand: 'EverPower Cables',
    shopName: 'Shree Balaji Electricals & Hardware',
    shopLocation: 'Shop 14, Main Market, Chandni Chowk, Old Delhi - 110006',
    issueDescription: 'Counterfeit ISI mark displayed. Wire started heating and smoking under standard 10A domestic load. CM/L number 0099887 is non-existent on the BIS Manakonline database.',
    detectedLicenceNumber: 'CM/L-0099887',
    verificationStatus: 'not_verified',
    evidenceFiles: [
      {
        name: 'cable_label_photo.jpg',
        type: 'product_photo'
      }
    ],
    billOcrData: {
      invoiceNo: 'INV-2026/894',
      date: '28-Feb-2026',
      sellerName: 'Shree Balaji Electricals',
      amount: '₹ 1,450.00'
    },
    status: 'ready_for_submission'
  }
];

export function getComplaints(): ComplaintDraft[] {
  return complaintDrafts;
}

export function getComplaintById(id: string): ComplaintDraft | undefined {
  return complaintDrafts.find(c => c.id === id);
}

export function saveComplaint(complaint: Omit<ComplaintDraft, 'id' | 'createdAt'>): ComplaintDraft {
  const newId = `CMP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const record: ComplaintDraft = {
    ...complaint,
    id: newId,
    createdAt: new Date().toISOString(),
    status: 'ready_for_submission'
  };
  complaintDrafts.unshift(record);
  return record;
}
