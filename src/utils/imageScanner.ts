// Utility to scan and organize images from the public folder structure
export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  projectName?: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  images: ProjectImage[];
}

export interface CategoryData {
  category: string;
  projects: Project[];
  individualImages: ProjectImage[];
}

// Category mapping to match folder names
const categoryMapping: { [key: string]: string } = {
  'tomrer': 'Tømrer',
  'graving': 'Graving',
  'vatrom': 'Våtrom',
  'murer': 'Murer',
  'maling': 'Maling',
  'elektriker': 'Elektriker',
  'rorlegger': 'Rørlegger',
  'kjokken': 'Kjøkken',
  'arkitekt': 'Arkitekt',
  'material': 'Materialer'
};

// Cache for scanned data
let scannedDataCache: { [key: string]: CategoryData } = {};
let lastScanTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Function to scan directory structure dynamically
const scanDirectory = async (categoryKey: string): Promise<CategoryData> => {
  try {
    // Try to fetch directory listing from the image scanner server
    const response = await fetch(`http://localhost:3001/api/scan-images?category=${categoryKey}&t=${Date.now()}`);
    
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.warn('API scan failed, using fallback method:', error);
  }

  // Fallback: Use static data for now, but with dynamic detection
  return getStaticCategoryData(categoryMapping[categoryKey] || categoryKey);
};

// Function to get all images for a category with auto-detection
export const getCategoryImages = async (category: string): Promise<CategoryData> => {
  const categoryKey = Object.keys(categoryMapping).find(key => 
    categoryMapping[key] === category
  );
  
  if (!categoryKey) {
    return { category, projects: [], individualImages: [] };
  }

  const now = Date.now();
  
  // Check if we have fresh cached data
  if (scannedDataCache[category] && (now - lastScanTime) < CACHE_DURATION) {
    return scannedDataCache[category];
  }

  try {
    // Scan for new data
    const data = await scanDirectory(categoryKey);
    
    // Update cache
    scannedDataCache[category] = data;
    lastScanTime = now;
    
    return data;
  } catch (error) {
    console.error('Error scanning category images:', error);
    
    // Return cached data if available, otherwise empty data
    return scannedDataCache[category] || { category, projects: [], individualImages: [] };
  }
};

// Function to force refresh all categories
export const refreshAllCategories = async (): Promise<void> => {
  scannedDataCache = {};
  lastScanTime = 0;
};

// Function to get available categories dynamically
export const getAvailableCategories = (): string[] => {
  return Object.values(categoryMapping);
};

// Debug function to test category mapping
export const debugCategoryMapping = (category: string) => {
  console.log(`🔍 Debugging category: "${category}"`);
  console.log(`📋 All category mappings:`, categoryMapping);
  
  const categoryKey = Object.keys(categoryMapping).find(key => 
    categoryMapping[key] === category
  );
  
  console.log(`🔑 Found category key: "${categoryKey}"`);
  console.log(`📁 Expected folder name: "${categoryKey}"`);
  
  return categoryKey;
};

