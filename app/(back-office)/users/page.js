"use client";

import React, { Component } from "react";
import Table from "@/components/Table";
import { UserService } from "@/services/userService";
import { Button } from "@nextui-org/react";
import CreateUserComp from "@/components/user/CreateUserComp";
import ConfirmationModal from "@/components/form/ConfirmationModal";
import toast from "react-hot-toast";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false,
      isModalOpen: false,
      isConfirmationModalOpen: false,
      currentId: null,
    };

  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      this.setState({ loading: true });
      const users = await UserService.getUserList();
      this.setState({ users });
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  columns = [
    { title: 'ID', accessor: 'id' },
    { title: 'Username', accessor: 'username' },
    { title: 'Email', accessor: 'email' },
    { title: 'Full Name', accessor: 'full_name' },
    { title: 'Role', accessor: 'role' },
    { title: 'Active', accessor: 'is_active' },
    { title: 'Created At', accessor: 'created_at' },
    { title: 'Updated At', accessor: 'updated_at' },
    { title: 'Action' } // Action column added
  ];

  handleModalClick = () => {
    this.setState({ isModalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  handleRemoveButton = (id) => {
    this.setState({ currentId: id, isConfirmationModalOpen: true });
  };

  closeConfirmationModal = () => {
    this.setState({ isConfirmationModalOpen: false });
  };

  async onConfirmDeleteUser() {
    this.setState({ loading: true });

    try {
      const response = await UserService.deleteUserById(this.state.currentId);

      if (!response) {
        throw new Error("Failed to delete user");
      }

      toast.success('User has been deleted successfully :)');
      this.fetchUsers();
    } catch (error) {
      toast.error("An error occurred while making the request");
      console.error(error.message);
    } finally {
      this.setState({ loading: false });
    }
  }



  render() {
    const { users, isModalOpen, isConfirmationModalOpen } = this.state;

    return (
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg">Users List ({users.length})</h3>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-customPrink-400"
              onClick={this.handleModalClick}
            >
              Create New
            </Button>
          </div>
        </div>
        <div className="mt-3">
          <Table
            columns={this.columns}
            data={users}
            currentPage={1}
            rowsPerPage={10}
            setHandleRemoveButton={this.handleRemoveButton}
          />
        </div>

        <CreateUserComp
          isOpen={isModalOpen}
          onClose={this.handleModalClose}
          handleGetUserList={this.fetchUsers}
        />

        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={this.closeConfirmationModal}
          onConfirmHandleClick={() => this.onConfirmDeleteUser()}
        />
      </div>
    );
  }
}

export default Page;
