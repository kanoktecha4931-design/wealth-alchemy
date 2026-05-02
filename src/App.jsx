import React, { useState, useEffect } from 'react';
import { Sun, Heart, RefreshCw, Globe, Star, X, FileText, Home, Send, BookOpen, Zap, User, UserCircle, CheckCircle, TrendingUp, Gem, Trash2 } from 'lucide-react';

const App = () => {
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('wealth_alchemy_points');
    return savedPoints ? parseInt(savedPoints) : 0;
  });

  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem('wealth_alchemy_logs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });

  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('wealth_profile');
    return savedProfile ? JSON.parse(savedProfile) : { name: 'นักสร้างบารมี', title: 'ผู้เริ่มต้น' };
  });

  const [lang, setLang] = useState('TH');
  const [isFlashing, setIsFlashing] = useState(false);
  const [currentView, setCurrentView] = useState('home'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeActionId, setActiveActionId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [tempName, setTempName] = useState(profile.name);

  useEffect(() => {
    localStorage.setItem('wealth_alchemy_points', points.toString());
    localStorage.setItem('wealth_alchemy_logs', JSON.stringify(logs));
    localStorage.setItem('wealth_profile', JSON.stringify(profile));
  }, [points, logs, profile]);

  const content = {
    TH: {
      title: "Wealth Alchemy",
      pointsLabel: "แต้มมั่งคั่งสะสม",
      energyLabel: "ระดับพลังงาน (เป้าหมาย 5 ล้าน)",
      historyTitle: "สมุดบันทึกพลังงาน",
      profileTitle: "โปรไฟล์นักสร้างบารมี",
      saveBtn: "ชาร์จพลังงานทองคำ",
      deleteConfirm: "ลบบันทึกนี้ (แต้มจะถูกหักออก)?"
    },
    EN: {
      title: "Wealth Alchemy",
      pointsLabel: "Total Wealth Points",
      energyLabel: "Energy Level (Goal 5M)",
      historyTitle: "Wealth Journal",
      profileTitle: "Wealth Creator Profile",
      saveBtn: "Charge Golden Energy",
      deleteConfirm: "Delete this log (Points will be deducted)?"
    }
  };

  const t = content[lang];
  const themes = {
    ras: { pts: 5, icon: Sun, bg: '#FBBF24', light: '#FEFCE8', text: '#D97706', border: '#FDE68A' },
    gratitude: { pts: 10, icon: Heart, bg: '#F472B6', light: '#FDF2F8', text: '#DB2777', border: '#FBCFE8' },
    flow: { pts: 15, icon: RefreshCw, bg: '#10B981', light: '#ECFDF5', text: '#059669', border: '#A7F3D0' },
    manifest: { pts: 20, icon: Zap, bg: '#A855F7', light: '#FAF5FF', text: '#7E22CE', border: '#E9D5FF' }
  };

  // --- ระบบคำนวณวิวัฒนาการสัตว์มงคล 8 ชนิด ---
  const getEvolutionInfo = (currentPoints) => {
    const cycleSize = 1000;
    const cycle = Math.floor(currentPoints / cycleSize);
    const progressInCycle = currentPoints % cycleSize;
    
    // รายชื่อสัตว์มงคลตามโจทย์ที่คุณให้มา
    const animals = [
      { emoji: '🐠', name: 'ปลาคาร์ฟ' },
      { emoji: '🦁', name: 'ปี่เซียะ' },
      { emoji: '🐉', name: 'มังกร' },
      { emoji: '🦄', name: 'กิเลน' },
      { emoji: '🦢', name: 'หงส์แดง' },
      { emoji: '🐢', name: 'เต่ามังกร' },
      { emoji: '🐕', name: 'สิงโตจีน' },
      { emoji: '🦇', name: 'ค้างคาว' }
    ];

    const currentData = animals[cycle % animals.length];

    let stageText = "";
    let scale = "scale-75";
    let filter = "";

    if (progressInCycle <= 200) {
      stageText = `เบบี๋${currentData.name}`;
      scale = "scale-50";
      filter = "grayscale(40%) opacity(0.8)";
    } else if (progressInCycle <= 400) {
      stageText = `${currentData.name}น้อย`;
      scale = "scale-75";
      filter = "grayscale(20%)";
    } else if (progressInCycle <= 600) {
      stageText = `${currentData.name}ระยะเติบโต`;
      scale = "scale-90";
    } else if (progressInCycle <= 800) {
      stageText = `${currentData.name}โตเต็มวัย (เริ่มมีประกายทอง)`;
      scale = "scale-105";
      filter = "sepia(0.6) saturate(1.5) brightness(1.1)";
    } else {
      stageText = `${currentData.name}ทองคำบริสุทธิ์`;
      scale = "scale-125 animate-pulse";
      filter = "drop-shadow(0 0 20px #FFD700) brightness(1.2) sepia(1) saturate(10)";
    }

    return { mascot: currentData.emoji, stageText, scale, filter };
  };

  const handleSaveAction = () => {
    if (!inputText.trim()) return;
    const ptsAwarded = themes[activeActionId].pts;
    const newLog = {
      id: Date.now(),
      actionId: activeActionId,
      text: inputText,
      points: ptsAwarded,
      date: new Date().toLocaleString('th-TH', { hour: '2-digit', minute:'2-digit', day: '2-digit', month: 'short' })
    };
    setLogs([newLog, ...logs]);
    setPoints(prev => prev + ptsAwarded);
    setIsModalOpen(false);
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 1200);
  };

  const handleDeleteLog = (id, logPoints) => {
    if (window.confirm(t.deleteConfirm)) {
      setLogs(logs.filter(log => log.id !== id));
      setPoints(prev => Math.max(0, prev - logPoints));
    }
  };

  const evolution = getEvolutionInfo(points);
  const totalGoal = 5000000;
  const energyPercent = (points / totalGoal) * 100;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-2 font-sans">
      <div className="w-full max-w-[375px] h-[780px] bg-[#FDFCF9] rounded-[45px] shadow-2xl overflow-hidden border-[8px] border-white relative flex flex-col">
        
        {/* Golden Gem Flash */}
        {isFlashing && (
          <div className="absolute inset-0 bg-black/40 z-[100] flex items-center justify-center backdrop-blur-sm">
             <div className="flex flex-col items-center animate-bounce">
                <div className="w-24 h-24 bg-gradient-to-tr from-[#D4AF37] to-[#FFF7AD] rotate-45 shadow-[0_0_40px_#D4AF37] mb-6 flex items-center justify-center">
                    <Gem className="text-black rotate-[-45deg] w-12 h-12" />
                </div>
                <span className="text-white font-black text-2xl tracking-tighter">GOLDEN ENERGY CHARGED!</span>
             </div>
          </div>
        )}

        {/* Modal บันทึก */}
        {isModalOpen && activeActionId && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-md flex items-end justify-center p-4">
            <div className="bg-white w-full rounded-[35px] p-7 shadow-2xl mb-4 border-t-8" style={{ borderColor: themes[activeActionId].bg }}>
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl" style={{ backgroundColor: themes[activeActionId].light, color: themes[activeActionId].text }}>
                    {React.createElement(themes[activeActionId].icon, { size: 28 })}
                  </div>
                  <h3 className="font-bold text-xl text-gray-800">{themes[activeActionId].pts} แต้ม</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="bg-gray-100 p-2 rounded-full"><X size={20} /></button>
              </div>
              <textarea autoFocus className="w-full p-5 rounded-[25px] border-2 bg-gray-50 focus:outline-none min-h-[140px] text-base mb-5" style={{ borderColor: themes[activeActionId].border }} placeholder={lang === 'TH' ? themes[activeActionId].desc : 'Enter your record...'} value={inputText} onChange={(e) => setInputText(e.target.value)} />
              <button onClick={handleSaveAction} disabled={!inputText.trim()} className="w-full py-5 rounded-[25px] flex items-center justify-center gap-3 text-white text-lg font-black bg-gradient-to-r from-[#D4AF37] via-[#FFF7AD] to-[#D4AF37] shadow-xl">
                <Zap size={22} fill="currentColor" /> {t.saveBtn}
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="p-7 pb-4 flex justify-between items-start bg-white/40">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-2xl bg-[#A72517] flex items-center justify-center text-white shadow-lg">
                <TrendingUp size={24} />
             </div>
             <div>
                <h1 className="text-[#A72517] font-black text-xl">{t.title}</h1>
                <p className="text-[11px] text-gray-400 font-bold uppercase flex items-center gap-1">
                  <UserCircle size={12} /> {profile.name}
                </p>
             </div>
          </div>
          <button onClick={() => setLang(lang === 'TH' ? 'EN' : 'TH')} className="bg-white shadow-md px-4 py-1.5 rounded-full text-xs font-black border border-gray-50"> {lang} </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24">
          {currentView === 'home' && (
            <div className="flex flex-col">
              <div className="relative flex flex-col items-center justify-center py-6 mt-2">
                <div className="absolute -z-10 w-64 h-64 bg-yellow-200 blur-[80px] rounded-full opacity-30 animate-pulse" />
                
                {/* Evolution Mascot Display */}
                <div 
                  className={`text-[6.8rem] mb-4 transition-all duration-1000 ease-in-out ${evolution.scale}`}
                  style={{ filter: evolution.filter }}
                >
                  {evolution.mascot}
                </div>
                <div className="mb-4 bg-gradient-to-r from-orange-50 to-yellow-50 px-5 py-1.5 rounded-full text-[11px] font-black text-[#A72517] border border-orange-100 shadow-sm uppercase tracking-tighter">
                  {evolution.stageText}
                </div>

                {/* Energy Bar 5M Goal */}
                <div className="w-full max-w-[260px] mb-6">
                   <div className="flex justify-between items-end mb-1.5 px-1">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t.energyLabel}</span>
                      <span className="text-[11px] font-black text-[#D4AF37]">{energyPercent.toFixed(4)}%</span>
                   </div>
                   <div className="h-5 w-full bg-[#1A1A1A] rounded-full p-1 border border-gray-100 shadow-inner overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#333] via-[#D4AF37] to-[#FFF7AD] shadow-[0_0_15px_#D4AF37] transition-all duration-1000" style={{ width: `${Math.max(1, (points/50000)*100)}%` }} />
                      {/* หมายเหตุ: ปรับความยาวแถบให้เห็นการเคลื่อนไหวในช่วงแรก 50,000 แต้มก่อนเต็ม 5M */}
                   </div>
                </div>

                <div className="bg-white/95 backdrop-blur px-10 py-3 rounded-[35px] shadow-xl border-2 border-yellow-100 text-center">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-1">{t.pointsLabel}</p>
                  <div className="text-4xl font-black text-[#D4AF37] tracking-tighter">{points.toLocaleString()}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-3 mt-4">
                {Object.keys(themes).map((id) => (
                  <button key={id} onClick={() => { setActiveActionId(id); setInputText(''); setIsModalOpen(true); }} className="p-4 rounded-[30px] border-b-[5px] active:translate-y-1 active:border-b-0 transition-all flex items-center bg-white shadow-sm" style={{ borderColor: themes[id].border, backgroundColor: themes[id].light }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm mr-4 bg-white shrink-0" style={{ color: themes[id].text }}>
                      {React.createElement(themes[id].icon, { size: 26 })}
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="text-[14px] font-black text-gray-800 leading-none">{lang === 'TH' ? themes[id].title : id.toUpperCase()}</h3>
                      <p className="text-[10px] text-gray-500 font-medium mt-1">+{themes[id].pts} แต้มมั่งคั่ง</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentView === 'history' && (
            <div className="py-4">
               <h2 className="text-2xl font-black text-gray-800 mb-6">{t.historyTitle}</h2>
               <div className="flex flex-col gap-3">
                {logs.length > 0 ? logs.map((log) => (
                  <div key={log.id} className="p-5 rounded-[30px] bg-white border-2 shadow-sm relative group" style={{ borderColor: themes[log.actionId].border }}>
                    <button 
                      onClick={() => handleDeleteLog(log.id, log.points)}
                      className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl" style={{ backgroundColor: themes[log.actionId].light, color: themes[log.actionId].text }}>{React.createElement(themes[log.actionId].icon, { size: 16 })}</div>
                        <span className="text-[10px] font-black text-gray-600 uppercase">+{log.points} แต้ม</span>
                      </div>
                    </div>
                    <p className="text-[14px] text-gray-700 font-bold leading-relaxed pr-8">{log.text}</p>
                    <p className="text-[9px] text-gray-400 mt-2 font-bold uppercase">{log.date}</p>
                  </div>
                )) : <div className="text-center py-24 text-gray-300 font-black tracking-widest text-sm uppercase">ยังไม่มีประวัติชาร์จพลังงาน</div>}
               </div>
            </div>
          )}

          {currentView === 'profile' && (
            <div className="py-4 text-center">
               <h2 className="text-2xl font-black text-gray-800 mb-8">{t.profileTitle}</h2>
               <div className="bg-white rounded-[40px] p-10 shadow-xl border-2 border-gray-50 flex flex-col items-center">
                <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center text-6xl mb-6 border-8 border-white shadow-2xl overflow-hidden" style={{ filter: evolution.filter }}>
                   {evolution.mascot}
                </div>
                <div className="w-full text-left bg-gray-50 p-6 rounded-[30px]">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">ชื่อของคุณ</label>
                  <input type="text" className="w-full p-4 mt-2 rounded-2xl bg-white border-2 border-gray-100 focus:outline-none font-black text-center" value={tempName} onChange={(e) => setTempName(e.target.value)} maxLength={20} />
                  <button onClick={() => { setProfile({ ...profile, name: tempName }); setCurrentView('home'); }} className="w-full py-5 mt-5 bg-gradient-to-r from-[#A72517] to-[#80180F] text-white rounded-[25px] font-black shadow-xl">
                    <CheckCircle size={20} className="inline mr-2" /> {t.saveProfile}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="h-[90px] bg-white border-t-2 border-gray-50 flex justify-around items-center px-6 z-10">
          <button onClick={() => setCurrentView('history')} className={`flex flex-col items-center gap-1 ${currentView === 'history' ? 'text-[#A72517]' : 'text-gray-300'}`}>
            <FileText size={24} /><span className="text-[10px] font-black uppercase">Journal</span>
          </button>
          <button onClick={() => setCurrentView('home')} className="w-[70px] h-[70px] rounded-[25px] flex items-center justify-center shadow-2xl -mt-12 border-[6px] border-[#FDFCF9]" style={{ background: 'linear-gradient(180deg, #A72517 0%, #80180F 100%)' }}>
            <Home className="text-white" size={28} />
          </button>
          <button onClick={() => { setCurrentView('profile'); setTempName(profile.name); }} className={`flex flex-col items-center gap-1 ${currentView === 'profile' ? 'text-[#A72517]' : 'text-gray-300'}`}>
            <User size={24} /><span className="text-[10px] font-black uppercase">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
