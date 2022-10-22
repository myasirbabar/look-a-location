import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Muhammad Yasir",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoOJWdWQyCnVGZ2iMwrA24be1XHiruDZIf71lMcul7&s",
      placeCount: 3,
    },
    {
      id: "u2",
      name: "Usama Akram",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoOJWdWQyCnVGZ2iMwrA24be1XHiruDZIf71lMcul7&s",
      placeCount: 5,
    },
    {
      id: "u3",
      name: "Muhammad Awais",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoOJWdWQyCnVGZ2iMwrA24be1XHiruDZIf71lMcul7&s",
      placeCount: 3,
    }
  ];

  return <UsersList listUsers={USERS} />;
};

export default Users;
