import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenProps, unlockSpeech } from './ScreensA';
import { SHIFTS, MAX_CAPACITY_PER_SHIFT, TABLES_PER_ROOM } from '../data';
import { Button, Card, Icon, PageContainer } from './UI';

// --- Shared Speech Synthesis Helper ---
const speakText = (text: string, pitch = 1.30, rate = 0.97) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.pitch = pitch;
    utterance.rate = rate;
    
    const voices = window.speechSynthesis.getVoices();
    const spanishVoices = voices.filter(v => v.lang.startsWith('es'));
    
    // Prefer Google, Sabina or any female voice
    let bestVoice = spanishVoices.find(v => v.name.toLowerCase().includes('google') && v.lang.includes('es'));
    if (!bestVoice) {
      bestVoice = spanishVoices.find(v => v.name.toLowerCase().includes('sabina'));
    }
    if (!bestVoice) {
      bestVoice = spanishVoices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('mujer') || v.name.toLowerCase().includes('zira'));
    }
    if (!bestVoice) {
      bestVoice = spanishVoices.find(v => !v.name.toLowerCase().includes('helena'));
    }
    if (!bestVoice && spanishVoices.length > 0) {
      bestVoice = spanishVoices[0];
    }

    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    window.speechSynthesis.speak(utterance);
  }
};

