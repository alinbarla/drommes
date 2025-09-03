import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, RefreshCw } from 'lucide-react';
import { useSearchParams, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import LazyImage from '../components/LazyImage';
import { getBreadcrumbsFromPath } from '../utils/breadcrumbs';
import { getCategoryImages, getAvailableCategories, refreshAllCategories, ProjectImage, Project } from '../utils/imageScanner';

const Gallery = () => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbsFromPath(location.pathname);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState<ProjectImage[]>([]);
  const [categoryData, setCategoryData] = useState<{ projects: Project[], individualImages: ProjectImage[] }>({ projects: [], individualImages: [] });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Get category from URL parameter
  const categoryFromUrl = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'Tømrer');

  const categories = getAvailableCategories();

  // Load category data when category changes
  useEffect(() => {
    const loadCategoryData = async () => {
      setLoading(true);
      try {
        const data = await getCategoryImages(selectedCategory);
        setCategoryData({ projects: data.projects, individualImages: data.individualImages });
        
        // Combine all images for gallery navigation
        const allImagesArray: ProjectImage[] = [
          ...data.projects.flatMap(project => project.images),
          ...data.individualImages
        ];
        setAllImages(allImagesArray);
      } catch (error) {
        console.error('Error loading category data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryData();
  }, [selectedCategory]);

  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory) {
      setSearchParams({ category: selectedCategory });
    } else {
      setSearchParams({});
    }
  }, [selectedCategory, setSearchParams]);

  // Update selected category when URL changes and scroll to top
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
    // Scroll to top when component mounts or URL changes
    window.scrollTo(0, 0);
  }, [categoryFromUrl]);

  // Keyboard navigation for gallery popup
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          previousImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextImage();
          break;
        case 'Escape':
          event.preventDefault();
          closeImage();
          break;
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, allImages]);

  // Cleanup body scroll when component unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  // Navigation functions for gallery popup
  const nextImage = () => {
    if (selectedImage && allImages.length > 0) {
      const currentIndex = allImages.findIndex(img => img.id === selectedImage.id);
      const nextIndex = (currentIndex + 1) % allImages.length;
      setSelectedImage(allImages[nextIndex]);
      setCurrentImageIndex(nextIndex);
    }
  };

  const previousImage = () => {
    if (selectedImage && allImages.length > 0) {
      const currentIndex = allImages.findIndex(img => img.id === selectedImage.id);
      const prevIndex = currentIndex === 0 ? allImages.length - 1 : currentIndex - 1;
      setSelectedImage(allImages[prevIndex]);
      setCurrentImageIndex(prevIndex);
    }
  };

  const openImage = (image: ProjectImage) => {
    setSelectedImage(image);
    const index = allImages.findIndex(img => img.id === image.id);
    setCurrentImageIndex(index);
    // Prevent body scroll when modal is open
    document.body.classList.add('modal-open');
  };

  const closeImage = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
    // Restore body scroll when modal is closed
    document.body.classList.remove('modal-open');
  };

  // Function to refresh images
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshAllCategories();
      // Reload current category data
      const data = await getCategoryImages(selectedCategory);
      setCategoryData({ projects: data.projects, individualImages: data.individualImages });
      
      // Update all images array
      const allImagesArray: ProjectImage[] = [
        ...data.projects.flatMap(project => project.images),
        ...data.individualImages
      ];
      setAllImages(allImagesArray);
    } catch (error) {
      console.error('Error refreshing images:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <>
      <SEO 
        title="Prosjektgalleri - Drømme Huset AS | Bygg og Anlegg i Drammen"
        description="Utforsk våre prosjekter innen bygg og anlegg i Drammen, Lier, Svelvik og Holmestrand. Tømrer, murer, elektriker, våtrom og mer. Se våre kvalitetsarbeider og profesjonelle løsninger."
        url="https://dromehusetditt.no/gallery"
      />
      <StructuredData 
        type="LocalBusiness" 
        data={{}}
      />
      <StructuredData 
        type="BreadcrumbList" 
        data={{ breadcrumbs }}
      />
      {categoryData.projects.length > 0 && (
        <>
          <StructuredData 
            type="ImageObject" 
            data={{ 
              url: categoryData.projects[0]?.images[0]?.src || '/images/placeholder.jpg',
              description: `${selectedCategory} prosjekt fra Drømme Huset AS`,
              name: `${selectedCategory} - Drømme Huset AS`
            }}
          />
          {categoryData.projects.map((project, index) => (
            <StructuredData 
              key={project.id}
              type="ImageObject" 
              data={{ 
                url: project.images[0]?.src,
                description: `${project.name} - ${selectedCategory} prosjekt fra Drømme Huset AS`,
                name: `${project.name} - ${selectedCategory}`,
                creator: "Drømme Huset AS",
                copyrightHolder: "Drømme Huset AS"
              }}
            />
          ))}
        </>
      )}
         <main className="min-h-screen py-20 bg-sand-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-puce-500">
              Prosjektgalleri
            </h1>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="btn-premium p-3 rounded-full disabled:opacity-50"
              title="Oppdater bilder"
            >
              <RefreshCw className={`h-6 w-6 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
                      <p className="text-xl text-puce-500 max-w-3xl mx-auto">
              Utforsk våre omfattende prosjekter innen bygg og anlegg, 
              som viser vår ekspertise innen ulike sektorer og byggtyper.
              {refreshing && <span className="block mt-2 text-sm text-gold-600">Oppdaterer bilder...</span>}
            </p>
        </header>

        {/* Category Filter */}
        <nav className="flex flex-wrap justify-center gap-4 mb-12" aria-label="Kategorifilter for prosjektgalleri">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'btn-premium shadow-lg scale-105'
                  : 'bg-white text-puce-500 hover:bg-gold-100 hover:text-puce-500 hover:shadow-md hover:scale-105'
              }`}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && categoryData.projects.length > 0 && (
          <section className="mb-12" aria-labelledby="projects-heading">
            <h2 id="projects-heading" className="text-2xl font-bold text-puce-500 mb-6">Prosjekter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryData.projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => openImage(project.images[0])}
            >
              <div className="relative overflow-hidden">
                <LazyImage
                  src={project.images[0].src}
                  alt={`${project.name} - ${selectedCategory} prosjekt fra Drømme Huset AS`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  width={400}
                  height={256}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="btn-premium px-3 py-1 rounded-full text-sm font-medium">
                    {project.images.length} bilder
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-400 transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      Klikk for å se alle bilder fra dette {selectedCategory.toLowerCase()}-prosjektet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
          </section>
        )}

        {/* Individual Images Grid */}
        {!loading && categoryData.individualImages.length > 0 && (
          <section aria-labelledby="individual-images-heading">
            <h2 id="individual-images-heading" className="text-2xl font-bold text-puce-500 mb-6">Enkeltbilder</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryData.individualImages.map((image) => (
                <div
                  key={image.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => openImage(image)}
                >
                  <div className="relative overflow-hidden">
                    <LazyImage
                      src={image.src}
                      alt={`${image.alt} - ${selectedCategory} arbeid fra Drømme Huset AS`}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      width={400}
                      height={256}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-400 transition-colors duration-300">
                          {image.alt}
                        </h3>
                        <p className="text-gray-200 text-sm leading-relaxed">
                          Klikk for å se større bilde av {selectedCategory.toLowerCase()}-arbeid
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* No Images Message */}
        {!loading && categoryData.projects.length === 0 && categoryData.individualImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-puce-500 text-lg">Ingen bilder funnet for denne kategorien.</p>
          </div>
        )}

        {/* Category Description */}
        <section className="mt-16 bg-white p-8 rounded-2xl shadow-lg" aria-labelledby="category-description-heading">
          <h2 id="category-description-heading" className="text-2xl font-bold text-puce-500 mb-6">
            Om {selectedCategory} i Drammen-området
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-puce-500 mb-4">Våre {selectedCategory}-tjenester</h3>
              <p className="text-puce-500 leading-relaxed mb-4">
                Vi leverer profesjonelle {selectedCategory.toLowerCase()}-tjenester med høy kvalitet og pålitelighet i 
                Drammen, Lier, Svelvik og Holmestrand. Vårt team har over 25 års erfaring og bruker kun de beste 
                materialene og moderne teknikker for å sikre varige resultater.
              </p>
              <ul className="space-y-2 text-puce-500">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-3"></span>
                  Gratis konsultasjon og tilbud
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-3"></span>
                  Erfarne fagfolk med sertifikater
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-3"></span>
                  5-10 års kvalitetsgaranti
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-3"></span>
                  Rask levering og 24/7 nødhjelp
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-3"></span>
                  Lokal entreprenør i Drammen-området
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-puce-500 mb-4">Typiske {selectedCategory}-prosjekter</h3>
              <div className="space-y-3">
                <div className="bg-sand-500 p-4 rounded-xl">
                  <h4 className="font-semibold text-puce-500">Små prosjekter</h4>
                  <p className="text-sm text-puce-500">
                    {selectedCategory === 'Tømrer' && 'Reparasjoner, vinduer, dører og mindre oppgraderinger'}
                    {selectedCategory === 'Våtrom' && 'Flislegging, sanitærutstyr og mindre renoveringer'}
                    {selectedCategory === 'Elektriker' && 'Lysinstallasjoner, stikkontakter og mindre elektriske arbeider'}
                    {selectedCategory === 'Murer' && 'Murarbeid, puss og mindre reparasjoner'}
                    {selectedCategory === 'Kjøkken' && 'Skapbytte, benkeplate og mindre oppgraderinger'}
                    {!['Tømrer', 'Våtrom', 'Elektriker', 'Murer', 'Kjøkken'].includes(selectedCategory) && 'Reparasjoner og mindre oppgraderinger'}
                  </p>
                </div>
                <div className="bg-sand-500 p-4 rounded-xl">
                  <h4 className="font-semibold text-puce-500">Mellomstore prosjekter</h4>
                  <p className="text-sm text-puce-500">
                    {selectedCategory === 'Tømrer' && 'Tak, gulv, utvidelser og større renoveringer'}
                    {selectedCategory === 'Våtrom' && 'Komplette våtromsrenoveringer og utvidelser'}
                    {selectedCategory === 'Elektriker' && 'Hovedtavler, kabeltrekk og større installasjoner'}
                    {selectedCategory === 'Murer' && 'Fasader, fundamenter og større murarbeid'}
                    {selectedCategory === 'Kjøkken' && 'Komplette kjøkkenrenoveringer og utvidelser'}
                    {!['Tømrer', 'Våtrom', 'Elektriker', 'Murer', 'Kjøkken'].includes(selectedCategory) && 'Renoveringer og utvidelser'}
                  </p>
                </div>
                <div className="bg-sand-500 p-4 rounded-xl">
                  <h4 className="font-semibold text-puce-500">Store prosjekter</h4>
                  <p className="text-sm text-puce-500">
                    {selectedCategory === 'Tømrer' && 'Komplette husrenoveringer og nybygg'}
                    {selectedCategory === 'Våtrom' && 'Luxus våtrom og spa-løsninger'}
                    {selectedCategory === 'Elektriker' && 'Komplette elektriske installasjoner for nybygg'}
                    {selectedCategory === 'Murer' && 'Komplette murerarbeid for nybygg og store renoveringer'}
                    {selectedCategory === 'Kjøkken' && 'Luxus kjøkken og kommersielle installasjoner'}
                    {!['Tømrer', 'Våtrom', 'Elektriker', 'Murer', 'Kjøkken'].includes(selectedCategory) && 'Komplette renoveringer og nybygg'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 gallery-modal"
            onClick={closeImage}
          >
            <div 
              className="relative w-full h-full bg-white overflow-hidden flex flex-col modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button - Fixed position */}
              <button
                onClick={closeImage}
                className="btn-premium absolute top-4 right-4 p-3 rounded-full z-20 shadow-lg"
                style={{ top: '16px', right: '16px' }}
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation buttons - Fixed positions */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={previousImage}
                    className="btn-premium absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full z-20 shadow-lg"
                    style={{ left: '16px', top: '50%', transform: 'translateY(-50%)' }}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="btn-premium absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full z-20 shadow-lg"
                    style={{ right: '16px', top: '50%', transform: 'translateY(-50%)' }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Image Container - Fixed size and centered */}
              <div className="flex-1 flex items-center justify-center p-4 modal-image-container">
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="modal-image"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </div>

              {/* Image info - Fixed at bottom */}
              <div className="modal-info bg-white border-t border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="btn-premium px-3 py-1 rounded-full text-sm font-medium">
                      {selectedImage.category}
                    </span>
                    {selectedImage.projectName && (
                      <span className="btn-premium px-3 py-1 rounded-full text-sm font-medium">
                        {selectedImage.projectName}
                      </span>
                    )}
                  </div>
                  {allImages.length > 1 && (
                    <span className="text-puce-500 text-sm font-medium">
                      {currentImageIndex + 1} av {allImages.length}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-puce-500 mb-2">
                  {selectedImage.alt}
                </h3>
                {selectedImage.projectName && (
                  <p className="text-puce-500 leading-relaxed text-sm">
                    Prosjekt: {selectedImage.projectName}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
    </>
  );
};

export default Gallery;