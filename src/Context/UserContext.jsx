import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [userLogin, setuserLogin] = useState(
    localStorage.getItem("samehfreshCartToken")
      ? localStorage.getItem("samehfreshCartToken")
      : null
  );

  return (
    <UserContext.Provider value={{ userLogin, setuserLogin }}>
      {" "}
      {props.children}
    </UserContext.Provider>
  );
}
