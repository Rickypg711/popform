import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { FaSave } from "react-icons/fa";

export default function AccountForm() {
  const [bankInfo, setBankInfo] = useState({
    paymentMethod: "",
    bank: "",
    cardNumber: "",
    routingNumber: "",
    accountName: "",
    cardHolderName: "",
  });

  const [submittedBanks, setSubmittedBanks] = useState([]);
  const [editingBankId, setEditingBankId] = useState(null); // Initialize the editingBankId state

  const fetchBankInfo = async () => {
    try {
      const res = await fetch("/api/bankInfo");
      if (res.ok) {
        const data = await res.json();
        setSubmittedBanks(data);
      } else {
        console.error("Failed to fetch bank info. Status:", res.status);
      }
    } catch (error) {
      console.error("Error fetching bank info:", error);
    }
  };

  useEffect(() => {
    fetchBankInfo();
  }, []);

  const handleBankInfoChange = (e) => {
    setBankInfo({
      ...bankInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Only make the request if the current bankInfo doesn't have an id
    // meaning it's a new bank, not an update
    if (!bankInfo.id) {
      try {
        const res = await fetch("/api/bankInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bankInfo),
        });
    
        if (res.ok) {
          // Reset the bankInfo state to its initial values
          setBankInfo({
            paymentMethod: "",
            bank: "",
            cardNumber: "",
            routingNumber: "",
            accountName: "",
            cardHolderName: "",
          });
  
          // Call the handleBankInfoSubmit function with the current bankInfo
          // handleBankInfoSubmit(bankInfo);
    
          // Fetch the latest bank info from the server
          fetchBankInfo();
        } else {
          console.error("Failed to add bank info. Status:", res.status);
        }
      } catch (error) {
        console.error("Error adding bank info:", error);
      }
    } else {
      // If it's an update, use the saveBank function instead
      saveBank();
    }
  };

  
  const deleteBank = (bankId) => {
    fetch(`/api/bankInfo/${bankId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        setSubmittedBanks((prevSubmittedBanks) =>
          prevSubmittedBanks.filter((bank) => bank.id !== bankId)
        );
      })
      .catch((error) => console.error("Error:", error));
  };

  const editBank = (bankId) => {
    const selectedBank = submittedBanks.find((bank) => bank.id === bankId);
    setBankInfo(selectedBank);
    setEditingBankId(bankId); // Set the editingBankId state when editing a bank
  };

  const saveBank = async () => {
    try {
      const res = await fetch(`/api/bankInfo/${bankInfo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bankInfo),
      });

      if (res.ok) {
        // Update the submitted banks state with the edited bank info
        const updatedSubmittedBanks = submittedBanks.map((bank) => {
          if (bank.id === bankInfo.id) {
            return bankInfo;
          }
          return bank;
        });

        setSubmittedBanks(updatedSubmittedBanks);
        setBankInfo({
          paymentMethod: "",
          bank: "",
          cardNumber: "",
          routingNumber: "",
          accountName: "",
          cardHolderName: "",
        });
      } else {
        console.error("Failed to update bank info. Status:", res.status);
      }
    } catch (error) {
      console.error("Error updating bank info:", error);
    }
  };

  return (
    <form className="mt-3 border rounded p-3" onSubmit={handleSubmit}>
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="paymentMethod"
          className="block text-sm font-medium text-gray-700"
        >
          Tipo
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          onChange={handleBankInfoChange}
          value={bankInfo.paymentMethod}
          className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
        >
          <option value="Transferencias">Transferencias</option>
          <option value="Oxxo">Oxxo</option>
          <option value="Extranjero">Extranjero</option>
        </select>
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="bank"
          className="block text-sm font-medium text-gray-700"
        >
          Banco
        </label>
        <select
          id="bank"
          name="bank"
          onChange={handleBankInfoChange}
          value={bankInfo.bank}
          className="mt-1 block w-full shadow-sm sm:text-sm rounded-md text-capitalize"
        >
          <option value="Bbva">Bbva</option>
          <option value="Santander">Santander</option>
          <option value="Scotiabank">Scotiabank</option>
          <option value="HSBC">HSBC</option>
        </select>
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="cardNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Tarjeta (opcional)
        </label>
        <input
          type="text"
          name="cardNumber"
          id="cardNumber"
          onChange={handleBankInfoChange}
          value={bankInfo.cardNumber}
          className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="cardHolderName"
          className="block text-sm font-medium text-gray-700"
        >
          Titular (opcional)
        </label>
        <input
          type="text"
          name="cardHolderName"
          id="cardHolderName"
          onChange={handleBankInfoChange}
          value={bankInfo.cardHolderName}
          className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="routingNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Clabe (opcional)
        </label>
        <input
          type="text"
          name="routingNumber"
          id="routingNumber"
          onChange={handleBankInfoChange}
          value={bankInfo.routingNumber}
          className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="accountName"
          className="block text-sm font-medium text-gray-700"
        >
          Cuenta (opcional)
        </label>
        <input
          type="text"
          name="accountName"
          id="accountName"
          onChange={handleBankInfoChange}
          value={bankInfo.accountName}
          className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="cardHolderName"
          className="block text-sm font-medium text-gray-700"
        >
          Card Holder Name (optional)
        </label>
        <input
          type="text"
          name="cardHolderName"
          id="cardHolderName"
          onChange={handleBankInfoChange}
          value={bankInfo.cardHolderName}
          className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
        />
      </div>

      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Agregar
        </button>
      </div>

      <details className="mb-3">
        <summary className="text-blue-500">Submitted Banks</summary>
        {submittedBanks.map((bank) => (
        
          <details
  key={bank.id}
  className="mb-3"
  onToggle={(e) => {
    if (!e.target.open) {
      setEditingBankId(null);
      // Reset the bankInfo state to its initial values
      setBankInfo({
        paymentMethod: "",
        bank: "",
        cardNumber: "",
        routingNumber: "",
        accountName: "",
        cardHolderName: "",
      });
    } else if (editingBankId !== bank.id) {
      editBank(bank.id);
    }
  }}
>

            <summary className="text-capitalize text-blue-500">
              {editingBankId === bank.id ? (
                <select
                  id="bank"
                  name="bank"
                  onChange={(e) => handleBankInfoChange(e, bank.id)}
                  value={bankInfo.bank}
                  className="mt-1 block w-full shadow-sm sm:text-sm rounded-md text-capitalize"
                >
                  <option value="Bbva">Bbva</option>
                  <option value="Santander">Santander</option>
                  <option value="Scotiabank">Scotiabank</option>
                  <option value="HSBC">HSBC</option>
                </select>
              ) : (
                <span>{bank.bank}</span>
                // {bank.bank}
              )}

              {/* </span> */}

              <button
                type="button"
                onClick={() => deleteBank(bank.id)}
                className="text-red-500 ml-2"
              >
                <TiDelete className="inline-block align-middle" />
              </button>
              <button
                type="button"
                onClick={() => editBank(bank.id)}
                className="text-green-500 ml-2"
              >
                <FaSave className="inline-block align-middle" />
              </button>
            </summary>
            <div className="text-red-500">
              <p>
                Tipo:
                {editingBankId === bank.id ? (
                  <select
                    name="paymentMethod"
                    value={bankInfo.paymentMethod}
                    onChange={(e) => handleBankInfoChange(e, bank.id)}
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
                  >
                    <option value="Transferencias">Transferencias</option>
                    <option value="Oxxo">Oxxo</option>
                    <option value="Extranjero">Extranjero</option>
                  </select>
                ) : (
                  <span>{bank.paymentMethod}</span>
                )}
              </p>
              <p>
                Tarjeta (opcional):
                {editingBankId === bank.id ? (
                  <input
                    type="text"
                    name="cardNumber"
                    value={bankInfo.cardNumber}
                    onChange={(e) => handleBankInfoChange(e, bank.id)}
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
                  />
                ) : (
                  <span>{bank.cardNumber}</span>
                )}
              </p>
              <p>
                Clabe (opcional):
                {editingBankId === bank.id ? (
                  <input
                    type="text"
                    name="routingNumber"
                    value={bankInfo.routingNumber}
                    onChange={(e) => handleBankInfoChange(e, bank.id)}
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
                  />
                ) : (
                  <span>{bank.routingNumber}</span>
                )}
              </p>
              <p>
                Cuenta (opcional):
                {editingBankId === bank.id ? (
                  <input
                    type="text"
                    name="accountName"
                    value={bankInfo.accountName}
                    onChange={(e) => handleBankInfoChange(e, bank.id)}
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
                  />
                ) : (
                  <span>{bank.accountName}</span>
                )}
              </p>
              <p>
                Titular (opcional):
                {editingBankId === bank.id ? (
                  <input
                    type="text"
                    name="cardHolderName"
                    value={bankInfo.cardHolderName}
                    onChange={(e) => handleBankInfoChange(e, bank.id)}
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
                  />
                ) : (
                  <span>{bank.cardHolderName}</span>
                )}
              </p>
              {editingBankId === bank.id && (
                <button
                  type="button"
                  onClick={() => saveBank(bank.id)}
                  className="text-green-500 ml-2"
                >
                  <FaSave className="inline-block align-middle" />
                </button>
              )}
            </div>
          </details>
        ))}
      </details>
    </form>
  );
}