// Mock capacities to show realistic busy slots
const SHIFT_BUSYNESS: Record<string, { filled: number; status: string; color: string }> = {
  manana: { filled: 14, status: '¡Casi lleno!', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  mediodia: { filled: 7, status: '¡Mucho espacio!', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  tarde: { filled: 18, status: '¡Últimos cupos!', color: 'text-rose-600 bg-rose-50 border-rose-200' }
};

// 5. Shift Selection Screen
export function ShiftSelectionScreen({ onNavigate, reservation, setReservation, selectedRoomObj }: ScreenProps) {
  const [date, setDate] = useState(reservation.date || new Date().toISOString().split('T')[0]);
  const [hoveredShift, setHoveredShift] = useState<string | null>(null);

  useEffect(() => {
    // Saludo de voz al ingresar
    const timer = setTimeout(() => {
      speakText("¡Elige el día y tu turno favorito para jugar!");
    }, 400);
    return () => {
      clearTimeout(timer);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  const handleSelectShift = (shiftId: string) => {
    unlockSpeech();
    setReservation(prev => ({ ...prev, shiftId, date }));
    onNavigate('summary');
  };

  return (
    <PageContainer>
      <div className="mb-2">
        <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
          <Icon name="CalendarClock" className="text-amber-500" />
          Selección de Turno
        </h2>
        
        {/* Mascota Consejera en pequeño */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 p-4 rounded-3xl border-2 border-amber-100 flex items-center gap-4 mb-4">
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 shrink-0"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M 50 10 C 65 10, 75 20, 85 35 C 95 50, 90 65, 80 80 C 65 95, 35 95, 20 80 C 10 65, 5 50, 15 35 C 25 20, 35 10, 50 10 Z" fill="#FF7E47" />
              <circle cx="38" cy="48" r="10" fill="white" />
              <circle cx="38" cy="48" r="5" fill="#1E293B" />
              <circle cx="62" cy="48" r="10" fill="white" />
              <circle cx="62" cy="48" r="5" fill="#1E293B" />
              <path d="M 42 62 Q 50 68 58 60" fill="none" stroke="#991B1B" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </motion.div>
          <div>
            <h4 className="text-xs font-extrabold uppercase text-amber-700 tracking-wider">Consejo de Palabrito</h4>
            <p className="text-slate-700 text-sm font-bold">
              "¡Elige un turno para {selectedRoomObj?.name}! Nos divertiremos un montón."
            </p>
          </div>
        </div>
      </div>

      {/* Selector de Día */}
      <Card className="p-6 border-indigo-100 shadow-sm">
        <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
          <Icon name="Calendar" className="text-indigo-500" size={16} />
          ¿Qué día vendrás a jugar?
        </label>
        <input 
          type="date" 
          value={date}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-bold text-slate-800"
        />
      </Card>

      {/* Turnos con aforo animado */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-700 text-lg flex items-center gap-1.5">
          <Icon name="Clock" className="text-sky-500" size={18} />
          Turnos disponibles:
        </h3>
        
        {SHIFTS.map(shift => {
          const info = SHIFT_BUSYNESS[shift.id] || { filled: 10, status: 'Disponible', color: 'text-sky-600 bg-sky-50 border-sky-100' };
          const percentage = (info.filled / MAX_CAPACITY_PER_SHIFT) * 100;
          const isHovered = hoveredShift === shift.id;

          return (
            <motion.div
              key={shift.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredShift(shift.id)}
              onHoverEnd={() => setHoveredShift(null)}
              className="cursor-pointer"
              onClick={() => handleSelectShift(shift.id)}
            >
              <Card className={`p-5 border-2 transition-all relative overflow-hidden ${
                isHovered ? 'border-indigo-400 bg-indigo-50/20 shadow-md' : 'border-slate-100 bg-white'
              }`}>
                {/* Indicador de Status */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-lg">{shift.name}</h4>
                    <p className="text-slate-500 text-sm font-semibold flex items-center gap-1">
                      <Icon name="Clock" size={14} /> {shift.time}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${info.color}`}>
                    {info.status}
                  </span>
                </div>

                {/* Barra de progreso de Aforo animada */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-400">
                    <span>Ocupación de la sala</span>
                    <span>{info.filled} / {MAX_CAPACITY_PER_SHIFT} niños</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        percentage > 80 ? 'bg-gradient-to-r from-rose-400 to-red-500' :
                        percentage > 50 ? 'bg-gradient-to-r from-amber-400 to-orange-400' :
                        'bg-gradient-to-r from-emerald-400 to-sky-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Flecha interactiva */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="ChevronRight" className="text-indigo-500" />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={() => onNavigate('room-detail')}>Volver a la sala</Button>
      </div>
    </PageContainer>
  );
}

// 6. Reservation Summary Screen
export function SummaryScreen({ onNavigate, reservation, selectedRoomObj }: ScreenProps) {
  const shiftInfo = SHIFTS.find(s => s.id === reservation.shiftId);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loaderStep, setLoaderStep] = useState(0);

  useEffect(() => {
    if (isProcessing) {
      // Ciclo de mensajes divertidos para el cargador de Palabrito
      const textInterval = setInterval(() => {
        setLoaderStep(prev => (prev + 1) % 3);
      }, 700);

      // Finalizar procesamiento después de 2.2 segundos
      const timer = setTimeout(() => {
        setIsProcessing(false);
        onNavigate('confirmation');
      }, 2200);

      return () => {
        clearInterval(textInterval);
        clearTimeout(timer);
      };
    } else {
      // Saludo de voz interactivo al ingresar
      const timer = setTimeout(() => {
        speakText("¡Mira tu boleto de reserva! Todo está listo para confirmar.");
      }, 400);
      return () => {
        clearTimeout(timer);
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      };
    }
  }, [isProcessing]);

  const handleConfirm = () => {
    unlockSpeech();
    setIsProcessing(true);
  };

  const loaderTexts = [
    "¡Palabrito está preparando tu boleto mágico! 🪄",
    "¡Acomodando los juguetes didácticos en tu salita! 🧸",
    "¡Escribiendo tu nombre con crayolas brillantes! ✏️"
  ];

  if (isProcessing) {
    return (
      <PageContainer className="items-center justify-center text-center min-h-[70vh]">
        <div className="space-y-8 max-w-sm mx-auto">
          {/* Palabrito Cargando Animadamente */}
          <motion.div 
            animate={{ 
              y: [0, -20, 0, -15, 0],
              rotate: [0, -10, 10, -5, 0],
              scale: [1, 1.1, 0.95, 1.05, 1]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-32 h-32 mx-auto"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-lg">
              <path d="M 50 10 C 65 10, 75 20, 85 35 C 95 50, 90 65, 80 80 C 65 95, 35 95, 20 80 C 10 65, 5 50, 15 35 C 25 20, 35 10, 50 10 Z" fill="#FF7E47" />
              <path d="M 35 22 L 50 12 L 65 22 L 50 32 Z" fill="#4F46E5" />
              <rect x="48" y="22" width="4" height="8" fill="#FBBF24" />
              <circle cx="50" cy="31" r="3" fill="#FBBF24" />
              <circle cx="38" cy="48" r="10" fill="white" />
              <circle cx="38" cy="48" r="5" fill="#1E293B" />
              <circle cx="36" cy="46" r="2.5" fill="white" />
              <circle cx="62" cy="48" r="10" fill="white" />
              <circle cx="62" cy="48" r="5" fill="#1E293B" />
              <circle cx="60" cy="46" r="2.5" fill="white" />
              <ellipse cx="50" cy="62" rx="8" ry="10" fill="#991B1B" />
              <circle cx="28" cy="58" r="4" fill="#F87171" opacity="0.6" />
              <circle cx="72" cy="58" r="4" fill="#F87171" opacity="0.6" />
            </svg>
          </motion.div>

          {/* Anillo de Carga Resplandeciente */}
          <div className="relative w-16 h-16 mx-auto">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-indigo-100 border-t-indigo-500 rounded-full"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-800 animate-pulse">Procesando Magia...</h3>
            <AnimatePresence mode="wait">
              <motion.p 
                key={loaderStep}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-indigo-600 font-bold text-base h-12 flex items-center justify-center"
              >
                {loaderTexts[loaderStep]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <span className="p-2 bg-indigo-50 rounded-2xl text-indigo-500"><Icon name="Ticket" /></span>
          Resumen de Reserva
        </h2>
        <p className="text-slate-500 mt-1">¡Revisa tu Boleto Mágico de Entrada antes de confirmar!</p>
      </div>

      {/* Boleto Mágico ("Golden Ticket" style with side cuts and shimmer) */}
      <div className="relative overflow-visible">
        {/* Left Ticket Notch */}
        <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 border-r-2 border-indigo-100 z-10" />
        
        {/* Right Ticket Notch */}
        <div className="absolute right-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 border-l-2 border-indigo-100 z-10" />

        <Card className="flex flex-col border-2 border-indigo-150 shadow-lg relative overflow-hidden bg-white">
          {/* Golden Shiny Effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent -translate-x-full"
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          />

          {/* Encabezado del Boleto */}
          <div className={`${selectedRoomObj?.colors.bg} p-6 border-b-2 border-dashed ${selectedRoomObj?.colors.border} text-center relative`}>
            <div className={`inline-flex p-3 rounded-full bg-white shadow-sm mb-2 ${selectedRoomObj?.colors.text}`}>
              <Icon name={selectedRoomObj?.iconName || 'HelpCircle'} size={28} />
            </div>
            <h3 className={`text-2xl font-black tracking-tight ${selectedRoomObj?.colors.text}`}>
              BOLETO DE ENTRADA
            </h3>
            <p className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mt-1">Ciudadela de Palabras</p>
          </div>

          {/* Detalles del Boleto */}
          <div className="p-6 space-y-4 relative">
            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Explorador</span>
                <span className="text-base font-bold text-slate-800">{reservation.childData.childName}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Edad</span>
                <span className="text-base font-bold text-slate-800">{reservation.childData.childAge} años</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Sala de Actividades</span>
                <span className="text-base font-bold text-indigo-600">{selectedRoomObj?.name}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Fecha</span>
                <span className="text-base font-bold text-slate-800">{reservation.date}</span>
              </div>
            </div>

            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Turno y Horario</span>
              <span className="text-base font-bold text-slate-800 flex items-center gap-1.5">
                <Icon name="Clock" className="text-slate-400" size={16} />
                {shiftInfo?.name} ({shiftInfo?.time})
              </span>
            </div>

            {/* Código de barras simulado decorativo */}
            <div className="pt-2 flex flex-col items-center justify-center">
              <div className="flex justify-center items-center gap-0.5 opacity-30">
                <div className="w-1.5 h-8 bg-slate-900" />
                <div className="w-0.5 h-8 bg-slate-900" />
                <div className="w-2.5 h-8 bg-slate-900" />
                <div className="w-1 h-8 bg-slate-900" />
                <div className="w-0.5 h-8 bg-slate-900" />
                <div className="w-2 h-8 bg-slate-900" />
                <div className="w-1.5 h-8 bg-slate-900" />
                <div className="w-0.5 h-8 bg-slate-900" />
                <div className="w-2 h-8 bg-slate-900" />
                <div className="w-1 h-8 bg-slate-900" />
              </div>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 mt-1 uppercase">SIM-RESERVA-CIUDADELA</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-sky-50 outline-dashed outline-2 outline-sky-200 outline-offset-[-4px] p-4 rounded-2xl text-center">
        <p className="text-sky-800 text-sm font-semibold flex items-center justify-center gap-2">
          <Icon name="Info" size={18} className="text-sky-500" />
          Recomendación: Llegar 10 minutos antes de la hora programada para jugar.
        </p>
      </div>

      <div className="flex gap-4 pt-2 flex-col sm:flex-row">
        <Button variant="outline" onClick={() => onNavigate('shift-selection')} className="w-full">
          Modificar datos
        </Button>
        <Button variant="primary" onClick={handleConfirm} className="w-full flex-1">
          ¡Confirmar Boleto Mágico!
        </Button>
      </div>
    </PageContainer>
  );
}

// Simple dynamic falling particles for Confetti
interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotate: number;
}
function ConfettiExplosion() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const colors = ['#F472B6', '#60A5FA', '#34D399', '#FBBF24', '#A78BFA', '#F87171'];

  useEffect(() => {
    const list: Particle[] = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // porcentaje horizontal
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 8 + Math.random() * 12,
      rotate: Math.random() * 360
    }));
    setParticles(list);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -50, x: `${p.x}vw`, rotate: 0, opacity: 1 }}
          animate={{ y: '105vh', rotate: p.rotate + 360, opacity: 0.3 }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.id % 2 === 0 ? '50%' : '20%',
          }}
        />
      ))}
    </div>
  );
}

// 7. Confirmation Screen
export function ConfirmationScreen({ onNavigate, reservation, selectedRoomObj }: ScreenProps) {
  const [simCode] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());

  useEffect(() => {
    // Voz de celebración infantil al ingresar
    const timer = setTimeout(() => {
      speakText("¡Yupi! ¡Tu boleto mágico está confirmado! ¡Nos vemos muy pronto para jugar!");
    }, 400);
    return () => {
      clearTimeout(timer);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <PageContainer className="items-center text-center pt-6">
      {/* Lluvia de Confeti */}
      <ConfettiExplosion />

      {/* Icono de Check Animado Gigante */}
      <motion.div 
        initial={{ scale: 0, rotate: -45 }} 
        animate={{ scale: 1, rotate: 0 }} 
        transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
        className="bg-emerald-100 text-emerald-600 p-5 rounded-full mb-4 shadow-inner"
      >
        <Icon name="CheckCircle" size={72} />
      </motion.div>
      
      <h2 className="text-4xl font-black text-slate-800 mb-2">¡Reserva confirmada!</h2>
      <p className="text-base font-bold text-slate-500 mb-6 max-w-sm">
        Tu boleto mágico a **{selectedRoomObj?.name}** ha sido registrado con éxito.
      </p>

      {/* Golden Ticket Final Integrado */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', bounce: 0.3 }}
        className="relative w-full max-w-sm mx-auto mb-8 overflow-visible"
      >
        {/* Left ticket cut */}
        <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 z-10 shadow-inner" />
        {/* Right ticket cut */}
        <div className="absolute right-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 z-10 shadow-inner" />

        <Card className="px-6 py-8 border-none bg-gradient-to-br from-amber-400 via-orange-500 to-amber-500 text-white shadow-xl shadow-orange-200/50 relative overflow-hidden">
          {/* Shimmer Glare */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          />

          <span className="text-[10px] uppercase font-black tracking-widest bg-white/20 px-3 py-1 rounded-full inline-block mb-3">
            Boleto Dorado de Juego
          </span>

          <p className="text-xs uppercase font-extrabold tracking-wider mb-1 opacity-90">Código Único de Entrada</p>
          <p className="text-5xl font-black tracking-widest drop-shadow-md select-all">{simCode}</p>
          
          <div className="border-t border-white/20 my-4 pt-3 flex justify-between text-xs font-bold opacity-90">
            <span>Explorador: {reservation.childData.childName}</span>
            <span>Sala: {selectedRoomObj?.name.replace("Sala ", "")}</span>
          </div>

          <p className="text-xs font-bold opacity-80 flex items-center justify-center gap-1.5">
            <Icon name="Ticket" size={14} /> ¡Presenta este código al ingresar a la ciudadela!
          </p>
        </Card>
      </motion.div>

      {/* Palabrito Celebrando */}
      <Card className="p-4 border-amber-200 bg-amber-50/50 flex items-center gap-4 w-full max-w-sm mb-6 shadow-sm">
        <motion.div 
          animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-16 h-16 shrink-0"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 50 10 C 65 10, 75 20, 85 35 C 95 50, 90 65, 80 80 C 65 95, 35 95, 20 80 C 10 65, 5 50, 15 35 C 25 20, 35 10, 50 10 Z" fill="#FF7E47" />
            {/* Gorrito de fiesta */}
            <path d="M 35 22 L 50 2 L 65 22 Z" fill="#F472B6" />
            <circle cx="50" cy="2" r="4" fill="#FBBF24" />
            
            <circle cx="38" cy="48" r="10" fill="white" />
            <circle cx="38" cy="48" r="5" fill="#1E293B" />
            <circle cx="62" cy="48" r="10" fill="white" />
            <circle cx="62" cy="48" r="5" fill="#1E293B" />
            <ellipse cx="50" cy="62" rx="8" ry="10" fill="#991B1B" />
            <circle cx="28" cy="58" r="4" fill="#F87171" opacity="0.6" />
            <circle cx="72" cy="58" r="4" fill="#F87171" opacity="0.6" />
          </svg>
        </motion.div>
        <div className="text-left">
          <h4 className="text-xs font-extrabold uppercase text-amber-700 tracking-wider">Palabrito Celebrando</h4>
          <p className="text-slate-700 text-sm font-extrabold">
            "¡Súper! ¡Nos vemos muy pronto en la ludoteca para aprender jugando!"
          </p>
        </div>
      </Card>

      <div className="flex gap-3 flex-col w-full">
        <Button 
          variant="secondary" 
          onClick={() => {
            unlockSpeech();
            onNavigate('recommendations');
          }} 
          className="w-full py-4 text-lg"
        >
          Ver recomendaciones <Icon name="BookOpen" size={20}/>
        </Button>
        <Button variant="ghost" onClick={() => onNavigate('welcome')} className="w-full text-slate-500 hover:text-slate-700 font-bold">
          Volver al inicio
        </Button>
      </div>
    </PageContainer>
  );
}

// 8. Recommendations Screen
export function RecommendationsScreen({ onNavigate, setReservation }: ScreenProps) {
  useEffect(() => {
    // Saludo de voz interactivo al ingresar
    const timer = setTimeout(() => {
      speakText("Aquí tienes unas lindas recomendaciones para papá y mamá. ¡Te esperamos!");
    }, 400);
    return () => {
      clearTimeout(timer);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <PageContainer>
      <div className="mb-4 flex flex-col items-center text-center">
        <div className="p-4 bg-yellow-100 text-yellow-600 rounded-full mb-3 shadow-inner">
          <Icon name="Lightbulb" size={44} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-1">Recomendaciones para Padres</h2>
        <p className="text-slate-600 font-medium">¡Para aprovechar al máximo esta gran aventura lúdica!</p>
      </div>

      <div className="space-y-4 mb-6">
        {[
          { icon: 'HeartHandshake', text: 'Acompañar al niño durante el ingreso a la sala para darle total seguridad.' },
          { icon: 'Smile', text: 'Motivar al niño a hablar, pedir, responder y expresar emociones durante el juego.' },
          { icon: 'Ear', text: 'Escuchar con paciencia y evitar corregir de manera brusca su pronunciación.' },
          { icon: 'PartyPopper', text: 'Celebrar y aplaudir con alegría todos sus intentos de comunicación y logros.' },
          { icon: 'Shirt', text: 'Llevar ropa súper cómoda para correr, saltar y jugar libremente.' }
        ].map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -15 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
          >
            <Card className="p-4 flex gap-4 items-center border-l-4 border-l-yellow-400 hover:shadow-sm transition-all bg-white">
              <div className="p-2.5 bg-yellow-50 text-yellow-600 rounded-xl shrink-0">
                <Icon name={item.icon} />
              </div>
              <p className="font-bold text-slate-700 text-sm leading-relaxed">{item.text}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Button variant="primary" onClick={() => {
        // Reset reservation data to start over eventually
        setReservation({
          childData: { childName: '', childAge: '', parentName: '', contactNumber: '' },
          roomId: null,
          shiftId: null,
          date: ''
        });
        onNavigate('welcome');
      }} className="w-full py-4 text-xl shadow-lg">
        ¡Finalizar Aventura!
      </Button>
    </PageContainer>
  );
}
