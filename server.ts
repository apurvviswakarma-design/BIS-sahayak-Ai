import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { analyzeProductImage, generateRAGAnswer } from './server/geminiService';
import { getComplaints, getComplaintById, saveComplaint } from './server/complaintStore';
import { BIS_STANDARDS, lookupVerification, retrieveRelevantStandards } from './src/data/bisDatabase';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support JSON bodies with sufficient limit for base64 image captures
  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // API Routes FIRST

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      app: 'BIS Sahayak AI',
      hackathon: 'Smart India Hackathon 2026',
      problemStatement: '26107',
      team: 'A5D Forge',
      hasGeminiApiKey: !!process.env.GEMINI_API_KEY,
    });
  });

  // Multimodal OCR & Product Identification (SHOW -> EXTRACT)
  app.post('/api/analyze-product', async (req, res) => {
    try {
      const { imageBase64, mimeType } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'imageBase64 is required' });
      }

      const result = await analyzeProductImage(imageBase64, mimeType || 'image/jpeg');
      res.json(result);
    } catch (error: any) {
      console.error('Error analyzing product image:', error);
      res.status(500).json({
        error: 'Failed to analyze product image',
        details: error?.message,
      });
    }
  });

  // RAG Conversational Knowledge Assistant (ASK -> RETRIEVE -> ANSWER)
  app.post('/api/rag-chat', async (req, res) => {
    try {
      const { query, productContext, language } = req.body;
      if (!query) {
        return res.status(400).json({ error: 'Query is required' });
      }

      const response = await generateRAGAnswer(query, productContext || null, language || 'en');
      res.json(response);
    } catch (error: any) {
      console.error('Error in RAG chat:', error);
      res.status(500).json({
        error: 'Failed to generate answer',
        details: error?.message,
      });
    }
  });

  // BIS / ISI / HUID / CRS Verification (VERIFY)
  app.post('/api/verify-bis', (req, res) => {
    try {
      const { number } = req.body;
      if (!number) {
        return res.status(400).json({ error: 'Licence or registration number is required' });
      }

      const result = lookupVerification(number);
      res.json(result);
    } catch (error: any) {
      console.error('Error verifying BIS number:', error);
      res.status(500).json({ error: 'Verification error', details: error?.message });
    }
  });

  // Get all BIS Standards catalog
  app.get('/api/standards', (req, res) => {
    const { query } = req.query;
    if (query && typeof query === 'string') {
      const filtered = retrieveRelevantStandards(query);
      return res.json(filtered);
    }
    res.json(BIS_STANDARDS);
  });

  // Complaints API (ACT)
  app.get('/api/complaints', (req, res) => {
    res.json(getComplaints());
  });

  app.get('/api/complaints/:id', (req, res) => {
    const complaint = getComplaintById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint draft not found' });
    }
    res.json(complaint);
  });

  app.post('/api/complaints', (req, res) => {
    try {
      const {
        productName,
        brand,
        shopName,
        shopLocation,
        issueDescription,
        detectedLicenceNumber,
        verificationStatus,
        evidenceFiles,
        billOcrData,
      } = req.body;

      if (!productName || !shopName || !issueDescription) {
        return res.status(400).json({
          error: 'Product name, shop name, and issue description are required',
        });
      }

      const draft = saveComplaint({
        productName,
        brand: brand || 'Unknown Brand',
        shopName,
        shopLocation: shopLocation || 'Not provided',
        issueDescription,
        detectedLicenceNumber,
        verificationStatus,
        evidenceFiles: evidenceFiles || [],
        billOcrData,
        status: 'ready_for_submission',
      });

      res.status(201).json(draft);
    } catch (error: any) {
      console.error('Error saving complaint:', error);
      res.status(500).json({ error: 'Failed to create complaint draft' });
    }
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[BIS Sahayak AI] Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start BIS Sahayak server:', err);
});
