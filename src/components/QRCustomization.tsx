import React from 'react';
import { Palette, Settings, Square, Circle } from 'lucide-react';
import { QRConfig } from '../types/qr';

interface QRCustomizationProps {
  config: QRConfig;
  setConfig: (config: QRConfig) => void;
}

const QRCustomization: React.FC<QRCustomizationProps> = ({ config, setConfig }) => {
  const errorLevels = [
    { value: 'L', label: 'Low (7%)', description: 'Fastest generation' },
    { value: 'M', label: 'Medium (15%)', description: 'Good balance' },
    { value: 'Q', label: 'Quartile (25%)', description: 'Better recovery' },
    { value: 'H', label: 'High (30%)', description: 'Best recovery' },
  ];

  const shapes = [
    { value: 'square', label: 'Square', icon: Square },
    { value: 'circle', label: 'Circle', icon: Circle },
    { value: 'rounded', label: 'Rounded', icon: Square },
  ];

  return (
    <div className="space-y-6">
      {/* Colors */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Palette className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Colors</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Foreground Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={config.foregroundColor}
                onChange={(e) => setConfig({ ...config, foregroundColor: e.target.value })}
                className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={config.foregroundColor}
                onChange={(e) => setConfig({ ...config, foregroundColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Background Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={config.backgroundColor}
                onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={config.backgroundColor}
                onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shape */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Square className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Shape</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {shapes.map((shape) => {
            const Icon = shape.icon;
            return (
              <button
                key={shape.value}
                onClick={() => setConfig({ ...config, shape: shape.value as any })}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  config.shape === shape.value
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${shape.value === 'rounded' ? 'rounded-md' : ''}`} />
                <span className="text-sm font-medium">{shape.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Settings className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Advanced Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Error Correction Level
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {errorLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setConfig({ ...config, errorCorrectionLevel: level.value as any })}
                  className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                    config.errorCorrectionLevel === level.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-medium text-sm">{level.label}</div>
                  <div className="text-xs opacity-75">{level.description}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Size: {config.width}px
              </label>
              <input
                type="range"
                min="200"
                max="800"
                step="50"
                value={config.width}
                onChange={(e) => setConfig({ ...config, width: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Margin: {config.margin}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={config.margin}
                onChange={(e) => setConfig({ ...config, margin: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCustomization;