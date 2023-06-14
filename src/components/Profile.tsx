import React from "react";
import { getUser } from "../services/user.service";
const Profile: React.FC = () => {
  const currentUser = getUser();

  return (
    <div className="mx-auto p-4 sm:px-6 lg:px-8">
      <header className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Created at:</strong> {currentUser.createdAt}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Role:</strong> {currentUser.role}
    </div>
  );
};

export default Profile;
