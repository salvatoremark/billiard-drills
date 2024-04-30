import React from "react";
import { useParams } from "react-router-dom";

import ButtonGroup from "./ButtonGroup";
import { useDrillData } from "../hooks/drills-hook.js";
import "./Setup.css";

export default function Setup() {
  const { id } = useParams();
  const drills = useDrillData();
  const drillObj = drills.find((object) => object.id === id);

  const cancelAction = () => {
    window.history.back();
  };

  return (
    <section className='Setup'>
      <h2>{drillObj.title}</h2>
      <img
        className='diagram anim-slideUpExpand'
        src={drillObj.url}
        alt={drillObj.title}
      />

      <h3>Rules</h3>
      <div className='text-left'>
        <p dangerouslySetInnerHTML={{ __html: drillObj.rules }}></p>
      </div>

      <h3>Scoring</h3>
      <div className='text-left'>
        <p dangerouslySetInnerHTML={{ __html: drillObj.scoring }}></p>
      </div>

      <ButtonGroup cancelLabel='Back' cancelAction={cancelAction} />
    </section>
  );
}
