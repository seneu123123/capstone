import React, { useState } from 'react';
import { AppSettings } from '../../types';
import { 
  Settings as SettingsIcon, 
  Building2, 
  Palette, 
  Download, 
  RotateCcw, 
  Check, 
  Sliders, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  DollarSign, 
  Sparkles,
  Eye,
  FileText
} from 'lucide-react';

interface SystemSettingsProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onResetSettings: () => void;
}

export const SystemSettings: React.FC<SystemSettingsProps> = ({
  settings,
  onUpdateSettings,
  onResetSettings
}) => {
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'agency' | 'theme' | 'backup'>('agency');

  const handleAgencyChange = (field: keyof AppSettings['agency'], value: any) => {
    setFormData((prev) => ({
      ...prev,
      agency: {
        ...prev.agency,
        [field]: value
      }
    }));
  };

  const handleThemeChange = (field: keyof AppSettings['theme'], value: any) => {
    setFormData((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        [field]: value
      }
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `holiday_travelers_settings_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Module Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                SYSTEM CONFIGURATION
              </span>
              <span className="text-xs text-slate-400 font-mono">Module #7</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">Agency & UI Customization Settings</h1>
            <p className="text-sm text-slate-400 mt-1">
              Customize <strong className="text-purple-300">{formData.agency.companyName}</strong> branding, accreditation details, contact numbers, and UI themes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetSettings}
              type="button"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 transition flex items-center gap-2"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Settings Saved!</span>
                </>
              ) : (
                <>
                  <SettingsIcon className="w-4 h-4" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Subtab navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800 text-xs">
          <button
            onClick={() => setActiveSubTab('agency')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium transition ${
              activeSubTab === 'agency'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4 text-purple-400" />
            <span>Company Branding & DOT Profile</span>
          </button>
          <button
            onClick={() => setActiveSubTab('theme')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium transition ${
              activeSubTab === 'theme'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>UI Appearance & Theme</span>
          </button>
          <button
            onClick={() => setActiveSubTab('backup')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium transition ${
              activeSubTab === 'backup'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export & Backup</span>
          </button>
        </div>
      </div>

      {/* Main Settings Form Container */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* SubTab 1: Agency Branding */}
          {activeSubTab === 'agency' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-400" />
                  <span>Company Identity & Accreditation</span>
                </h3>
                <span className="text-xs text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20 font-mono">
                  Official Travel Agency Profile
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Registered Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.agency.companyName}
                    onChange={(e) => handleAgencyChange('companyName', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g. Holiday Travelers Travel and Tours Inc"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Appears on official invoices, hotel vouchers, and tour passes.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Short Display Name
                  </label>
                  <input
                    type="text"
                    value={formData.agency.shortName}
                    onChange={(e) => handleAgencyChange('shortName', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g. Holiday Travelers"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    DOT Accreditation Number
                  </label>
                  <div className="relative">
                    <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={formData.agency.accreditationNo}
                      onChange={(e) => handleAgencyChange('accreditationNo', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                      placeholder="DOT-ACCR-RO7-2026-8819"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Company Tagline / Slogan
                  </label>
                  <input
                    type="text"
                    value={formData.agency.tagline}
                    onChange={(e) => handleAgencyChange('tagline', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Official Contact Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={formData.agency.email}
                      onChange={(e) => handleAgencyChange('email', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Hotline / Mobile Numbers
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={formData.agency.phone}
                      onChange={(e) => handleAgencyChange('phone', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Headquarters Address
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={formData.agency.address}
                      onChange={(e) => handleAgencyChange('address', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Billing Currency Symbol
                  </label>
                  <input
                    type="text"
                    value={formData.agency.currencySymbol}
                    onChange={(e) => handleAgencyChange('currencySymbol', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Default Required Deposit (%)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={formData.agency.defaultDownpaymentPct}
                    onChange={(e) => handleAgencyChange('defaultDownpaymentPct', Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SubTab 2: UI Theme Customization */}
          {activeSubTab === 'theme' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-cyan-400" />
                  <span>Visual Theme & UI Personalization</span>
                </h3>
              </div>

              {/* Color Scheme Picker */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-300">
                  Primary Brand Accent Theme
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { id: 'cyan', name: 'Cyan Ocean', color: 'bg-cyan-500', border: 'border-cyan-500' },
                    { id: 'amber', name: 'Amber Gold', color: 'bg-amber-500', border: 'border-amber-500' },
                    { id: 'emerald', name: 'Emerald Mint', color: 'bg-emerald-500', border: 'border-emerald-500' },
                    { id: 'indigo', name: 'Royal Indigo', color: 'bg-indigo-500', border: 'border-indigo-500' },
                    { id: 'rose', name: 'Sunset Rose', color: 'bg-rose-500', border: 'border-rose-500' },
                  ].map((scheme) => (
                    <button
                      key={scheme.id}
                      type="button"
                      onClick={() => handleThemeChange('colorScheme', scheme.id)}
                      className={`p-3 rounded-xl border text-left transition flex flex-col items-center gap-2 ${
                        formData.theme.colorScheme === scheme.id
                          ? `${scheme.border} bg-slate-800 ring-2 ring-purple-500/50`
                          : 'border-slate-800 bg-slate-950 hover:bg-slate-900'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full ${scheme.color} shadow-lg`} />
                      <span className="text-xs font-semibold text-slate-200">{scheme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout Density */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Layout Density Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleThemeChange('density', 'spacious')}
                      className={`p-3 rounded-xl border text-xs font-semibold transition ${
                        formData.theme.density === 'spacious'
                          ? 'border-purple-500 bg-purple-500/10 text-purple-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Spacious (Default)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleThemeChange('density', 'compact')}
                      className={`p-3 rounded-xl border text-xs font-semibold transition ${
                        formData.theme.density === 'compact'
                          ? 'border-purple-500 bg-purple-500/10 text-purple-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Compact High-Density
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Visual Options
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.theme.showBorders}
                        onChange={(e) => handleThemeChange('showBorders', e.target.checked)}
                        className="rounded bg-slate-950 border-slate-700 text-purple-600 focus:ring-purple-500"
                      />
                      <span>Enable High-Contrast Card Borders</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.theme.enableAnimations}
                        onChange={(e) => handleThemeChange('enableAnimations', e.target.checked)}
                        className="rounded bg-slate-950 border-slate-700 text-purple-600 focus:ring-purple-500"
                      />
                      <span>Enable Skeleton Shimmer & Page Animations</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SubTab 3: Export & Backup */}
          {activeSubTab === 'backup' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-emerald-400" />
                  <span>Export & Portable Backup Tools</span>
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Download a single plug-and-play JSON backup file containing your agency branding, contact credentials, and custom UI options to easily import into VS Code or share with colleagues.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Configuration Backup (.json)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Realtime Branding Preview */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-400" />
                <span>Live Branding Preview</span>
              </h4>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono">
                Realtime
              </span>
            </div>

            {/* Sample Voucher / Header Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    HT
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white leading-tight">
                      {formData.agency.companyName}
                    </h5>
                    <p className="text-[10px] text-purple-400 font-mono">
                      {formData.agency.accreditationNo}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Phone className="w-3 h-3 text-purple-400 shrink-0" />
                  <span className="truncate">{formData.agency.phone}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Mail className="w-3 h-3 text-purple-400 shrink-0" />
                  <span className="truncate">{formData.agency.email}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin className="w-3 h-3 text-purple-400 shrink-0" />
                  <span className="truncate">{formData.agency.address}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Default Currency:</span>
                <span className="font-mono font-bold text-emerald-400">{formData.agency.currencySymbol} PHP</span>
              </div>
            </div>

            <div className="bg-purple-950/30 border border-purple-500/20 rounded-xl p-3 text-[11px] text-purple-300 leading-relaxed">
              <Sparkles className="w-4 h-4 text-purple-400 mb-1" />
              Changes saved here update across all 6 capstone submodules, including customer booking receipts, hotel vouchers, and printable invoices.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
