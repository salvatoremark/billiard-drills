import React from "react";
import { useNavigate } from "react-router-dom";

import NoItems from "./NoItems";
import StatsListItem from "./StatsListItem";
import { getStoredObject } from "./helpers";
import "./Stats.css";

export default function Stats() {
  const navigate = useNavigate();
  const allScores = getStoredObject("scores");

  const getAverageAllScores = () => {
    let totalPoints = 0;
    let totalAttempts = 0;
    allScores.map((object) => {
      object.scores.map((s) => {
        totalPoints += s.points;
        totalAttempts += s.attempts;
      });
    });
    return (totalPoints / totalAttempts) * 100;
  };

  const getAverageOfScores = (scoresArr) => {
    let totalPoints = 0;
    let totalAttempts = 0;
    scoresArr.map((s) => {
      totalPoints += s.points;
      totalAttempts += s.attempts;
    });
    return (totalPoints / totalAttempts) * 100;
  };

  const goToHistory = (event) => {
    let id = event.target.dataset.id;
    navigate("/history/" + id);
  };

  if (allScores) {
    const averageAll = getAverageAllScores();
    return (
      <section className='Stats'>
        <h2>Drill Statistics</h2>
        <div>
          Combined Drills:{" "}
          <span className='color'>
            {averageAll ? averageAll.toFixed(0) : "0"}%
          </span>
        </div>
        <ul className='text-left anim-pullDown'>
          <br />
          {allScores.map((key) => (
            <StatsListItem
              key={key.id}
              stat={key}
              goToHistory={goToHistory}
              scores={key.scores}
            />
          ))}
        </ul>
      </section>
    );
  } else {
    return (
      <section className='Stats'>
        <h2>Drill Statistics</h2>
        <div className='text-center'>
          <NoItems
            message={`Items will display here as scores are entered for drills.`}
          />
        </div>
      </section>
    );
  }
}
