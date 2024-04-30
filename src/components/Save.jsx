import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import ButtonGroup from "./ButtonGroup";
import {
  getStoredObject,
  getAverageDrillScore,
  getDrillScores,
} from "./helpers";
import "./Save.css";

export default function Save() {
  const navigate = useNavigate();
  const { id } = useParams();
  const scoresForDrill = getDrillScores(id);

  const getRecentDrillScore = () => {
    if (scoresForDrill.length) {
      const score =
        scoresForDrill.length > 0
          ? scoresForDrill[scoresForDrill.length - 1]
          : null;

      if (score && score.attempts) {
        return score.points / score.attempts;
      }
    }
    return 0;
  };

  const cancelAction = () => {
    history.back();
  };

  const secondaryAction = () => {
    navigate("/history/" + id);
  };

  return (
    <section className='Save'>
      <h2 className='anim-slideRight'>Saved!</h2>
      <div className='text-center'>
        <p>
          You scored{" "}
          <strong>
            {Math.floor(getRecentDrillScore(scoresForDrill) * 100)}%
          </strong>{" "}
          for this drill.
        </p>
        <p>
          Your average for this drill is{" "}
          <strong>
            {Math.floor(getAverageDrillScore(scoresForDrill) * 100)}%
          </strong>
          .
        </p>
      </div>

      <ButtonGroup
        extraLabel='History'
        secondaryAction={secondaryAction}
        cancelLabel='Back'
        cancelAction={cancelAction}
      />
    </section>
  );
}
