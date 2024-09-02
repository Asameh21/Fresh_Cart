import React, { useContext } from "react";
import style from "./Home.module.css";
import CategoriesSlider from "./../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import RecentProducts from "./../RecentProducts/RecentProducts";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <RecentProducts />
    </>
  );
}
