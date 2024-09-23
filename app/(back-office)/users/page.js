"use client";
import React, { Component } from "react";
import { Avatar, Button, Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { Chip } from "@nextui-org/chip";
import { Switch } from "@nextui-org/react";
import Humanize from "../../../lib/dateUtils";
import dynamic from "next/dynamic";
import { UserService } from "@/services/userService";
import Loading from "../loading";

const EditUserComp = dynamic(() => import('@/components/user/EditUserComp'), { ssr: true });
const Table = dynamic(() => import('@/components/Table'), { ssr: true });
const CreateUserComp = dynamic(() => import('@/components/user/CreateUserComp'), { ssr: true });
const ConfirmationModal = dynamic(() => import('@/components/form/ConfirmationModal'), { ssr: true });


export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false,
      isModalOpen: false,
      isConfirmationModalOpen: false,
      currentId: null,
      isModalEditOpen: false,
      user: {},
    };

    this.humanize = new Humanize();
    this.handleModalEditClose = this.handleModalEditClose.bind(this);

  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      this.setState({ loading: true });
      const users = await UserService.getUserList();
      await new Promise(resolve => setTimeout(resolve, 500));
      this.setState({ users });
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  async fetchUserById(id) {
    try {
      this.setState({ loading: true });

      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      this.setState({ user: data });
    } catch (error) {
      toast.error(`An error occurred while making the request: ${error.message}`);
      console.error('Error details:', error);
    } finally {
      this.setState({ loading: false });
    }
  }


  columns = [
    { title: 'ID', accessor: 'id' },
    {
      title: 'Username',
      accessor: 'username',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Avatar isBordered color="primary" src={row.image} className="w-10 h-10 text-large" />
          <p>{row.username}</p>
        </div>
      )
    },
    { title: 'Email', accessor: 'email' },
    { title: 'Full Name', accessor: 'full_name' },
    {
      title: 'Role',
      accessor: 'role',
      render: (row) => (
        <Chip size="sm" color="warning" className="text-white capitalize">
          {row.role}
        </Chip>
      ),
    },
    {
      title: 'Is Active',
      accessor: 'is_active',
      render: (row) => (
        <Switch
          isSelected={row.is_active}
          color="primary"
          size="sm"
          onChange={async () => {
            try {
              await UserService.updateUserActiveStatus(row.id, !row.is_active);
              this.setState((prevState) => {
                ussers: prevState.users.map(user => {
                  user.id === row.id ? { ...user, is_active: !user.is_active } : user;
                });
              })
              toast.success(`User has been ${!row.is_active ? 'enabled' : 'disabled'} successfully!`);
              this.fetchUsers();
            } catch (error) {
              console.error("Error updating user status:", error);
              toast.error("Failed to update user status.");

            }
          }}
        />
      ),
    },
    {
      title: 'Created At',
      accessor: 'created_at',
      render: (row) => this.humanize.format(row.created_at),
    },
    {
      title: 'Updated At',
      accessor: 'updated_at',
      render: (row) => this.humanize.format(row.updated_at),

    },
    {
      title: 'Action',
      render: (row) => (
        <div className="flex space-x-4">
          <button
            onClick={() => this.handleEditButton(row.id)}
            className="font-medium text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => this.handleRemoveButton(row.id)}
            className="font-medium text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  handleModalClick = () => {
    this.setState({ isModalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  handleModalEditClose() {
    this.setState({ isModalEditOpen: false });
  }

  handleEditButton(id) {
    this.setState({ currentId: id, isModalEditOpen: true });
    this.fetchUserById(id)
  }

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
    const { users, isModalOpen, isModalEditOpen, isConfirmationModalOpen, loading } = this.state;

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

        <EditUserComp
          user={this.state.user}
          isOpen={isModalEditOpen}
          onClose={this.handleModalEditClose}
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
