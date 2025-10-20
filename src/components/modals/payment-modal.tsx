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
import { cn } from '@/lib/utils';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PaymentModal({ open, onOpenChange }: PaymentModalProps) {
  const { chapterToUnlock, activateSubscription, courseData } = useAppContext();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<'instapay' | 'vodafone'>('instapay');
  const [subscriptionCode, setSubscriptionCode] = useState('');

  const chapter = courseData?.chapters.find(c => c.id === chapterToUnlock);

  const handleActivate = () => {
    const result = activateSubscription(subscriptionCode);
    if (result) {
      toast({
        title: 'تم التفعيل بنجاح!',
        description: 'تهانينا! تم تفعيل اشتراكك.',
      });
      onOpenChange(false);
    } else {
      toast({
        title: 'خطأ في التفعيل',
        description: 'الكود الذي أدخلته غير صالح أو تم استخدامه بالفعل.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-lg p-8 text-center">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-indigo-400 mb-6">
            إتمام عملية الدفع
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-300 mb-6">
          اختر طريقة الدفع المناسبة لك لإتمام الاشتراك في{' '}
          <span className="font-bold text-white">{chapter?.title}</span>
        </p>

        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setPaymentMethod('instapay')}
            className={cn(
              'payment-tab flex-1 py-2 font-semibold border-b-2 text-gray-400 hover:text-white',
              paymentMethod === 'instapay'
                ? 'active-tab border-indigo-500 text-indigo-400'
                : 'border-transparent'
            )}
          >
            InstaPay
          </button>
          <button
            onClick={() => setPaymentMethod('vodafone')}
            className={cn(
              'payment-tab flex-1 py-2 font-semibold border-b-2 text-gray-400 hover:text-white',
              paymentMethod === 'vodafone'
                ? 'active-tab border-indigo-500 text-indigo-400'
                : 'border-transparent'
            )}
          >
            Vodafone Cash
          </button>
        </div>

        <div>
          {paymentMethod === 'instapay' && (
            <div className="payment-method">
              <p>
                للدفع عبر انستا باي، يرجى تحويل مبلغ{' '}
                <strong>1000 جنيه</strong> إلى الحساب التالي:
              </p>
              <p className="my-4 p-3 bg-gray-900 rounded-lg text-lg font-mono tracking-widest">
                mastermoemen@instapay
              </p>
              <p className="text-sm text-gray-400">
                بعد التحويل، يرجى ارسال رسالة لتأكيد الدفع. على الوتساب.
              </p>
            </div>
          )}
          {paymentMethod === 'vodafone' && (
            <div className="payment-method">
              <p>
                للدفع عبر فودافون كاش، يرجى تحويل مبلغ{' '}
                <strong>1000 جنيه</strong> إلى الرقم التالي:
              </p>
              <p className="my-4 p-3 bg-gray-900 rounded-lg text-lg font-mono tracking-widest">
                +201555220173
              </p>
              <p className="text-sm text-gray-400">
                بعد التحويل، يرجى إرسال رسالة لتأكيد الدفع.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-600">
          <h4 className="text-lg font-semibold text-pink-400 mb-2">
            هل قمت بالدفع بالفعل؟
          </h4>
          <p className="text-gray-400 mb-4">
            أدخل كود التفعيل الذي استلمته لتفعيل اشتراكك فوراً.
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              id="subscription-code-input"
              placeholder="أدخل كود الاشتراك"
              className="w-full p-3 bg-gray-900/50 rounded-lg text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-pink-500 text-center font-mono tracking-widest"
              value={subscriptionCode}
              onChange={(e) => setSubscriptionCode(e.target.value)}
              required
            />
            <Button
              id="activate-subscription-btn"
              onClick={handleActivate}
              className="bg-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-500 transition-all duration-300"
            >
              تفعيل
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
