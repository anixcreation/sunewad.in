import React, { useState, useEffect } from 'react';
import { Calculator, Camera, Monitor, Zap, Cable, ShieldCheck, Send, CheckCircle2, Settings2, Plus, Minus, Server, HardDrive, Plug } from 'lucide-react';

export default function Configurator() {
  // Step 1: System Type
  const [systemType, setSystemType] = useState<'DVR' | 'NVR'>('DVR');
  
  // Step 2: Resolution
  const [resolution, setResolution] = useState('2.4 MP Analog');
  
  const dvrResolutions = ['2.4 MP Analog', '4 MP Analog', '5 MP Analog', '8 MP Analog'];
  const nvrResolutions = ['2.4 MP IP', '4 MP IP', '5 MP IP', '8 MP IP'];

  // Step 3: Channels
  const [channels, setChannels] = useState<number | 'Project'>(4);
  const [projectChannels, setProjectChannels] = useState<number>(128);
  
  const dvrChannels = [4, 8, 16, 32];
  const nvrChannels = [10, 16, 32, 64, 128, 'Project'];

  // Step 4: Camera Qty
  const [cameraQty, setCameraQty] = useState(4);

  // Step 5: Power / Network
  const [poePort, setPoePort] = useState('4 Port');
  const [poeType, setPoeType] = useState('Normal POE');
  const poePorts = ['4 Port', '8 Port', '16 Port', '24 Port'];
  const poeTypes = ['Normal POE', 'Gigabit POE'];
  const [powerSupply, setPowerSupply] = useState('SMPS');
  const powerOptions = ['SMPS', 'Power Supply'];

  // Step 6: Wire Selection
  const [wireType, setWireType] = useState('Coaxial Indoor');
  const dvrWires = ['Coaxial Indoor', 'Coaxial Outdoor'];
  const nvrWires = ['CAT5', 'CAT5e', 'CAT6'];

  // Step 7: Storage (HDD)
  const [hddSize, setHddSize] = useState('1TB');
  const [hddQty, setHddQty] = useState(1);
  const hddOptions = ['500GB', '1TB', '2TB', '4TB', '6TB', '8TB', '10TB'];

  // Step 8: Extra Options
  const [extras, setExtras] = useState<string[]>([]);
  const [useBalun, setUseBalun] = useState(false);
  const extraOptionsList = [
    'LAN to HDMI Extender',
    'Rack'
  ];

  // Step 8: Additional Services
  const [services, setServices] = useState<string[]>([]);
  const serviceOptionsList = [
    'VDP (Video Door Phone)',
    'Security System',
    'Alarm System',
    'Maintenance',
    'Installation Charges'
  ];

  // Logic Handlers: Auto-Filtering based on System Type
  useEffect(() => {
    if (systemType === 'DVR') {
      setResolution('2.4 MP Analog');
      setChannels(4);
      setCameraQty(4);
      setWireType('Coaxial Indoor');
      setPowerSupply('SMPS');
    } else {
      setResolution('2.4 MP IP');
      setChannels(10);
      setCameraQty(10);
      setWireType('CAT6');
      setPoePort('4 Port');
      setPoeType('Normal POE');
    }
  }, [systemType]);

  // Auto-fill camera qty and smart POE logic when channel changes
  useEffect(() => {
    let activeChannels = channels !== 'Project' ? (channels as number) : projectChannels;
    setCameraQty(activeChannels);

    // Smart POE Suggestion Logic
    if (systemType === 'NVR') {
      if (activeChannels <= 10) setPoePort('16 Port');
      else if (activeChannels <= 16) setPoePort('16 Port');
      else if (activeChannels <= 32) setPoePort('24 Port');
      else setPoePort('24 Port'); // Fallback for larger projects
    }
  }, [channels, projectChannels, systemType]);

  const handleCameraQtyChange = (val: number) => {
    if (val < 1) return;
    if (channels !== 'Project' && val > channels) return;
    setCameraQty(val);
  };

  const toggleExtra = (extra: string) => {
    setExtras(prev => prev.includes(extra) ? prev.filter(e => e !== extra) : [...prev, extra]);
  };

  const toggleService = (service: string) => {
    setServices(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]);
  };

  // Generate Clean Invoice-Style WhatsApp Message
  const handleWhatsApp = () => {
    const actualChannels = channels === 'Project' ? projectChannels : channels;
    
    // Power Supply Logic (SMPS matches channel count)
    const smpsChannelMatch = actualChannels <= 4 ? 4 : actualChannels <= 8 ? 8 : 16;
    
    let msg = `*--- SUNEWAD MULTISERVICES ---*\n`;
    msg += `*ESTIMATE INQUIRY*\n\n`;
    
    msg += `*System Details:*\n`;
    msg += `• Type: ${systemType === 'DVR' ? 'DVR (Analog)' : 'NVR (IP)'}\n`;
    msg += `• Camera: ${resolution}\n`;
    msg += `• Channels: ${actualChannels} CH\n`;
    msg += `• Camera Qty: ${cameraQty} Nos\n\n`;
    
    msg += `*Power & Network:*\n`;
    if (systemType === 'DVR') {
      msg += `• Power: ${smpsChannelMatch}CH ${powerSupply}\n`;
    } else {
      msg += `• POE Switch: ${poePort} (${poeType})\n`;
    }
    
    msg += `\n*Connectors Required:*\n`;
    if (systemType === 'DVR') {
      if (useBalun) {
        msg += `• Balun: ${cameraQty} Nos\n`;
        msg += `• DC: ${cameraQty} Nos\n`;
      } else {
        msg += `• BNC: ${cameraQty * 2} Nos\n`;
        msg += `• DC: ${cameraQty} Nos\n`;
      }
    } else {
      msg += `• RJ45: ${cameraQty * 2} Nos\n`;
    }
    
    msg += `\n*Storage (HDD):*\n`;
    msg += `• ${hddSize} × ${hddQty} Nos\n`;

    msg += `\n*Wiring:*\n`;
    msg += `• Cable: ${wireType}\n`;
    
    if (extras.length > 0) {
      msg += `\n*Additional Hardware:*\n`;
      extras.forEach(ex => msg += `• ${ex}\n`);
    }
    
    if (services.length > 0) {
      msg += `\n*Services Required:*\n`;
      services.forEach(s => msg += `• ${s}\n`);
    }
    
    msg += `\n*---------------------------*\n`;
    msg += `_Please provide a detailed quotation for the above configuration._`;
    
    window.open(`https://wa.me/918484006202?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 text-red-600 dark:text-red-500 font-bold uppercase tracking-wider text-sm border border-red-500/20">
          <Calculator size={18} /> Smart Auto-Filter
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold">CCTV System Selection & Price Calculator</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Configure your complete surveillance system. Options automatically adapt based on your system type.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: System Type */}
          <div className="card p-6 space-y-6 border-l-4 border-l-red-600">
            <h3 className="text-xl font-bold flex items-center gap-2"><Monitor className="text-red-600" /> 1. Select System Type</h3>
            <div className="grid grid-cols-2 gap-4">
              {['DVR', 'NVR'].map(type => (
                <button
                  key={type}
                  onClick={() => setSystemType(type as 'DVR' | 'NVR')}
                  className={`p-5 rounded-xl border-2 transition-all font-bold text-lg flex flex-col items-center gap-2 ${
                    systemType === type 
                      ? 'border-red-600 bg-red-50 dark:bg-red-900/20 text-red-600 shadow-lg shadow-red-600/10' 
                      : 'border-gray-200 dark:border-[#333] hover:border-red-300 dark:hover:border-red-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Server size={32} />
                  {type === 'DVR' ? 'DVR (Analog System)' : 'NVR (IP System)'}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-[#1e1e1e] p-3 rounded-lg flex items-start gap-2">
              <Zap size={16} className="text-yellow-500 shrink-0 mt-0.5" />
              This selection will automatically filter and control all further compatible options below.
            </div>
          </div>

          {/* Step 2: Resolution */}
          <div className="card p-6 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><Camera className="text-red-600" /> 2. Camera Type & Resolution</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(systemType === 'DVR' ? dvrResolutions : nvrResolutions).map(res => (
                <button
                  key={res}
                  onClick={() => setResolution(res)}
                  className={`py-3 px-4 rounded-xl border transition-all font-medium text-sm ${
                    resolution === res 
                      ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-600/20' 
                      : 'bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-[#333] hover:border-red-400'
                  }`}
                >
                  {res}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 & 4: Channels & Qty */}
          <div className="card p-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2"><Settings2 className="text-red-600" /> 3. Recorder Channels</h3>
              <div className="flex flex-wrap gap-3">
                {(systemType === 'DVR' ? dvrChannels : nvrChannels).map(ch => (
                  <button
                    key={ch}
                    onClick={() => setChannels(ch as number | 'Project')}
                    className={`py-2 px-5 rounded-lg border transition-all font-medium ${
                      channels === ch 
                        ? 'bg-gray-900 dark:bg-gray-100 border-gray-900 dark:border-gray-100 text-white dark:text-black shadow-md' 
                        : 'bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-[#333] hover:border-gray-400'
                    }`}
                  >
                    {ch === 'Project' ? 'Project Mode' : `${ch} Channel`}
                  </button>
                ))}
              </div>
              {channels === 'Project' && (
                <div className="mt-4 flex items-center gap-4 animate-in slide-in-from-top-2 p-4 bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-200 dark:border-[#333]">
                  <label className="font-bold">Enter Custom Channels:</label>
                  <input 
                    type="number" 
                    min="1"
                    value={projectChannels}
                    onChange={(e) => setProjectChannels(parseInt(e.target.value) || 1)}
                    className="input-field w-32 bg-white dark:bg-[#111]"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-[#222]">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2"><Camera className="text-red-600" /> 4. Camera Quantity</h3>
                <span className="text-sm font-medium px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-full">
                  Max Limit: {channels === 'Project' ? 'Unlimited' : channels}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleCameraQtyChange(cameraQty - 1)}
                  className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-[#1e1e1e] flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 transition-colors"
                >
                  <Minus size={24} />
                </button>
                <div className="text-4xl font-extrabold w-20 text-center text-red-600">{cameraQty}</div>
                <button 
                  onClick={() => handleCameraQtyChange(cameraQty + 1)}
                  disabled={channels !== 'Project' && cameraQty >= (channels as number)}
                  className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-[#1e1e1e] flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 transition-colors disabled:opacity-50 disabled:hover:bg-gray-100 dark:disabled:hover:bg-[#222] disabled:hover:text-inherit"
                >
                  <Plus size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Step 5: Power & Network */}
          <div className="card p-6 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><Zap className="text-red-600" /> 5. Power & Network</h3>
            
            {systemType === 'DVR' ? (
              <div className="space-y-3 animate-in fade-in">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Power Supply Type (Required)</label>
                <div className="grid grid-cols-2 gap-3">
                  {powerOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setPowerSupply(opt)}
                      className={`py-3 px-4 rounded-xl border transition-all font-medium ${
                        powerSupply === opt ? 'bg-red-600 border-red-600 text-white shadow-md' : 'bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-[#333]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">POE Switch Ports</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {poePorts.map(port => (
                      <button
                        key={port}
                        onClick={() => setPoePort(port)}
                        className={`py-3 px-3 rounded-xl border transition-all text-sm font-medium ${
                          poePort === port ? 'bg-red-600 border-red-600 text-white shadow-md' : 'bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-[#333]'
                        }`}
                      >
                        {port}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">POE Switch Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {poeTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => setPoeType(type)}
                        className={`py-3 px-4 rounded-xl border transition-all font-medium ${
                          poeType === type ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-md border-gray-900 dark:border-gray-100 shadow-md' : 'bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-[#333]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 7: Wire Selection */}
          <div className="card p-6 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><Cable className="text-red-600" /> 6. Wire Selection</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(systemType === 'DVR' ? dvrWires : nvrWires).map(opt => (
                <button
                  key={opt}
                  onClick={() => setWireType(opt)}
                  className={`w-full py-4 px-4 rounded-xl border transition-all font-medium flex flex-col items-center gap-2 ${
                    wireType === opt 
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-600 text-red-600 shadow-sm' 
                      : 'bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-[#333] hover:border-red-300'
                  }`}
                >
                  {wireType === opt && <CheckCircle2 size={20} />}
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Step 7.5: Storage (HDD) */}
          <div className="card p-6 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><HardDrive className="text-red-600" /> 7. Storage (HDD)</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {hddOptions.map(size => (
                  <button
                    key={size}
                    onClick={() => setHddSize(size)}
                    className={`py-2 px-2 rounded-lg border transition-all text-sm font-bold ${
                      hddSize === size 
                        ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-600/20' 
                        : 'bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-[#333] hover:border-red-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-[#222]">
                <label className="font-bold text-gray-500 uppercase tracking-wider text-sm">Hard Disk Quantity:</label>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setHddQty(Math.max(1, hddQty - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-[#1e1e1e] flex items-center justify-center hover:text-red-600 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="text-xl font-bold w-8 text-center">{hddQty}</div>
                  <button 
                    onClick={() => setHddQty(hddQty + 1)}
                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-[#1e1e1e] flex items-center justify-center hover:text-red-600 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 8 & 9: Extras & Services */}
          <div className="card p-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2"><Settings2 className="text-red-600" /> 8. Extra Options</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {systemType === 'DVR' && (
                  <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                    useBalun ? 'bg-red-50 dark:bg-red-900/20 border-red-600 text-red-600' : 'bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-[#333] hover:border-red-200'
                  }`}>
                    <input 
                      type="checkbox" 
                      checked={useBalun}
                      onChange={(e) => setUseBalun(e.target.checked)}
                      className="w-5 h-5 accent-red-600 rounded"
                    />
                    <span className="font-medium text-sm">Use Balun instead of BNC</span>
                  </label>
                )}
                {extraOptionsList.map(extra => (
                  <label key={extra} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                    extras.includes(extra) ? 'bg-red-50 dark:bg-red-900/20 border-red-600 text-red-600' : 'bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-[#333] hover:border-red-200'
                  }`}>
                    <input 
                      type="checkbox" 
                      checked={extras.includes(extra)}
                      onChange={() => toggleExtra(extra)}
                      className="w-5 h-5 accent-red-600 rounded"
                    />
                    <span className="font-medium text-sm">{extra}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-[#222]">
              <h3 className="text-xl font-bold flex items-center gap-2"><ShieldCheck className="text-red-600" /> 8. Additional Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceOptionsList.map(service => (
                  <label key={service} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                    services.includes(service) ? 'bg-red-50 dark:bg-red-900/20 border-red-600 text-red-600' : 'bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-[#333] hover:border-red-200'
                  }`}>
                    <input 
                      type="checkbox" 
                      checked={services.includes(service)}
                      onChange={() => toggleService(service)}
                      className="w-5 h-5 accent-red-600 rounded"
                    />
                    <span className="font-medium">{service}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Summary Column (Sticky) */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
          <div className="card bg-gray-900 dark:bg-[#111] text-white border-none shadow-2xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-red-600 to-red-800 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <h2 className="text-2xl font-bold relative z-10">Live Summary</h2>
              <p className="text-red-100 text-sm mt-1 relative z-10">Auto-updating configuration</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Core Specs */}
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-[#333]">
                  <span className="text-gray-400">System</span>
                  <span className="font-bold text-lg">{systemType === 'DVR' ? 'DVR (Analog)' : 'NVR (IP)'}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#333]">
                  <span className="text-gray-400">Resolution</span>
                  <span className="font-bold text-lg">{resolution}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#333]">
                  <span className="text-gray-400">Channels</span>
                  <span className="font-bold text-lg">{channels === 'Project' ? projectChannels : channels} CH</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#333]">
                  <span className="text-gray-400">Cameras</span>
                  <span className="font-bold text-lg text-red-500">{cameraQty} Nos</span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-[#333]">
                  <span className="text-gray-400">Power/Network</span>
                  {systemType === 'DVR' ? (
                    <span className="font-bold text-right">{channels === 'Project' ? projectChannels : channels <= 4 ? 4 : channels <= 8 ? 8 : 16}CH {powerSupply}</span>
                  ) : (
                    <span className="font-bold text-right">{poePort}<br/><span className="text-xs text-gray-400">{poeType}</span></span>
                  )}
                </div>
              </div>

              {/* Auto Calculated Connectors */}
              <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#333] space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10"><Plug size={40} /></div>
                <h4 className="font-bold text-red-500 text-xs uppercase tracking-wider flex items-center gap-2">
                  <Settings2 size={14} /> Auto-Calculated Connectors
                </h4>
                {systemType === 'DVR' ? (
                  <div className="space-y-2">
                    {useBalun ? (
                      <div className="flex justify-between text-sm"><span>Balun (Balloon):</span> <span className="font-bold text-green-400">{cameraQty} Nos</span></div>
                    ) : (
                      <div className="flex justify-between text-sm"><span>BNC Connectors:</span> <span className="font-bold">{cameraQty * 2} Nos</span></div>
                    )}
                    <div className="flex justify-between text-sm"><span>DC Connectors:</span> <span className="font-bold">{cameraQty} Nos</span></div>
                  </div>
                ) : (
                  <div className="flex justify-between text-sm"><span>RJ45 Connectors:</span> <span className="font-bold">{cameraQty * 2} Nos</span></div>
                )}
              </div>

              {/* Wiring & Storage */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-1">Storage (HDD)</h4>
                  <div className="text-sm font-bold bg-[#1a1a1a] p-3 rounded-lg border border-[#333] flex justify-between">
                    <span>{hddSize} Hard Disk</span>
                    <span className="text-red-500">× {hddQty}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-1">Selected Wiring</h4>
                  <div className="text-sm font-medium bg-[#1a1a1a] p-3 rounded-lg border border-[#333]">{wireType}</div>
                </div>
                
                {(extras.length > 0 || services.length > 0) && (
                  <div className="pt-4 mt-4 border-t border-[#333] space-y-4">
                    {extras.length > 0 && (
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">Extra Hardware</h4>
                        <ul className="space-y-1.5">
                          {extras.map(e => <li key={e} className="text-sm flex items-center gap-2"><CheckCircle2 size={14} className="text-red-500" /> {e}</li>)}
                        </ul>
                      </div>
                    )}
                    {services.length > 0 && (
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">Services</h4>
                        <ul className="space-y-1.5">
                          {services.map(s => <li key={s} className="text-sm flex items-center gap-2"><CheckCircle2 size={14} className="text-red-500" /> {s}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button 
                onClick={handleWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-green-900/50 hover:-translate-y-1"
              >
                <Send size={20} />
                Get Quotation via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}