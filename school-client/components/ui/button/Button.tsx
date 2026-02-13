import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export default function Button({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-indigo-300 text-white hover:bg-indigo-600 hover:-translate-y-0.5 shadow-sm hover:shadow-md',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        ghost: 'bg-transparent text-indigo-600 hover:bg-indigo-50',
        danger: 'bg-red-500 text-white hover:bg-red-600 hover:-translate-y-0.5',
    };

    const sizes = {
        sm: 'px-4 py-1.5 text-sm',
        md: 'px-7 py-2.5 text-base',
        lg: 'px-8 py-3 text-lg',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
