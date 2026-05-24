import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChildData, ReservationData, Room, ScreenState } from '../types';
import { ROOMS, SHIFTS, MAX_CAPACITY_PER_SHIFT, TABLES_PER_ROOM } from '../data';
import { Button, Card, Icon, PageContainer } from './UI';

// --- Screens Props ---
export interface ScreenProps {
  onNavigate: (screen: ScreenState) => void;
  reservation: ReservationData;
  setReservation: React.Dispatch<React.SetStateAction<ReservationData>>;
  selectedRoomObj: Room | undefined;
}

// 1. Welcome Screen
export function WelcomeScreen({ onNavigate }: ScreenProps) {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 max-w-lg mx-auto">
      <div className="mb-6 inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
        Prototipo Académico (Simulación Figma)
      </div>
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ type: 'spring', bounce: 0.5 }}
        className="w-full max-w-sm rounded-[2.5rem] shadow-xl shadow-sky-100/50 mb-8 overflow-hidden border-4 border-white"
      >
        <img src="https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&w=800&q=80" alt="Niños jugando" referrerPolicy="no-referrer" className="w-full h-48 object-cover" />
      </motion.div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4 tracking-tight drop-shadow-sm font-sans">
        Ciudadela de Palabras
      </h1>
      <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
        Una ludoteca para aprender a comunicarnos jugando.
      </p>
      <Button variant="primary" onClick={() => onNavigate('registration')} className="w-full sm:w-auto px-12 py-4 text-xl">
        Iniciar
      </Button>
    </div>
  );
}

// 2. Child Registration Screen
export function RegistrationScreen({ onNavigate, reservation, setReservation }: ScreenProps) {
  const [data, setData] = useState<ChildData>(reservation.childData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.childName && data.childAge && data.parentName) {
      setReservation(prev => ({ ...prev, childData: data }));
      onNavigate('room-selection');
    }
  };

  return (
    <PageContainer>
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
          <Icon name="UserCircle" className="text-sky-500" />
          Registro del Niño
        </h2>
        <p className="text-slate-600 bg-sky-50 p-4 rounded-xl text-sm border border-sky-100">
          Estos datos nos ayudan a organizar la experiencia educativa del niño según su edad y necesidades comunicativas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Nombre del niño o niña</label>
            <input 
              required type="text" 
              className="w-full px-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium"
              placeholder="Ej. Mateo"
              value={data.childName}
              onChange={e => setData({...data, childName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Edad (menor a 6 años)</label>
            <select 
              required
              className="w-full px-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all bg-white font-medium"
              value={data.childAge}
              onChange={e => setData({...data, childAge: e.target.value})}
            >
              <option value="" disabled>Selecciona la edad</option>
              <option value="2">2 años</option>
              <option value="3">3 años</option>
              <option value="4">4 años</option>
              <option value="5">5 años</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Nombre del padre, madre o apoderado</label>
            <input 
              required type="text" 
              className="w-full px-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium"
              placeholder="Nombre del adulto"
              value={data.parentName}
              onChange={e => setData({...data, parentName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Número de contacto</label>
            <input 
              required type="tel" 
              className="w-full px-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium"
              placeholder="+51..."
              value={data.contactNumber}
              onChange={e => setData({...data, contactNumber: e.target.value})}
            />
          </div>
        </Card>
        <div className="flex gap-4 pt-4">
          <Button variant="outline" onClick={() => onNavigate('welcome')} className="w-full sm:w-auto">Volver</Button>
          <Button variant="primary" type="submit" className="w-full sm:w-auto flex-1">Registrar niño</Button>
        </div>
      </form>
    </PageContainer>
  );
}

// 3. Room Selection Screen
export function RoomSelectionScreen({ onNavigate, setReservation }: ScreenProps) {
  const handleSelect = (id: string) => {
    setReservation(prev => ({ ...prev, roomId: id }));
    onNavigate('room-detail');
  };

  return (
    <PageContainer>
      <div className="mb-2">
        <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
          <Icon name="Map" className="text-emerald-500" />
          Seleccionar sala
        </h2>
        <p className="text-slate-600">Explora las 5 salas temáticas diseñadas para potenciar el lenguaje.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ROOMS.map(room => (
          <motion.div key={room.id} layoutId={`room-card-${room.id}`}>
            <Card 
              className={`flex flex-col h-full border-2 hover:shadow-md transition-all ${room.colors.bg} ${room.colors.border}`}
            >
              <div className="h-32 w-full relative">
                <img src={room.imageUrl} alt={room.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                 <div className={`absolute inset-0 opacity-20 ${room.colors.bg}`}></div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`p-3 rounded-full bg-white bg-opacity-70 ${room.colors.text}`}>
                    <Icon name={room.iconName} size={28} />
                  </div>
                  <h3 className={`text-xl font-bold ${room.colors.text}`}>{room.name}</h3>
                </div>
                <p className="text-slate-700 mb-6 flex-1 text-sm font-medium">{room.shortDescription}</p>
                <Button variant="primary" onClick={() => handleSelect(room.id)} className="w-full bg-white !text-slate-800 shadow-sm hover:bg-slate-50 border border-slate-200">
                  Ver actividades <Icon name="ArrowRight" size={18} />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="pt-4">
        <Button variant="outline" onClick={() => onNavigate('registration')}>Volver a Registro</Button>
      </div>
    </PageContainer>
  );
}

// 4. Room Detail Screen
export function RoomDetailScreen({ onNavigate, selectedRoomObj }: ScreenProps) {
  if (!selectedRoomObj) return null;
  const room = selectedRoomObj;

  return (
    <PageContainer>
      <motion.div layoutId={`room-card-${room.id}`}>
        <Card className={`overflow-hidden border-2 animate-in fade-in zoom-in duration-300 ${room.colors.border}`}>
          <div className="relative h-48 w-full">
            <img src={room.imageUrl} alt={room.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            <div className={`absolute inset-0 opacity-20 ${room.colors.bg}`}></div>
          </div>
          <div className={`${room.colors.bg} p-4 text-center relative flex justify-center items-center gap-4`}>
            <div className={`inline-flex p-3 rounded-full bg-white shadow-sm ${room.colors.text}`}>
              <Icon name={room.iconName} size={32} />
            </div>
            <h2 className={`text-2xl font-bold ${room.colors.text}`}>{room.name}</h2>
          </div>
          
          <div className="p-6 space-y-6 bg-white">
            <section>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                 <Icon name="Target" size={16} /> Objetivo comunicativo
              </h4>
              <p className="text-slate-800 font-medium text-lg leading-relaxed">{room.details.objective}</p>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="text-sm font-bold text-sky-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Icon name="Activity" size={16} /> Actividades
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed">{room.details.activities}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Icon name="PackageOpen" size={16} /> Materiales
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed">{room.details.materials}</p>
              </div>
            </section>

            <section className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <h4 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Icon name="Brain" size={16} /> Habilidades que desarrolla
              </h4>
              <p className="text-emerald-900 text-sm font-medium">{room.details.skills}</p>
            </section>
          </div>
        </Card>
      </motion.div>

      <div className="flex gap-4 pt-2">
        <Button variant="outline" onClick={() => onNavigate('room-selection')} className="w-full sm:w-auto">Volver</Button>
        <Button variant="secondary" onClick={() => onNavigate('shift-selection')} className="w-full sm:w-auto flex-1">
          Elegir turno
        </Button>
      </div>
    </PageContainer>
  );
}
