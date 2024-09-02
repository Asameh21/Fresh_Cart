import React from "react";
import style from "./NotFound.module.css";
import NotFoundImage from "../../../finalProject_assets/images/error.svg";

export default function NotFound() {
  return (
    <>
      <div className="row items-center justify-center">
        <img src={NotFoundImage} className="w-[50%]" alt="" />
      </div>
    </>
  );
}
