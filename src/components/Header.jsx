import React from "react";
import "./Header.css";

export default function Header() {
  const clickHandler = () => {
    window.location.href = "/";
  };
  return (
    <header onClick={clickHandler}>
      <h1 className='anim-slideUpExpand'>Billiard Drills</h1>
    </header>
  );
}
