import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../Shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);

      let response;
      try {
        response = await fetch("http://localhost:5000/api/users"); // by default it is get request

        const resdata = await response.json();

        if (!response.ok) {
          throw new Error(resdata.message);
        }

        setLoadedUsers(resdata.users);
      } catch (error) {
        setError(error.message || "Unknown error occured");
      }
      setIsLoading(false);
    };

    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList listUsers={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
