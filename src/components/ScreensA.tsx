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
  key?: string;
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

const GALLERY_CAPTIONS: Record<string, Array<{ title: string; desc: string }>> = {
  mercadito: [
    { title: "¡Acomodando las frutas! 🍎", desc: "Aprenderemos los nombres de las frutas y verduras mientras jugamos a vender." },
    { title: "¡Pesando en la balanza! ⚖️", desc: "Descubriremos cuánto pesan las cosas y jugaremos con dinero didáctico." },
    { title: "¡Haciendo la cuenta! 🧮", desc: "Jugaremos a sumar el precio de los productos usando una linda calculadora de juguete." },
    { title: "¡Empacando las compras! 🛍️", desc: "Aprenderemos a organizar y embolsar las compras en bolsitas ecológicas de tela." }
  ],
  veterinaria: [
    { title: "¡Curando al perrito! 🩹", desc: "Aprenderemos a cuidar de los animalitos con vendas y mucho cariño." },
    { title: "¡Chequeo médico! 🩺", desc: "Usaremos el estetoscopio para escuchar el corazoncito de nuestros peluches." },
    { title: "¡Revisando las radiografías! 🩻", desc: "Jugaremos a ser radiólogos mirando radiografías divertidas de perritos en una caja de luz de juguete." },
    { title: "¡Hora del baño y cepillado! 🧼", desc: "Jugaremos a bañar y cepillar a los peluches para que queden muy limpios y felices." }
  ],
  restaurante: [
    { title: "¡Preparando pizza! 🍕", desc: "Crearemos deliciosas recetas de juguete usando delantales de chef." },
    { title: "¡Tomando el pedido! 📋", desc: "Jugaremos a ser mozos y pedir la comida diciendo 'por favor' y 'gracias'." },
    { title: "¡Sirviendo el té y postres! ☕", desc: "Jugaremos a la hora del té sirviendo pastelitos y bebidas con tazas de madera." },
    { title: "¡Lavar los utensilios! 🧼", desc: "Aprenderemos a dejar la cocina impecable lavando las tacitas y platitos de juguete." }
  ],
  hogar: [
    { title: "¡Lavando los platitos! 🍽️", desc: "Aprenderemos rutinas divertidas ayudando en las tareas de nuestra casita." },
    { title: "¡Hora de dormir! 💤", desc: "Cuidaremos de nuestros muñecos cantándoles una hermosa canción de cuna." },
    { title: "¡Planchando la ropita! 👔", desc: "Jugaremos a planchar la ropa de nuestros muñecos con una linda planchita de madera." },
    { title: "¡Hora de ordenar! 🧺", desc: "Aprenderemos a guardar los juguetes en cestos organizadores de tela y madera." }
  ],
  construccion: [
    { title: "¡Una gran torre! 🧱", desc: "Usaremos bloques gigantes de madera para construir edificios altísimos." },
    { title: "¡Pistas y trenes! 🚂", desc: "Armaremos vías de tren y planificaremos como verdaderos ingenieros." },
    { title: "¡Armando con tornillos! ⚙️", desc: "Usaremos destornilladores y tuercas de madera para ensamblar carritos de juguete." },
    { title: "¡Midiendo la altura! 📏", desc: "Jugaremos a medir nuestras torres usando una cinta métrica infantil flexible." }
  ]
};

