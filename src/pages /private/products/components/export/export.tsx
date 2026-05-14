import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText} from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { pdf } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { PrintStockDetails } from ".";
import { ExportTypes, type ExportType } from "@/types/enums";
import {useProductsPrint} from "@/quereis/export";
import { pdfName } from "@/helpers/string.helpers";
import { Spinner } from "@/components/ui/spinner";

async function generatePDF(
  component: React.ReactElement<DocumentProps>,
  fileName: string
) {
  const result = await pdf(component).toBlob();
  saveAs(result, fileName);
}

export function ExportDropdownProducts() {
  const [isOpenExportPDF, setOpenExportPdf] = React.useState(false);

  const { data} = useProductsPrint();

  console

const handleExport = async (type: ExportType) => {
  if (type === ExportTypes.PDF) {
    try {
      setOpenExportPdf(true);

      await generatePDF(
        <PrintStockDetails data={data ?? []} />,
        pdfName("Estoque")
      );

      toast.success("PDF exportado com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      toast.error("Erro ao exportar PDF");
    } finally {
      setOpenExportPdf(false);
    }
  }
};

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disabled={isOpenExportPDF}>
            {isOpenExportPDF ? (
              <Spinner />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            {isOpenExportPDF ? "Exportando..." : "Exportar"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-semibold">
            Formatos de Exportação
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem   disabled={isOpenExportPDF} onClick={() => handleExport(ExportTypes.PDF)}>
              <FileText className="mr-2 h-4 w-4 text-red-500" />
              <div className="flex flex-col">
                <span>Exportar como PDF</span>
                <span className="text-xs text-gray-500">Documento formatado</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}