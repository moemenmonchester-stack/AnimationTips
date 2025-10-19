'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppContext } from '@/hooks/use-app-context';

export function Header() {
  const {
    isLoggedIn,
    currentUser,
    logout,
    setAuthDialogOpen,
    setAuthDialogTab,
  } = useAppContext();

  const handleSignIn = () => {
    setAuthDialogTab('signin');
    setAuthDialogOpen(true);
  };

  const handleSignUp = () => {
    setAuthDialogTab('signup');
    setAuthDialogOpen(true);
  };

  return (
    <header className="relative z-20">
      <div className="flex justify-between items-center h-16">
        <div>
          {isLoggedIn && currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${currentUser.email}`}
                      alt={currentUser.name}
                    />
                    <AvatarFallback>
                      {currentUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-white font-semibold hidden sm:inline">
                    أهلاً، {currentUser.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                  خروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSignIn} variant="default" className="rounded-lg">
                تسجيل الدخول
              </Button>
              <Button onClick={handleSignUp} variant="secondary" className="rounded-lg">
                إنشاء حساب
              </Button>
            </div>
          )}
        </div>
        <a href="#">
          <Icons.logo />
        </a>
      </div>
    </header>
  );
}
