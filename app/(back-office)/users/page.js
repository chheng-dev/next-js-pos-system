"use client";

import React from "react";
import Table from "@/components/Table";
import { UserService } from "@/services/userService";
import { Button, user } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CreateUserComp from "@/components/user/CreateUserComp";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const users = await UserService.getUserList();
      setUsers(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
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


  const handleModalClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg">Users List ({users.length})</h3>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-customPrink-400"
            onClick={handleModalClick}
          >
            Create New
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <Table columns={columns} data={users} />
      </div>

      <CreateUserComp isOpen={isModalOpen} onClose={handleModalClose} handleGetUserList={() => fetchUsers()} />
    </div>
  );
}
