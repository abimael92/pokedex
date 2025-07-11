import React from 'react';

interface StatItem {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface StatProps {
  item: StatItem;
}

const Stat: React.FC<StatProps> = ({ item }) => {
  return (
    <li className='pokemon-stat'>
      <span className='stat-name'>
        <b>{item.stat.name}: </b>
      </span>
      <span>{item.base_stat}</span>
    </li>
  );
};

export default Stat;
