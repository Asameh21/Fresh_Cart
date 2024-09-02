import React from "react";
import style from "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-16  lg:pt-10">
        <Outlet />
      </div>
    </>
  );
}
