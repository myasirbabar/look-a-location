import React, { useCallback, useState } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
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
        isLoggedIn: isLoggedIn,
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
