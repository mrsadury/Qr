import React, { useEffect, useRef, useState } from 'react';
import { Download, Copy, Save, Loader } from 'lucide-react';
import { QRConfig, WiFiConfig, VCardConfig, QRHistory } from '../types/qr';
import { generateQRCode } from '../utils/qrGenerator';
import { downloadQR, copyToClipboard } from '../utils/download';
import { saveQRToHistory } from '../utils/qrHistory';

interface QRPreviewProps {
  config: QRConfig;
  wifiConfig: WiFiConfig;
  vcardConfig: VCardConfig;
}

const QRPreview: React.FC<QRPreviewProps> = ({ config, wifiConfig, vcardConfig }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQR = async () => {
      if (!config.text && config.type !== 'wifi' && config.type !== 'vcard') return;
      
      if (config.type === 'wifi' && !wifiConfig.ssid) return;
      if (config.type === 'vcard' && !vcardConfig.firstName && !vcardConfig.lastName) return;
      
      setIsLoading(true);
      setError('');
      
      try {
        const dataUrl = await generateQRCode(config, wifiConfig, vcardConfig);
        setQrDataUrl(dataUrl);
        
        // Draw to canvas for download functionality
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          const img = new Image();
          img.onload = () => {
            canvasRef.current!.width = img.width;
            canvasRef.current!.height = img.height;
            ctx?.drawImage(img, 0, 0);
          };
          img.src = dataUrl;
        }
      } catch (err) {
        setError('Failed to generate QR code');
      } finally {
        setIsLoading(false);
      }
    };

    generateQR();
  }, [config, wifiConfig, vcardConfig]);

  const handleDownload = async (format: 'png' | 'svg' | 'pdf') => {
    if (!canvasRef.current) return;
    
    try {
      const filename = `qrcode-${Date.now()}`;
      await downloadQR(canvasRef.current, filename, format);
    } catch (err) {
      setError('Failed to download QR code');
    }
  };

  const handleCopy = async () => {
    if (!canvasRef.current) return;
    
    try {
      await copyToClipboard(canvasRef.current);
    } catch (err) {
      setError('Failed to copy QR code');
    }
  };

  const handleSave = () => {
    if (!qrDataUrl) return;
    
    const qrHistory: QRHistory = {
      id: Date.now().toString(),
      config,
      timestamp: Date.now(),
      name: `QR Code - ${new Date().toLocaleDateString()}`,
    };
    
    saveQRToHistory(qrHistory);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Live Preview</h2>
      
      <div className="space-y-6">
        {/* QR Code Display */}
        <div className="flex justify-center">
          <div className="relative">
            {isLoading ? (
              <div className="w-64 h-64 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                <div className="flex flex-col items-center space-y-2">
                  <Loader className="w-8 h-8 text-blue-500 animate-spin" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Generating...</span>
                </div>
              </div>
            ) : qrDataUrl ? (
              <div className="animate-fade-in">
                <img
                  src={qrDataUrl}
                  alt="Generated QR Code"
                  className="w-64 h-64 rounded-2xl shadow-lg animate-pulse-once"
                  style={{
                    borderRadius: config.shape === 'circle' ? '50%' : config.shape === 'rounded' ? '1rem' : '0.5rem'
                  }}
                />
              </div>
            ) : (
              <div className="w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-center">
                  Enter content to generate QR code
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Hidden canvas for download */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        {qrDataUrl && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleDownload('png')}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">PNG</span>
              </button>
              <button
                onClick={() => handleDownload('svg')}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">SVG</span>
              </button>
              <button
                onClick={() => handleDownload('pdf')}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">PDF</span>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm font-medium">Copy</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span className="text-sm font-medium">Save</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRPreview;