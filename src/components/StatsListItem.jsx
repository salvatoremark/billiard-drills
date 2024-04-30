import React from "react";
import { getAverageDrillScore } from "./helpers";

export default function StatsListItem(props) {
  const { stat, goToHistory, scores } = props;
  const average = getAverageDrillScore(scores) * 100;
  const historyButton = (
    <button
      className='btn-secondary'
      data-id={stat.id}
      onClick={(event) => goToHistory(event)}>
      History
    </button>
  );

  return (
    <li>
      <span className='wrapper'>
        <div className='container dropShadow'>
          <div className='title'>{stat.title}</div>
          <div>
            <span className='average'>{average.toFixed(0)}%</span>
            <span className='controls'>{historyButton}</span>
          </div>
        </div>
      </span>
    </li>
  );
}
