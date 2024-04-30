import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getStoredObject, storeObject } from "./helpers.jsx";
import { useDrillData } from "../hooks/drills-hook.js";
import "./Score.css";

export default function Score() {
  const { id } = useParams();
  const drills = useDrillData();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    points: 0,
    attempts: 1,
  });

  const drillObject = drills.find((object) => object.id === id);
  const updateInput = (property, value) => {
    if (property == "points" && parseInt(value, 10) < 1) value = 0;
    if (property == "attempts" && parseInt(value, 10) == 0) value = 1;
    setFormValues((prevValues) => ({
      ...prevValues,
      [property]: Math.abs(parseInt(value, 10)),
    }));
  };

  const saveScore = (event) => {
    event.preventDefault();
    // Check values again for good measure
    if (formValues.points >= 0 && formValues.attempts > 0) {
      const scoreObject = createDrillScoreObject();
      storeDrillScoreObject(scoreObject);
      navigate("/save/" + id);
    }
  };

  const createDrillScoreObject = () => {
    let scoresObject = null;
    const timestampId = Date.now();
    let date = new Date();
    date = getStringDate(date);
    const allScores = getStoredObject("scores");

    // Get scoresObject from allScores if exists
    if (allScores) {
      allScores.map((object) => {
        if (object.id === id) {
          scoresObject = object;
        }
      });
    }
    if (scoresObject) {
      let newScore = {
        id: `score-${timestampId}`,
        points: formValues.points,
        attempts: formValues.attempts,
        date: date,
      };
      // scoresObject.scores[scoresObject.scores.length] = newScore;
      scoresObject.scores.push(newScore);
    } else {
      // This is the first scoring for this drill
      scoresObject = {
        id: id,
        title: drillObject.title,
        scores: [
          {
            id: `score-${timestampId}`,
            points: formValues.points,
            attempts: formValues.attempts,
            date: date,
          },
        ],
      };
    }
    return scoresObject;
  };

  const storeDrillScoreObject = (scoresObject) => {
    let storedScores = getStoredObject("scores");

    if (storedScores) {
      let storedScoresLite = storedScores.filter(
        (key) => key.id !== scoresObject.id
      );
      storedScoresLite.push(scoresObject);
      storeObject("scores", storedScoresLite);
    } else {
      let arr = [];
      arr[0] = scoresObject;
      storeObject("scores", arr);
    }
  };

  const getStringDate = (dateObject) => {
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth();
    return year + "-" + month + "-" + day;
  };

  const cancelAction = () => {
    history.back();
  };

  const secondaryAction = () => {
    navigate("/setup/" + id);
  };

  return (
    <section className='Score'>
      <h2>{drillObject.title}</h2>
      <form className='form' onSubmit={saveScore}>
        <div className='input-group'>
          <label>Points</label>
          <input
            name='points'
            type='number'
            onClick={(event) => event.target.select()}
            onChange={(event) => updateInput("points", event.target.value)}
            value={formValues.points}
          />
        </div>
        <div className='input-group'>
          <label>Attempts</label>
          <input
            name='attempts'
            type='number'
            onClick={(event) => event.target.select()}
            onChange={(event) => updateInput("attempts", event.target.value)}
            value={formValues.attempts}
          />
        </div>
        <div className='button-group'>
          <button type='button' className='btn-cancel' onClick={cancelAction}>
            Back
          </button>
          <button
            type='button'
            className='btn-secondary'
            onClick={secondaryAction}>
            Setup
          </button>

          <button type='submit' className='btn-primary'>
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
