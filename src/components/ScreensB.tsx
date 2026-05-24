import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ScreenProps } from './ScreensA';
import { SHIFTS, MAX_CAPACITY_PER_SHIFT, TABLES_PER_ROOM } from '../data';
import { Button, Card, Icon, PageContainer } from './UI';

// 5. Shift Selection Screen
export function ShiftSelectionScreen({ onNavigate, reservation, setReservation, selectedRoomObj }: ScreenProps) {
  const [date, setDate] = useState(reservation.date || new Date().toISOString().split('T')[0]);

  const handleSelectShift = (shiftId: string) => {
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
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex flex-col gap-2">
          <p className="text-amber-800 text-sm font-medium flex items-center gap-2">
            <Icon name="Users" size={16} /> Aforo máximo: {MAX_CAPACITY_PER_SHIFT} niños por turno.
          </p>
          <p className="text-amber-800 text-sm font-medium flex items-center gap-2">
            <Icon name="Table" size={16} /> Cada sala cuenta con {TABLES_PER_ROOM} mesas de juego.
          </p>
        </div>
      </div>

      <Card className="p-6 mb-6">
        <label className="block text-sm font-bold text-slate-700 mb-2">Selecciona el día</label>
        <input 
          type="date" 
          value={date}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium"
        />
      </Card>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-700">Selecciona un turno para {selectedRoomObj?.name}</h3>
        {SHIFTS.map(shift => (
          <Card 
            key={shift.id} 
            onClick={() => handleSelectShift(shift.id)}
            className="p-5 flex items-center justify-between border-2 border-transparent hover:border-sky-300 transition-colors bg-white hover:bg-sky-50"
          >
            <div>
              <h4 className="font-bold text-slate-800 text-lg">{shift.name}</h4>
              <p className="text-slate-500">{shift.time}</p>
            </div>
            <Icon name="ChevronRight" className="text-sky-400" />
          </Card>
        ))}
      </div>

      <div className="pt-4">
        <Button variant="outline" onClick={() => onNavigate('room-detail')}>Volver a la sala</Button>
      </div>
    </PageContainer>
  );
}

// 6. Reservation Summary Screen
export function SummaryScreen({ onNavigate, reservation, selectedRoomObj }: ScreenProps) {
  const shiftInfo = SHIFTS.find(s => s.id === reservation.shiftId);

  return (
    <PageContainer>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <span className="p-2 bg-indigo-50 rounded-lg text-indigo-500"><Icon name="Ticket" /></span>
          Resumen de Reserva
        </h2>
      </div>

      <Card className="h-full flex flex-col border-indigo-100">
        <div className="p-6 flex-1 space-y-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <div className="flex justify-between mb-3 border-b border-slate-200/50 pb-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Niño</span>
              <span className="text-sm font-bold text-slate-800">{reservation.childData.childName} ({reservation.childData.childAge} años)</span>
            </div>
            <div className="flex justify-between mb-3 border-b border-slate-200/50 pb-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sala</span>
              <span className="text-sm font-bold text-indigo-600">{selectedRoomObj?.name}</span>
            </div>
            <div className="flex justify-between mb-3 border-b border-slate-200/50 pb-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Fecha</span>
              <span className="text-sm font-bold text-slate-800">{reservation.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Turno</span>
              <span className="text-sm font-bold text-slate-800">{shiftInfo?.name} ({shiftInfo?.time})</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="bg-sky-50 outline-dashed outline-2 outline-sky-200 outline-offset-[-4px] p-4 rounded-xl text-center">
        <p className="text-sky-800 font-medium flex items-center justify-center gap-2">
          <Icon name="Info" size={18} />
          Recomendación: Llegar 10 minutos antes de la hora programada.
        </p>
      </div>

      <div className="flex gap-4 pt-4 flex-col sm:flex-row">
        <Button variant="outline" onClick={() => onNavigate('shift-selection')} className="w-full">
          Modificar datos
        </Button>
        <Button variant="primary" onClick={() => onNavigate('confirmation')} className="w-full">
          Confirmar reserva
        </Button>
      </div>
    </PageContainer>
  );
}

// 7. Confirmation Screen
export function ConfirmationScreen({ onNavigate }: ScreenProps) {
  const simCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  return (
    <PageContainer className="items-center text-center pt-10">
      <motion.div 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        transition={{ type: 'spring', bounce: 0.6 }}
        className="bg-emerald-100 text-emerald-600 p-6 rounded-full mb-6"
      >
        <Icon name="CheckCircle" size={80} />
      </motion.div>
      
      <h2 className="text-4xl font-bold text-slate-800 mb-4">¡Reserva confirmada!</h2>
      <p className="text-xl text-slate-600 mb-8 max-w-sm">
        Tu visita a Ciudadela de Palabras ha sido registrada correctamente.
      </p>

      <Card className="px-6 py-8 mb-8 w-full border-none bg-emerald-500 text-white shadow-xl shadow-emerald-200">
        <p className="text-xs uppercase font-bold tracking-wider mb-2 opacity-90">Código de Reserva</p>
        <p className="text-4xl font-black tracking-widest drop-shadow-sm">{simCode}</p>
        <p className="text-sm mt-3 opacity-90">¡Listo para aprender jugando!</p>
      </Card>

      <div className="flex gap-4 flex-col w-full">
        <Button variant="secondary" onClick={() => onNavigate('recommendations')} className="w-full py-4 text-lg">
          Ver recomendaciones <Icon name="BookOpen" size={20}/>
        </Button>
        <Button variant="ghost" onClick={() => onNavigate('welcome')} className="w-full text-slate-500 hover:text-slate-700">
          Volver al inicio
        </Button>
      </div>
    </PageContainer>
  );
}

// 8. Recommendations
export function RecommendationsScreen({ onNavigate, setReservation }: ScreenProps) {
  return (
    <PageContainer>
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="p-4 bg-yellow-100 text-yellow-600 rounded-full mb-4">
          <Icon name="Lightbulb" size={48} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Recomendaciones para Padres</h2>
        <p className="text-slate-600">Para aprovechar al máximo la experiencia lúdica</p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { icon: 'HeartHandshake', text: 'Acompañar al niño durante el ingreso a la sala para darle seguridad.' },
          { icon: 'Smile', text: 'Motivar al niño a hablar, pedir, responder y expresar emociones durante el juego.' },
          { icon: 'Ear', text: 'Escuchar pacientemente y evitar corregir de manera brusca su pronunciación.' },
          { icon: 'PartyPopper', text: 'Felicitar sus intentos de comunicación y logros.' },
          { icon: 'Shirt', text: 'Llevar ropa cómoda para jugar libremente.' }
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="p-4 flex gap-4 items-center border-l-4 border-l-yellow-400">
              <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg shrink-0">
                <Icon name={item.icon} />
              </div>
              <p className="font-medium text-slate-700">{item.text}</p>
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
      }} className="w-full py-4 text-xl">
        Finalizar
      </Button>
    </PageContainer>
  );
}
