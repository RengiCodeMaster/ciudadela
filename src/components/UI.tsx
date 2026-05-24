import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import * as LucideIcons from 'lucide-react';

// --- Icon Helper ---
interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  name: string;
  size?: number | string;
  className?: string;
}
export function Icon({ name, size, className, ...props }: IconProps) {
  const LucideIcon = (LucideIcons as any)[name];
  if (!LucideIcon) return <LucideIcons.HelpCircle size={size} className={className} {...props} />;
  return <LucideIcon size={size} className={className} {...props} />;
}

// --- Card ---
interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export function Card({ children, className = '', onClick, ...props }: CardProps) {
  return (
    <motion.div
      whileTap={onClick ? { scale: 0.98 } : undefined}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      onClick={onClick}
      className={`bg-white rounded-3xl shadow-sm border-2 overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// --- Button ---
interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
export function Button({ variant = 'primary', children, className = '', onClick, disabled, type = 'button', ...props }: ButtonProps) {
  const baseStyle = "w-full sm:w-auto px-6 py-4 rounded-2xl font-bold transition-transform active:scale-95 flex justify-center items-center gap-2";
  
  const variants = {
    primary: "bg-indigo-500 text-white shadow-lg shadow-indigo-100",
    secondary: "bg-indigo-100 text-indigo-600",
    outline: "border-2 border-slate-200 text-slate-400 bg-white hover:text-slate-600 hover:border-slate-300",
    ghost: "text-indigo-600 hover:bg-indigo-50 bg-transparent underline-offset-4"
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// --- Layout Container ---
export function PageContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className={`max-w-2xl mx-auto w-full px-4 py-6 flex flex-col gap-6 pb-24 ${className}`}
    >
      {children}
    </motion.div>
  );
}
