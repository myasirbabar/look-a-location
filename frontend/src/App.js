import React, { useCallback, useState,useEffect } from "react";
/*
  Changes are 
  * Switch is replaced with Routes
  * Redirect is replaced with Navigate
*/

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./Shared/context/auth-context";
import NewPlace from "./Places/pages/NewPlace";
import MainNavigation from "./Shared/components/Navigation/MainNavigation";
import Users from "./Users/pages/Users";
import UserPlaces from "./Places/pages/UserPlaces";
import UpdatePlace from "./Places/pages/UpdatePlace";
import Authentication from "./Users/pages/Authentication";

const App = () => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  
  const login = useCallback((uid, token) => {
    setToken(token);
    localStorage.setItem(
      'userData',
      JSON.stringify({ userId: uid, token: token })
    );
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    console.log(storedData)
    if(storedData && storedData.token){
      login(storedData.userId, storedData.token)
    }
  }, [login])
  


  let routes;

  if (token) {
    routes = (
      <Routes>
        {/* To render component we use element and bellow syntax */}
        <Route path="/" exact element={<Users />} />

        <Route path="/:userId/places" exact element={<UserPlaces />} />

        <Route path="places/new" exact element={<NewPlace />} />

        <Route path="/places/:pid" element={<UpdatePlace />} />

        {/* To Redirect we use Navigate as Route element */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        {/* To render component we use element and bellow syntax */}
        <Route path="/" exact element={<Users />} />

        <Route path="/auth" exact element={<Authentication />} />

        <Route path="/:userId/places" exact element={<UserPlaces />} />

        {/* To Redirect we use Navigate as Route element */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        userId: userId,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
