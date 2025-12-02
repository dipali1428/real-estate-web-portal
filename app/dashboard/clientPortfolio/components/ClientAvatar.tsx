"use client"
import React from 'react';
import { generateInitials, generateColorFromName } from '../utils/helpers';

interface ClientAvatarProps {
    name: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const ClientAvatar: React.FC<ClientAvatarProps> = ({
    name,
    size = 'md',
    className = ''
}) => {
    const initials = generateInitials(name);
    const colorClass = generateColorFromName(name);

    const sizeClasses = {
        sm: 'w-6 h-6 text-xs md:w-8 md:h-8',
        md: 'w-8 h-8 text-sm md:w-10 md:h-10',
        lg: 'w-10 h-10 text-base md:w-12 md:h-12'
    };

    return (
        <div className={`
            ${sizeClasses[size]} 
            ${colorClass}
            rounded-full flex items-center justify-center text-white font-semibold
            shadow-sm ${className}
        `}>
            {initials}
        </div>
    );
};

export default ClientAvatar;