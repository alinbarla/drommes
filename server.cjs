// CommonJS Express server: image scanner + contact mailer
require('dotenv').config();
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.static('public'));

// ---------- Mailer (Gmail SMTP via App Password) ----------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: (process.env.SMTP_SECURE || 'true') === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, projectType, message, to } = req.body || {};
    const toAddress = to || process.env.MAIL_TO || process.env.SMTP_USER;

    if (!toAddress) return res.status(400).json({ error: 'Missing destination email' });

    const mailOptions = {
      from: `Drømme Huset AS <${process.env.SMTP_USER}>`,
      to: toAddress,
      subject: `Ny henvendelse fra kontaktskjema – ${name || 'Ukjent'}`,
      replyTo: email || process.env.SMTP_USER,
      text: `Navn: ${name}\nE‑post: ${email}\nTelefon: ${phone}\nTjeneste: ${projectType}\n\nMelding:\n${message}`,
      html: `
        <h2>Ny henvendelse fra nettsiden</h2>
        <p><strong>Navn:</strong> ${name || ''}</p>
        <p><strong>E‑post:</strong> ${email || ''}</p>
        <p><strong>Telefon:</strong> ${phone || ''}</p>
        <p><strong>Tjeneste:</strong> ${projectType || ''}</p>
        <p><strong>Melding:</strong></p>
        <p>${(message || '').replace(/\n/g, '<br/>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ ok: true });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Email sending failed' });
  }
});

// ---------- Image scanner endpoints ----------
async function scanDirectory(dirPath, basePath = '') {
  const items = [];
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.join(basePath, entry.name);
      if (entry.isDirectory()) {
        const subItems = await scanDirectory(fullPath, relativePath);
        items.push(...subItems);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'].includes(ext)) {
          items.push({ type: 'file', name: entry.name, path: relativePath.replace(/\\/g, '/'), fullPath });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }
  return items;
}

function organizeImages(files, categoryKey) {
  const projects = [];
  const individualImages = [];
  const projectMap = new Map();
  for (const file of files) {
    const pathParts = file.path.split('/');
    if (pathParts.length > 2) {
      const projectName = pathParts[1];
      const fileName = pathParts[pathParts.length - 1];
      if (!projectMap.has(projectName)) {
        projectMap.set(projectName, { id: `${categoryKey}-${projectName.toLowerCase().replace(/\s+/g, '-')}`, name: projectName, category: categoryKey, images: [] });
      }
      const project = projectMap.get(projectName);
      project.images.push({ id: `${projectName}-${fileName.replace(/\.[^/.]+$/, '')}`, src: `/images/${file.path}`, alt: `${projectName} - ${fileName}`, category: categoryKey, projectName });
    } else {
      const fileName = pathParts[pathParts.length - 1];
      individualImages.push({ id: `${categoryKey}-${fileName.replace(/\.[^/.]+$/, '')}`, src: `/images/${file.path}`, alt: `${categoryKey} Arbeid`, category: categoryKey });
    }
  }
  for (const project of projectMap.values()) projects.push(project);
  return { projects, individualImages };
}

app.get('/api/scan-images', async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) return res.status(400).json({ error: 'Category parameter is required' });
    const categoryPath = path.join(__dirname, 'public', 'images', category);
    try { await fs.access(categoryPath); } catch { return res.json({ category, projects: [], individualImages: [] }); }
    const files = await scanDirectory(categoryPath, category);
    const { projects, individualImages } = organizeImages(files, category);
    res.json({ category, projects, individualImages });
  } catch (error) {
    console.error('Error in scan-images endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const imagesPath = path.join(__dirname, 'public', 'images');
    try { await fs.access(imagesPath); } catch { return res.json([]); }
    const entries = await fs.readdir(imagesPath, { withFileTypes: true });
    const categories = entries.filter(e => e.isDirectory()).map(e => e.name);
    res.json(categories);
  } catch (error) {
    console.error('Error in categories endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


