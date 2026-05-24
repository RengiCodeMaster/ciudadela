import React from 'react';
import { motion } from 'motion/react';
import { ScreenProps } from './ScreensA';
import { Button, Card, Icon, PageContainer } from './UI';

export function AboutScreen({ onNavigate }: ScreenProps) {
  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Icon name="Info" className="text-sky-500" /> Sobre el Proyecto
        </h2>
        <Button variant="ghost" onClick={() => onNavigate('welcome')} className="px-2 py-2">
          <Icon name="X" />
        </Button>
      </div>

      <div className="space-y-6 prose prose-slate">
        <Card className="p-6 bg-white shadow-sm border-2 border-emerald-100">
          <div className="flex items-center gap-3 mb-4 text-emerald-600">
            <span className="p-2 bg-emerald-100 rounded-lg"><Icon name="BookOpen" size={20} /></span>
            <h2 className="font-bold text-xl">Sobre Ciudadela de Palabras</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Propuesta de emprendimiento educativo basada en una ludoteca infantil. Fortalecemos el lenguaje y la comunicación en menores de 6 años mediante juegos de roles. Acceso gestionado mediante <strong>CiudadelaApp</strong>.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left mb-4">
            <div className="bg-sky-50 p-3 rounded-2xl border border-sky-100 text-xs text-sky-700">
              <strong>Aforo:</strong> 20 niños por turno<br/>5 estaciones por sala
            </div>
            <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100 text-xs text-amber-700">
              <strong>Horarios:</strong> 3 turnos diarios<br/>Mañana, Medio día, Tarde
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
              * La app no reemplaza la ludoteca presencial, sino que organiza el acceso, el aforo y la información de actividades. El niño participa presencialmente en la sala elegida.
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-sm border-2 border-indigo-100">
          <div className="flex items-center gap-3 mb-4 text-indigo-600">
            <span className="p-2 bg-indigo-100 rounded-lg"><Icon name="Box" size={20} /></span>
            <h2 className="font-bold text-xl">Recursos y Organización Física</h2>
          </div>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            La ludoteca se organiza físicamente para maximizar la interacción real de los niños:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
            <li className="flex items-center gap-2"><Icon name="CheckCircle2" size={16} className="text-indigo-400" /> 5 salas temáticas</li>
            <li className="flex items-center gap-2"><Icon name="CheckCircle2" size={16} className="text-indigo-400" /> 5 mesas por sala</li>
            <li className="flex items-center gap-2"><Icon name="CheckCircle2" size={16} className="text-indigo-400" /> Sillas para los niños</li>
            <li className="flex items-center gap-2"><Icon name="CheckCircle2" size={16} className="text-indigo-400" /> Materiales didácticos</li>
            <li className="flex items-center gap-2"><Icon name="CheckCircle2" size={16} className="text-indigo-400" /> Juegos de roles</li>
            <li className="flex items-center gap-2"><Icon name="CheckCircle2" size={16} className="text-indigo-400" /> Cuentos</li>
            <li className="flex items-center gap-2"><Icon name="CheckCircle2" size={16} className="text-indigo-400" /> Tarjetas de vocabulario</li>
            <li className="flex items-center gap-2"><Icon name="CheckCircle2" size={16} className="text-indigo-400" /> Títeres y juguetes simbólicos</li>
            <li className="flex items-center gap-2"><Icon name="CheckCircle2" size={16} className="text-indigo-400" /> Recursos visuales</li>
          </ul>
        </Card>

      </div>
    </PageContainer>
  );
}

export function DesignThinkingScreen({ onNavigate }: ScreenProps) {
  const steps = [
    {
      title: 'Empatizar',
      color: 'bg-pink-500',
      desc: 'Niños necesitan espacios de juego comunicativo real.'
    },
    {
      title: 'Definir',
      color: 'bg-sky-400',
      desc: 'Falta de espacios lúdicos para estímulo del lenguaje oral.'
    },
    {
      title: 'Idear',
      color: 'bg-emerald-400',
      desc: 'Mini ciudad con salas temáticas y roles interactivos.'
    },
    {
      title: 'Prototipar',
      color: 'bg-amber-400',
      desc: 'Diseño de CiudadelaApp y organización de las salas.'
    },
    {
      title: 'Testear',
      color: 'bg-indigo-400',
      desc: 'Validar si los niños mejoran su comunicación jugando.'
    }
  ];

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Icon name="BrainCircuit" className="text-indigo-500" /> Metodología
        </h2>
        <Button variant="ghost" onClick={() => onNavigate('welcome')} className="px-2 py-2">
          <Icon name="X" />
        </Button>
      </div>

      <Card className="p-6 bg-white shadow-sm border-2 border-pink-100">
        <div className="flex items-center gap-3 mb-6 text-pink-500">
          <span className="p-2 bg-pink-50 rounded-lg"><Icon name="Lightbulb" size={20} /></span>
          <h2 className="font-bold text-xl">Metodología Design Thinking</h2>
        </div>
        
        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${step.color} flex-shrink-0 flex items-center justify-center text-white font-bold text-xs shadow-lg`}>
                  0{i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-700">{step.title}</div>
                  <div className="text-xs text-slate-500 leading-tight mt-1">{step.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </PageContainer>
  );
}
