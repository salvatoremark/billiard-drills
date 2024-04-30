import React from "react";

export default function SetTitles(props) {
  const { theSetTitle, updateSetTitle, titlesForSelect } = props;
  return (
    <form className='SetTitles'>
      <select
        className='btn-primary'
        value={theSetTitle}
        onChange={(event) => updateSetTitle(event)}>
        {titlesForSelect.map((title, index) => {
          return (
            <option key={index} value={title}>
              {title}
            </option>
          );
        })}
      </select>
    </form>
  );
}
