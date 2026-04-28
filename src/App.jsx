import React, { useState, useEffect } from 'react';
import { Sun, Heart, RefreshCw, Globe, Star, X, FileText, Home, Send, BookOpen, Zap, User, UserCircle, CheckCircle, TrendingUp } from 'lucide-react';

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
  const [evolutionStage, setEvolutionStage] = useState('koi');
  const [currentView, setCurrentView] = useState('home'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeActionId, setActiveActionId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [tempName, setTempName] = useState(profile.name);

  useEffect(() => {
    localStorage.setItem('wealth_alchemy_points', points.toString());
    localStorage.setItem('wealth_alchemy_logs', JSON.stringify(logs));
    localStorage.setItem('wealth_profile', JSON.stringify(profile));
    
    if (points <= 50) setEvolutionStage('koi');
    else if (points <= 150) setEvolutionStage('pixiu');
    else setEvolutionStage('dragon');
  }, [points, logs, profile]);

  const content = {
    TH: {
      title: "Wealth Alchemy",
      pointsLabel: "แต้มสะสมความมั่งคั่ง",
      energyLabel: "ระดับพลังงานมั่งคั่ง",
      level: ["ปลาคาร์ฟน้อย", "ปี่เซียะดูดทรัพย์", "มังกรทองสวรรค์"],
      ras: { title: "ตั้งเป้าหมาย (RAS)", desc: "วันนี้มองเห็นโอกาสอะไร?", placeholder: "พิมพ์เป้าหมายในวันนี้..." },
      gratitude: { title: "ขอบคุณ (Gratitude)", desc: "บันทึกสิ่งดีๆ ที่ได้รับ", placeholder: "พิมพ์สิ่งที่คุณรู้สึกขอบคุณ..." },
      flow: { title: "สายน้ำการเงิน", desc: "ขอบคุณเงินที่รับมาและจ่ายออก", placeholder: "พิมพ์ขอบคุณเงินที่เข้ามาหรือจ่ายไป..." },
      manifest: { title: "จักรวาลขานรับ", desc: "ปาฏิหาริย์ที่คิดปุ๊บได้ปั๊บ!", placeholder: "พิมพ์เรื่องมหัศจรรย์ที่เกิดขึ้นกับคุณ..." },
      historyTitle: "สมุดบันทึกความมั่งคั่ง",
      profileTitle: "โปรไฟล์ของฉัน",
      saveBtn: "บันทึกและชาร์จพลัง",
      saveProfile: "บันทึกข้อมูล"
    },
    EN: {
      title: "Wealth Alchemy",
      pointsLabel: "Wealth Points",
      energyLabel: "Wealth Energy Level",
      level: ["Lucky Koi", "Wealth Pixiu", "Golden Dragon"],
      ras: { title: "Set Focus (RAS)", desc: "Spot opportunities today", placeholder: "What opportunity are you looking for?" },
      gratitude: { title: "Gratitude", desc: "Record your blessings", placeholder: "What are you grateful for?" },
      flow: { title: "Money Flow", desc: "Bless money coming in & out", placeholder: "Bless the money coming in or out..." },
      manifest: { title: "Universe Echo", desc: "Instant manifestation!", placeholder: "Write down the magical coincidences..." },
      historyTitle: "Wealth Journal",
      profileTitle: "My Profile",
      saveBtn: "Save & Charge Energy",
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
    setTimeout(() => setIsFlashing(false), 1000);
  };

  const energyPercent = Math.min((points / 200) * 100, 100);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-2 font-sans">
      <div className="w-full max-w-[375px] h-[780px] bg-[#FDFCF9] rounded-[45px] shadow-2xl overflow-hidden border-[8px] border-white relative flex flex-col">
        
        {isFlashing && (
          <div className="absolute inset-0 bg-yellow-400/30 z-[100] flex items-center justify-center animate-pulse backdrop-blur-[2px]">
             <div className="flex flex-col items-center animate-bounce">
                <Zap className="text-white w-20 h-20 fill-yellow-400" />
                <span className="text-white font-black text-3xl drop-shadow-lg">CHARGED!</span>
             </div>
          </div>
        )}

        {isModalOpen && activeActionId && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-md flex items-end justify-center p-4">
            <div className="bg-white w-full rounded-[35px] p-7 shadow-2xl mb-4 border-t-8" style={{ borderColor: themes[activeActionId].bg }}>
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl" style={{ backgroundColor: themes[activeActionId].light, color: themes[activeActionId].text }}>
                    {React.createElement(themes[activeActionId].icon, { size: 28 })}
                  </div>
                  <h3 className="font-bold text-xl text-gray-800">{t[activeActionId].title}</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="bg-gray-100 p-2 rounded-full text-gray-500"><X size={20} /></button>
              </div>
              <textarea autoFocus className="w-full p-5 rounded-[25px] border-2 bg-gray-50 focus:outline-none min-h-[140px] text-base mb-5" style={{ borderColor: themes[activeActionId].border }} placeholder={t[activeActionId].placeholder} value={inputText} onChange={(e) => setInputText(e.target.value)} />
              <button onClick={handleSaveAction} disabled={!inputText.trim()} className="w-full py-5 rounded-[25px] flex items-center justify-center gap-3 text-white text-lg font-black shadow-xl active:scale-95 transition-all" style={{ backgroundColor: inputText.trim() ? themes[activeActionId].bg : '#D1D5DB' }}>
                <Zap size={22} className="fill-current" /> {t.saveBtn}
              </button>
            </div>
          </div>
        )}

        <div className="p-7 pb-4 flex justify-between items-start bg-white/40">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-2xl bg-[#A72517] flex items-center justify-center text-white shadow-lg shadow-red-200">
                <TrendingUp size={24} />
             </div>
             <div>
                <h1 className="text-[#A72517] font-black text-xl leading-none">{t.title}</h1>
                <p className="text-[11px] text-gray-400 font-bold uppercase mt-1 flex items-center gap-1">
                  <UserCircle size={12} className="text-red-400" /> {profile.name}
                </p>
             </div>
          </div>
          <button onClick={() => setLang(lang === 'TH' ? 'EN' : 'TH')} className="bg-white shadow-md px-4 py-1.5 rounded-full text-xs font-black text-gray-500 border border-gray-50 tracking-widest uppercase"> {lang} </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24">
          {currentView === 'home' && (
            <div className="flex flex-col">
              <div className="relative flex flex-col items-center justify-center py-6 mt-2">
                <div className={`absolute -z-10 rounded-full blur-[60px] animate-pulse transition-all duration-1000 ${evolutionStage === 'dragon' ? 'w-72 h-72 bg-yellow-300 opacity-60' : 'w-56 h-56 bg-orange-200 opacity-40'}`} />
                <div className="text-[6.5rem] mb-4 drop-shadow-2xl animate-bounce" style={{ animationDuration: '3s' }}>
                  {evolutionStage === 'koi' ? '🐠' : evolutionStage === 'pixiu' ? '🦁' : '🐉'}
                </div>

                <div className="w-full max-w-[240px] mb-6">
                   <div className="flex justify-between items-end mb-1.5 px-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.energyLabel}</span>
                      <span className="text-[12px] font-black text-[#D4AF37]">{Math.floor(energyPercent)}%</span>
                   </div>
                   <div className="h-4 w-full bg-gray-100 rounded-full p-1 border border-gray-50 shadow-inner overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 shadow-[0_0_15px_rgba(251,191,36,0.5)] transition-all duration-1000" style={{ width: `${energyPercent}%` }} />
                   </div>
                </div>

                <div className="bg-white/95 backdrop-blur px-10 py-3 rounded-[35px] shadow-xl border-2 border-yellow-100 text-center relative overflow-hidden group">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-1">{t.pointsLabel}</p>
                  <div className="text-5xl font-black text-[#D4AF37] drop-shadow-sm">{points.toLocaleString()}</div>
                </div>
                
                <div className="mt-4 bg-gradient-to-r from-[#A72517] to-[#80180F] text-white px-7 py-2 rounded-full text-xs font-black shadow-xl tracking-wide uppercase">
                  {points <= 50 ? t.level[0] : points <= 150 ? t.level[1] : t.level[2]}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-4">
                {Object.keys(themes).map((id) => (
                  <button key={id} onClick={() => { setActiveActionId(id); setInputText(''); setIsModalOpen(true); }} className="p-4 rounded-[30px] border-b-[5px] active:translate-y-1 active:border-b-0 transition-all flex items-center bg-white shadow-sm hover:shadow-md overflow-hidden" style={{ borderColor: themes[id].border, backgroundColor: themes[id].light }}>
                    {/* แก้ไขส่วนไอคอนตรงนี้ให้ไม่หลุดตำแหน่ง */}
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md mr-4 bg-white shrink-0 relative overflow-hidden" style={{ color: themes[id].text }}>
                      {React.createElement(themes[id].icon, { size: 30, className: 'opacity-10 absolute' })}
                      {React.createElement(themes[id].icon, { size: 28, className: 'relative z-10' })}
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="text-[15px] font-black text-gray-800 leading-none mb-1">{t[id].title}</h3>
                      <p className="text-[11px] text-gray-500 font-medium leading-tight">{t[id].desc}</p>
                    </div>
                    <div className="flex flex-col items-end">
                       <span className="text-white font-black text-[10px] px-3 py-1.5 rounded-xl shadow-lg" style={{ backgroundColor: themes[id].bg }}>+{themes[id].pts}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentView === 'history' && (
            <div className="py-4">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-red-100 rounded-2xl flex items-center justify-center text-[#A72517]">
                    <BookOpen size={20} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-800">{t.historyTitle}</h2>
               </div>
               <div className="flex flex-col gap-4">
                {logs.length > 0 ? logs.map((log) => (
                  <div key={log.id} className="p-5 rounded-[30px] bg-white border-2 shadow-sm relative overflow-hidden group" style={{ borderColor: themes[log.actionId].border }}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl" style={{ backgroundColor: themes[log.actionId].light, color: themes[log.actionId].text }}>{React.createElement(themes[log.actionId].icon, { size: 16 })}</div>
                        <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest">{t[log.actionId].title}</span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-300">{log.date}</span>
                    </div>
                    <p className="text-[14px] text-gray-700 font-bold leading-relaxed">{log.text}</p>
                  </div>
                )) : (
                  <div className="text-center py-24">
                     <div className="text-6xl mb-4 opacity-20">📖</div>
                     <p className="text-gray-400 font-black tracking-widest text-sm uppercase">ยังไม่มีพลังงานถูกบันทึก...</p>
                  </div>
                )}
               </div>
            </div>
          )}

          {currentView === 'profile' && (
            <div className="py-4">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-red-100 rounded-2xl flex items-center justify-center text-[#A72517]">
                    <User size={20} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-800">{t.profileTitle}</h2>
               </div>
               <div className="bg-white rounded-[40px] p-10 shadow-xl border-2 border-gray-50 flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-gradient-to-b from-red-50 to-white rounded-full flex items-center justify-center text-6xl mb-6 border-8 border-white shadow-2xl relative overflow-hidden">
                   {evolutionStage === 'koi' ? '🐠' : evolutionStage === 'pixiu' ? '🦁' : '🐉'}
                </div>
                <h3 className="text-2xl font-black text-gray-800 mb-1">{profile.name}</h3>
                <p className="text-[#A72517] font-black uppercase tracking-[0.3em] text-xs mb-8">
                   {points <= 50 ? t.level[0] : points <= 150 ? t.level[1] : t.level[2]}
                </p>
                <div className="w-full text-left bg-gray-50 p-6 rounded-[30px]">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">{t.editProfile}</label>
                  <input type="text" className="w-full p-4 mt-2 rounded-2xl bg-white border-2 border-gray-100 focus:border-red-400 focus:outline-none font-black text-gray-700 text-center" value={tempName} onChange={(e) => setTempName(e.target.value)} maxLength={20} />
                  <button onClick={() => { setProfile({ ...profile, name: tempName }); setCurrentView('home'); }} className="w-full py-5 mt-5 bg-gradient-to-r from-[#A72517] to-[#80180F] text-white rounded-[25px] font-black shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                    <CheckCircle size={20} /> {t.saveProfile}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-[90px] bg-white border-t-2 border-gray-50 flex justify-around items-center px-6 z-10">
          <button onClick={() => setCurrentView('history')} className={`flex flex-col items-center gap-1 transition-all ${currentView === 'history' ? 'text-[#A72517] scale-110' : 'text-gray-300'}`}>
            <FileText size={24} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Journal</span>
          </button>
          <button onClick={() => setCurrentView('home')} className="w-[70px] h-[70px] rounded-[25px] flex items-center justify-center shadow-2xl -mt-12 border-[6px] border-[#FDFCF9] active:scale-90 transition-all" style={{ background: 'linear-gradient(180deg, #A72517 0%, #80180F 100%)' }}>
            <Home className="text-white" size={28} />
          </button>
          <button onClick={() => { setCurrentView('profile'); setTempName(profile.name); }} className={`flex flex-col items-center gap-1 transition-all ${currentView === 'profile' ? 'text-[#A72517] scale-110' : 'text-gray-300'}`}>
            <User size={24} />
            <span className="text-[10px] font-black uppercase tracking-tighter">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
