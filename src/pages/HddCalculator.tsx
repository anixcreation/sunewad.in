import React, { useState, useEffect } from 'react';
import { Calculator, HardDrive, Camera, Monitor, Video, Settings2, Send, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

const STORAGE_RATES: Record<string, Record<string, number>> = {
  '2MP / 2.4MP': { 'H.264': 25, 'H.264+': 18, 'H.265': 12, 'H.265+': 8 },
  '4MP': { 'H.264': 40, 'H.264+': 30, 'H.265': 20, 'H.265+': 14 },
  '5MP': { 'H.264': 50, 'H.264+': 35, 'H.265': 25, 'H.265+': 16 },
  '8MP (4K)': { 'H.264': 90, 'H.264+': 65, 'H.265': 45, 'H.265+': 28 },
};

const HDD_SIZES: Record<string, number> = {
  '500 GB': 500,
  '1 TB': 1000,
  '2 TB': 2000,
  '4 TB': 4000,
  '6 TB': 6000,
  '8 TB': 8000,
  '10 TB': 10000,
};

export default function HddCalculator() {
  const [systemType, setSystemType] = useState('NVR');
  const [resolution, setResolution] = useState('5MP');
  const [compression, setCompression] = useState('H.265+');
  const [cameraQty, setCameraQty] = useState(8);
  const [hddSize, setHddSize] = useState('1 TB');
  const [recordingMode, setRecordingMode] = useState('Continuous');

  // Derived state
  const [totalPerDay, setTotalPerDay] = useState(0);
  const [backupDays, setBackupDays] = useState(0);
  const [status, setStatus] = useState<{text: string; color: string; icon: any}>({ text: '', color: '', icon: null });

  useEffect(() => {
    // Calculate storage per day per camera
    const baseRate = STORAGE_RATES[resolution]?.[compression] || 25;
    
    // Apply motion recording discount (50%)
    const actualRate = recordingMode === 'Motion' ? baseRate * 0.5 : baseRate;
    
    const dailyTotal = actualRate * cameraQty;
    setTotalPerDay(dailyTotal);

    // Calculate days
    const totalStorageGB = HDD_SIZES[hddSize] || 1000;
    // Reserving 5% of HDD for system overhead
    const usableStorage = totalStorageGB * 0.95;
    
    const days = dailyTotal > 0 ? Math.floor(usableStorage / dailyTotal) : 0;
    setBackupDays(days);

    // Status logic
    if (days < 2) {
      setStatus({ text: 'Very Low Backup', color: 'text-red-500', icon: AlertTriangle });
    } else if (days <= 7) {
      setStatus({ text: 'Medium Backup', color: 'text-yellow-500', icon: Clock });
    } else {
      setStatus({ text: 'Good Backup', color: 'text-green-500', icon: CheckCircle2 });
    }
  }, [resolution, compression, cameraQty, hddSize, recordingMode]);

  const handleWhatsApp = () => {
    let msg = `*Hello Sunewad Multiservices,*\n\n`;
    msg += `*System:* ${systemType}\n`;
    msg += `*Resolution:* ${resolution}\n`;
    msg += `*Codec:* ${compression}\n`;
    msg += `*Cameras:* ${cameraQty}\n`;
    msg += `*HDD:* ${hddSize}\n`;
    msg += `*Mode:* ${recordingMode}\n\n`;
    msg += `*Estimated Backup:* ${backupDays} Days\n\n`;
    msg += `_Please suggest a better configuration._`;
    
    window.open(`https://wa.me/918484006202?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const StatusIcon = status.icon;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 text-red-600 dark:text-red-500 font-bold uppercase tracking-wider text-sm border border-red-500/20">
          <HardDrive size={18} /> Storage Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold">CCTV HDD Storage & Backup Calculator</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Accurately estimate how many days of recording your hard drive will hold based on your camera specifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* System Type */}
            <div className="card p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2 text-gray-700 dark:text-gray-300"><Monitor className="text-red-600" size={18} /> System Type</h3>
              <div className="grid grid-cols-2 gap-3">
                {['DVR', 'NVR'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSystemType(type)}
                    className={`py-3 rounded-xl border transition-all font-medium ${
                      systemType === type ? 'bg-red-600 border-red-600 text-white shadow-md' : 'bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Recording Mode */}
            <div className="card p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2 text-gray-700 dark:text-gray-300"><Video className="text-red-600" size={18} /> Recording Mode</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Continuous', 'Motion'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setRecordingMode(mode)}
                    className={`py-3 rounded-xl border transition-all font-medium text-sm ${
                      recordingMode === mode ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-md' : 'bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333]'
                    }`}
                  >
                    {mode} {mode === 'Motion' && '(-50%)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Camera Specs */}
          <div className="card p-6 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><Camera className="text-red-600" /> Camera Specifications</h3>
            
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Resolution</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.keys(STORAGE_RATES).map(res => (
                  <button
                    key={res}
                    onClick={() => setResolution(res)}
                    className={`py-3 px-2 rounded-xl border transition-all font-medium text-sm ${
                      resolution === res ? 'bg-red-600 border-red-600 text-white shadow-md' : 'bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333]'
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Compression (Codec)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['H.264', 'H.264+', 'H.265', 'H.265+'].map(comp => (
                  <button
                    key={comp}
                    onClick={() => setCompression(comp)}
                    className={`py-3 px-2 rounded-xl border transition-all font-medium text-sm ${
                      compression === comp ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-md' : 'bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333]'
                    }`}
                  >
                    {comp}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-[#222]">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Number of Cameras</label>
              <input 
                type="number" 
                min="1"
                value={cameraQty}
                onChange={(e) => setCameraQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="input-field max-w-xs text-xl font-bold"
              />
            </div>
          </div>

          {/* Storage Selection */}
          <div className="card p-6 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><HardDrive className="text-red-600" /> Hard Disk Size</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {Object.keys(HDD_SIZES).map(size => (
                <button
                  key={size}
                  onClick={() => setHddSize(size)}
                  className={`py-3 px-2 rounded-xl border transition-all font-bold text-sm ${
                    hddSize === size ? 'bg-red-600 border-red-600 text-white shadow-md' : 'bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333] hover:border-red-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Summary Column (Sticky) */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
          <div className="card bg-gray-900 dark:bg-[#111] text-white border-none shadow-2xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-red-600 to-red-800 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <h2 className="text-2xl font-bold relative z-10">Backup Estimate</h2>
              <p className="text-red-100 text-sm mt-1 relative z-10">Live Calculation</p>
            </div>
            
            <div className="p-6 space-y-6">
              
              <div className="text-center space-y-2">
                <div className="text-gray-400 text-sm font-bold uppercase tracking-wider">Estimated Backup</div>
                <div className="text-6xl font-extrabold text-white">
                  {backupDays} <span className="text-2xl text-gray-400 font-medium">Days</span>
                </div>
                {StatusIcon && (
                  <div className={`flex items-center justify-center gap-2 font-bold ${status.color} mt-2`}>
                    <StatusIcon size={18} />
                    {status.text}
                  </div>
                )}
              </div>

              <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#333] space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#333]">
                  <span className="text-gray-400 text-sm">Storage Per Day</span>
                  <span className="font-bold text-red-500">{totalPerDay} GB</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#333]">
                  <span className="text-gray-400 text-sm">Total Capacity</span>
                  <span className="font-bold">{HDD_SIZES[hddSize]} GB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Recording Mode</span>
                  <span className="font-bold">{recordingMode}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500">Configuration</h4>
                <div className="text-sm font-medium bg-[#1a1a1a] p-3 rounded-lg border border-[#333] grid grid-cols-2 gap-2">
                  <span className="text-gray-400">System:</span> <span className="text-right">{systemType}</span>
                  <span className="text-gray-400">Cameras:</span> <span className="text-right">{cameraQty}x {resolution}</span>
                  <span className="text-gray-400">Codec:</span> <span className="text-right">{compression}</span>
                </div>
              </div>

              <button 
                onClick={handleWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-green-900/50 hover:-translate-y-1"
              >
                <Send size={20} />
                Send Requirement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}