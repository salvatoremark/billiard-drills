import React from "react";

export default function Drill(props) {
  const {
    drillObj,
    isDrillSelected,
    selectedCategory,
    toggleSelectItem,
    index,
  } = props;

  const isSelected = isDrillSelected(drillObj.id);
  const buttonText = isSelected === true ? "Selected" : "Select this Drill";
  const buttonSelected = isSelected === true ? "active" : "";
  const button = (
    <div
      className={`item-button ${buttonSelected}`}
      onClick={toggleSelectItem}
      data-id={drillObj.id}
      data-index={index}>
      {buttonText}
    </div>
  );

  const diagram = (
    <img
      onClick={toggleSelectItem}
      src={drillObj.url}
      alt={drillObj.title}
      data-id={drillObj.id}
    />
  );

  return (
    <>
      <li key={index}>
        <div className='item-title'>{drillObj.title}</div>
        {diagram}
        {button}
        <hr />
      </li>
    </>
  );
}
