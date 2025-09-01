const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Function to scan directory recursively
async function scanDirectory(dirPath, basePath = '') {
  const items = [];
  
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.join(basePath, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        const subItems = await scanDirectory(fullPath, relativePath);
        items.push(...subItems);
      } else if (entry.isFile()) {
        // Check if it's an image file
        const ext = path.extname(entry.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'].includes(ext)) {
          items.push({
            type: 'file',
            name: entry.name,
            path: relativePath.replace(/\\/g, '/'), // Convert Windows paths to URL format
            fullPath: fullPath
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }
  
  return items;
}

// Function to organize images into projects and individual images
function organizeImages(files, categoryKey) {
  const projects = [];
  const individualImages = [];
  const projectMap = new Map();
  
  for (const file of files) {
    const pathParts = file.path.split('/');
    
    if (pathParts.length > 2) {
      // This is in a subfolder - treat as project
      const projectName = pathParts[1]; // The subfolder name
      const fileName = pathParts[pathParts.length - 1];
      
      if (!projectMap.has(projectName)) {
        projectMap.set(projectName, {
          id: `${categoryKey}-${projectName.toLowerCase().replace(/\s+/g, '-')}`,
          name: projectName,
          category: categoryKey,
          images: []
        });
      }
      
      const project = projectMap.get(projectName);
      project.images.push({
        id: `${projectName}-${fileName.replace(/\.[^/.]+$/, '')}`,
        src: `/images/${file.path}`,
        alt: `${projectName} - ${fileName}`,
        category: categoryKey,
        projectName: projectName
      });
    } else {
      // This is directly in the category folder - treat as individual image
      const fileName = pathParts[pathParts.length - 1];
      individualImages.push({
        id: `${categoryKey}-${fileName.replace(/\.[^/.]+$/, '')}`,
        src: `/images/${file.path}`,
        alt: `${categoryKey} Arbeid`,
        category: categoryKey
      });
    }
  }
  
  // Convert project map to array
  for (const project of projectMap.values()) {
    projects.push(project);
  }
  
  return { projects, individualImages };
}

// API endpoint to scan images for a specific category
app.get('/api/scan-images', async (req, res) => {
  try {
    const { category } = req.query;
    
    if (!category) {
      return res.status(400).json({ error: 'Category parameter is required' });
    }
    
    const categoryPath = path.join(__dirname, 'public', 'images', category);
    
    // Check if category directory exists
    try {
      await fs.access(categoryPath);
    } catch (error) {
      return res.json({
        category: category,
        projects: [],
        individualImages: []
      });
    }
    
    // Scan the directory
    const files = await scanDirectory(categoryPath, category);
    
    // Organize the files
    const { projects, individualImages } = organizeImages(files, category);
    
    res.json({
      category: category,
      projects: projects,
      individualImages: individualImages
    });
    
  } catch (error) {
    console.error('Error in scan-images endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to get all available categories
app.get('/api/categories', async (req, res) => {
  try {
    const imagesPath = path.join(__dirname, 'public', 'images');
    
    try {
      await fs.access(imagesPath);
    } catch (error) {
      return res.json([]);
    }
    
    const entries = await fs.readdir(imagesPath, { withFileTypes: true });
    const categories = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
    
    res.json(categories);
    
  } catch (error) {
    console.error('Error in categories endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Image scanner server running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET /api/scan-images?category=<category>`);
  console.log(`  GET /api/categories`);
  console.log(`  GET /api/health`);
});
