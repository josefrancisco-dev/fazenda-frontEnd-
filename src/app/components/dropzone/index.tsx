"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";

interface FileWithPreview extends File {
  preview?: string;
}

interface FileDropzoneProps {
  maxSize?: number;
  maxFiles?: number;
  acceptedFileTypes?: Record<string, string[]>;
  onFilesChange?: (files: File[]) => void;
}

export function FileDropzone({
  maxSize = 5,
  maxFiles = 1,
  acceptedFileTypes = {
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
  },
  onFilesChange,
}: FileDropzoneProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [error, setError] = useState<string>("");

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError("");

      if (rejectedFiles.length > 0) {
        const code = rejectedFiles[0].errors[0]?.code;
        if (code === "file-too-large") setError(`Máximo ${maxSize}MB`);
        else if (code === "file-invalid-type") setError("Tipo não suportado");
        else setError("Erro ao fazer upload");
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );

      setFiles((prev) => {
        const updated = maxFiles === 1 ? newFiles : [...prev, ...newFiles];
        onFilesChange?.(updated);
        return updated;
      });
    },
    [maxSize, maxFiles, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: maxSize * 1024 * 1024,
    maxFiles,
    accept: acceptedFileTypes,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      onFilesChange?.(updated);
      return updated;
    });
    setError("");
  };

  // Se já tem imagem, mostra preview compacto
  if (files.length > 0) {
    const file = files[0];
    const isImage = file.type.startsWith("image/");

    return (
      <div className="relative flex items-center gap-3 p-2 rounded-lg border border-slate-200 bg-slate-50">
        {isImage && (file as FileWithPreview).preview ? (
          <img
            src={(file as FileWithPreview).preview}
            alt={file.name}
            className="w-10 h-10 object-cover rounded-md flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 bg-slate-200 rounded-md flex items-center justify-center flex-shrink-0">
            <Upload className="w-4 h-4 text-slate-500" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-700 truncate">{file.name}</p>
          <p className="text-xs text-slate-400">
            {Math.round(file.size / 1024)} KB
          </p>
        </div>

        <button
          type="button"
          onClick={() => removeFile(0)}
          className="p-1 rounded-md hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div
        {...getRootProps()}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-lg border border-dashed cursor-pointer
          transition-colors duration-150
          ${isDragActive
            ? "border-blue-400 bg-blue-50"
            : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
          }
          ${error ? "border-red-400 bg-red-50" : ""}
        `}
      >
        <input {...getInputProps()} />

        <div className={`
          w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0
          ${isDragActive ? "bg-blue-100" : "bg-slate-100"}
        `}>
          <Upload className={`w-3.5 h-3.5 ${isDragActive ? "text-blue-500" : "text-slate-400"}`} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-600">
            {isDragActive ? "Solte aqui" : "Arraste ou clique para selecionar"}
          </p>
          <p className="text-xs text-slate-400">
            PNG, JPG, WEBP · máx. {maxSize}MB
          </p>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}