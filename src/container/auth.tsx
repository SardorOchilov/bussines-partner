import {useEffect, useState} from "react";
import {AuthContext} from "../context/auth";
import {LOCAL_STORAGE_KEY} from "../utils/config";

interface AuthProps {
  children: React.ReactNode;
}

function Auth({children}: AuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('session')
    console.log(user, LOCAL_STORAGE_KEY)
    setIsAuthenticated(!!user)
  }, [])

  return <AuthContext.Provider
    value={{isAuthenticated}}>
    {children}
  </AuthContext.Provider>
}

export default Auth
