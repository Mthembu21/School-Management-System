import React, { useState } from 'react';
import { Settings as SettingsIcon, Upload, School, Palette } from 'lucide-react';
import BackButton from '../../components/BackButton';

interface SchoolSettings {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

const defaultSettings: SchoolSettings = {
  name: 'International School',
  logo: 'https://images.unsplash.com/photo-1594312915251-48db9280c8f1?auto=format&fit=crop&q=80&w=100&h=100',
  primaryColor: '#1d4ed8',
  secondaryColor: '#1e40af',
  accentColor: '#3b82f6'
};

export default function Settings() {
  const [settings, setSettings] = useState<SchoolSettings>(defaultSettings);
  const [previewLogo, setPreviewLogo] = useState<string>(defaultSettings.logo);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (color: string, type: keyof Pick<SchoolSettings, 'primaryColor' | 'secondaryColor' | 'accentColor'>) => {
    setSettings(prev => ({
      ...prev,
      [type]: color
    }));
  };

  return (
    <div className="p-8">
      <BackButton />
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <SettingsIcon className="h-8 w-8 text-blue-600" />
            School Settings
          </h1>
          <p className="mt-2 text-gray-600">Customize your school's appearance and information</p>
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* School Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <School className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold">School Information</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School Name
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School Logo
              </label>
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                  {previewLogo ? (
                    <img src={previewLogo} alt="School logo" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="block w-full">
                    <span className="sr-only">Choose logo</span>
                    <input
                      type="file"
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-medium
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </label>
                  <p className="mt-2 text-sm text-gray-500">
                    Recommended: Square image, at least 200x200px
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Customization */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Theme Customization</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => handleColorChange(e.target.value, 'primaryColor')}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.primaryColor}
                  onChange={(e) => handleColorChange(e.target.value, 'primaryColor')}
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => handleColorChange(e.target.value, 'secondaryColor')}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.secondaryColor}
                  onChange={(e) => handleColorChange(e.target.value, 'secondaryColor')}
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accent Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={settings.accentColor}
                  onChange={(e) => handleColorChange(e.target.value, 'accentColor')}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.accentColor}
                  onChange={(e) => handleColorChange(e.target.value, 'accentColor')}
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Preview Section */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Theme Preview</h3>
              <div className="p-4 rounded-lg border border-gray-200">
                <div className="flex gap-4">
                  <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: settings.primaryColor }}>
                    Primary Button
                  </button>
                  <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: settings.secondaryColor }}>
                    Secondary Button
                  </button>
                  <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: settings.accentColor }}>
                    Accent Button
                  </button>
                </div>
                <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: `${settings.primaryColor}15` }}>
                  <p className="text-sm" style={{ color: settings.primaryColor }}>
                    Preview text with primary color
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}