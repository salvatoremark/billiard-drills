import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ButtonGroup from "./ButtonGroup";
import HistoryListItem from "./HistoryListItem";
import NoItems from "./NoItems";
import {
  getStoredObject,
  storeObject,
  getAverageDrillScore,
  getDrillScores,
} from "./helpers";
import "./History.css";

export default function History() {
  const [rerender, setRerender] = useState(false);
  const scores = getStoredObject("scores");

  const navigate = useNavigate();
  const { id } = useParams();
  const scoresForDrill = getDrillScores(id);

  const getDrillScoreObject = () => {
    if (scores) {
      const theScoreObj = scores.find((score) => score.id === id) || {};
      if (theScoreObj) {
        return theScoreObj;
      }
    }
    return;
  };
  const drillScoreObject = getDrillScoreObject();
  const average = getAverageDrillScore(scores) ?? 0;

  const deleteScore = (event) => {
    const drillId = event.target.dataset.drillid; // the scores
    const scoreID = event.target.dataset.id; // remove this score from inside scores[]

    // Filter out the deleted score
    const scoresLite = scores.map((item) => ({
      ...item,
      scores: item.scores.filter((score) => score.id !== scoreID),
    }));

    // Get array index for drill with deleted score
    const drillIndex = scoresLite.findIndex((item) => item.id == drillId);

    // If array of scores is empty, remove the drill element before storing
    if (!scoresLite[drillIndex].scores.length) {
      const scoresRemovedDrill = scoresLite.filter(
        (drill) => drill.id !== drillId
      );

      //Remove scores storage if no scores remain
      if (scoresRemovedDrill.length === 0) {
        localStorage.removeItem("scores");
      } else {
        storeObject("scores", scoresRemovedDrill);
      }
    } else {
      storeObject("scores", scoresLite);
    }
    setRerender(!rerender);
  };

  const formatDate = (date) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const cancelAction = () => history.back();

  return (
    <section className='History'>
      <h2>{drillScoreObject ? drillScoreObject.title : "History"}</h2>
      {drillScoreObject ? (
        <>
          <div>
            Combined History:{" "}
            <span className='color'>
              {Math.floor(getAverageDrillScore(scoresForDrill) * 100)}%
            </span>
          </div>
          <ButtonGroup
            cancelLabel='Back'
            cancelAction={cancelAction}
            primaryLabel='Score'
            primaryAction={() => navigate(`/score/${id}`)}
          />
          {drillScoreObject.scores?.length > 0 ? (
            <ul className='text-center anim-pullDown'>
              {drillScoreObject.scores.map((score) => (
                <HistoryListItem
                  key={score.id}
                  id={score.id}
                  date={score.date}
                  deleteScore={deleteScore}
                  drillId={id}
                  formatDate={formatDate}
                  score={(score.points / score.attempts) * 100}
                />
              ))}
            </ul>
          ) : (
            <NoItems
              message={`Items will display here as scores are entered for this drill.`}
            />
          )}
        </>
      ) : (
        <div className='text-left'>
          <NoItems message={`No history available for this drill.`} />
          <ButtonGroup cancelLabel='Back' cancelAction={cancelAction} />
        </div>
      )}
    </section>
  );
}
