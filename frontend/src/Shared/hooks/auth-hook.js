import { useCallback, useState, useEffect } from "react";

let logoutTimer;
export const useAuth = () => {
  const [token, setToken] = useState();
  const [tokenExpireTime, setTokenExpireTime] = useState();
  const [userId, setUserId] = useState();

  const login = useCallback((uid, token, expirationTime) => {
    setToken(token);
    const tokenExpireTime =
      expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpireTime(tokenExpireTime);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpireTime.toISOString(),
      })
    );
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpireTime(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpireTime) {
      const remTime = tokenExpireTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpireTime]);

  return {token, login, logout, userId}
};
