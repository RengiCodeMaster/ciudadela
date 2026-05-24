import { z } from 'zod'; // We might use zod if we had it, but standard TS is fine.

export type ScreenState = 
  | 'welcome'
  | 'registration'
  | 'room-selection'
  | 'room-detail'
  | 'shift-selection'
  | 'summary'
  | 'confirmation'
  | 'recommendations'
  | 'about'
  | 'design-thinking';

export interface ChildData {
  childName: string;
  childAge: string;
  parentName: string;
  contactNumber: string;
}

export interface Room {
  id: string;
  name: string;
  iconName: string; // matches lucide react icon
  imageUrl: string;
  shortDescription: string;
  colors: {
    bg: string;
    border: string;
    text: string;
  };
  details: {
    objective: string;
    activities: string;
    materials: string;
    skills: string;
  };
}

export interface Shift {
  id: string;
  name: string; // Mañana, Medio día, Tarde
  time: string;
}

export interface ReservationData {
  childData: ChildData;
  roomId: string | null;
  shiftId: string | null;
  date: string;
}
