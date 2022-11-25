import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../Shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../Shared/hooks/http-hook";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resdata = await sendRequest("http://localhost:5000/api/users"); // by default it is get request

        setLoadedUsers(resdata.users);
      } catch (error) {
      }
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
