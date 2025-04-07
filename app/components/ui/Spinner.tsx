'use client';

import React from 'react';
import { colors } from '@/app/styles/theme';

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
type SpinnerColor = 'primary' | 'white' | 'gray';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  color?: SpinnerColor;
}

const Spinner: React.FC<SpinnerProps> = ({
  className = '',
  size = 'md',
  color = 'primary',
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-10 w-10 border-3',
    xl: 'h-16 w-16 border-4',
  };

  // Color classes
  const colorClasses = {
    primary: 'border-green-500',
    white: 'border-white',
    gray: 'border-gray-300',
  };

  const spinnerClasses = `
    animate-spin 
    rounded-full 
    border-t-transparent 
    border-solid
    ${sizeClasses[size]}
    ${colorClasses[color]}
    ${className}
  `;

  return <div className={spinnerClasses} {...props} />;
};

export default Spinner; 