import React, { useState, useEffect } from 'react';
import { Sun, Heart, RefreshCw, Globe, Star, X, FileText, Home, Send, BookOpen, Zap, User, UserCircle, CheckCircle, TrendingUp, Gem, Trash2, Edit3 } from 'lucide-react';

const App = () => {
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('wealth_alchemy_points');
    return saved ? parseInt(saved) : 0;
  });

  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('wealth_alchemy_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('wealth_profile');
    return saved ? JSON.parse(saved) : { name: 'นักสร้างบารมี' };
  });

  const [lang, setLang] = useState('TH');
  const [isFlashing, setIsFlashing] = useState(false);
  const [currentView, setCurrentView] = useState('home'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeActionId, setActiveActionId] = useState(null);
  const [editingId, setEditingId] = useState(null); // เพิ่ม state สำหรับการแก้ไข
  const [inputText, setInputText] = useState('');
  const [tempName, setTempName] = useState(profile.name);

  useEffect(() => {
    localStorage.setItem('wealth_alchemy_points', points.toString());
    localStorage.setItem('wealth_alchemy_logs', JSON.stringify(logs));
    localStorage.setItem('wealth_profile', JSON.stringify(profile));
  }, [points, logs, profile]);

  const themes = {
    ras: { pts: 5, icon: Sun, bg: '#FBBF24', light: '#FEFCE8', text: '#D97706', border: '#FDE68A', title: "ตั้งเป้าหมาย (RAS)" },
    gratitude: { pts: 10, icon: Heart, bg: '#F472B6', light: '#FDF2F8', text: '#DB2777', border: '#FBCFE8', title: "ขอบคุณ (Gratitude)" },
    flow: { pts: 15, icon: RefreshCw, bg: '#10B981', light: '#ECFDF5', text: '#059669', border: '#A7F3D0', title: "สายน้ำการเงิน" },
    manifest: { pts: 20, icon: Zap, bg: '#A855F7', light: '#FAF5FF', text: '#7E22CE', border: '#E9D5FF', title: "จักรวาลขานรับ" }
  };

  const getEvolutionInfo = (currentPoints) => {
    const safePoints = isNaN(currentPoints) ? 0 : currentPoints;
    const cycle = Math.floor(safePoints / 1000);
    const progress = safePoints % 1000;
    const animals = ['🐠', '🦁', '🐉', '🦄', 'Swan', '🐢', '🐕', '🦇'];
    const names = ['ปลาคาร์ฟ', 'ปี่เซียะ', 'มังกร', 'กิเลน', 'หงส์แดง', 'เต่ามังกร', 'สิงโตจีน', 'ค้างคาว'];
    const idx = cycle % animals.length;
    
    let stage = ""; let scale = "scale-75"; let filter = "";
    if (progress <= 200) { stage = "เบบี๋"; scale = "scale-50"; filter = "grayscale(40%)"; }
    else if (progress <= 400) { stage = "วัยเด็ก"; scale = "scale-75"; }
    else if (progress <= 600) { stage = "วัยรุ่น"; scale = "scale-90"; }
    else if (progress <= 800) { stage = "โตเต็มวัย"; scale = "scale-105"; filter = "sepia(0.5)"; }
    else { stage = "ร่างทอง"; scale = "scale-125 animate-pulse"; filter = "drop-shadow(0 0 15px #FFD700) sepia(1) saturate(5)"; }

    return { mascot: animals[idx], stage: `${stage}${names[idx]}`, scale, filter };
  };

  const handleSaveAction = () => {
    if (!inputText.trim()) return;

    if (editingId) {
      // โหมดแก้ไข
      const updatedLogs = logs.map(log => log.id === editingId ? { ...log, text: inputText } : log);
      setLogs(updatedLogs);
      setEditingId(null);
    } else {
      // โหมดเพิ่มใหม่
      const ptsAwarded = themes[activeActionId].pts;
      const newLog = {
        id: Date.now(),
        actionId: activeActionId,
        text: inputText,
        points: ptsAwarded,
        date: new Date().toLocaleString('th-TH', { hour: '2-digit', minute:'2-digit', day: '2-digit', month: 'short' })
      };
      setLogs([newLog, ...logs]);
      setPoints(prev => (isNaN(prev) ? 0 : prev) + ptsAwarded);
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 1000);
    }
    setIsModalOpen(false);
    setInputText('');
  };

  const handleEditRequest = (log) => {
    setActiveActionId(log.actionId);
    setInputText(log.text);
    setEditingId(log.id);
    setIsModalOpen(true);
  };

  const handleDeleteLog = (id, logPoints) => {
    if (window.confirm("ต้องการลบบันทึกนี้? (แต้มจะถูกหักออก)")) {
      const p = parseInt(logPoints) || 0;
      setLogs(logs.filter(l => l.id !== id));
      setPoints(prev => Math.max(0, (parseInt(prev) || 0) - p));
    }
  };

  const evolution = getEvolutionInfo(points);
  const energyPercent = (points / 5000000) * 100;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-2 font-sans">
      <div className="w-full max-w-[375px] h-[780px] bg-[#FDFCF9] rounded-[45px] shadow-2xl overflow-hidden border-[8px] border-white relative flex flex-col">
        
        {isFlashing && (
          <div className="absolute inset-0 bg-black/40 z-[100] flex items-center justify-center backdrop-blur-sm">
             <div className="flex flex-col items-center animate-bounce">
                <Gem className="text-[#FFD700] w-20 h-20 drop-shadow-[0_0_15px_#FFD700]" />
                <span className="text-white font-black text-2xl mt-4">CHARGED!</span>
             </div>
          </div>
        )}

        {isModalOpen && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-md flex items-end justify-center p-4">
            <div className="bg-white w-full rounded-[35px] p-7 shadow-2xl mb-4 border-t-8" style={{ borderColor: themes[activeActionId].bg }}>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-xl text-gray-800">{editingId ? 'แก้ไขบันทึก' : themes[activeActionId].title}</h3>
                <button onClick={() => {setIsModalOpen(false); setEditingId(null);}} className="p-2"><X size={20} /></button>
              </div>
              <textarea autoFocus className="w-full p-5 rounded-[25px] border-2 bg-gray-50 focus:outline-none min-h-[140px] mb-5" style={{ borderColor: themes[activeActionId].border }} value={inputText} onChange={(e) => setInputText(e.target.value)} />
              <button onClick={handleSaveAction} className="w-full py-5 rounded-[25px] text-white font-black bg-gradient-to-r from-[#D4AF37] to-[#B8860B] shadow-xl active:scale-95">
                {editingId ? 'บันทึกการแก้ไข' : 'ชาร์จพลังงานทองคำ'}
              </button>
            </div>
          </div>
        )}

        <div className="p-7 pb-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-[#A72517] flex items-center justify-center text-white shadow-lg"><TrendingUp size={20} /></div>
             <h1 className="text-[#A72517] font-black text-lg uppercase tracking-tight">Wealth Alchemy</h1>
          </div>
          <div className="bg-white shadow-sm px-3 py-1 rounded-full text-[10px] font-bold text-gray-400 border border-gray-50 uppercase">{profile.name}</div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24">
          {currentView === 'home' && (
            <div className="flex flex-col items-center">
              <div className="relative py-10 mt-2 flex flex-col items-center">
                <div className="absolute -z-10 w-60 h-60 bg-yellow-200 blur-[70px] opacity-30 animate-pulse" />
                <div className={`text-[7rem] mb-4 transition-all duration-1000 ${evolution.scale}`} style={{ filter: evolution.filter }}>{evolution.mascot === 'Swan' ? '🦢' : evolution.mascot}</div>
                <div className="bg-white/80 px-4 py-1 rounded-full text-[10px] font-black text-orange-600 border border-orange-100 mb-6 uppercase tracking-widest">{evolution.stage}</div>
                
                <div className="w-full max-w-[260px] mb-6">
                   <div className="flex justify-between text-[9px] font-black text-gray-400 mb-1 px-1 uppercase tracking-widest"><span>ENERGY GOAL 5M</span><span>{energyPercent.toFixed(4)}%</span></div>
                   <div className="h-4 w-full bg-[#1A1A1A] rounded-full p-1 border border-gray-100 shadow-inner"><div className="h-full rounded-full bg-gradient-to-r from-[#444] via-[#D4AF37] to-[#FFF7AD] shadow-[0_0_10px_#D4AF37]" style={{ width: `${Math.max(1, (points/50000)*100)}%` }} /></div>
                </div>

                <div className="bg-white px-10 py-3 rounded-[30px] shadow-xl border-2 border-yellow-50 text-center">
                  <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">แต้มสะสม</p>
                  <div className="text-4xl font-black text-[#D4AF37]">{points.toLocaleString()}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 w-full mt-4">
                {Object.keys(themes).map((id) => (
                  <button key={id} onClick={() => { setActiveActionId(id); setInputText(''); setEditingId(null); setIsModalOpen(true); }} className="p-4 rounded-[25px] border-b-[4px] active:translate-y-1 active:border-b-0 transition-all flex items-center bg-white shadow-sm" style={{ borderColor: themes[id].border, backgroundColor: themes[id].light }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mr-4 bg-white" style={{ color: themes[id].text }}>{React.createElement(themes[id].icon, { size: 22 })}</div>
                    <div className="text-left"><h3 className="text-[13px] font-black text-gray-800">{themes[id].title}</h3><p className="text-[10px] text-gray-400 mt-0.5">+{themes[id].pts} แต้มมั่งคั่ง</p></div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentView === 'history' && (
            <div className="py-4">
               <h2 className="text-2xl font-black text-gray-800 mb-6">Journal</h2>
               <div className="flex flex-col gap-3">
                {logs.map((log) => (
                  <div key={log.id} className="p-5 rounded-[30px] bg-white border-2 shadow-sm relative group" style={{ borderColor: themes[log.actionId].border }}>
                    <div className="absolute top-4 right-4 flex gap-2">
                       <button onClick={() => handleEditRequest(log)} className="p-2 text-gray-300 hover:text-blue-500"><Edit3 size={16} /></button>
                       <button onClick={() => handleDeleteLog(log.id, log.points)} className="p-2 text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-lg" style={{ backgroundColor: themes[log.actionId].light, color: themes[log.actionId].text }}>{React.createElement(themes[log.actionId].icon, { size: 14 })}</div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{log.date}</span>
                    </div>
                    <p className="text-[14px] text-gray-700 font-bold leading-relaxed pr-12">{log.text}</p>
                  </div>
                ))}
               </div>
            </div>
          )}
        </div>

        <div className="h-[90px] bg-white border-t border-gray-50 flex justify-around items-center px-6 z-10">
          <button onClick={() => setCurrentView('history')} className={`flex flex-col items-center gap-1 ${currentView === 'history' ? 'text-[#A72517]' : 'text-gray-300'}`}><FileText size={22} /><span className="text-[9px] font-bold uppercase">Journal</span></button>
          <button onClick={() => setCurrentView('home')} className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl -mt-10 border-4 border-white transition-all active:scale-90" style={{ background: 'linear-gradient(180deg, #A72517 0%, #80180F 100%)' }}><Home className="text-white" size={24} /></button>
          <button onClick={() => setCurrentView('profile')} className={`flex flex-col items-center gap-1 ${currentView === 'profile' ? 'text-[#A72517]' : 'text-gray-300'}`}><User size={22} /><span className="text-[9px] font-bold uppercase">Profile</span></button>
        </div>
      </div>
    </div>
  );
};

export default App;
