import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  
  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbs = [
      {
        name: 'Hjem',
        path: '/',
        icon: Home
      }
    ];

    pathnames.forEach((name, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`;
      let displayName = name;

      // Map path names to display names
      switch (name) {
        case 'about':
          displayName = 'Om oss';
          break;
        case 'contact':
          displayName = 'Kontakt';
          break;
        case 'gallery':
          displayName = 'Galleri';
          break;

        default:
          displayName = name.charAt(0).toUpperCase() + name.slice(1);
      }

      breadcrumbs.push({
        name: displayName,
        path,
        icon: null
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="bg-sand-500 shadow-sm border-b border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 py-3">
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <React.Fragment key={breadcrumb.path}>
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-puce-500" />
                )}
                {isLast ? (
                  <span className="text-puce-500 font-medium">
                    {breadcrumb.icon ? (
                      <breadcrumb.icon className="h-4 w-4 inline mr-1" />
                    ) : null}
                    {breadcrumb.name}
                  </span>
                ) : (
                  <Link
                    to={breadcrumb.path}
                    className="text-puce-500 hover:text-gold-500 transition-colors duration-300 flex items-center"
                  >
                    {breadcrumb.icon ? (
                      <breadcrumb.icon className="h-4 w-4 mr-1" />
                    ) : null}
                    {breadcrumb.name}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
