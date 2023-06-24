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

  // const sendWhatsAppReminder = async () => {
  //   if (selectedUsers.length === 1) {
  //     const user = users.find((u) => u.id === selectedUsers[0]);
  //     // fetch the message from the database
  //     const res = await fetch("/api/whatsappmessage");
  //     const data = await res.json();
  //     const message = `Hola ${user.name}, ${data.message}`;
  //     const encodedMessage = encodeURIComponent(message);
  //     const link = `https://api.whatsapp.com/send/?phone=${user.phone}&text=${encodedMessage}`;
  //     window.open(link, "_blank");
  //   }
  // };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>S17 CORVETTE 2022</h1>
        <FaCog
          style={{ cursor: "pointer" }}
          onClick={() => setIsModalVisible(!isModalVisible)}
        />
      </div>

      <div>
        <p>reservados: {users.length}</p>
        <p>pagados: {users.filter((user) => user.paid).length}</p>
        <p>libres: 38424</p>
      </div>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("paid")}>Paid</button>
        <button onClick={() => setFilter("notpaid")}>Not Paid</button>
        <button
          onClick={sendWhatsAppReminder}
          disabled={selectedUsers.length !== 1}
        >
          Send WhatsApp Reminder
        </button>
      </div>
      <div>
        <button onClick={() => changePaidStatus(true)}>Mark as Paid</button>
        <button onClick={() => changePaidStatus(false)}>
          Mark as Not Paid
        </button>
        <button onClick={deleteUser}>Delete</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              style={{ backgroundColor: user.paid ? "green" : "red" }}
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
