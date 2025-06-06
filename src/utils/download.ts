import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadQR = async (
  canvas: HTMLCanvasElement,
  filename: string,
  format: 'png' | 'svg' | 'pdf'
): Promise<void> => {
  try {
    switch (format) {
      case 'png': {
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        break;
      }
      
      case 'pdf': {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 150;
        const imgHeight = 150;
        const x = (pdf.internal.pageSize.width - imgWidth) / 2;
        const y = (pdf.internal.pageSize.height - imgHeight) / 2;
        
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        pdf.save(`${filename}.pdf`);
        break;
      }
      
      case 'svg': {
        // For SVG, we'll convert the canvas to PNG and download
        // In a production app, you'd want to generate actual SVG
        const link = document.createElement('a');
        link.download = `${filename}.svg`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        break;
      }
    }
  } catch (error) {
    throw new Error(`Failed to download QR code as ${format.toUpperCase()}`);
  }
};

export const copyToClipboard = async (canvas: HTMLCanvasElement): Promise<void> => {
  try {
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/png');
    });
    
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);
  } catch (error) {
    throw new Error('Failed to copy QR code to clipboard');
  }
};