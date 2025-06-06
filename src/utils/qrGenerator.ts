import QRCode from 'qrcode';
import { QRConfig, WiFiConfig, VCardConfig } from '../types/qr';

export const generateQRText = (config: QRConfig, wifiConfig?: WiFiConfig, vcardConfig?: VCardConfig): string => {
  switch (config.type) {
    case 'url':
      return config.text.startsWith('http') ? config.text : `https://${config.text}`;
    
    case 'email':
      return `mailto:${config.text}`;
    
    case 'phone':
      return `tel:${config.text}`;
    
    case 'wifi':
      if (!wifiConfig) return config.text;
      return `WIFI:T:${wifiConfig.security};S:${wifiConfig.ssid};P:${wifiConfig.password};H:${wifiConfig.hidden ? 'true' : 'false'};;`;
    
    case 'vcard':
      if (!vcardConfig) return config.text;
      return `BEGIN:VCARD
VERSION:3.0
FN:${vcardConfig.firstName} ${vcardConfig.lastName}
ORG:${vcardConfig.organization}
TEL:${vcardConfig.phone}
EMAIL:${vcardConfig.email}
URL:${vcardConfig.url}
END:VCARD`;
    
    default:
      return config.text;
  }
};

export const generateQRCode = async (config: QRConfig, wifiConfig?: WiFiConfig, vcardConfig?: VCardConfig): Promise<string> => {
  const text = generateQRText(config, wifiConfig, vcardConfig);
  
  const options = {
    errorCorrectionLevel: config.errorCorrectionLevel,
    width: config.width,
    margin: config.margin,
    color: {
      dark: config.foregroundColor,
      light: config.backgroundColor,
    },
  };

  try {
    return await QRCode.toDataURL(text, options);
  } catch (error) {
    throw new Error('Failed to generate QR code');
  }
};