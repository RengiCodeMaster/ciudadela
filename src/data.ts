import { Room, Shift } from './types';

export const ROOMS: Room[] = [
  {
    id: 'mercadito',
    name: 'Sala Mercadito',
    iconName: 'ShoppingBasket',
    imageUrl: '/images/mercadito.webp',
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
    },
    galleryImages: [
      '/images/mercadito_detalle_1.webp',
      '/images/mercadito_detalle_2.webp',
      '/images/mercadito_detalle_3.webp',
      '/images/mercadito_detalle_4.webp'
    ],
    welcomeAudioText: '¡Hola amiguito! Bienvenido al mercadito. ¡Hoy jugaremos a hacer las compras y ser unos súper vendedores! ¿Me ayudas a elegir las frutas?'
  },
  {
    id: 'veterinaria',
    name: 'Sala Veterinaria',
    iconName: 'Dog',
    imageUrl: '/images/veterinaria.webp',
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
    },
    galleryImages: [
      '/images/veterinaria_detalle_1.webp',
      '/images/veterinaria_detalle_2.webp',
      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=800&q=80'
    ],
    welcomeAudioText: '¡Hola amiguito! Bienvenido a la veterinaria. ¡Hoy jugaremos a cuidar a los animalitos y ser unos excelentes veterinarios! ¿Curamos a un perrito?'
  },
  {
    id: 'restaurante',
    name: 'Sala Restaurante',
    iconName: 'Utensils',
    imageUrl: '/images/restaurante.webp',
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
    },
    galleryImages: [
      '/images/restaurante_detalle_1.webp',
      '/images/restaurante_detalle_2.webp',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80'
    ],
    welcomeAudioText: '¡Hola amiguito! Bienvenido al restaurante. ¡Hoy jugaremos a ser grandes cocineros y preparar platos riquísimos! ¡A cocinar!'
  },
  {
    id: 'hogar',
    name: 'Sala Hogar',
    iconName: 'Home',
    imageUrl: '/images/hogar.webp',
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
      skills: 'Narración de rutinas, vocabulario del hogar, expression de emociones, secuencias lógicas.'
    },
    galleryImages: [
      '/images/hogar_detalle_1.webp',
      '/images/hogar_detalle_2.webp',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=800&q=80'
    ],
    welcomeAudioText: '¡Hola amiguito! Bienvenido a la casita. ¡Hoy jugaremos al hogar y a cuidar con mucho amor a nuestra linda familia! ¡Ven, juguemos juntos!'
  },
  {
    id: 'construccion',
    name: 'Sala Construcción',
    iconName: 'Hammer',
    imageUrl: '/images/construccion.webp',
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
    },
    galleryImages: [
      '/images/construccion_detalle_1.webp',
      '/images/construccion_detalle_2.webp',
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80'
    ],
    welcomeAudioText: '¡Hola amiguito! Bienvenido a la sala de construcción. ¡Hoy jugaremos a construir edificios gigantes y pistas de trenes asombrosas! ¡A crear!'
  }
];

export const SHIFTS: Shift[] = [
  { id: 'manana', name: 'Turno mañana', time: '9:00 a.m. - 10:30 a.m.' },
  { id: 'mediodia', name: 'Turno medio día', time: '11:00 a.m. - 12:30 p.m.' },
  { id: 'tarde', name: 'Turno tarde', time: '3:00 p.m. - 4:30 p.m.' }
];

export const MAX_CAPACITY_PER_SHIFT = 20;
export const TABLES_PER_ROOM = 5;
