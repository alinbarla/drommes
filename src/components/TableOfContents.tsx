import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface TableOfContentsProps {
  content: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /<h([2-4])[^>]*>(.*?)<\/h[2-4]>/gi;
    const matches = content.match(headingRegex);
    
    if (matches) {
      const items: TocItem[] = matches.map((match, index) => {
        const levelMatch = match.match(/<h([2-4])/);
        const textMatch = match.match(/>([^<]+)</);
        
        const level = levelMatch ? parseInt(levelMatch[1]) : 2;
        const text = textMatch ? textMatch[1].trim() : '';
        const id = `heading-${index}`;
        
        return { id, text, level };
      });
      
      setTocItems(items);
    }
  }, [content]);

  if (tocItems.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-sand-500 p-6 rounded-xl mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-lg font-semibold text-puce-500">Innholdsfortegnelse</h3>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gold-500" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gold-500" />
        )}
      </button>
      
      {isExpanded && (
        <nav className="mt-4">
          <ul className="space-y-2">
            {tocItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => scrollToHeading(item.id)}
                  className={`text-left text-sm hover:text-gold-500 transition-colors duration-300 ${
                    item.level === 2 ? 'font-medium text-puce-500' : 
                    item.level === 3 ? 'text-puce-500 ml-4' : 
                    'text-puce-500 ml-8'
                  }`}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TableOfContents;
