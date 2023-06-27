import React, { useState } from 'react';

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li
            onClick={() => onClickCategory(i)}
            className={activeIndex === i ? 'active' : ''}
            key={i}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
