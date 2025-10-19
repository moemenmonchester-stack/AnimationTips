'use client';

import { useAppContext } from '@/hooks/use-app-context';
import { Header } from '@/components/layout/header';
import { HeroSection } from '@/components/hero/hero-section';
import { CourseLayout } from '@/components/course/course-layout';
import AuthDialog from '@/components/modals/auth-dialog';
import VideoModal from '@/components/modals/video-modal';
import WelcomeDialog from '@/components/modals/welcome-dialog';
import { ContactPopover } from '@/components/layout/contact-popover';

export default function HomePage() {
  const {
    isAuthDialogOpen,
    setAuthDialogOpen,
    authDialogTab,
    isVideoModalOpen,
    setVideoModalOpen,
    isWelcomeDialogOpen,
    setWelcomeDialogOpen,
  } = useAppContext();

  return (
    <>
      <div className="relative max-w-screen-xl mx-auto p-4 md:p-8">
        <Header />
        <HeroSection />
        <main className="relative z-10">
          <CourseLayout />
        </main>
      </div>
      <ContactPopover />

      <AuthDialog
        open={isAuthDialogOpen}
        onOpenChange={setAuthDialogOpen}
        initialTab={authDialogTab}
      />
      <VideoModal open={isVideoModalOpen} onOpenChange={setVideoModalOpen} />
      <WelcomeDialog
        open={isWelcomeDialogOpen}
        onOpenChange={setWelcomeDialogOpen}
      />
    </>
  );
}
