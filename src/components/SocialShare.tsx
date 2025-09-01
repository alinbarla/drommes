import React from 'react';
import { Facebook, Twitter, Linkedin, Share2, Copy, Check } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, description }) => {
  const [copied, setCopied] = React.useState(false);
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const shareButtons = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: shareLinks.facebook,
      color: 'hover:bg-blue-600 hover:text-white'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: shareLinks.twitter,
      color: 'hover:bg-blue-400 hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: shareLinks.linkedin,
      color: 'hover:bg-blue-700 hover:text-white'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-puce-500 mb-4">Del denne artikkelen</h3>
      <div className="flex flex-wrap gap-3">
        {shareButtons.map((button) => (
          <a
            key={button.name}
            href={button.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-puce-500 transition-all duration-300 ${button.color}`}
            aria-label={`Del på ${button.name}`}
          >
            <button.icon className="h-4 w-4" />
            <span className="text-sm font-medium">{button.name}</span>
          </a>
        ))}
        
        <button
          onClick={copyToClipboard}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-puce-500 transition-all duration-300 ${
            copied ? 'bg-green-100 border-green-300 text-green-700' : 'hover:bg-gray-100'
          }`}
          aria-label="Kopier lenke"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">Kopiert!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span className="text-sm font-medium">Kopier lenke</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SocialShare;
