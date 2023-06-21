import React, { useState, useEffect } from "react";
import { TiDelete } from 'react-icons/ti';


export default function AccountForm({ handleBankInfoSubmit }) {
  const [bankInfo, setBankInfo] = useState({
    paymentMethod: "",
    bank: "",
    cardNumber: "",
    routingNumber: "",
    accountName: "",
    cardHolderName: "",
  });

  // An array to store all submitted bank information
  const [submittedBanks, setSubmittedBanks] = useState([]);
  //

  useEffect(() => {
    const fetchBankInfo = async () => {
      const res = await fetch("/api/bankInfo"); // Adjust this to your actual API endpoint
      if (res.ok) {
        try {
          const data = await res.json();
          console.log("Data:", data);
          setSubmittedBanks(data); // Assuming the data is an array of bank info
        } catch (error) {
          console.error("Failed to parse JSON response:", error);
        }
      } else {
        console.error("Failed to fetch bank info. Status:", res.status);
      }
    };

    fetchBankInfo();
  }, []);

  //

  const handleBankInfoChange = (e) => {
    setBankInfo({
      ...bankInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBankInfoSubmit(bankInfo);
    // Add the current bankInfo to the array of submitted banks
    setSubmittedBanks([...submittedBanks, bankInfo]);
    setBankInfo({
      paymentMethod: "",
      bank: "",
      cardNumber: "",
      routingNumber: "",
      accountName: "",
      cardHolderName: "",
    });
  };

  //
  // New useEffect hook
  useEffect(() => {
    console.log(submittedBanks);
  }, [submittedBanks]);
  // End of new useEffect hook
  //

  function deleteBank(bankId) {
    // Delete the bank from your database
    fetch(`/api/bankInfo/${bankId}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        // If delete was successful, update the state
        setSubmittedBanks(submittedBanks.filter((bank) => bank.id !== bankId));
      })
      .catch((error) => console.error("Error:", error));
  }

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
        <summary>Submitted Banks</summary>
        {submittedBanks.map((bank, index) => (
          <details key={bank.id} className="mb-3">
            <summary className="text-capitalize">
              {bank.bank}
              <span>{bank.bank}</span>
              <button
                onClick={() => deleteBank(bank.id)}
                className="text-red-500 ml-2"
              >
                <TiDelete className="inline-block align-middle" />
              </button>
            </summary>
            <p>Tipo: {bank.paymentMethod}</p>
            <p>Tarjeta (opcional): {bank.cardNumber}</p>
            <p>Clabe (opcional): {bank.routingNumber}</p>
            <p>Cuenta (opcional): {bank.accountName}</p>
            <p>Titular (opcional): {bank.cardHolderName}</p>
          </details>
        ))}
      </details>
    </form>
  );
}
