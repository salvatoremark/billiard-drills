import React from "react";
import { useNavigate } from "react-router-dom";
import arrowImg from "../arrow_right.svg";

import "./GetStarted.css";

export default function GetStarted() {
  const navigate = useNavigate();
  const logo = "https://pad.chalkysticks.com/583a0.svg";
  const arrow = <img src={arrowImg} alt='arrow pointing right' />;

  const clickHandler = () => {
    navigate("info");
  };
  return (
    <section className='GetStarted'>
      <h2 className='anim-slideRight'>Drill Performance Tracker</h2>
      <div className='logo'>
        <img
          className='anim-slideDown'
          src={logo}
          alt='Billiard Drills logo'
          width='300px'
        />
      </div>
      <ol>
        <li>
          Select
          <br />
          Drills
        </li>
        <li>{arrow}</li>
        <li>
          Enter
          <br />
          Scores
        </li>
        <li>{arrow}</li>

        <li>
          Monitor
          <br />
          Progress
        </li>
      </ol>

      <button
        type='button'
        onClick={clickHandler}
        className='btn-primary anim-zoomIn'>
        Get Started
      </button>
    </section>
  );
}
