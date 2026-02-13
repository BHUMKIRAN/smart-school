import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className = '', hover = true }: CardProps) {
    return (
        <div className={`bg-white rounded-xl shadow-sm transition-all duration-300 ${hover ? 'hover:-translate-y-1 hover:shadow-md' : ''} ${className}`}>
            {children}
        </div>
    );
}

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
    return (
        <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
            {children}
        </div>
    );
}

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
    return (
        <div className={`px-6 py-4 ${className}`}>
            {children}
        </div>
    );
}

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
    return (
        <div className={`px-6 py-4 border-t border-gray-100 ${className}`}>
            {children}
        </div>
    );
}

interface StatCardProps {
    icon?: React.ReactNode;
    label: string;
    value: string | number;
    className?: string;
}

export function StatCard({ icon, label, value, className = '' }: StatCardProps) {
    return (
        <div className={`bg-white p-6 rounded-xl text-center shadow-sm ${className}`}>
            {icon && (
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-50 mx-auto mb-3">
                    {icon}
                </div>
            )}
            <p className="text-3xl font-bold text-indigo-500 mb-1">{value}</p>
            <p className="text-sm text-gray-600">{label}</p>
        </div>
    );
}
