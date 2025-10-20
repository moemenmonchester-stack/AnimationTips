'use client';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Icons } from '../icons';

export function ContactPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-8 left-8 w-14 h-14 rounded-full shadow-lg bg-primary text-primary-foreground shadow-primary/30 z-50 transform hover:scale-110 transition-transform"
          aria-label="Contact me"
        >
          <Icons.mail />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        className="w-80 glass-card p-6"
      >
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg text-indigo-400">تواصل معي</h3>
          <p className="text-sm text-muted-foreground">
            لديك سؤال أو استفسار؟ لا تتردد في التواصل معي عبر البريد الإلكتروني.
          </p>
          <div className="text-center">
             <p className="font-semibold text-white mb-4">mastermoemen@gmail.com</p>
             <Button asChild className="w-full">
                <a href="mailto:mastermoemen@gmail.com">أرسل بريداً إلكترونياً</a>
             </Button>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">أو تابعني على:</p>
          <div className="flex justify-center space-x-4 text-muted-foreground">
            <a href="#" className="hover:text-pink-400 transition-colors" aria-label="Facebook">
                <Icons.facebook />
            </a>
            <a href="#" className="hover:text-pink-400 transition-colors" aria-label="Twitter">
                <Icons.twitter />
            </a>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
