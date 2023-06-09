"use client";

import { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa";
import SettModal from "../components/SettModal";

const AdmiPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [filter, setFilter] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 200; // Set the desired number of users per page

  // fetching title for admin
  const [rifa, setRifa] = useState("");

  useEffect(() => {
    const fetchRifa = async () => {
      try {
        const res = await fetch("/api/config/rifaYbono");
        if (!res.ok) {
          throw new Error("API response was not ok.");
        }
        const data = await res.json();

        if (data.rifa) {
          setRifa(data.rifa);
        }
      } catch (error) {
        console.error("Failed to fetch rifa:", error);
      }
    };

    fetchRifa();
  }, []);

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
    submissionTime: string; // Add the submissionTime field
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
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("API response was not ok.");
        }
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("API response data is not an array.");
        }

        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleSelectedUser = (user: User) => {
    setSelectedUsers([user.id]);
  };

  const changePaidStatus = async (paid: boolean) => {
    for (const id of selectedUsers) {
      try {
        const res = await fetch(`/api/users/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paid }),
        });

        if (!res.ok) {
          throw new Error("Failed to update paid status.");
        }

        const updatedUser = await res.json();
        console.log("Response from server:", updatedUser);

        setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      } catch (error) {
        console.error("Failed to update paid status:", error);
        // Handle error here
      }
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
  // ...

  const filteredUsers = users
    .filter((user) => {
      if (filter === "all") return true;
      return filter === "paid" ? user.paid : !user.paid;
    })
    .filter((user) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.numbers.some((number) =>
          number.toString().includes(lowerCaseQuery)
        )
      );
    });

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Rest of your code...

  // ...
  function createWhatsAppDeepLink(
    phoneNumber: string | undefined,
    message: string
  ): string {
    const encodedMessage = encodeURIComponent(message);
    const phone = phoneNumber ?? ""; // Provide a default value for undefined phone numbers
    return `whatsapp://send/?phone=${phone}&text=${encodedMessage}`;
  }

  const sendWhatsAppReminder = async () => {
    for (const userId of selectedUsers) {
      const user = users.find((u) => u.id === userId);
      if (user) {
        try {
          const res = await fetch("/api/whatsappmessage");
          if (!res.ok) {
            throw new Error("Failed to fetch the message from the database.");
          }
          const data = await res.json();
          const message = `Hola ${user.name}, ${data.message}`;
          const link = createWhatsAppDeepLink(user.phone, message);
          console.log("Phone number:", user.phone); // Added console log
          window.open(link, "_blank");
        } catch (error) {
          console.error("Failed to send WhatsApp reminder:", error);
          // Handle error here
        }
      }
    }
  };

  // Calculate the ticket statistics
  const reservedCount = users.reduce(
    (count, user) => count + (user.reservedNumbers?.length ?? 0),
    0
  );

  const paidCount = users.filter((user) => user.paid).length;
  const totalCount = 35000; // Total number of tickets
  const availableCount = totalCount - reservedCount + paidCount;

  return (
    <div
      className="px-4 md:px-8 lg:px-10
 
    overflow-x-hidden bg-gray-800 text-white "
    >
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl ">{rifa}</h1>
        <FaCog
          className="cursor-pointer text-xl"
          onClick={() => setIsModalVisible(!isModalVisible)}
        />
      </div>
      {/* Ticket Statistics */}
      <div className="flex justify-center space-x-8 mb-4">
        <div>
          <p className="text-gray-300">Reserved:</p>
          <p className="text-2xl font-bold">{reservedCount}</p>
        </div>
        <div>
          <p className="text-gray-300">Paid:</p>
          <p className="text-2xl font-bold">{paidCount}</p>
        </div>
        <div>
          <p className="text-gray-300">Available:</p>
          <p className="text-2xl font-bold">{availableCount}</p>
        </div>
      </div>
      {/* Search bar */}
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Search by name or number"
          className="px-4 py-2 rounded-md bg-gray-200 text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* Rest of your page... */}
      <div className="flex justify-center mx-2 space-x-4 mt-4 px-2">
        <button
          className={`px-4 py-2 rounded-md ${
            selectedUsers.length !== 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 text-white"
          } focus:outline-none`}
          onClick={sendWhatsAppReminder}
          disabled={selectedUsers.length !== 1}
        >
          WhatsApp Reminder
        </button>

        <button
          className={`px-4 py-2 rounded-md ${
            selectedUsers.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          } focus:outline-none`}
          onClick={() => changePaidStatus(true)}
          disabled={selectedUsers.length === 0}
        >
          Mark as Paid
        </button>

        <button
          className={`px-4 py-2 rounded-md ${
            selectedUsers.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-yellow-500 text-white"
          } focus:outline-none`}
          onClick={() => changePaidStatus(false)}
          disabled={selectedUsers.length === 0}
        >
          Mark as Unpaid
        </button>

        <button
          className={`px-4 py-2 rounded-md ${
            selectedUsers.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-500 text-white"
          } focus:outline-none`}
          onClick={deleteUser}
          disabled={selectedUsers.length === 0}
        >
          Delete
        </button>
      </div>
      {/* radio buttons  */}
      <div className="flex justify-center sm:justify-start space-x-4 my-4">
        <div>
          <input
            type="radio"
            id="all"
            name="filter"
            value="all"
            checked={filter === "all"}
            onChange={(e) => setFilter(e.target.value)}
          />
          <label
            htmlFor="all"
            className={`px-4 py-2 rounded-md ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-500"
            } cursor-pointer`}
          >
            All
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="paid"
            name="filter"
            value="paid"
            checked={filter === "paid"}
            onChange={(e) => setFilter(e.target.value)}
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
        <div>
          <input
            type="radio"
            id="notpaid"
            name="filter"
            value="notpaid"
            checked={filter === "notpaid"}
            onChange={(e) => setFilter(e.target.value)}
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
      <div className="overflow-x-auto mt-4 bg-gray-200 bg-opacity-60 rounded-lg shadow-lg ml-3 mr-3 mb-8">
        <table className="table-auto w-full m-3">
          <thead>
            <tr>
              <th className="px-4 py-2">Select</th>
              <th className="px-4 py-2">Number</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Apartado en</th> {/* New Column */}
              <th className="px-4 py-2">Status</th> {/* New Column */}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border p-4">
                <td className="px-6 border-r">
                  <input
                    type="radio"
                    name="selectedUser"
                    value={user.id}
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleSelectedUser(user)}
                  />
                </td>
                <td className="px-6 border-r">
                  <div
                    style={{
                      maxWidth: "100px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={user.numbers.join(", ")} // full list on hover
                  >
                    {user.numbers.join(", ")}
                  </div>
                </td>
                <td className="px-6 border-r">{user.name}</td>
                <td className="px-6 border-r">{user.email}</td>
                <td className="px-6 border-r">{user.phone}</td>
                <td className="px-6 border-r">{user.submissionTime}</td>{" "}
                {/* New Column */}
                <td
                  className={`px-6 ${
                    user.paid
                      ? "bg-blue-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {user.paid ? "Paid" : "Not Paid"}
                </td>{" "}
                {/* New Column */}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center my-4 ">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={`mx-1 px-3 py-2 rounded ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
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
