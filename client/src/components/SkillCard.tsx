// src/components/SkillCard.tsx
import React from 'react';

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SkillCard = ({ title, description, icon }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-all">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
};

export default SkillCard;
