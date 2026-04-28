import React, { useState, useEffect } from 'react';
import { Sun, Heart, RefreshCw, Globe, Star, X, FileText, Home, Send, BookOpen, Zap, Battery, User, Camera, Save } from 'lucide-react';

const App = () => {
  // --- States & Persistence ---
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('wealth_alchemy_points');
    return saved ? parseInt(saved) : 0;
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('wealth_alchemy_user_name') || 'นักดึงดูดความมั่งคั่ง';
  });

  const [profilePic, setProfilePic] = useState(() => {
    return localStorage.getItem('wealth_alchemy_profile_pic') || null;
  });

  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('wealth_alchemy_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [lang, setLang] = useState('TH');
  const [isCharging, setIsCharging] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [evolutionStage, setEvolutionStage] = useState('koi');
  const [currentView, setCurrentView] = useState('home'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeActionId, setActiveActionId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [editName, setEditName] = useState(userName);

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('wealth_alchemy_points', points.toString());
    localStorage.setItem('wealth_alchemy_user_name', userName);
    if (profilePic) localStorage.setItem('wealth_alchemy_profile_pic', profilePic);
    localStorage.setItem('wealth_alchemy_logs', JSON.stringify(logs));
  }, [points, userName, profilePic, logs]);

  useEffect(() => {
    if (points <= 50) setEvolutionStage('koi');
    else if (points <= 150) setEvolutionStage('pixiu');
    else setEvolutionStage('dragon');
  }, [points]);

  const content = {
    TH: {
      title: "Wealth Alchemy",
      pointsLabel: "แต้มสะสม",
      charging: "ชาร์จพลังงานสำเร็จ",
      historyTitle: "สมุดบันทึกความมั่งคั่ง",
      profileTitle: "โปรไฟล์ของฉัน",
      saveName: "บันทึกชื่อ",
      changePic: "เปลี่ยนรูป",
      ras: { title: "ตั้งเป้าหมาย (RAS)", desc: "วันนี้มองเห็นโอกาสอะไร?", placeholder: "พิมพ์เป้าหมายในวันนี้..." },
      gratitude: { title: "ขอบคุณ (Gratitude)", desc: "บันทึกสิ่งดีๆ ที่ได้รับ", placeholder: "พิมพ์สิ่งที่คุณรู้สึกขอบคุณ..." },
      flow: { title: "สายน้ำการเงิน", desc: "ขอบคุณเงินที่รับมาและจ่ายออก", placeholder: "พิมพ์ขอบคุณเงินที่เข้ามาหรือจ่ายไป..." },
      manifest: { title: "จักรวาลขานรับ", desc: "ปาฏิหาริย์ที่คิดปุ๊บได้ปั๊บ!", placeholder: "พิมพ์เรื่องมหัศจรรย์ที่เกิดขึ้นกับคุณ..." },
      saveBtn: "บันทึกและรับแต้ม",
    },
    EN: {
      title: "Wealth Alchemy",
      pointsLabel: "Points",
      charging: "Charging Successful",
      historyTitle: "Wealth Journal",
      profileTitle: "My Profile",
      saveName: "Save Name",
      changePic: "Change Photo",
      ras: { title: "Set Focus (RAS)", desc: "Spot opportunities today", placeholder: "What opportunity are you looking for?" },
      gratitude: { title: "Gratitude", desc: "Record your blessings", placeholder: "What are you grateful for?" },
      flow: { title: "Money Flow", desc: "Bless money coming in & out", placeholder: "Bless the money coming in or out..." },
      manifest: { title: "Universe Echo", desc: "Instant manifestation!", placeholder: "Write down the magical coincidences..." },
      saveBtn: "Save & Earn Points",
    }
  };

  const t = content[lang];
  const themes = {
    ras: { pts: 5, icon: Sun, bg: '#FBBF24', light: '#FEFCE8', text: '#D97706', border: '#FDE68A' },
    gratitude: { pts: 10, icon: Heart, bg: '#F472B6', light: '#FDF2F8', text: '#DB2777', border: '#FBCFE8' },
    flow: { pts: 15, icon: RefreshCw, bg: '#10B981', light: '#ECFDF5', text: '#059669', border: '#A7F3D0' },
    manifest: { pts: 20, icon: Zap, bg: '#A855F7', light: '#FAF5FF', text: '#7E22CE', border: '#E9D5FF' }
  };

  // --- Handlers ---
  const handleSave = () => {
    if (!inputText.trim()) return;
    const pts = themes[activeActionId].pts;
    setLogs([{ id: Date.now(), actionId: activeActionId, text: inputText, date: new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' }) }, ...logs]);
    setEarnedPoints(pts);
    setIsModalOpen(false);
    setIsCharging(true);
    setTimeout(() => {
      setPoints(prev => prev + pts);
      setIsCharging(false);
    }, 2800);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 font-sans overflow-hidden">
      <style>{`
        @keyframes energyRise { 0% { transform: translateY(100%); opacity: 0; } 50% { opacity: 0.8; } 100% { transform: translateY(-100%); opacity: 0; } }
        @keyframes particleUp { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-500px) scale(0); opacity: 0; } }
        .animate-energy { animation: energyRise 2s infinite linear; }
      `}</style>

      <div className="w-full max-w-[375px] h-[750px] bg-[#FDFCF9] rounded-[40px] shadow-2xl overflow-hidden border-[6px] border-white relative flex flex-col">
        
        {/* Charging Effect */}
        {isCharging && (
          <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/85 backdrop-blur-md">
            <div className="absolute inset-0 animate-energy bg-gradient-to-t from-yellow-500/20 to-transparent" />
            <div className="relative z-20 flex flex-col items-center">
              <Battery size={80} className="text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)] animate-pulse" />
              <h2 className="text-2xl font-black text-white mt-6 tracking-widest">{t.charging}</h2>
              <div className="text-5xl font-black text-yellow-400 mt-4">+{earnedPoints}</div>
            </div>
          </div>
        )}

        {/* Modal for Input */}
        {isModalOpen && (
          <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end p-4">
            <div className="bg-white w-full rounded-3xl p-6 shadow-2xl mb-6 border-4 border-white flex flex-col gap-4 animate-in slide-in-from-bottom duration-300">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-full" style={{ backgroundColor: themes[activeActionId].light, color: themes[activeActionId].text }}>{React.createElement(themes[activeActionId].icon, { size: 24 })}</div>
                   <h3 className="font-bold text-gray-800">{t[activeActionId].title}</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="bg-gray-100 p-2 rounded-full text-gray-500"><X size={16} /></button>
              </div>
              <textarea autoFocus className="w-full p-4 rounded-2xl border-2 bg-gray-50 focus:outline-none min-h-[120px]" style={{ borderColor: themes[activeActionId].border }} placeholder={t[activeActionId].placeholder} value={inputText} onChange={(e) => setInputText(e.target.value)} />
              <button onClick={handleSave} disabled={!inputText.trim()} className="w-full py-4 rounded-2xl text-white font-bold transition-all active:scale-95" style={{ backgroundColor: inputText.trim() ? themes[activeActionId].bg : '#D1D5DB' }}>{t.saveBtn}</button>
            </div>
          </div>
        )}

        {/* Top Header */}
        <div className="p-6 flex justify-between items-center bg-white/50 z-10">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full border-2 border-[#A72517] overflow-hidden bg-gray-200">
                {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-[#A72517] text-white"><User size={20}/></div>}
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase leading-none">Wealth Magnet</span>
                <span className="text-sm font-bold text-gray-800 leading-tight">{userName}</span>
             </div>
          </div>
          <button onClick={() => setLang(lang === 'TH' ? 'EN' : 'TH')} className="bg-white shadow-sm px-3 py-1 rounded-full text-xs font-bold border border-gray-100">{lang}</button>
        </div>

        {/* View Switcher */}
        <div className="flex-1 overflow-y-auto relative" style={{ scrollbarWidth: 'none' }}>
          {currentView === 'home' && (
            <div className="flex flex-col">
              <div className="relative flex flex-col items-center justify-center py-6">
                <div className="text-[6rem] mb-2 animate-bounce" style={{ animationDuration: '3s' }}>
                  {evolutionStage === 'koi' ? '🐠' : evolutionStage === 'pixiu' ? '🦁' : '🐉'}
                </div>
                <div className="bg-white/90 px-8 py-2 rounded-[30px] shadow-sm border-2 border-yellow-50 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t.pointsLabel}</p>
                  <div className="text-4xl font-black text-[#D4AF37]">{points.toLocaleString()}</div>
                </div>
                <div className="mt-3 bg-[#A72517] text-white px-5 py-1.5 rounded-full text-xs font-bold shadow-md">
                   {points <= 50 ? t.level[0] : points <= 150 ? t.level[1] : t.level[2]}
                </div>
              </div>
              <div className="px-5 flex flex-col gap-3 pb-10">
                {Object.keys(themes).map(id => (
                  <button key={id} onClick={() => handleOpenModal(id)} className="p-4 rounded-[24px] border-b-[4px] active:translate-y-1 active:border-b-0 transition-all flex items-center bg-white" style={{ borderColor: themes[id].border, backgroundColor: themes[id].light }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mr-4 bg-white shadow-sm" style={{ color: themes[id].text }}>{React.createElement(themes[id].icon, { size: 26 })}</div>
                    <div className="text-left flex-1"><h3 className="text-[14px] font-black text-gray-800">{t[id].title}</h3><p className="text-[11px] text-gray-500 font-medium">{t[id].desc}</p></div>
                    <span className="text-white font-black text-xs px-3 py-1.5 rounded-xl shrink-0" style={{ backgroundColor: themes[id].bg }}>+{themes[id].pts}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentView === 'history' && (
            <div className="px-6 py-4 pb-20">
              <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2"><BookOpen size={24}/> {t.historyTitle}</h2>
              <div className="flex flex-col gap-3">
                {logs.length === 0 ? <p className="text-center text-gray-400 mt-10">ยังไม่มีบันทึกวันนี้</p> : logs.map(log => (
                  <div key={log.id} className="p-4 rounded-[24px] bg-white border-2" style={{ borderColor: themes[log.actionId].border }}>
                    <div className="flex justify-between mb-2">
                       <span className="text-[10px] font-bold uppercase" style={{ color: themes[log.actionId].text }}>{t[log.actionId].title}</span>
                       <span className="text-[9px] text-gray-400">{log.date}</span>
                    </div>
                    <p className="text-[13px] text-gray-700 font-medium">{log.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'profile' && (
            <div className="px-6 py-4 flex flex-col items-center">
              <h2 className="text-xl font-black text-gray-800 mb-8 w-full">{t.profileTitle}</h2>
              <div className="relative group">
                 <div className="w-32 h-32 rounded-full border-4 border-[#A72517] overflow-hidden bg-gray-100 shadow-xl">
                   {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><User size={48}/></div>}
                 </div>
                 <label className="absolute bottom-0 right-0 bg-[#A72517] p-2 rounded-full text-white cursor-pointer shadow-lg hover:scale-110 transition-transform">
                   <Camera size={20}/>
                   <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                 </label>
              </div>
              <div className="mt-8 w-full space-y-4">
                 <div>
                   <label className="text-xs font-bold text-gray-400 uppercase ml-2">Display Name</label>
                   <input type="text" className="w-full p-4 rounded-2xl border-2 bg-white mt-1 focus:border-[#A72517] outline-none font-bold" value={editName} onChange={(e) => setEditName(e.target.value)} />
                 </div>
                 <button onClick={() => {setUserName(editName); setCurrentView('home');}} className="w-full py-4 bg-[#A72517] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                   <Save size={20}/> {t.saveName}
                 </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="h-[76px] bg-white border-t border-gray-100 flex justify-between items-center px-8 z-10">
          <button onClick={() => setCurrentView('history')} className={`flex flex-col items-center gap-1 w-16 ${currentView === 'history' ? 'text-[#A72517]' : 'text-gray-300'}`}><FileText size={22} /><span className="text-[9px] font-bold uppercase">Journal</span></button>
          <button onClick={() => setCurrentView('home')} className="w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-xl -mt-10 border-[4px] border-white active:scale-95 transition-transform" style={{ background: 'linear-gradient(180deg, #A72517 0%, #80180F 100%)' }}><Home className="text-white" size={24} /></button>
          <button onClick={() => {setEditName(userName); setCurrentView('profile');}} className={`flex flex-col items-center gap-1 w-16 ${currentView === 'profile' ? 'text-[#A72517]' : 'text-gray-300'}`}><User size={22} /><span className="text-[9px] font-bold uppercase">Profile</span></button>
        </div>
      </div>
    </div>
  );
};

export default App;
