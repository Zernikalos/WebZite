import React from 'react';
import './styles.css';

const iconMap = {
  ogl: '🎮',
  android: '📱',
  js: '📜'
};

interface TechIconsProps {
    tags: string[];
  }

export default function TechIcons({tags}: TechIconsProps): JSX.Element {
  const tagsObj = JSON.parse(tags as any as string);
  return (
    <span className="tech-icons">
      {tagsObj.map(tag => (
        <span key={tag} className={`icon-${tag}`}>
          {iconMap[tag] || tag}
        </span>
      ))}
    </span>
  );
}