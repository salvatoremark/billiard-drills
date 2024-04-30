import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DrillListItem from "./DrillListItem.jsx";
import { getStoredObject, storeObject } from "./helpers.jsx";
import "./SetDetail.css";

export default function SetDetails() {
  const { id: theSetId } = useParams();

  const [countSetOfDrills, setCountSetOfDrills] = useState(0);
  const navigate = useNavigate();
  const sets = getStoredObject("sets");
  const theSetObjIndex = sets
    .map(function (set) {
      return set.id; // id in data structure
    })
    .indexOf(theSetId); // id in params

  const theSetobject = sets[theSetObjIndex];
  if (theSetobject === undefined) {
    navigate("/sets");
    return;
  }
  const setOfDrills = theSetobject.setofdrills;

  const deleteDrill = (event) => {
    const drillId = event.target.dataset.id;
    let storedSets = getStoredObject("sets");

    // Find the index of the target set
    const targetSetindex = storedSets.findIndex((set) => set.id === theSetId);

    if (targetSetindex !== -1) {
      // Create a copy of the target set
      const targetSet = { ...storedSets[targetSetindex] };

      // Filter out the drill to be deleted from the setofdrills array
      targetSet.setofdrills = targetSet.setofdrills.filter(
        (drill) => drill.id !== drillId
      );

      if (targetSet.setofdrills.length > 0) {
        // If there are remaining drills, update storedSets with the modified set
        storedSets[targetSetindex] = targetSet;
        setCountSetOfDrills({ countSetOfDrills: targetSet.setofdrills.length });
        storeObject("sets", storedSets);
        navigate("/sets");

        return drillId;
      }
      // If there are no remaining drills, remove the set from storedSets
      // storedSets.splice(targetSetindex, 1);
      setCountSetOfDrills({ countSetOfDrills: 0 });
      localStorage.removeItem("sets");
      navigate("/sets");
    }
  };

  const goToHistory = (event) => {
    let id = event.target.dataset.id;
    navigate("/history/" + id);
  };

  const goToScore = (event) => {
    const id = event.target.dataset.id;
    navigate("/score/" + id);
  };

  const goToSetup = (event) => {
    const id = event.target.dataset.id;
    navigate("/setup/" + id);
  };

  return (
    <section className='SetDetail'>
      <h2>{theSetobject.title}</h2>

      <ul className='text-center anim-pullDown'>
        {Object.keys(setOfDrills).map((key) => (
          <DrillListItem
            key={setOfDrills[key].id}
            drillObject={setOfDrills[key]}
            deleteDrill={deleteDrill}
            goToHistory={goToHistory}
            goToScore={goToScore}
            goToSetup={goToSetup}
          />
        ))}
      </ul>
      <br />
    </section>
  );
}
