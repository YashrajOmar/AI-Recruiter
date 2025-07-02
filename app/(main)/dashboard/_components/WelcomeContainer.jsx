"use client";
import { useUser } from '@/app/provider';
import Image from 'next/image';
import React from 'react';

function WelcomeContainer() {
  const { user } = useUser();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Welcome Back{user?.name ? `, ${user.name}` : ''} 👋
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            AI-Driven Interviews, Hassle-Free Hiring
          </p>
        </div>

        {user?.picture && (
          <Image
            src={user.picture}
            alt="User Avatar"
            width={50}
            height={50}
            className="rounded-full border-2 border-gray-300 hover:scale-105 transition-transform duration-200"
          />
        )}
      </div>
    </div>
  );
}

export default WelcomeContainer;
