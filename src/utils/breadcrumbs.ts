export interface BreadcrumbItem {
  name: string;
  path: string;
}

export const getBreadcrumbsFromPath = (pathname: string): BreadcrumbItem[] => {
  const pathnames = pathname.split('/').filter((x) => x);
  const breadcrumbs: BreadcrumbItem[] = [
    {
      name: 'Hjem',
      path: '/'
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
      path
    });
  });

  return breadcrumbs;
};
