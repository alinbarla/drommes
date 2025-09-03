import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Performance optimization: Defer non-critical operations
const loadServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    } else {
      // Fallback for older browsers
      setTimeout(() => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      }, 1000);
    }
  }
};

// Load service worker after page load
window.addEventListener('load', loadServiceWorker);

// Performance optimization: Use createRoot with hydration
const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Laster Drømme Huset AS...</p>
        </div>
      </div>
    }>
      <App />
    </Suspense>
  </StrictMode>
);
