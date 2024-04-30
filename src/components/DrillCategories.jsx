import React from "react";
import "./DrillCategories.css";

export default function DrillCategories(props) {
  const { getCategories, selectedCategory, updateCategory } = props;
  const categories = getCategories();

  return (
    <>
      <menu className='DrillCategories'>
        <li key='9999'>
          <input
            type='radio'
            name='radio_categories'
            data-category='all'
            onChange={(event) => updateCategory(event)}
            checked={selectedCategory === "all" ? true : false}
          />
          All
        </li>
        {categories.map((cat, index) => {
          return (
            <li key={index}>
              <input
                type='radio'
                name='radio_categories'
                data-category={cat}
                onChange={(event) => updateCategory(event)}
                checked={selectedCategory === cat ? true : false}
              />
              {cat}
            </li>
          );
        })}
      </menu>
    </>
  );
}
