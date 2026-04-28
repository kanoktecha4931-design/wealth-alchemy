import React, { useState, useEffect } from 'react';
import { Sun, Heart, RefreshCw, Globe, Star, X, FileText, Home, Send, BookOpen, Zap, User, UserCircle, CheckCircle } from 'lucide-react';

const App = () => {
  // --- ระบบเก็บข้อมูล (Local Storage) ---
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
  const [evolutionStage, setEvolutionStage] = useState('koi');
  const [currentView, setCurrentView] = useState('home'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeActionId, setActiveActionId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [tempName, setTempName] = useState(profile.name);

  // --- การบันทึกข้อมูลอัตโนมัติ ---
  useEffect(() => {
    localStorage.setItem('wealth_alchemy_points', points.toString());
    localStorage.setItem('wealth_alchemy_logs', JSON.stringify(logs));
    localStorage.setItem('wealth_profile', JSON.stringify(profile));
  }, [points, logs, profile]);

  useEffect(() => {
    if (points <= 50) setEvolutionStage('koi');
    else if (points <= 150) setEvolutionStage('pixiu');
    else setEvolutionStage('dragon');
  }, [points]);

  const content = {
    TH: {
      title: "Wealth Alchemy",
      pointsLabel: "แต้มสะสมความมั่งคั่ง",
      level: ["ปลาคาร์ฟน้อย", "ปี่เซียะดูดทรัพย์", "มังกรทองสวรรค์"],
      ras: { title: "ตั้งเป้าหมาย (RAS)", desc: "วันนี้มองเห็นโอกาสอะไร?", placeholder: "พิมพ์เป้าหมายในวันนี้..." },
      gratitude: { title: "ขอบคุณ (Gratitude)", desc: "บันทึกสิ่งดีๆ ที่ได้รับ", placeholder: "พิมพ์สิ่งที่คุณรู้สึกขอบคุณ..." },
      flow: { title: "สายน้ำการเงิน", desc: "ขอบคุณเงินที่รับมาและจ่ายออก", placeholder: "พิมพ์ขอบคุณเงินที่เข้ามาหรือจ่ายไป..." },
      manifest: { title: "จักรวาลขานรับ", desc: "ปาฏิหาริย์ที่คิดปุ๊บได้ปั๊บ!", placeholder: "พิมพ์เรื่องมหัศจรรย์ที่เกิดขึ้นกับคุณ..." },
      historyTitle: "สมุดบันทึกความมั่งคั่ง",
      profileTitle: "โปรไฟล์ของฉัน",
      saveBtn: "บันทึกและรับแต้ม",
      editProfile: "แก้ไขชื่อโปรไฟล์",
      saveProfile: "บันทึกข้อมูล"
    },
    EN: {
      title: "Wealth Alchemy",
      pointsLabel: "Wealth Points",
      level: ["Lucky Koi", "Wealth Pixiu", "Golden Dragon"],
      ras: { title: "Set Focus (RAS)", desc: "Spot opportunities today", placeholder: "What opportunity are you looking for?" },
      gratitude: { title: "Gratitude", desc: "Record your blessings", placeholder: "What are you grateful for?" },
      flow: { title: "Money Flow", desc: "Bless money coming in & out", placeholder: "Bless the money coming in or out..." },
      manifest: { title: "Universe Echo", desc: "Instant manifestation!", placeholder: "Write down the magical coincidences..." },
      historyTitle: "Wealth Journal",
      profileTitle: "My Profile",
      saveBtn: "Save & Earn Points",
      editProfile: "Edit Profile Name",
      saveProfile: "Save Profile"
    }
  };

  const t = content[lang];
  const themes = {
    ras: { pts: 5, icon: Sun, bg: '#FBBF24', light: '#FEFCE8', text: '#D97706', border: '#FDE68A' },
    gratitude: { pts: 10, icon: Heart, bg: '#F472B6', light: '#FDF2F8', text: '#DB2777', border: '#FBCFE8' },
    flow: { pts: 15, icon: RefreshCw, bg: '#10B981', light: '#ECFDF5', text: '#059669', border: '#A7F3D0' },
    manifest: { pts: 20, icon: Zap, bg: '#A855F7', light: '#FAF5FF', text: '#7E22CE', border: '#E9D5FF' }
  };

  const handleSaveAction = () => {
    if (!inputText.trim()) return;
    const newLog = {
      id: Date.now(),
      actionId: activeActionId,
      text: inputText,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
    };
    setLogs([newLog, ...logs]);
    setPoints(prev => prev + themes[activeActionId].pts);
    setIsModalOpen(false);
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 800);
  };

  const handleUpdateProfile = () => {
    setProfile({ ...profile, name: tempName });
    setCurrentView('home');
  };

  const getMascot = () => {
    switch(evolutionStage) {
      case 'koi': return '🐠'; 
      case 'pixiu': return '🦁'; 
      case 'dragon': return '🐉'; 
      default: return '🐠';
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="w-full max-w-[375px] h-[750px] bg-[#FDFCF9] rounded-[40px] shadow-2xl overflow-hidden border-[6px] border-white relative flex flex-col">
        
        {isFlashing && (
          <div className="absolute inset-0 bg-white/70 z-[60] flex items-center justify-center">
            <Star className="text-yellow-400 w-24 h-24 animate-ping" />
          </div>
        )}

        {isModalOpen && activeActionId && (
          <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end justify-center p-4">
            <div className="bg-white w-full rounded-3xl p-6 shadow-2xl mb-6 border-4 border-white">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full" style={{ backgroundColor: themes[activeActionId].light, color: themes[activeActionId].text }}>
                    {React.createElement(themes[activeActionId].icon, { size: 24 })}
                  </div>
                  <h3 className="font-bold text-gray-800">{t[activeActionId].title}</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="bg-gray-100 p-2 rounded-full text-gray-500"><X size={16} /></button>
              </div>
              <textarea autoFocus className="w-full p-4 rounded-2xl border-2 bg-gray-50 focus:outline-none min-h-[120px] text-sm mb-4" style={{ borderColor: themes[activeActionId].border }} placeholder={t[activeActionId].placeholder} value={inputText} onChange={(e) => setInputText(e.target.value)} />
              <button onClick={handleSaveAction} disabled={!inputText.trim()} className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-white font-bold shadow-lg" style={{ backgroundColor: inputText.trim() ? themes[activeActionId].bg : '#D1D5DB' }}>
                <Send size={18} /> {t.saveBtn} (+{themes[activeActionId].pts})
              </button>
            </div>
          </div>
        )}

        <div className="p-6 flex justify-between items-center bg-white/50 z-10">
          <div>
            <h1 className="text-[#A72517] font-black text-xl tracking-tight">{t.title}</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
              <UserCircle size={10} /> {profile.name}
            </p>
          </div>
          <button onClick={() => setLang(lang === 'TH' ? 'EN' : 'TH')} className="flex items-center gap-1 bg-white shadow-sm px-3 py-1 rounded-full text-xs font-bold text-gray-500 border border-gray-100"><Globe size={14} /> {lang}</button>
        </div>

        <div className="flex-1 overflow-y-auto relative px-5 pb-20">
          {currentView === 'home' && (
            <div className="flex flex-col">
              <div className="relative flex flex-col items-center justify-center py-4 mt-2">
                <div className={`absolute -z-10 rounded-full blur-2xl animate-pulse ${evolutionStage === 'dragon' ? 'w-64 h-64 opacity-70' : 'w-48 h-48 opacity-50'}`} style={{ backgroundColor: '#FEF08A' }} />
                <div className="text-[5.5rem] mb-2 relative">{getMascot()}</div>
                <div className="bg-white/90 px-8 py-2 rounded-[30px] shadow-sm border-2 border-yellow-50 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">{t.pointsLabel}</p>
                  <div className="text-4xl font-black text-[#D4AF37]">{points.toLocaleString()}</div>
                </div>
                <div className="mt-3 bg-[#A72517] text-white px-5 py-1.5 rounded-full text-xs font-bold shadow-md">{points <= 50 ? t.level[0] : points <= 150 ? t.level[1] : t.level[2]}</div>
              </div>
              <div className="flex flex-col gap-3 mt-4">
                {Object.keys(themes).map((id) => (
                  <button key={id} onClick={() => { setActiveActionId(id); setInputText(''); setIsModalOpen(true); }} className="p-3.5 rounded-[24px] border-b-[4px] active:translate-y-1 active:border-b-0 transition-all flex items-center bg-white" style={{ borderColor: themes[id].border, backgroundColor: themes[id].light }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm mr-4 bg-white shrink-0" style={{ color: themes[id].text }}>{React.createElement(themes[id].icon, { size: 26 })}</div>
                    <div className="text-left flex-1"><h3 className="text-[14px] font-black text-gray-800">{t[id].title}</h3><p className="text-[11px] text-gray-500 leading-tight mt-0.5">{t[id].desc}</p></div>
                    <span className="text-white font-black text-xs px-3 py-1.5 rounded-xl shrink-0" style={{ backgroundColor: themes[id].bg }}>+{themes[id].pts}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentView === 'history' && (
            <div className="py-4">
              <div className="flex items-center gap-2 mb-6"><BookOpen className="text-[#A72517]" size={24} /><h2 className="text-xl font-black text-gray-800">{t.historyTitle}</h2></div>
              <div className="flex flex-col gap-3">
                {logs.length > 0 ? logs.map((log) => (
                  <div key={log.id} className="p-4 rounded-[24px] bg-white border-2 shadow-sm" style={{ borderColor: themes[log.actionId].border }}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-full" style={{ backgroundColor: themes[log.actionId].light, color: themes[log.actionId].text }}>{React.createElement(themes[log.actionId].icon, { size: 14 })}</div>
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">{t[log.actionId].title}</span>
                      </div>
                      <span className="text-[9px] text-gray-400">{log.date}</span>
                    </div>
                    <p className="text-[13px] text-gray-700 font-medium leading-snug">{log.text}</p>
                  </div>
                )) : <div className="text-center py-20 text-gray-400">ยังไม่มีบันทึก...</div>}
              </div>
            </div>
          )}

          {currentView === 'profile' && (
            <div className="py-4">
              <div className="flex items-center gap-2 mb-6"><User className="text-[#A72517]" size={24} /><h2 className="text-xl font-black text-gray-800">{t.profileTitle}</h2></div>
              <div className="bg-white rounded-[32px] p-8 shadow-sm border-2 border-gray-100 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-5xl mb-4 border-4 border-white shadow-md">
                  {getMascot()}
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-1">{profile.name}</h3>
                <p className="text-sm text-red-600 font-bold mb-6">{points <= 50 ? t.level[0] : points <= 150 ? t.level[1] : t.level[2]}</p>
                <div className="w-full text-left">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">{t.editProfile}</label>
                  <input type="text" className="w-full p-4 mt-1 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-red-200 focus:outline-none font-bold text-gray-700" value={tempName} onChange={(e) => setTempName(e.target.value)} maxLength={20} />
                  <button onClick={handleUpdateProfile} className="w-full py-4 mt-4 bg-[#A72517] text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform">
                    <CheckCircle size={18} /> {t.saveProfile}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-[76px] bg-white border-t border-gray-100 flex justify-between items-center px-8 z-10">
          <button onClick={() => setCurrentView('history')} className={`flex flex-col items-center gap-1 w-16 ${currentView === 'history' ? 'text-[#A72517]' : 'text-gray-300'}`}>
            <FileText size={22} /><span className="text-[9px] font-bold uppercase">Journal</span>
          </button>
          <button onClick={() => setCurrentView('home')} className="w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-xl -mt-10 border-[4px] border-white" style={{ background: 'linear-gradient(180deg, #A72517 0%, #80180F 100%)' }}>
            <Home className="text-white" size={24} />
          </button>
          <button onClick={() => { setCurrentView('profile'); setTempName(profile.name); }} className={`flex flex-col items-center gap-1 w-16 ${currentView === 'profile' ? 'text-[#A72517]' : 'text-gray-300'}`}>
            <User size={22} /><span className="text-[9px] font-bold uppercase">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App; // บรรทัดนี้สำคัญมาก ห้ามหายนะคะ!
