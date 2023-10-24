import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";

//as the actual value we need to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null)
  const value = { currentUser, setCurrentUser }


  useEffect(() => {
    const subscribe = onAuthStateChangedListener((user) => {
      console.log(user)
      if (user)
      {
        createUserDocumentFromAuth(user);

      }
      setCurrentUser(user)

    })
    return subscribe
  }, [])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

