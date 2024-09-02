import axios from "axios";
import { createContext } from "react";

export let CategoriesContext = createContext();

export default function CategoriesContextProvider(props) {
  function getAllCategories() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => res)
      .catch((err) => err);
  }
  function getSubCategories(id) {
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
      )
      .then((res) => res)
      .catch((err) => err);
  }
  return (
    <>
      <CategoriesContext.Provider value={{ getAllCategories, getSubCategories }}>
        {props.children}
      </CategoriesContext.Provider>
    </>
  );
}
