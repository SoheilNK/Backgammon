import React, { useState } from "react";
import {
  getUser,
  updateProfile,
  changePassword,
  deleteProfile,
} from "../services/user.service";
import { Button, Modal, Input, Form, message } from "antd";

const Profile: React.FC = () => {
  const currentUser = getUser();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] =
    useState(false);

  const handleUpdate = async (values: any) => {
    try {
      await updateProfile(values);
      message.success("Profile updated successfully");
      setIsUpdateModalVisible(false);
    } catch (error) {
      message.error("Failed to update profile");
    }
  };

  const handleChangePassword = async (values: any) => {
    try {
      await changePassword(values);
      message.success("Password changed successfully");
      setIsChangePasswordModalVisible(false);
    } catch (error) {
      message.error("Failed to change password");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteProfile();
      message.success("Profile deleted successfully");
      // Redirect or perform some other action after deleting the profile
    } catch (error) {
      message.error("Failed to delete profile");
    }
  };

  return (
    <div>
      <div className="mx-auto p-4 sm:px-6 lg:px-8">
        <header className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold">
            {currentUser.username}'s Profile
          </h3>
        </header>
        <div className="space-y-4">
          <p>
            <strong>Created at:</strong> {currentUser.createdAt}
          </p>
          <p>
            <strong>Last modified at:</strong> {currentUser.updatedAt}
          </p>
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Role:</strong> {currentUser.role}
          </p>
        </div>

        <div className="mt-8">
          <Button type="default" onClick={() => setIsUpdateModalVisible(true)}>
            Update Profile
          </Button>
          <Button
            type="default"
            onClick={() => setIsChangePasswordModalVisible(true)}
          >
            Change Password
          </Button>
          <Button type="default" onClick={handleDeleteProfile}>
            Delete Profile
          </Button>
        </div>
      </div>

      {/* Update Profile Modal */}
      <Modal
        title="Update Profile"
        open={isUpdateModalVisible}
        onCancel={() => setIsUpdateModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleUpdate}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Button type="default" htmlType="submit">
            Update
          </Button>
        </Form>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        title="Change Password"
        open={isChangePasswordModalVisible}
        onCancel={() => setIsChangePasswordModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleChangePassword}>
          <Form.Item label="New Password" name="newPassword">
            <Input.Password placeholder="Enter your new password" />
          </Form.Item>
          <Button type="default" htmlType="submit">
            Change Password
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
