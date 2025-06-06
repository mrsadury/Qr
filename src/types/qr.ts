export interface QRConfig {
  text: string;
  type: 'url' | 'text' | 'email' | 'phone' | 'wifi' | 'vcard';
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  foregroundColor: string;
  backgroundColor: string;
  logo?: string;
  margin: number;
  width: number;
  shape: 'square' | 'circle' | 'rounded';
}

export interface QRHistory {
  id: string;
  config: QRConfig;
  timestamp: number;
  name: string;
}

export interface WiFiConfig {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardConfig {
  firstName: string;
  lastName: string;
  organization: string;
  phone: string;
  email: string;
  url: string;
}