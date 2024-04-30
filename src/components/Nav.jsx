import React from "react";
import { useNavigate } from "react-router-dom";

import { getStoredObject } from "./helpers";
import "./Nav.css";

export default function Nav({ activeTab, setActiveTab }) {
  const sets = getStoredObject("sets");
  const navigate = useNavigate();
  const logo = "https://pad.chalkysticks.com/583a0.svg";

  const handleClick = (path) => {
    setActiveTab(path);
    navigate("/" + path);
    window.scroll({
      top: 60,
      behavior: "smooth",
    });
  };

  return (
    <nav id='nav' className='Nav'>
      <div
        className={activeTab === "new" ? "active" : ""}
        onClick={() => handleClick("new")}>
        +New Set
      </div>
      <div
        className={activeTab === "sets" ? "active" : ""}
        onClick={() => handleClick("sets")}>
        Drill Sets
      </div>
      <div
        className={activeTab === "stats" ? "active" : ""}
        onClick={() => handleClick("stats")}>
        Stats
      </div>
      <div
        className={activeTab === "info" ? "active" : ""}
        onClick={() => handleClick("info")}>
        Info
      </div>
    </nav>
  );
}
