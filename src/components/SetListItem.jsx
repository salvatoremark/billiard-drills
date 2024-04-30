import React from "react";

export default function SetListItem(props) {
  const { setObject, goToSet, deleteSet } = props;

  const title = (
    <a
      data-id={setObject.id}
      data-title={setObject.title}
      onClick={(event) => goToSet(event)}>
      {setObject.title}
    </a>
  );

  const deleteButton = (
    <button className='btn-danger' data-id={setObject.id} onClick={deleteSet}>
      Delete
    </button>
  );

  return (
    <li className='SetListItem'>
      <div
        className='wrapper dropShadow text-center'
        style={{ maxWidth: "350px" }}>
        {title} {deleteButton}
      </div>
    </li>
  );
}
