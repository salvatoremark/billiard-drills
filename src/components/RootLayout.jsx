import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export default function RootLayout() {
  const [activeTab, setActiveTab] = useState("");

  return (
    <>
      <div className='dropShadow'>
        <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
        <Outlet context={{ activeTab, setActiveTab }} />
      </div>
    </>
  );
}
