'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/hooks/use-app-context';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab?: 'signin' | 'signup'; // this prop is not used in the new design, but kept for compatibility
}

export default function AuthDialog({
  open,
  onOpenChange,
}: AuthDialogProps) {
  const { login, signup } = useAppContext();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { authDialogTab } = useAppContext();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = signup(name, email, password);
    if (success) {
      onOpenChange(false);
      // Welcome modal is triggered from context
    } else {
      toast({
        title: 'خطأ',
        description: 'هذا البريد الإلكتروني مسجل بالفعل.',
        variant: 'destructive',
      });
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      onOpenChange(false);
      toast({
        title: 'أهلاً بعودتك!',
        description: 'تم تسجيل دخولك بنجاح.',
      });
    } else {
      toast({
        title: 'خطأ في الدخول',
        description: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
        variant: 'destructive',
      });
    }
  };

  if (authDialogTab === 'signup') {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="glass-card max-w-md p-8 text-center">
            <DialogHeader className="mb-8">
              <DialogTitle className="text-2xl font-bold text-indigo-400">
                إنشاء حساب جديد
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSignUp}>
              <div className="space-y-4 text-right">
                <Input
                  type="text"
                  placeholder="الاسم الكامل"
                  className="bg-background/50"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="bg-background/50"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="كلمة المرور"
                  className="bg-background/50"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-500 transition-all duration-300 text-lg">
                إنشاء حساب
              </Button>
            </form>
          </DialogContent>
        </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="glass-card max-w-md p-8 text-center">
            <DialogHeader className="mb-8">
                <DialogTitle className="text-2xl font-bold text-indigo-400">
                    تسجيل الدخول
                </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSignIn}>
                <div className="space-y-4 text-right">
                <Input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className="bg-background/50"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="كلمة المرور"
                    className="bg-background/50"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                </div>
                <Button type="submit" className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-500 transition-all duration-300 text-lg">
                    دخول
                </Button>
            </form>
        </DialogContent>
    </Dialog>
  );
}
