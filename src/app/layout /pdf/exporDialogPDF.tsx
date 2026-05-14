import { FileText } from 'lucide-react';
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Props = {
  isOpen: boolean;
  handleOpenChange: () => void;
};

export function ExportPdfDialog({ isOpen, handleOpenChange }: Props) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isOpen) {
      setProgress(0);

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 8; 
        });
      }, 200);
    } else {
      setProgress(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen]);

  const getMessage = () => {
    if (progress < 40) return 'A preparar dados...';
    if (progress < 90) return 'A gerar o ficheiro PDF...';
    return 'Finalizando download...';
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        if (!isOpen) handleOpenChange();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-lg">
            <FileText className="text-blue-600" />
            Exportar PDF
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6">
          <div className="flex flex-col items-center space-y-4 w-full">
  
            <Spinner />

            <p className="text-sm text-muted-foreground text-center">
              {getMessage()}
            </p>

            <Progress value={progress} className="w-full" />

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}