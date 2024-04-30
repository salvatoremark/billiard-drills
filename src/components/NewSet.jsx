import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import Drill from "./Drill.jsx";
import DrillCategories from "./DrillCategories.jsx";
import SetTitles from "./SetTitles.jsx";
import { useDrillData } from "../hooks/drills-hook.js";
import { getStoredObject, storeObject } from "./helpers.jsx";
import "./NewSet.css";

export default function NewSet() {
  const drills = useDrillData();
  const [selectedDrills, setSelectedDrills] = useState([]);
  const [theSetTitle, setTheSetTitle] = useState("Drill Set #1");
  const [selectedCategory, setSelectedCategory] = useState("classic");
  const navigate = useNavigate();
  const context = useOutletContext();

  let filteredDrills = drills;
  if (selectedCategory !== "all") {
    filteredDrills = filteredDrills.filter((drill) => {
      return drill.category === selectedCategory;
    });
  }

  const theSetTitles = [
    "Drill Set #1",
    "Drill Set #2",
    "Drill Set #3",
    "Drill Set #4",
    "Drill Set #5",
    "Drill Set #6",
    "Drill Set #7",
    "Drill Set #8",
  ];

  const getCategories = () => {
    let categories = [];

    if (drills) {
      for (let drill of drills) {
        categories.push(drill.category);
      }
    }
    // Strip dupes and sort
    return [...new Set(categories)].sort();
  };

  const getTitlesForSelect = () => {
    const remainingSetTitles = getRemainingSetTitles();
    return remainingSetTitles.length ? remainingSetTitles : theSetTitles;
  };

  // Returns array of unused set titles
  const getRemainingSetTitles = () => {
    const allSets = getStoredObject("sets");
    let usedNames = [];
    let remainingSetTitles = [];

    if (allSets) {
      for (let set of allSets) {
        usedNames.push(set.title);
      }
      for (let day of theSetTitles) {
        let foundDay = null;
        foundDay = usedNames.filter((used) => used === day);
        if (!foundDay.length) {
          remainingSetTitles.push(day);
        }
      }
    }
    if (!remainingSetTitles.length) {
      remainingSetTitles = theSetTitles;
    }
    return remainingSetTitles;
  };

  const isDrillSelected = (id) => {
    let drillExists = [];
    if (selectedDrills.length) {
      drillExists = selectedDrills.filter((object) => object.id === id);
    }
    return drillExists.length ? true : false;
  };

  const makeNewSetObj = () => {
    const timestampId = Date.now();
    const NewSet = {
      id: `set-${timestampId}`,
      title: theSetTitle,
      setofdrills: selectedDrills,
    };
    return NewSet;
  };

  const getSetsCount = () => {
    const allSets = getStoredObject("sets");
    if (allSets !== null && allSets.length) {
      return allSets.length;
    } else {
      return 0;
    }
  };

  const toggleSelectItem = (event) => {
    const id = event.target.dataset.id;
    let drillItem = null;
    let selectedDrillsCurrent = [...selectedDrills];

    // if drill exists, remove it, else prepare its id and title for push
    if (isDrillSelected(id)) {
      selectedDrillsCurrent = selectedDrillsCurrent.filter(
        (object) => object.id !== id
      );
    } else {
      drillItem = {
        id,
        title: drills.find((object) => object.id === id).title,
      };
      selectedDrillsCurrent.push(drillItem);
    }
    setSelectedDrills([...selectedDrillsCurrent]);
  };

  const saveSet = () => {
    if (selectedDrills.length > 0) {
      const NewSetObj = makeNewSetObj();
      storeNewSet(NewSetObj);
      context.setActiveTab("sets");
      navigate("/sets");
    }
  };

  const storeNewSet = (NewSet) => {
    let storedSets = getStoredObject("sets");

    if (storedSets !== null) {
      storedSets.push(NewSet);
      storeObject("sets", storedSets);
    } else {
      let arr = [];
      arr[0] = NewSet;
      storeObject("sets", arr);
    }
  };

  const updateCategory = (event) => {
    let cat = event.target.dataset.category;
    setSelectedCategory(cat);
  };

  const updateSetTitle = (event) => {
    event.preventDefault();
    const newTitle = event.target.value;
    setTheSetTitle(newTitle);
  };

  const titlesForSelect = getTitlesForSelect();
  const NumberOfSets = getSetsCount();

  useEffect(() => {
    const updateDefaultSetTitle = () => {
      const remainingTitles = getRemainingSetTitles();
      if (remainingTitles.length) {
        setTheSetTitle(remainingTitles[0]);
      }
    };
    updateDefaultSetTitle();
  }, []);

  if (NumberOfSets < 8) {
    return (
      <section className='NewSet'>
        <h2 className='anim-slideRight'>Create Drill Set</h2>

        <div className='wrapper'>
          <ul className='frame dropShadow anim-slideUpExpand'>
            {filteredDrills.length &&
              filteredDrills.map((object, index) => {
                return (
                  <Drill
                    key={index}
                    drillObj={object}
                    isDrillSelected={isDrillSelected}
                    selectedCategory={selectedCategory}
                    toggleSelectItem={toggleSelectItem}
                    index={index}
                  />
                );
              })}
          </ul>

          <div className='frame-list-column'>
            <div>
              <SetTitles
                theSetTitle={theSetTitle}
                titlesForSelect={titlesForSelect}
                updateSetTitle={updateSetTitle}
              />
              <ul>
                {selectedDrills.length > 0 &&
                  selectedDrills.map((key) => (
                    <li key={key.id}>+ {key.title}</li>
                  ))}
                {selectedDrills.length < 1 && (
                  <li>Select drills for this set.</li>
                )}
              </ul>
              <button className='btn-primary' onClick={saveSet}>
                Save Set
              </button>
            </div>
            <div className='category-list'>
              <DrillCategories
                getCategories={getCategories}
                selectedCategory={selectedCategory}
                updateCategory={updateCategory}
              />
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className='NewSet'>
        <h2>New Drill Set</h2>
        <div className='text-left'>
          <p>
            <strong className='color'>Billiard Drills</strong> supports 8
            numbered sets (#1 through #8.) If you'd like to edit a set, go to
            the <strong>Drill Sets</strong> tab and first delete it, then click{" "}
            <strong>New+</strong> in the top nav to create it again.
          </p>
        </div>
      </section>
    );
  }
}