// 4. Room Detail Screen
export function RoomDetailScreen({ onNavigate, selectedRoomObj }: ScreenProps) {
  if (!selectedRoomObj) return null;
  const room = selectedRoomObj;

  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [revealedCards, setRevealedCards] = React.useState<Record<number, boolean>>({});

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      
      // Ajustamos tono y velocidad para un efecto de voz súper tierno e infantil
      utterance.pitch = 1.5; // Tono más alto/tierno de niño
      utterance.rate = 0.88;  // Velocidad ligeramente menor, más paciente y dulce
      
      // Buscar la voz en español más dulce y natural disponible
      const voices = window.speechSynthesis.getVoices();
      const spanishVoices = voices.filter(v => v.lang.startsWith('es'));
      
      // Criterios de dulzura: 1. Google (Chrome) -> 2. Sabina (Windows) -> 3. Femenina -> 4. Cualquiera en español
      let bestVoice = spanishVoices.find(v => v.name.toLowerCase().includes('google') && v.lang.includes('es'));
      if (!bestVoice) {
        bestVoice = spanishVoices.find(v => v.name.toLowerCase().includes('sabina'));
      }
      if (!bestVoice) {
        bestVoice = spanishVoices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('mujer') || v.name.toLowerCase().includes('zira'));
      }
      if (!bestVoice) {
        bestVoice = spanishVoices.find(v => !v.name.toLowerCase().includes('helena')); // Evitar microsoft helena que es algo seria
      }
      if (!bestVoice && spanishVoices.length > 0) {
        bestVoice = spanishVoices[0];
      }

      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  React.useEffect(() => {
    // Reproducir casi de forma inmediata al ingresar a la pantalla
    const timer = setTimeout(() => {
      speakText(room.welcomeAudioText);
    }, 50);

    return () => {
      clearTimeout(timer);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [room.welcomeAudioText]);

  const handleMascotClick = () => {
    speakText(room.welcomeAudioText);
  };

  const handleReveal = (index: number) => {
    setRevealedCards(prev => ({ ...prev, [index]: true }));
  };

  const captions = GALLERY_CAPTIONS[room.id] || [
    { title: "¡Actividad divertida!", desc: "Aprenderemos jugando en esta hermosa sala." },
    { title: "¡Exploración guiada!", desc: "Desarrollaremos grandes habilidades juntos." }
  ];

  return (
    <PageContainer>
      {/* 1. Personaje Mascota "Palabrito" Hablando */}
      <Card className="p-5 border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-sky-50/50 flex flex-col sm:flex-row items-center gap-5 relative overflow-visible">
        {/* Mascota Interactiva Bouncy */}
        <div 
          onClick={handleMascotClick} 
          className="relative cursor-pointer group flex flex-col items-center select-none"
        >
          {/* Globo "¡Escúchame!" */}
          <div className="absolute -top-6 bg-indigo-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md animate-pulse">
            ¡Escúchame!
          </div>

          <motion.div
            animate={isSpeaking ? {
              y: [0, -12, 0, -8, 0],
              scaleY: [1, 0.9, 1.1, 0.95, 1],
              rotate: [0, -3, 3, -3, 0]
            } : {
              y: [0, -4, 0],
              scaleY: [1, 0.97, 1]
            }}
            transition={isSpeaking ? {
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            } : {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-24 h-24 relative flex items-center justify-center filter drop-shadow-md"
          >
            {/* SVG Palabrito la Mascota Educativa */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Cuerpo de estrella/blob suave */}
              <path 
                d="M 50 10 C 65 10, 75 20, 85 35 C 95 50, 90 65, 80 80 C 65 95, 35 95, 20 80 C 10 65, 5 50, 15 35 C 25 20, 35 10, 50 10 Z" 
                fill="#FF7E47" 
              />
              {/* Gorrito de estudiante */}
              <path d="M 35 22 L 50 12 L 65 22 L 50 32 Z" fill="#4F46E5" />
              <rect x="48" y="22" width="4" height="8" fill="#FBBF24" />
              <circle cx="50" cy="31" r="3" fill="#FBBF24" />
              
              {/* Ojos grandes y curiosos */}
              <circle cx="38" cy="48" r="10" fill="white" />
              <circle cx="38" cy="48" r="5" fill="#1E293B" />
              <circle cx="36" cy="46" r="2.5" fill="white" /> {/* brillo */}
              
              <circle cx="62" cy="48" r="10" fill="white" />
              <circle cx="62" cy="48" r="5" fill="#1E293B" />
              <circle cx="60" cy="46" r="2.5" fill="white" /> {/* brillo */}
              
              {/* Mejillas rosadas */}
              <circle cx="28" cy="58" r="4" fill="#F87171" opacity="0.6" />
              <circle cx="72" cy="58" r="4" fill="#F87171" opacity="0.6" />

              {/* Boca que se mueve al hablar */}
              {isSpeaking ? (
                <ellipse cx="50" cy="62" rx="6" ry="10" fill="#991B1B" />
              ) : (
                <path d="M 42 60 Q 50 68 58 60" fill="none" stroke="#991B1B" strokeWidth="4" strokeLinecap="round" />
              )}
              
              {/* Manitos saludando */}
              <path d="M 12 55 Q 5 50 10 40" fill="none" stroke="#FF7E47" strokeWidth="6" strokeLinecap="round" />
              <path d="M 88 55 Q 95 48 90 38" fill="none" stroke="#FF7E47" strokeWidth="6" strokeLinecap="round" />
            </svg>
            
            {/* Altavoz flotante */}
            <div className={`absolute bottom-0 right-0 p-1.5 rounded-full shadow border-2 border-white bg-white ${isSpeaking ? 'text-indigo-600 animate-bounce' : 'text-slate-400'}`}>
              <Icon name={isSpeaking ? "Volume2" : "VolumeX"} size={16} />
            </div>
          </motion.div>
        </div>

        {/* Globo de texto interactivo */}
        <div className="flex-1 bg-white p-4 rounded-3xl border-2 border-slate-100 shadow-sm relative">
          <div className="hidden sm:block absolute left-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-white border-b-[10px] border-b-transparent z-10" />
          <div className="hidden sm:block absolute left-[-12px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[11px] border-t-transparent border-r-[11px] border-r-slate-200 border-b-[11px] border-b-transparent" />
          
          <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-1 flex items-center gap-1.5">
            <Icon name="MessageSquare" size={14} className="text-indigo-500" />
            Guía Palabrito
          </h4>
          <p className="text-slate-700 font-bold text-sm sm:text-base leading-relaxed">
            "{room.welcomeAudioText}"
          </p>
        </div>
      </Card>

      {/* 2. Tarjeta Principal de la Sala */}
      <motion.div layoutId={`room-card-${room.id}`}>
        <Card className={`overflow-hidden border-2 shadow-md ${room.colors.border}`}>
          <div className="relative h-56 w-full">
            <img src={room.imageUrl} alt={room.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            <div className={`absolute inset-0 opacity-20 ${room.colors.bg}`}></div>
          </div>
          <div className={`${room.colors.bg} p-5 text-center relative flex justify-center items-center gap-4 border-b-2 ${room.colors.border}`}>
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

      {/* 3. Galería de Curiosidades Mágicas */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Icon name="Sparkles" className="text-amber-500 animate-pulse" />
          <h3 className="text-xl font-bold text-slate-800">
            ¿Qué aventuras nos esperan aquí?
          </h3>
        </div>
        <p className="text-sm text-slate-500 font-medium">
          Haz clic en las tarjetas mágicas para ver fotos reales de lo que jugaremos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {room.galleryImages.map((imgUrl, index) => {
            const isRevealed = !!revealedCards[index];
            const caption = captions[index];

            return (
              <Card 
                key={index} 
                className={`min-h-[220px] flex flex-col justify-between border-2 transition-all relative overflow-hidden ${
                  isRevealed ? 'border-indigo-100 shadow-sm animate-in fade-in duration-300' : `${room.colors.border} border-dashed hover:shadow-md cursor-pointer`
                }`}
                onClick={!isRevealed ? () => handleReveal(index) : undefined}
              >
                {!isRevealed ? (
                  /* Tarjeta Oculta / Misteriosa */
                  <div className={`absolute inset-0 bg-gradient-to-tr from-slate-100 to-indigo-50/20 flex flex-col items-center justify-center p-6 text-center gap-4`}>
                    <motion.div 
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md ${room.colors.text}`}
                    >
                      <Icon name="Compass" size={32} />
                    </motion.div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-base">Actividad Secreta {index + 1}</h4>
                      <p className="text-xs text-slate-500 font-bold mt-1">¡Haz clic para explorar!</p>
                    </div>
                  </div>
                ) : (
                  /* Tarjeta Revelada con Imagen Real */
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col h-full w-full"
                  >
                    <div className="h-44 w-full relative">
                      <img src={imgUrl} alt={caption.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full shadow-md">
                        <Icon name="Check" size={16} />
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50/50 flex-1 border-t border-slate-100 flex flex-col justify-center">
                      <h4 className="font-bold text-slate-800 text-base mb-1">{caption.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">{caption.desc}</p>
                    </div>
                  </motion.div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* 4. Controles de Navegación */}
      <div className="flex gap-4 pt-4 border-t-2 border-slate-100">
        <Button variant="outline" onClick={() => onNavigate('room-selection')} className="w-full sm:w-auto">Volver</Button>
        <Button variant="secondary" onClick={() => onNavigate('shift-selection')} className="w-full sm:w-auto flex-1">
          Elegir turno
        </Button>
      </div>
    </PageContainer>
  );
}
