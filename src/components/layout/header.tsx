'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
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
             <div className="flex items-center gap-3">
                <span className="text-white font-semibold">أهلاً، {currentUser.name}</span>
                <Button onClick={logout} variant="destructive" size="sm">خروج</Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSignIn} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                تسجيل الدخول
              </Button>
              <Button onClick={handleSignUp} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
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
