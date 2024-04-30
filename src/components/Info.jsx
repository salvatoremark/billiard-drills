import React from "react";

import "./Info.css";

export default function Info() {
  return (
    <section className='Info'>
      <h2>Instructions</h2>
      <p>
        <span className='appname'>Billiard Drills</span> Enhance your pocket
        billiard skills with <em>Billiard Drills</em>, a web app designed to
        help you score and track your progress as you practice.
      </p>
      <p>Let's get started:</p>
      <ol>
        <li>
          Click on the <span className='bold'>+ New</span> tab to create a new
          set.
        </li>
        <li>
          Choose a title from the dropdown menu. Select the drills you want to
          include.
        </li>
        <li>
          Go to the Sets tab and click one of your sets. The title of the set
          will display along with four buttons.
        </li>
        <li>
          <span className='bold'>Setup</span> provides an illustration of the
          drill, its rules, and notes for how to score it.
        </li>
        <li>
          <span className='bold'>Score</span> displays two fields to enter the
          number of points you scored and the corresponding number of attempts.
          Your new score will be saved and averaged with future scores for that
          drill.
        </li>
        <li>
          <span className='bold'>History</span> displays each scores for that
          drill along with its running average.
        </li>
      </ol>

      <h3>Tips & Suggestions</h3>
      <p>
        <span className='appname'>Billiard Drills</span> prompts you to enter
        the points scored and the number of attempts made. We suggest beginning
        each drill with a predetermined quantity of balls, say ten, and then
        adding up just the attempts it took to score all ten balls.
      </p>
      <p>
        The app is designed to distribute drills into multiple sets to practice
        one set at a time. Depending on your approach, you might decide instead
        to put all drills into one set. Either way is fine. Drill scorse are
        independent of their set(s), so deleting a drill or its set won't erase
        past drill scores.
      </p>

      <p>
        Be aware that this version of{" "}
        <span className='appname'>Billiard Drills</span> keeps score history in
        browser's storage, so clearing data from your browser might clear your
        drill history.
      </p>
      <h3>About</h3>
      <p>
        All drill diagrams were created with and are being served by the
        beautiful and amazing pool table diagraming tool at{" "}
        <a href='http://pad.chalkysticks.com'>pad.chalkysticks.com</a>.
      </p>
    </section>
  );
}
