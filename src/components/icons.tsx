import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Facebook, Twitter } from 'lucide-react';

export const Icons = {
  logo: (props: React.ComponentProps<'img'>) => {
    const logoImage = placeholderImages.find(p => p.id === 'logo');
    return (
      <Image
        src={logoImage?.imageUrl || ''}
        alt="Animator Pro Logo"
        width={48}
        height={48}
        className="h-12 w-auto animated-logo"
        data-ai-hint={logoImage?.imageHint}
        unoptimized
      />
    );
  },
  facebook: (props: React.SVGProps<SVGSVGElement>) => (
    <Facebook {...props} />
  ),
  twitter: (props: React.SVGProps<SVGSVGElement>) => (
    <Twitter {...props} />
  ),
  spinner: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`animate-spin ${className}`}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
};
