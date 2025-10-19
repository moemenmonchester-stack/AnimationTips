'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppContext } from '@/hooks/use-app-context';
import { Button } from '../ui/button';
import Link from 'next/link';
import { File, FolderArchive } from 'lucide-react';

interface VideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VideoModal({ open, onOpenChange }: VideoModalProps) {
  const { activeVideo, clearActiveVideo } = useAppContext();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      clearActiveVideo();
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="glass-card max-w-4xl p-4 sm:p-6">
        {activeVideo && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-indigo-400 mb-4 text-center">
                {activeVideo.title}
              </DialogTitle>
            </DialogHeader>
            <div className="bg-black rounded-lg overflow-hidden">
              {activeVideo.youtubeId ? (
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center">
                  <p className="text-muted-foreground">
                    لا يوجد فيديو لهذا الدرس.
                  </p>
                </div>
              )}
            </div>
            {activeVideo.files && activeVideo.files.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="text-lg font-bold text-indigo-400 mb-2">
                  الملفات المتعلقة بالدرس
                </h4>
                <div className="flex flex-col items-start gap-2">
                  {activeVideo.files.map((file, index) => (
                    <Button key={index} variant="link" asChild className='text-accent h-auto p-1'>
                      <Link href={file.url} target="_blank">
                        {file.isMain ? <FolderArchive className='ml-2' /> : <File className='ml-2' />}
                        {file.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
