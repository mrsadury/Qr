import React, { useState } from 'react';
import { History } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import { QRConfig, WiFiConfig, VCardConfig, QRHistory as QRHistoryType } from './types/qr';
import Header from './components/Header';
import Hero from './components/Hero';
import QRInputPanel from './components/QRInputPanel';
import QRCustomization from './components/QRCustomization';
import QRPreview from './components/QRPreview';
import QRHistory from './components/QRHistory';
import Toast from './components/Toast';

function App() {
  const [config, setConfig] = useState<QRConfig>({
    text: '',
    type: 'url',
    errorCorrectionLevel: 'M',
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    margin: 4,
    width: 400,
    shape: 'square',
  });

  const [wifiConfig, setWifiConfig] = useState<WiFiConfig>({
    ssid: '',
    password: '',
    security: 'WPA',
    hidden: false,
  });

  const [vcardConfig, setVcardConfig] = useState<VCardConfig>({
    firstName: '',
    lastName: '',
    organization: '',
    phone: '',
    email: '',
    url: '',
  });

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
    setToast({ message, type, isVisible: true });
  };

  const handleLoadConfig = (historyItem: QRHistoryType) => {
    setConfig(historyItem.config);
    showToast('Configuration loaded successfully!', 'success');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header />
        
        <main>
          <Hero />
          
          <section className="relative -mt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Main Generator Interface */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Panel - Input */}
                <div className="lg:col-span-1 space-y-6">
                  <QRInputPanel
                    config={config}
                    setConfig={setConfig}
                    wifiConfig={wifiConfig}
                    setWifiConfig={setWifiConfig}
                    vcardConfig={vcardConfig}
                    setVcardConfig={setVcardConfig}
                  />
                </div>

                {/* Center Panel - Preview */}
                <div className="lg:col-span-1">
                  <QRPreview
                    config={config}
                    wifiConfig={wifiConfig}
                    vcardConfig={vcardConfig}
                  />
                </div>

                {/* Right Panel - Customization */}
                <div className="lg:col-span-1">
                  <QRCustomization config={config} setConfig={setConfig} />
                </div>
              </div>

              {/* History Button */}
              <div className="fixed bottom-6 right-6">
                <button
                  onClick={() => setIsHistoryOpen(true)}
                  className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                  title="View History"
                >
                  <History className="w-6 h-6" />
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* History Modal */}
        <QRHistory
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          onLoadConfig={handleLoadConfig}
        />

        {/* Toast Notifications */}
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;