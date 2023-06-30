import React from 'react';

const Categories = ({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''} key={i}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
