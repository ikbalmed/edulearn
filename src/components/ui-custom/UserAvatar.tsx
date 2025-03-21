
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRole } from '@/types';

interface UserAvatarProps {
  name: string;
  role?: UserRole;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar = ({ name, role, imageUrl, size = 'md' }: UserAvatarProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-16 w-16 text-xl',
  };

  const roleColors = {
    student: 'bg-sage-light text-earthy-dark',
    teacher: 'bg-earthy-light text-earthy-dark',
  };

  const fallbackColor = role ? roleColors[role] : 'bg-cream text-earthy-dark';

  return (
    <Avatar className={`${sizeClasses[size]} transition-all duration-300 ease-in-out ring-2 ring-offset-2 ring-offset-background ${role ? 'ring-transparent' : 'ring-earthy/10'}`}>
      <AvatarImage 
        src={imageUrl} 
        alt={name} 
        className="object-cover"
      />
      <AvatarFallback className={`${fallbackColor} font-medium`}>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
