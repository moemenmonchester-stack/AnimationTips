import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Facebook, Twitter, Mail } from 'lucide-react';

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
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
  ),
  twitter: (props: React.SVGProps<SVGSVGElement>) => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
  ),
  mail: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  ),
  spinner: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <div className={`loader ${className}`} {...props}></div>
  ),
};
