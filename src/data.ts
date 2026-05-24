import { Room, Shift } from './types';

export const ROOMS: Room[] = [
  {
    id: 'mercadito',
    name: 'Sala Mercadito',
    iconName: 'ShoppingBasket',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Práctica de vocabulario de alimentos, precios y pedidos.',
    colors: {
      bg: 'bg-emerald-100',
      border: 'border-emerald-300',
      text: 'text-emerald-800'
    },
    details: {
      objective: 'Favorecer el uso del lenguaje oral mediante situaciones de compra y venta.',
      activities: 'Pedir productos, nombrar frutas y verduras, usar frases de cortesía, contar objetos y responder preguntas.',
      materials: 'Canastas, frutas de juguete, billetes didácticos, etiquetas, mesa de atención, tarjetas con palabras.',
      skills: 'Vocabulario, diálogo, pronunciación, escucha activa y expresión oral.'
    }
  },
  {
    id: 'veterinaria',
    name: 'Sala Veterinaria',
    iconName: 'Dog',
    imageUrl: 'https://images.unsplash.com/photo-1537151608804-ea6d1122a5e3?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Asumir roles, describir síntomas y expresar cuidados.',
    colors: {
      bg: 'bg-sky-100',
      border: 'border-sky-300',
      text: 'text-sky-800'
    },
    details: {
      objective: 'Fomentar la expresión de empatía y descripción a través del cuidado animal.',
      activities: 'Nombrar partes del cuerpo de los animales, describir síntomas, usar instrumentos médicos de juguete, dar instrucciones claras.',
      materials: 'Peluches de animales, botiquín de juguete, camilla, estetoscopio, vendas, cartillas de salud.',
      skills: 'Expresión emocional, vocabulario específico, seguimiento de instrucciones, roles, articulación.'
    }
  },
  {
    id: 'restaurante',
    name: 'Sala Restaurante',
    iconName: 'Utensils',
    imageUrl: 'https://images.unsplash.com/photo-1590845947698-8924d7409b56?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Práctica de pedidos, turnos de conversación y cortesía.',
    colors: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-300',
      text: 'text-yellow-800'
    },
    details: {
      objective: 'Desarrollar habilidades sociales y lenguaje pragmático en torno a la comida.',
      activities: 'Leer menús con imágenes, pedir comida, alternar turnos para hablar, usar fórmulas de cortesía (por favor, gracias).',
      materials: 'Mesas, sillas, comida de plástico, menús ilustrados, delantales, caja registradora, platos y cubiertos.',
      skills: 'Lenguaje pragmático, turnos comunicativos, modales, interacción social, formulación de preguntas.'
    }
  },
  {
    id: 'hogar',
    name: 'Sala Hogar',
    iconName: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Vocabulario familiar, rutinas diarias y convivencia.',
    colors: {
      bg: 'bg-pink-100',
      border: 'border-pink-300',
      text: 'text-pink-800'
    },
    details: {
      objective: 'Reforzar el vocabulario del entorno cotidiano y expresar rutinas y emociones.',
      activities: 'Jugar a cocinar, limpiar, dormir a los muñecos, describir partes de la casa, expresar emociones de la vida diaria.',
      materials: 'Cocina de juguete, muñecos, cunas, utensilios de limpieza infantiles, espejos, reloj.',
      skills: 'Narración de rutinas, vocabulario del hogar, expresión de emociones, secuencias lógicas.'
    }
  },
  {
    id: 'construccion',
    name: 'Sala Construcción',
    iconName: 'Hammer',
    imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Describir formas, colores, tamaños y trabajo en equipo.',
    colors: {
      bg: 'bg-orange-100',
      border: 'border-orange-300',
      text: 'text-orange-800'
    },
    details: {
      objective: 'Estimular el lenguaje descriptivo y la coordinación verbal en el trabajo conjunto.',
      activities: 'Clasificar piezas por color o forma, pedir herramientas, describir construcciones, planificar en voz alta.',
      materials: 'Bloques de construcción, herramientas de plástico, cascos, conos, carretillas, planos pictóricos.',
      skills: 'Conceptos espaciales, atributos (color/forma/tamaño), proposiciones, negociación.'
    }
  }
];

export const SHIFTS: Shift[] = [
  { id: 'manana', name: 'Turno mañana', time: '9:00 a.m. - 10:30 a.m.' },
  { id: 'mediodia', name: 'Turno medio día', time: '11:00 a.m. - 12:30 p.m.' },
  { id: 'tarde', name: 'Turno tarde', time: '3:00 p.m. - 4:30 p.m.' }
];

export const MAX_CAPACITY_PER_SHIFT = 20;
export const TABLES_PER_ROOM = 5;
