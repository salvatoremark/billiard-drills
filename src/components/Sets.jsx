import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import SetListItem from "./SetListItem";
import { getStoredObject, storeObject } from "./helpers";
import "../base.css";
import "./Sets.css";

export default function Sets() {
  const [sets, setSets] = useState([]);
  const navigate = useNavigate();

  const deleteSet = (event) => {
    const setId = event.target.dataset.id;
    const storedSets = getStoredObject("sets");
    const remainingSets = storedSets.filter((item) => item.id !== setId);
    if (remainingSets.length > 0) {
      storeObject("sets", remainingSets);
      setSets([...remainingSets]);
      return setId;
    }
    setSets([]);
    localStorage.removeItem("sets");
  };

  const goToSet = (event) => {
    const id = event.target.dataset.id;
    const theSetobject = sets.find((object) => object.id === id);
    navigate("/set/" + theSetobject.id);
  };

  let messageIfNoSets = null;
  if (!sets.length) {
    messageIfNoSets = (
      <p>
        Click <Link to='/new'>+New</Link> to create a set.
      </p>
    );
  }
  useEffect(() => {
    const loadSetsToState = () => {
      if (getStoredObject("sets")) {
        let storedSets = getStoredObject("sets");
        setSets([...storedSets]);
      }
    };
    loadSetsToState();
  }, [setSets]);

  return (
    <section className='Sets'>
      <h2>Drill Sets</h2>
      <ul className='set-list anim-pullDown'>
        {sets.map((object, index) => (
          <SetListItem
            key={index}
            setObject={object}
            deleteSet={deleteSet}
            goToSet={goToSet}
          />
        ))}
      </ul>
      {messageIfNoSets}
    </section>
  );
}
