import React from "react";

export default function HistoryListItem(props) {
  const { deleteScore, drillId, formatDate, id, score, date } = props;
  const formattedDate = new Date(date);

  return (
    <li>
      <div className='wrapper'>
        <div className='container dropShadow'>
          <div className='title'>{formatDate(formattedDate)}</div>
          <div>
            <span className='average'>{score.toFixed(0)}%</span>
            <span className='controls'>
              <button
                type='button'
                className='btn-danger'
                data-id={id}
                data-drillid={drillId}
                onClick={deleteScore}>
                Delete
              </button>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
