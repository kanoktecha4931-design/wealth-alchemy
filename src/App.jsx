import React, { useState, useEffect } from 'react';
import { Sun, Heart, RefreshCw, Globe, Star, X, FileText, Home, Send, BookOpen, Zap, User, UserCircle, CheckCircle, TrendingUp, Gem } from 'lucide-react';

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
      pointsLabel: "แต้มสะสมความมั่งคั่ง",
      energyLabel: "พลังงานแสงอาทิตย์รุ่งอรุณ",
      level: ["ปลาคาร์ฟน้อย", "ปี่เซียะดูดทรัพย์", "มังกรทองสวรรค์"],
      ras: { title: "ตั้งเป้าหมาย (RAS)", desc: "วันนี้มองเห็นโอกาสอะไร?", placeholder: "พิมพ์เป้าหมายในวันนี้..." },
      gratitude: { title: "ขอบคุณ (Gratitude)", desc: "บันทึกสิ่งดีๆ ที่ได้รับ", placeholder: "พิมพ์สิ่งที่คุณรู้สึกขอบคุณ..." },
      flow: { title: "สายน้ำการเงิน", desc: "ขอบคุณเงินที่รับมาและจ่ายออก", placeholder: "พิมพ์ขอบคุณเงินที่เข้ามาหรือจ่ายไป..." },
      manifest: { title: "จักรวาลขานรับ", desc: "ปาฏิหาริย์ที่คิดปุ๊บได้ปั๊บ!", placeholder: "พิมพ์เรื่องมหัศจรรย์ที่เกิดขึ้นกับคุณ..." },
      historyTitle: "สมุดบันทึกความมั่งคั่ง",
      profileTitle: "โปรไฟล์ของฉัน",
      saveBtn: "ชาร์จพลังงานทองคำ",
      saveProfile: "บันทึกข้อมูล"
    },
    EN: {
      title: "Wealth Alchemy",
      pointsLabel: "Wealth Points",
      energyLabel: "Golden Sunrise Energy",
      level: ["Lucky Koi", "Wealth Pixiu", "Golden Dragon"],
      ras: { title: "Set Focus (RAS)", desc: "Spot opportunities today", placeholder: "What opportunity are you looking for?" },
      gratitude: { title: "Gratitude", desc: "Record your blessings", placeholder: "What are you grateful for?" },
      flow: { title: "Money Flow", desc: "Bless money coming in & out", placeholder: "Bless the money coming in or out..." },
      manifest: { title: "Universe Echo", desc: "Instant manifestation!", placeholder: "Write down the magical coincidences..." },
      historyTitle: "Wealth Journal",
      profileTitle: "My Profile",
      saveBtn: "Charge Golden Energy",
      saveProfile: "Save Profile"
    }
  };

  const t = content[lang];
  const themes = {
    ras: { pts: 5, icon: Sun, bg: '#D4AF37', light: '#1A1A1A', text: '#FFD700', border: '#444' },
    gratitude: { pts: 10, icon: Heart, bg: '#D4AF37', light: '#1A1A1A', text: '#FFD700', border: '#444' },
    flow: { pts: 15, icon: RefreshCw, bg: '#D4AF37', light: '#1A1A1A', text: '#FFD700', border: '#444' },
    manifest: { pts: 20, icon: Zap, bg: '#D4AF37', light: '#1A1A1A', text: '#FFD700', border: '#444' }
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
    setTimeout(() => setIsFlashing(false), 1200);
  };

  const energyPercent = Math.min((points / 300) * 100, 100);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#111] p-2 font-sans">
      <div className="w-full max-w-[375px] h-[780px] bg-[#0A0A0A] rounded-[45px] shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden border-[8px] border-[#1A1A1A] relative flex flex-col">
        
        {/* Golden Geometry Animation */}
        {isFlashing && (
          <div className="absolute inset-0 bg-black/80 z-[100] flex items-center justify-center backdrop-blur-md">
             <div className="flex flex-col items-center animate-bounce">
                <div className="w-24 h-24 bg-gradient-to-tr from-[#D4AF37] to-[#FFF7AD] rotate-45 shadow-[0_0_40px_#D4AF37] mb-6 flex items-center justify-center">
                    <Gem className="text-black rotate-[-45deg] w-12 h-12" />
                </div>
                <span className="text-[#FFD700] font-black text-3xl tracking-widest drop-shadow-[0_0_10px_#D4AF37]">MANIFESTED</span>
             </div>
          </div>
        )}

        {/* Modal ชาร์จพลัง (Sunrise Style) */}
        {isModalOpen && activeActionId && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-end justify-center p-4">
            <div className="bg-[#1A1A1A] w-full rounded-[35px] p-7 shadow-[0_-10px_40px_rgba(212,175,55,0.3)] mb-4 border-t-4 border-[#D4AF37]">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-black text-[#FFD700] shadow-[inset_0_0_10px_rgba(212,175,55,0.5)]">
                    {React.createElement(themes[activeActionId].icon, { size: 28 })}
                  </div>
                  <h3 className="font-bold text-xl text-white">{t[activeActionId].title}</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="bg-black/50 p-2 rounded-full text-gray-400"><X size={20} /></button>
              </div>
              <textarea autoFocus className="w-full p-5 rounded-[25px] border-2 border-[#333] bg-black text-[#FFD700] focus:outline-none focus:border-[#D4AF37] min-h-[140px] text-base mb-5" placeholder={t[activeActionId].placeholder} value={inputText} onChange={(e) => setInputText(e.target.value)} />
              <button onClick={handleSaveAction} disabled={!inputText.trim()} className="w-full py-5 rounded-[25px] flex items-center justify-center gap-3 text-black text-lg font-black shadow-[0_0_20px_rgba(212,175,55,0.5)] active:scale-95 transition-all bg-gradient-to-r from-[#D4AF37] via-[#FFF7AD] to-[#D4AF37]">
                <Zap size={22} className="fill-current" /> {t.saveBtn}
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="p-7 pb-4 flex justify-between items-start bg-black/20">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] flex items-center justify-center text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                <TrendingUp size={24} />
             </div>
             <div>
                <h1 className="text-white font-black text-xl leading-none">{t.title}</h1>
                <p className="text-[11px] text-[#D4AF37] font-bold uppercase mt-1 flex items-center gap-1 opacity-80">
                  <UserCircle size={12} /> {profile.name}
                </p>
             </div>
          </div>
          <button onClick={() => setLang(lang === 'TH' ? 'EN' : 'TH')} className="bg-[#1A1A1A] shadow-md px-4 py-1.5 rounded-full text-xs font-black text-[#D4AF37] border border-[#333] uppercase"> {lang} </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24">
          {currentView === 'home' && (
            <div className="flex flex-col">
              <div className="relative flex flex-col items-center justify-center py-6 mt-2">
                {/* Sunrise Background Glow */}
                <div className="absolute -z-10 w-64 h-64 rounded-full blur-[80px] bg-gradient-to-b from-[#D4AF37] to-transparent opacity-20 top-0" />
                
                <div className="text-[6.5rem] mb-4 drop-shadow-[0_10px_30px_rgba(212,175,55,0.6)] animate-pulse">
                  {points <= 50 ? '🐠' : points <= 150 ? '🦁' : '🐉'}
                </div>

                {/* Black & Gold Energy Bar */}
                <div className="w-full max-w-[240px] mb-6">
                   <div className="flex justify-between items-end mb-1.5 px-1">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t.energyLabel}</span>
                      <span className="text-[12px] font-black text-[#D4AF37]">{Math.floor(energyPercent)}%</span>
                   </div>
                   <div className="h-5 w-full bg-black rounded-full p-1 border border-[#333] shadow-inner relative overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#444] via-[#D4AF37] to-[#FFF7AD] shadow-[0_0_20px_#D4AF37] transition-all duration-1000" style={{ width: `${energyPercent}%` }}>
                        <div className="w-full h-full animate-pulse bg-white/20" />
                      </div>
                   </div>
                </div>

                <div className="bg-[#111] px-10 py-4 rounded-[35px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-2 border-[#222] text-center relative">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-black mb-1 opacity-60">{t.pointsLabel}</p>
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFF7AD] to-[#D4AF37]">{points.toLocaleString()}</div>
                </div>
              </div>

              {/* Action Buttons (Dark Mode) */}
              <div className="grid grid-cols-1 gap-4 mt-6">
                {Object.keys(themes).map((id) => (
                  <button key={id} onClick={() => { setActiveActionId(id); setInputText(''); setIsModalOpen(true); }} className="p-5 rounded-[30px] border-2 transition-all flex items-center bg-[#1A1A1A] border-[#333] hover:border-[#D4AF37] group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mr-4 bg-black border border-[#333] text-[#D4AF37] shrink-0">
                      {React.createElement(themes[id].icon, { size: 24 })}
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="text-[15px] font-black text-white leading-none mb-1">{t[id].title}</h3>
                      <p className="text-[11px] text-gray-500 font-medium">{t[id].desc}</p>
                    </div>
                    <span className="text-[#000] font-black text-[10px] px-3 py-1.5 rounded-xl bg-[#D4AF37]">+{themes[id].pts}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation (Dark) */}
        <div className="h-[90px] bg-[#0A0A0A] border-t border-[#1A1A1A] flex justify-around items-center px-6 z-10">
          <button onClick={() => setCurrentView('history')} className={`flex flex-col items-center gap-1 transition-all ${currentView === 'history' ? 'text-[#D4AF37]' : 'text-gray-600'}`}>
            <FileText size={24} />
            <span className="text-[10px] font-black uppercase">Journal</span>
          </button>
          <button onClick={() => setCurrentView('home')} className="w-[70px] h-[70px] rounded-[25px] flex items-center justify-center shadow-[0_10px_25px_rgba(212,175,55,0.4)] -mt-12 border-[6px] border-[#0A0A0A] bg-gradient-to-b from-[#D4AF37] to-[#8A6D3B]">
            <Home className="text-black" size={28} />
          </button>
          <button onClick={() => { setCurrentView('profile'); setTempName(profile.name); }} className={`flex flex-col items-center gap-1 transition-all ${currentView === 'profile' ? 'text-[#D4AF37]' : 'text-gray-600'}`}>
            <User size={24} />
            <span className="text-[10px] font-black uppercase">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