// Function to get the first image from a category for thumbnails
export const getCategoryThumbnail = async (category: string): Promise<string> => {
  try {
    const categoryData = await getCategoryImages(category);
    
    console.log(`🔍 Scanning for thumbnail in category: ${category}`);
    console.log(`📁 Projects found: ${categoryData.projects.length}`);
    console.log(`🖼️ Individual images found: ${categoryData.individualImages.length}`);
    
    // Helper function to find "main" image in an array of images
    const findMainImage = (images: ProjectImage[]): string | null => {
      console.log(`🔎 Searching for "main" image in ${images.length} images`);
      images.forEach((img, index) => {
        const fileName = img.src.split('/').pop()?.split('.')[0]; // Get filename without extension
        console.log(`  ${index + 1}. ${img.src} -> filename: "${fileName}"`);
      });
      
      const mainImage = images.find(img => {
        const fileName = img.src.split('/').pop()?.split('.')[0]; // Get filename without extension
        const isMain = fileName?.toLowerCase() === 'main';
        if (isMain) {
          console.log(`✅ Found main image: ${img.src}`);
        }
        return isMain;
      });
      return mainImage ? mainImage.src : null;
    };
    
    // First, try to find "main" image in projects
    if (categoryData.projects.length > 0) {
      console.log(`🏗️ Checking ${categoryData.projects.length} projects for main image`);
      for (const project of categoryData.projects) {
        console.log(`  📂 Project: ${project.name} (${project.images.length} images)`);
        if (project.images.length > 0) {
          const mainImage = findMainImage(project.images);
          if (mainImage) {
            console.log(`🎯 Using main image from project: ${mainImage}`);
            return mainImage;
          }
        }
      }
      
      // If no "main" image found in projects, use first image from first project
      if (categoryData.projects[0].images.length > 0) {
        console.log(`📸 Using first image from first project: ${categoryData.projects[0].images[0].src}`);
        return categoryData.projects[0].images[0].src;
      }
    }
    
    // If no projects, try to find "main" image in individual images
    if (categoryData.individualImages.length > 0) {
      console.log(`🖼️ Checking individual images for main image`);
      const mainImage = findMainImage(categoryData.individualImages);
      if (mainImage) {
        console.log(`🎯 Using main image from individual images: ${mainImage}`);
        return mainImage;
      }
      
      // If no "main" image found, use first individual image
      console.log(`📸 Using first individual image: ${categoryData.individualImages[0].src}`);
      return categoryData.individualImages[0].src;
    }
    
    // Fallback to a default image
    console.log(`⚠️ No images found, using placeholder`);
    return '/hero.avif';
  } catch (error) {
    console.error('Error getting category thumbnail:', error);
    return '/hero.avif';
  }
};

