import React from 'react';
import { Globe, Type, Mail, Phone, Wifi, User } from 'lucide-react';
import { QRConfig, WiFiConfig, VCardConfig } from '../types/qr';

interface QRInputPanelProps {
  config: QRConfig;
  setConfig: (config: QRConfig) => void;
  wifiConfig: WiFiConfig;
  setWifiConfig: (config: WiFiConfig) => void;
  vcardConfig: VCardConfig;  
  setVcardConfig: (config: VCardConfig) => void;
}

const QRInputPanel: React.FC<QRInputPanelProps> = ({
  config,
  setConfig,
  wifiConfig,
  setWifiConfig,
  vcardConfig,
  setVcardConfig,
}) => {
  const qrTypes = [
    { id: 'url', label: 'URL', icon: Globe },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'phone', label: 'Phone', icon: Phone },
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'vcard', label: 'vCard', icon: User },
  ];

  const renderInputFields = () => {
    switch (config.type) {
      case 'wifi':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Network Name (SSID)
              </label>
              <input
                type="text"
                value={wifiConfig.ssid}
                onChange={(e) => setWifiConfig({ ...wifiConfig, ssid: e.target.value })}
                placeholder="Enter WiFi network name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={wifiConfig.password}
                onChange={(e) => setWifiConfig({ ...wifiConfig, password: e.target.value })}
                placeholder="Enter WiFi password"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Security
              </label>
              <select
                value={wifiConfig.security}
                onChange={(e) => setWifiConfig({ ...wifiConfig, security: e.target.value as any })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="hidden"
                checked={wifiConfig.hidden}
                onChange={(e) => setWifiConfig({ ...wifiConfig, hidden: e.target.checked })}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="hidden" className="text-sm text-gray-700 dark:text-gray-300">
                Hidden Network
              </label>
            </div>
          </div>
        );

      case 'vcard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={vcardConfig.firstName}
                  onChange={(e) => setVcardConfig({ ...vcardConfig, firstName: e.target.value })}
                  placeholder="John"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={vcardConfig.lastName}
                  onChange={(e) => setVcardConfig({ ...vcardConfig, lastName: e.target.value })}
                  placeholder="Doe"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Organization
              </label>
              <input
                type="text"
                value={vcardConfig.organization}
                onChange={(e) => setVcardConfig({ ...vcardConfig, organization: e.target.value })}
                placeholder="Company Name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={vcardConfig.phone}
                onChange={(e) => setVcardConfig({ ...vcardConfig, phone: e.target.value })}
                placeholder="+1 234 567 8900"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={vcardConfig.email}
                onChange={(e) => setVcardConfig({ ...vcardConfig, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website
              </label>
              <input
                type="url"
                value={vcardConfig.url}
                onChange={(e) => setVcardConfig({ ...vcardConfig, url: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        );

      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {config.type === 'url' ? 'URL' : 
               config.type === 'email' ? 'Email Address' :
               config.type === 'phone' ? 'Phone Number' : 'Text Content'}
            </label>
            <textarea
              value={config.text}
              onChange={(e) => setConfig({ ...config, text: e.target.value })}
              placeholder={
                config.type === 'url' ? 'https://example.com' :
                config.type === 'email' ? 'john@example.com' :
                config.type === 'phone' ? '+1 234 567 8900' :
                'Enter your text here...'
              }
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Content Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {qrTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setConfig({ ...config, type: type.id as any })}
                className={`p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  config.type === type.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs font-medium">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Content</h3>
        {renderInputFields()}
      </div>
    </div>
  );
};

export default QRInputPanel;