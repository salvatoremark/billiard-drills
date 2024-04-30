import React from "react";

export default function DrillListItem(props) {
  const { drillObject, deleteDrill, goToHistory, goToScore, goToSetup } = props;

  if (drillObject) {
    const deleteButton = (
      <button
        type='button'
        className='btn-danger'
        data-id={drillObject.id}
        onClick={deleteDrill}>
        Delete
      </button>
    );
    const historyButton = (
      <button
        type='button'
        className='btn-secondary'
        data-id={drillObject.id}
        onClick={goToHistory}>
        History
      </button>
    );
    const setupButton = (
      <button
        type='button'
        className='btn-secondary'
        data-id={drillObject.id}
        onClick={goToSetup}>
        Setup
      </button>
    );
    const scoreButton = (
      <button
        type='button'
        className='btn-primary'
        data-id={drillObject.id}
        data-title={drillObject.title}
        onClick={goToScore}>
        Score
      </button>
    );

    return (
      <li>
        <span className='wrapper'>
          <div className='container dropShadow'>
            <div className='title'>{drillObject.title}</div>
            <div className='button-group'>
              {scoreButton} {setupButton} {historyButton} {deleteButton}
            </div>
          </div>
        </span>
      </li>
    );
  } else {
    return <p>There are no drills in this set.</p>;
  }
}
