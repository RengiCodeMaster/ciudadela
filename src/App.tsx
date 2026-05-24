import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScreenState, ReservationData, Room } from './types';
import { ROOMS } from './data';
import { WelcomeScreen, RegistrationScreen, RoomSelectionScreen, RoomDetailScreen } from './components/ScreensA';
import { ShiftSelectionScreen, SummaryScreen, ConfirmationScreen, RecommendationsScreen } from './components/ScreensB';
import { AboutScreen, DesignThinkingScreen } from './components/ExtraScreens';
import { Icon } from './components/UI';

const initialState: ReservationData = {
  childData: { childName: '', childAge: '', parentName: '', contactNumber: '' },
  roomId: null,
  shiftId: null,
  date: ''
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('welcome');
  const [reservation, setReservation] = useState<ReservationData>(initialState);

  React.useEffect(() => {
    // Pre-trigger voice loading for modern mobile browsers
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }

    const unlock = () => {
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(' ');
        u.volume = 0;
        window.speechSynthesis.speak(u);
      }
      // Remove listeners once unlocked
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
    };

    window.addEventListener('click', unlock);
    window.addEventListener('touchstart', unlock);
    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
    };
  }, []);

  const selectedRoomObj = ROOMS.find(r => r.id === reservation.roomId);

  const screenProps = {
    onNavigate: setCurrentScreen,
    reservation,
    setReservation,
    selectedRoomObj
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome': return <WelcomeScreen key="welcome" {...screenProps} />;
      case 'registration': return <RegistrationScreen key="registration" {...screenProps} />;
      case 'room-selection': return <RoomSelectionScreen key="room-select" {...screenProps} />;
      case 'room-detail': return <RoomDetailScreen key="room-detail" {...screenProps} />;
      case 'shift-selection': return <ShiftSelectionScreen key="shift-select" {...screenProps} />;
      case 'summary': return <SummaryScreen key="summary" {...screenProps} />;
      case 'confirmation': return <ConfirmationScreen key="confirmation" {...screenProps} />;
      case 'recommendations': return <RecommendationsScreen key="recommendations" {...screenProps} />;
      case 'about': return <AboutScreen key="about" {...screenProps} />;
      case 'design-thinking': return <DesignThinkingScreen key="dt" {...screenProps} />;
      default: return <WelcomeScreen key="default" {...screenProps} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 flex flex-col pt-24 sm:pt-28 bg-transparent">
      {/* Top Header */}
      <header className="fixed top-0 inset-x-0 bg-gradient-to-br from-emerald-400 to-sky-400 p-4 sm:px-8 text-white rounded-b-[40px] shadow-lg z-50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div 
          className="flex items-center gap-2 cursor-pointer group self-center sm:self-auto w-full sm:w-auto justify-between sm:justify-start"
          onClick={() => setCurrentScreen('welcome')}
        >
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-2xl tracking-tight">CiudadelaApp</h1>
            <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors w-10 h-10 flex items-center justify-center">
              <Icon name="User" size={20} />
            </div>
          </div>
        </div>
        
        <nav className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
          <button 
            onClick={() => setCurrentScreen('about')}
            className={`text-[10px] sm:text-sm font-bold uppercase tracking-wider px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${currentScreen === 'about' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'}`}
          >
            <Icon name="Info" size={16} /> <span>Proyecto</span>
          </button>
          <button 
            onClick={() => setCurrentScreen('design-thinking')}
            className={`text-[10px] sm:text-sm font-bold uppercase tracking-wider px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${currentScreen === 'design-thinking' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'}`}
          >
            <Icon name="BrainCircuit" size={16} /> <span>Design Thinking</span>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative w-full h-full">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </main>
    </div>
  );
}

