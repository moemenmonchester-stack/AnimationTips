'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/hooks/use-app-context';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab?: 'signin' | 'signup';
}

export default function AuthDialog({
  open,
  onOpenChange,
  initialTab = 'signin',
}: AuthDialogProps) {
  const { login, signup } = useAppContext();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = signup(name, email, password);
    if (success) {
      onOpenChange(false);
    } else {
      toast({
        title: 'خطأ',
        description: 'هذا الحساب مسجل بالفعل.',
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-md p-8 text-center">
        <Tabs defaultValue={initialTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">تسجيل الدخول</TabsTrigger>
            <TabsTrigger value="signup">إنشاء حساب</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
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
              <Button type="submit" className="w-full mt-6" size="lg">
                دخول
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
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
              <Button type="submit" className="w-full mt-6" size="lg">
                إنشاء حساب
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
