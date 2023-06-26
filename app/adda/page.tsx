"use client";

import { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa";
import SettModal from "../components/SettModal";

const AdmiPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const [filter, setFilter] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);

  // interface

  interface User {
    id: number;
    name: string;
    email: string;
    numbers: number[];
    phone?: string;
    paid: boolean;
    state?: string;
    reservedNumbers: ReservedNumber[];
  }

  interface ReservedNumber {
    id: number;
    number: number;
    userId: number;
    user: User;
  }

  //

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const toggleSelectedUser = (user: User) => {
    if (selectedUsers.includes(user.id)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user.id]);
    }
  };

  const changePaidStatus = async (paid: boolean) => {
    for (const id of selectedUsers) {
      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paid }),
      });

      const updatedUser = await res.json();
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    }
    setSelectedUsers([]); // Clear selection
  };

  const deleteUser = async () => {
    for (const id of selectedUsers) {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers(users.filter((u) => !selectedUsers.includes(u.id)));
      } else {
        // Handle any error response here.
        // You can get the error message with const data = await res.json();
      }
    }
    setSelectedUsers([]); // Clear selection
  };

  // Filter users based on the payment status
  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    return filter === "paid" ? user.paid : !user.paid;
  });

  const sendWhatsAppReminder = async () => {
    if (selectedUsers.length === 1) {
      const user = users.find((u) => u.id === selectedUsers[0]);
      // fetch the message from the database
      const res = await fetch("/api/whatsappmessage");
      const data = await res.json();
      const message = `Hola ${user?.name}, ${data.message}`;
      const encodedMessage = encodeURIComponent(message);
      const link = `https://api.whatsapp.com/send/?phone=${user?.phone}&text=${encodedMessage}`;
      window.open(link, "_blank");
    }
  };

  return (
    <div className="mx-4 md:mx-10 lg:mx-20 overflow-x-hidden">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl ">S17 CORVETTE 2022</h1>
        <FaCog
          className="cursor-pointer text-xl"
          onClick={() => setIsModalVisible(!isModalVisible)}
        />
      </div>

      {/* Rest of your page... */}
      <div className="flex flex-col justify-between my-4">
        <div className="my-2">
          <input
            type="radio"
            id="all"
            name="filter"
            value="all"
            checked={filter === "all"}
            onChange={(e) => setFilter(e.target.value)}
            className=""
          />
          <label
            htmlFor="all"
            className={`${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-500"
            } cursor-pointer`}
          >
            All
          </label>
        </div>
        <div className="my-2">
          <input
            type="radio"
            id="paid"
            name="filter"
            value="paid"
            checked={filter === "paid"}
            onChange={(e) => setFilter(e.target.value)}
            className=""
          />
          <label
            htmlFor="paid"
            className={`px-4 py-2 rounded-md ${
              filter === "paid" ? "bg-blue-500 text-white" : "bg-gray-500"
            } cursor-pointer`}
          >
            Paid
          </label>
        </div>
        <div className="my-2">
          <input
            type="radio"
            id="notpaid"
            name="filter"
            value="notpaid"
            checked={filter === "notpaid"}
            onChange={(e) => setFilter(e.target.value)}
            className=""
          />
          <label
            htmlFor="notpaid"
            className={`px-4 py-2 rounded-md ${
              filter === "notpaid" ? "bg-blue-500 text-white" : "bg-gray-500"
            } cursor-pointer`}
          >
            Not Paid
          </label>
        </div>
      </div>

      <button
        className={`px-4 py-2 rounded-md ${
          selectedUsers.length !== 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white"
        } focus:outline-none`}
        onClick={sendWhatsAppReminder}
        disabled={selectedUsers.length !== 1}
      >
        Send WhatsApp Reminder
      </button>

      <div className="overflow-x-auto mt-4">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Select</th>
              <th className="px-4 py-2">Number</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className={`px-4 py-2 ${
                  user.paid
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleSelectedUser(user)}
                  />
                </td>
                <td>{user.numbers.join(", ")}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalVisible && (
        <SettModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
};

export default AdmiPage;
