import React from 'react';
import styles from '../../styles/components/button.module.css';
import { cn } from '../../lib/cn';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button className={cn(styles.button, styles[variant], className)} {...props} />
  );
}
