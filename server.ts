import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Ensure public/images exists
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|svg|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed'));
  }
});

// Endpoint to save XML config
app.post('/api/save-config', (req, res) => {
  const { xml } = req.body;
  if (!xml) {
    return res.status(400).json({ error: 'No XML content provided' });
  }

  const filePath = path.join(__dirname, 'public', 'website-config.xml');
  console.log('Attempting to save XML to:', filePath);
  
  fs.writeFile(filePath, xml, 'utf8', (err) => {
    if (err) {
      console.error('Error saving XML:', err);
      return res.status(500).json({ error: 'Failed to save config file' });
    }
    console.log('website-config.xml updated successfully at:', filePath);
    res.json({ success: true, message: 'Config saved successfully' });
  });
});

// Endpoint to upload images
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // Return the relative path to be stored in XML
  const relativePath = `images/${req.file.filename}`;
  res.json({ 
    success: true, 
    url: relativePath,
    message: 'Image uploaded successfully' 
  });
});

app.listen(port, () => {
  console.log(`Admin API server running at http://localhost:${port}`);
});