// Static data as fallback (keeping your existing data)
const getStaticCategoryData = (category: string): CategoryData => {
  const categoryKey = Object.keys(categoryMapping).find(key => 
    categoryMapping[key] === category
  );

  if (!categoryKey) {
    return { category, projects: [], individualImages: [] };
  }

  const categoryData: { [key: string]: CategoryData } = {
    'Tømrer': {
      category: 'Tømrer',
      projects: [
        {
          id: 'tomrer-skole',
          name: 'Tømrer Skole',
          category: 'Tømrer',
          images: [
            { id: 'skole-1', src: '/images/tomrer/tomrer skole/5658d317-12cd-47bc-97f8-68a7d5e2e36a.avif', alt: 'Tømrer Skole Prosjekt', category: 'Tømrer', projectName: 'Tømrer Skole' }
          ]
        },
        {
          id: 'tomrer-fasader',
          name: 'Tømrer Fasader',
          category: 'Tømrer',
          images: [
            { id: 'fasader-1', src: '/images/tomrer/tomrer fasader/DSC_8927.avif', alt: 'Tømrer Fasader Prosjekt', category: 'Tømrer', projectName: 'Tømrer Fasader' },
            { id: 'fasader-2', src: '/images/tomrer/tomrer fasader/DSC_8926.avif', alt: 'Tømrer Fasader Prosjekt', category: 'Tømrer', projectName: 'Tømrer Fasader' },
            { id: 'fasader-3', src: '/images/tomrer/tomrer fasader/DSC_8922.avif', alt: 'Tømrer Fasader Prosjekt', category: 'Tømrer', projectName: 'Tømrer Fasader' },
            { id: 'fasader-4', src: '/images/tomrer/tomrer fasader/DSC_8920.avif', alt: 'Tømrer Fasader Prosjekt', category: 'Tømrer', projectName: 'Tømrer Fasader' },
            { id: 'fasader-5', src: '/images/tomrer/tomrer fasader/DSC_8919.avif', alt: 'Tømrer Fasader Prosjekt', category: 'Tømrer', projectName: 'Tømrer Fasader' },
            { id: 'fasader-6', src: '/images/tomrer/tomrer fasader/DSC_8918.avif', alt: 'Tømrer Fasader Prosjekt', category: 'Tømrer', projectName: 'Tømrer Fasader' },
            { id: 'fasader-7', src: '/images/tomrer/tomrer fasader/DSC_8916.avif', alt: 'Tømrer Fasader Prosjekt', category: 'Tømrer', projectName: 'Tømrer Fasader' },
            { id: 'fasader-8', src: '/images/tomrer/tomrer fasader/DSC_8915.avif', alt: 'Tømrer Fasader Prosjekt', category: 'Tømrer', projectName: 'Tømrer Fasader' },
            { id: 'fasader-9', src: '/images/tomrer/tomrer fasader/DSC_8914.avif', alt: 'Tømrer Fasader Prosjekt', category: 'Tømrer', projectName: 'Tømrer Fasader' },
            { id: 'fasader-10', src: '/images/tomrer/tomrer fasader/DSC_8913.avif', alt: 'Tømrer Fasader Prosjekt', category: 'Tømrer', projectName: 'Tømrer Fasader' },
            { id: 'fasader-11', src: '/images/tomrer/tomrer fasader/DSC_8911.avif', alt: 'Tømrer Fasader Prosjekt', category: 'Tømrer', projectName: 'Tømrer Fasader' }
          ]
        },
        {
          id: 'tomrer-trappa',
          name: 'Tømrer Trappa',
          category: 'Tømrer',
          images: [
            { id: 'trappa-1', src: '/images/tomrer/tomrer trappa/l12.avif', alt: 'Tømrer Trappa Prosjekt', category: 'Tømrer', projectName: 'Tømrer Trappa' },
            { id: 'trappa-2', src: '/images/tomrer/tomrer trappa/l11.avif', alt: 'Tømrer Trappa Prosjekt', category: 'Tømrer', projectName: 'Tømrer Trappa' },
            { id: 'trappa-3', src: '/images/tomrer/tomrer trappa/l9.avif', alt: 'Tømrer Trappa Prosjekt', category: 'Tømrer', projectName: 'Tømrer Trappa' },
            { id: 'trappa-4', src: '/images/tomrer/tomrer trappa/l8.avif', alt: 'Tømrer Trappa Prosjekt', category: 'Tømrer', projectName: 'Tømrer Trappa' },
            { id: 'trappa-5', src: '/images/tomrer/tomrer trappa/l7.avif', alt: 'Tømrer Trappa Prosjekt', category: 'Tømrer', projectName: 'Tømrer Trappa' },
            { id: 'trappa-6', src: '/images/tomrer/tomrer trappa/l6.avif', alt: 'Tømrer Trappa Prosjekt', category: 'Tømrer', projectName: 'Tømrer Trappa' },
            { id: 'trappa-7', src: '/images/tomrer/tomrer trappa/l5.avif', alt: 'Tømrer Trappa Prosjekt', category: 'Tømrer', projectName: 'Tømrer Trappa' },
            { id: 'trappa-8', src: '/images/tomrer/tomrer trappa/l4.avif', alt: 'Tømrer Trappa Prosjekt', category: 'Tømrer', projectName: 'Tømrer Trappa' },
            { id: 'trappa-9', src: '/images/tomrer/tomrer trappa/l3.avif', alt: 'Tømrer Trappa Prosjekt', category: 'Tømrer', projectName: 'Tømrer Trappa' }
          ]
        },
        {
          id: 'hytte-tomrer',
          name: 'Hytte Tømrer',
          category: 'Tømrer',
          images: [
            { id: 'hytte-1', src: '/images/tomrer/hytte tomrer/h0.avif', alt: 'Hytte Tømrer Prosjekt', category: 'Tømrer', projectName: 'Hytte Tømrer' },
            { id: 'hytte-2', src: '/images/tomrer/hytte tomrer/h9.avif', alt: 'Hytte Tømrer Prosjekt', category: 'Tømrer', projectName: 'Hytte Tømrer' },
            { id: 'hytte-3', src: '/images/tomrer/hytte tomrer/h8.avif', alt: 'Hytte Tømrer Prosjekt', category: 'Tømrer', projectName: 'Hytte Tømrer' },
            { id: 'hytte-4', src: '/images/tomrer/hytte tomrer/h7.avif', alt: 'Hytte Tømrer Prosjekt', category: 'Tømrer', projectName: 'Hytte Tømrer' },
            { id: 'hytte-5', src: '/images/tomrer/hytte tomrer/h6.avif', alt: 'Hytte Tømrer Prosjekt', category: 'Tømrer', projectName: 'Hytte Tømrer' },
            { id: 'hytte-6', src: '/images/tomrer/hytte tomrer/h5.avif', alt: 'Hytte Tømrer Prosjekt', category: 'Tømrer', projectName: 'Hytte Tømrer' },
            { id: 'hytte-7', src: '/images/tomrer/hytte tomrer/h4.avif', alt: 'Hytte Tømrer Prosjekt', category: 'Tømrer', projectName: 'Hytte Tømrer' },
            { id: 'hytte-8', src: '/images/tomrer/hytte tomrer/h3.avif', alt: 'Hytte Tømrer Prosjekt', category: 'Tømrer', projectName: 'Hytte Tømrer' },
            { id: 'hytte-9', src: '/images/tomrer/hytte tomrer/h1.avif', alt: 'Hytte Tømrer Prosjekt', category: 'Tømrer', projectName: 'Hytte Tømrer' },
            { id: 'hytte-10', src: '/images/tomrer/hytte tomrer/ht2.avif', alt: 'Hytte Tømrer Prosjekt', category: 'Tømrer', projectName: 'Hytte Tømrer' },
            { id: 'hytte-11', src: '/images/tomrer/hytte tomrer/ht1.avif', alt: 'Hytte Tømrer Prosjekt', category: 'Tømrer', projectName: 'Hytte Tømrer' }
          ]
        },
        {
          id: 'tomrer-terrasse',
          name: 'Tømrer Terrasse',
          category: 'Tømrer',
          images: [
            { id: 'terrasse-1', src: '/images/tomrer/tomrer terrasse/terasa17.avif', alt: 'Tømrer Terrasse Prosjekt', category: 'Tømrer', projectName: 'Tømrer Terrasse' },
            { id: 'terrasse-2', src: '/images/tomrer/tomrer terrasse/terasa15.avif', alt: 'Tømrer Terrasse Prosjekt', category: 'Tømrer', projectName: 'Tømrer Terrasse' },
            { id: 'terrasse-3', src: '/images/tomrer/tomrer terrasse/terasa14col.avif', alt: 'Tømrer Terrasse Prosjekt', category: 'Tømrer', projectName: 'Tømrer Terrasse' },
            { id: 'terrasse-4', src: '/images/tomrer/tomrer terrasse/terasa13col.avif', alt: 'Tømrer Terrasse Prosjekt', category: 'Tømrer', projectName: 'Tømrer Terrasse' },
            { id: 'terrasse-5', src: '/images/tomrer/tomrer terrasse/terasa12cool.avif', alt: 'Tømrer Terrasse Prosjekt', category: 'Tømrer', projectName: 'Tømrer Terrasse' },
            { id: 'terrasse-6', src: '/images/tomrer/tomrer terrasse/terasa11cool.avif', alt: 'Tømrer Terrasse Prosjekt', category: 'Tømrer', projectName: 'Tømrer Terrasse' },
            { id: 'terrasse-7', src: '/images/tomrer/tomrer terrasse/terasa10.avif', alt: 'Tømrer Terrasse Prosjekt', category: 'Tømrer', projectName: 'Tømrer Terrasse' },
            { id: 'terrasse-8', src: '/images/tomrer/tomrer terrasse/terasa9.avif', alt: 'Tømrer Terrasse Prosjekt', category: 'Tømrer', projectName: 'Tømrer Terrasse' },
            { id: 'terrasse-9', src: '/images/tomrer/tomrer terrasse/terasa8.avif', alt: 'Tømrer Terrasse Prosjekt', category: 'Tømrer', projectName: 'Tømrer Terrasse' },
            { id: 'terrasse-10', src: '/images/tomrer/tomrer terrasse/terasa7.avif', alt: 'Tømrer Terrasse Prosjekt', category: 'Tømrer', projectName: 'Tømrer Terrasse' },
            { id: 'terrasse-11', src: '/images/tomrer/tomrer terrasse/terasa 6.avif', alt: 'Tømrer Terrasse Prosjekt', category: 'Tømrer', projectName: 'Tømrer Terrasse' },
            { id: 'terrasse-12', src: '/images/tomrer/tomrer terrasse/terasa5.avif', alt: 'Tømrer Terrasse Prosjekt', category: 'Tømrer', projectName: 'Tømrer Terrasse' },
            { id: 'terrasse-13', src: '/images/tomrer/tomrer terrasse/terasa4.avif', alt: 'Tømrer Terrasse Prosjekt', category: 'Tømrer', projectName: 'Tømrer Terrasse' },
            { id: 'terrasse-14', src: '/images/tomrer/tomrer terrasse/terasa3.avif', alt: 'Tømrer Terrasse Prosjekt', category: 'Tømrer', projectName: 'Tømrer Terrasse' },
            { id: 'terrasse-15', src: '/images/tomrer/tomrer terrasse/terasa2.avif', alt: 'Tømrer Terrasse Prosjekt', category: 'Tømrer', projectName: 'Tømrer Terrasse' },
            { id: 'terrasse-16', src: '/images/tomrer/tomrer terrasse/terassa.avif', alt: 'Tømrer Terrasse Prosjekt', category: 'Tømrer', projectName: 'Tømrer Terrasse' }
          ]
        },
        {
          id: 'tomrer-tak',
          name: 'Tømrer Tak',
          category: 'Tømrer',
          images: [
            { id: 'tak-1', src: '/images/tomrer/tomrer tak/takstein1.avif', alt: 'Tømrer Tak Prosjekt', category: 'Tømrer', projectName: 'Tømrer Tak' },
            { id: 'tak-2', src: '/images/tomrer/tomrer tak/takstein.avif', alt: 'Tømrer Tak Prosjekt', category: 'Tømrer', projectName: 'Tømrer Tak' },
            { id: 'tak-3', src: '/images/tomrer/tomrer tak/lekter.avif', alt: 'Tømrer Tak Prosjekt', category: 'Tømrer', projectName: 'Tømrer Tak' },
            { id: 'tak-4', src: '/images/tomrer/tomrer tak/20250626_082022.avif', alt: 'Tømrer Tak Prosjekt', category: 'Tømrer', projectName: 'Tømrer Tak' }
          ]
        },
        {
          id: 'mariaus-tomrer',
          name: 'Mariaus Tømrer',
          category: 'Tømrer',
          images: [
            { id: 'mariaus-1', src: '/images/tomrer/mariaus tomrer/DSC_8920.avif', alt: 'Mariaus Tømrer Prosjekt', category: 'Tømrer', projectName: 'Mariaus Tømrer' },
            { id: 'mariaus-2', src: '/images/tomrer/mariaus tomrer/DSC_8919.avif', alt: 'Mariaus Tømrer Prosjekt', category: 'Tømrer', projectName: 'Mariaus Tømrer' },
            { id: 'mariaus-3', src: '/images/tomrer/mariaus tomrer/DSC_8918.avif', alt: 'Mariaus Tømrer Prosjekt', category: 'Tømrer', projectName: 'Mariaus Tømrer' },
            { id: 'mariaus-4', src: '/images/tomrer/mariaus tomrer/DSC_8916.avif', alt: 'Mariaus Tømrer Prosjekt', category: 'Tømrer', projectName: 'Mariaus Tømrer' },
            { id: 'mariaus-5', src: '/images/tomrer/mariaus tomrer/DSC_8915.avif', alt: 'Mariaus Tømrer Prosjekt', category: 'Tømrer', projectName: 'Mariaus Tømrer' },
            { id: 'mariaus-6', src: '/images/tomrer/mariaus tomrer/DSC_8914.avif', alt: 'Mariaus Tømrer Prosjekt', category: 'Tømrer', projectName: 'Mariaus Tømrer' },
            { id: 'mariaus-7', src: '/images/tomrer/mariaus tomrer/DSC_8913.avif', alt: 'Mariaus Tømrer Prosjekt', category: 'Tømrer', projectName: 'Mariaus Tømrer' },
            { id: 'mariaus-8', src: '/images/tomrer/mariaus tomrer/DSC_8911.avif', alt: 'Mariaus Tømrer Prosjekt', category: 'Tømrer', projectName: 'Mariaus Tømrer' }
          ]
        }
      ],
      individualImages: [
        { id: 's21', src: '/images/tomrer/s21.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 's20', src: '/images/tomrer/s20.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 's19', src: '/images/tomrer/s19.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 's18', src: '/images/tomrer/s18.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 's17', src: '/images/tomrer/s17.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 's16', src: '/images/tomrer/s16.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 's144', src: '/images/tomrer/s144.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 's14', src: '/images/tomrer/s14.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 's13', src: '/images/tomrer/s13.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 's11', src: '/images/tomrer/s11.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 's9', src: '/images/tomrer/s9.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 's8', src: '/images/tomrer/s8.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 's6', src: '/images/tomrer/s6.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 's5', src: '/images/tomrer/s5.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 's4', src: '/images/tomrer/s4.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 's3', src: '/images/tomrer/s3.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 's2', src: '/images/tomrer/s2.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 'stogas', src: '/images/tomrer/stogas.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' },
        { id: 'facebook', src: '/images/tomrer/464269176_3319981941476867_440079571175753359_n.avif', alt: 'Tømrer Arbeid', category: 'Tømrer' }
      ]
    },
    'Graving': {
      category: 'Graving',
      projects: [
        {
          id: 'graver-kjeller',
          name: 'Graver Kjeller',
          category: 'Graving',
          images: [
            { id: 'kjeller-1', src: '/images/graving/graver kjeller/494044944_122095993646900552_6809756873272216458_n.avif', alt: 'Graver Kjeller Prosjekt', category: 'Graving', projectName: 'Graver Kjeller' },
            { id: 'kjeller-2', src: '/images/graving/graver kjeller/494336083_122095993580900552_4325667018563643854_n.avif', alt: 'Graver Kjeller Prosjekt', category: 'Graving', projectName: 'Graver Kjeller' },
            { id: 'kjeller-3', src: '/images/graving/graver kjeller/498210827_122095993538900552_6664267786902988381_n.avif', alt: 'Graver Kjeller Prosjekt', category: 'Graving', projectName: 'Graver Kjeller' }
          ]
        }
      ],
      individualImages: [
        { id: 'graving-1', src: '/images/graving/502733686_122096071136900552_1134328021949441053_n.avif', alt: 'Graving Arbeid', category: 'Graving' },
        { id: 'graving-2', src: '/images/graving/503183405_122095998476900552_6208864772488449403_n.avif', alt: 'Graving Arbeid', category: 'Graving' },
        { id: 'graving-3', src: '/images/graving/502585308_122095998452900552_8042414131297474087_n.avif', alt: 'Graving Arbeid', category: 'Graving' },
        { id: 'graving-4', src: '/images/graving/502429276_122095998416900552_3211709760679848613_n.avif', alt: 'Graving Arbeid', category: 'Graving' },
        { id: 'graving-5', src: '/images/graving/503000314_122095998284900552_7579399630153475899_n.avif', alt: 'Graving Arbeid', category: 'Graving' },
        { id: 'graving-6', src: '/images/graving/502411030_122095998212900552_8618106239628025833_n.avif', alt: 'Graving Arbeid', category: 'Graving' },
        { id: 'graving-7', src: '/images/graving/503367594_122095997954900552_9113232961081441323_n.avif', alt: 'Graving Arbeid', category: 'Graving' },
        { id: 'graving-8', src: '/images/graving/500930665_122095997108900552_6278131538195427603_n.avif', alt: 'Graving Arbeid', category: 'Graving' },
        { id: 'graving-9', src: '/images/graving/502987440_122095996988900552_3538715591296874115_n.avif', alt: 'Graving Arbeid', category: 'Graving' }
      ]
    },
    'Våtrom': {
      category: 'Våtrom',
      projects: [],
      individualImages: [
        { id: 'vatrom-1', src: '/images/vatrom/0353fd81-ddc2-4133-b619-7d9fdebc263c.avif', alt: 'Våtrom Arbeid', category: 'Våtrom' },
        { id: 'vatrom-2', src: '/images/vatrom/051eafda-7377-49c1-bea5-38cb4b5ebe0d.avif', alt: 'Våtrom Arbeid', category: 'Våtrom' },
        { id: 'vatrom-3', src: '/images/vatrom/9be67488-5fff-409b-a3e0-8ceb4cce9b44.avif', alt: 'Våtrom Arbeid', category: 'Våtrom' },
        { id: 'vatrom-4', src: '/images/vatrom/502527885_122095985720900552_1837436725184916945_n.avif', alt: 'Våtrom Arbeid', category: 'Våtrom' },
        { id: 'vatrom-5', src: '/images/vatrom/502710972_122095985354900552_6980517728070742980_n.avif', alt: 'Våtrom Arbeid', category: 'Våtrom' },
        { id: 'vatrom-6', src: '/images/vatrom/495855490_122095985270900552_8411948747538452232_n.avif', alt: 'Våtrom Arbeid', category: 'Våtrom' },
        { id: 'vatrom-7', src: '/images/vatrom/502537676_122095971158900552_5972748688497357272_n.avif', alt: 'Våtrom Arbeid', category: 'Våtrom' },
        { id: 'vatrom-8', src: '/images/vatrom/502585166_122095969028900552_5241540559876855781_n.avif', alt: 'Våtrom Arbeid', category: 'Våtrom' }
      ]
    },
    'Murer': {
      category: 'Murer',
      projects: [],
      individualImages: [
        { id: 'murer-1', src: '/images/murer/mur3.avif', alt: 'Murer Arbeid', category: 'Murer' },
        { id: 'murer-2', src: '/images/murer/04-gliwice-bojkow-ul.-parkowa-002_www-1024x576-1024x576.avif', alt: 'Murer Arbeid', category: 'Murer' },
        { id: 'murer-3', src: '/images/murer/59632840_2381310695486346_6484362115342663680_n.avif', alt: 'Murer Arbeid', category: 'Murer' },
        { id: 'murer-4', src: '/images/murer/528669811_764986052739953_7072907303224216960_n.avif', alt: 'Murer Arbeid', category: 'Murer' },
        { id: 'murer-5', src: '/images/murer/528138836_1097852031892699_3813371299136369751_n.avif', alt: 'Murer Arbeid', category: 'Murer' }
      ]
    },
    'Maling': {
      category: 'Maling',
      projects: [],
      individualImages: [
        { id: 'maling-main', src: '/images/maling/main.avif', alt: 'Maling Arbeid', category: 'Maling' },
        { id: 'maling-1', src: '/images/maling/b57d2e04-6744-4a43-8c99-de22a05a551c.avif', alt: 'Maling Arbeid', category: 'Maling' },
        { id: 'maling-2', src: '/images/maling/3c98f10b-7aaa-429e-937a-8d42c829dd5c.avif', alt: 'Maling Arbeid', category: 'Maling' },
        { id: 'maling-3', src: '/images/maling/5bf869c3-36ff-462c-a225-a63e1a11554f.gif', alt: 'Maling Arbeid', category: 'Maling' },
        { id: 'maling-4', src: '/images/maling/leilighet.avif', alt: 'Maling Arbeid', category: 'Maling' }
      ]
    },
    'Elektriker': {
      category: 'Elektriker',
      projects: [],
      individualImages: [
        { id: 'elektriker-1', src: '/images/elektriker/l2.avif', alt: 'Elektriker Arbeid', category: 'Elektriker' },
        { id: 'elektriker-2', src: '/images/elektriker/l1.avif', alt: 'Elektriker Arbeid', category: 'Elektriker' },
        { id: 'elektriker-3', src: '/images/elektriker/l0.avif', alt: 'Elektriker Arbeid', category: 'Elektriker' }
      ]
    },
    'Rørlegger': {
      category: 'Rørlegger',
      projects: [],
      individualImages: [
        { id: 'rorlegger-main', src: '/images/rorlegger/main.avif', alt: 'Rørlegger Arbeid', category: 'Rørlegger' },
        { id: 'rorlegger-1', src: '/images/rorlegger/When-To-Call-a-Plumber.avif', alt: 'Rørlegger Arbeid', category: 'Rørlegger' }
      ]
    },
    'Kjøkken': {
      category: 'Kjøkken',
      projects: [],
      individualImages: [
        { id: 'kjokken-main', src: '/images/kjokken/main.avif', alt: 'Kjøkken Arbeid', category: 'Kjøkken' },
        { id: 'kjokken-1', src: '/images/kjokken/491274050_122095993784900552_8390749827450607795_n.avif', alt: 'Kjøkken Arbeid', category: 'Kjøkken' },
        { id: 'kjokken-2', src: '/images/kjokken/496948007_122095993700900552_2714223174870920586_n.avif', alt: 'Kjøkken Arbeid', category: 'Kjøkken' },
        { id: 'kjokken-3', src: '/images/kjokken/498324039_122095993490900552_7675416108170979667_n.avif', alt: 'Kjøkken Arbeid', category: 'Kjøkken' }
      ]
    },
    'Arkitekt': {
      category: 'Arkitekt',
      projects: [],
      individualImages: [
        { id: 'arkitekt-1', src: '/images/arkitekt/Hoghytta-C-2-scaled.avif', alt: 'Arkitekt Prosjekt', category: 'Arkitekt' },
        { id: 'arkitekt-2', src: '/images/arkitekt/Solvind-C-1-scaled.avif', alt: 'Arkitekt Prosjekt', category: 'Arkitekt' },
        { id: 'arkitekt-3', src: '/images/arkitekt/H80v2-0.avif', alt: 'Arkitekt Prosjekt', category: 'Arkitekt' },
        { id: 'arkitekt-4', src: '/images/arkitekt/Hoghytta-A-3-scaled.avif', alt: 'Arkitekt Prosjekt', category: 'Arkitekt' },
        { id: 'arkitekt-5', src: '/images/arkitekt/Vradad.0004-scaled.avif', alt: 'Arkitekt Prosjekt', category: 'Arkitekt' },
        { id: 'arkitekt-6', src: '/images/arkitekt/view-3-House-2--scaled.avif', alt: 'Arkitekt Prosjekt', category: 'Arkitekt' },
        { id: 'arkitekt-7', src: '/images/arkitekt/view-1-House-1--scaled.avif', alt: 'Arkitekt Prosjekt', category: 'Arkitekt' },
        { id: 'arkitekt-8', src: '/images/arkitekt/15-Dif.avif', alt: 'Arkitekt Prosjekt', category: 'Arkitekt' },
        { id: 'arkitekt-9', src: '/images/arkitekt/Vradad.0001-scaled.avif', alt: 'Arkitekt Prosjekt', category: 'Arkitekt' },
        { id: 'arkitekt-10', src: '/images/arkitekt/view-6--scaled.avif', alt: 'Arkitekt Prosjekt', category: 'Arkitekt' },
        { id: 'arkitekt-11', src: '/images/arkitekt/Vradad.0005-scaled.avif', alt: 'Arkitekt Prosjekt', category: 'Arkitekt' },
        { id: 'arkitekt-12', src: '/images/arkitekt/Hoghytta-C-1-scaled.avif', alt: 'Arkitekt Prosjekt', category: 'Arkitekt' }
      ]
    },
    'Materialer': {
      category: 'Materialer',
      projects: [],
      individualImages: [
        { id: 'material-main', src: '/images/material/main.avif', alt: 'Byggematerialer', category: 'Materialer' },
        { id: 'material-1', src: '/images/material/1344258.avif', alt: 'Byggematerialer', category: 'Materialer' },
        { id: 'material-2', src: '/images/material/20536_1.avif', alt: 'Byggematerialer', category: 'Materialer' },
        { id: 'material-3', src: '/images/material/08419148_1.avif', alt: 'Byggematerialer', category: 'Materialer' },
        { id: 'material-4', src: '/images/material/08148048_2.avif', alt: 'Byggematerialer', category: 'Materialer' },
        { id: 'material-5', src: '/images/material/08148098_2.avif', alt: 'Byggematerialer', category: 'Materialer' },
        { id: 'material-6', src: '/images/material/08748148_4.avif', alt: 'Byggematerialer', category: 'Materialer' },
        { id: 'material-7', src: '/images/material/08736048_6.avif', alt: 'Byggematerialer', category: 'Materialer' },
        { id: 'material-8', src: '/images/material/terrasse bord2.avif', alt: 'Byggematerialer', category: 'Materialer' },
        { id: 'material-9', src: '/images/material/terrasse bord.avif', alt: 'Byggematerialer', category: 'Materialer' },
        { id: 'material-10', src: '/images/material/OSB-TG2_4.avif', alt: 'Byggematerialer', category: 'Materialer' },
        { id: 'material-11', src: '/images/material/perdangos-plokstes-hcs-200.avif', alt: 'Byggematerialer', category: 'Materialer' },
        { id: 'material-12', src: '/images/material/20250814_164503.avif', alt: 'Byggematerialer', category: 'Materialer' }
      ]
    }
  };

  return categoryData[category] || { category, projects: [], individualImages: [] };
};
