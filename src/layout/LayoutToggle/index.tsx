import React, { useState } from 'react';
import styles from './css/styles.module.css';

interface CardLayoutProps {
  children: (layout: string) => JSX.Element[];
}

const LayoutToggle: React.FC<CardLayoutProps> = ({ children }) => {
  const [layout, setLayout] = useState<'grid' | 'list'>('list');

  const handleLayoutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLayout(event.target.value as 'grid' | 'list');
  };

  return (
    <>
      <div className={styles['select-container']}>
        <select value={layout} className={styles['select-layout']} onChange={handleLayoutChange}>
          <option value="grid">Grid</option>
          <option value="list">List</option>
        </select>
      </div>
      <div className={`${styles['layout']} ${styles[layout]}`}>
        {children(layout)}
      </div>
    </>
  );
};

export default LayoutToggle;