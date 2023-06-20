// import React, { useState } from "react";

// export default function AccountForm({ handleBankInfoSubmit }) {
//   const [bankInfo, setBankInfo] = useState({
//     paymentMethod: "",
//     bank: "",
//     cardNumber: "",
//     routingNumber: "",
//     accountName: "",
//     cardHolderName: "",
//   });

//   const handleBankInfoChange = (e) => {
//     setBankInfo({
//       ...bankInfo,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleBankInfoSubmit(bankInfo); // Call the handleBankInfoSubmit prop with the bankInfo
//     setBankInfo({
//       paymentMethod: "",
//       bank: "",
//       cardNumber: "",
//       routingNumber: "",
//       accountName: "",
//       cardHolderName: "",
//     }); // Reset the form after submission
//   };

//   return (
//     <form className="mt-3 border rounded p-3" onSubmit={handleSubmit}>
//     <div className="col-span-6 sm:col-span-3">
//       <label
//         htmlFor="paymentMethod"
//         className="block text-sm font-medium text-gray-700"
//       >
//         Tipo
//       </label>
//       <select
//         id="paymentMethod"
//         name="paymentMethod"
//         onChange={handleBankInfoChange}
//         value={bankInfo.paymentMethod}
//         className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
//       >
//         <option value="Transferencias">Transferencias</option>
//         <option value="Oxxo">Oxxo</option>
//         <option value="Extranjero">Extranjero</option>
//       </select>
//     </div>

//     <div className="col-span-6 sm:col-span-3">
//       <label
//         htmlFor="bank"
//         className="block text-sm font-medium text-gray-700"
//       >
//         Banco
//       </label>
//       <select
//         id="bank"
//         name="bank"
//         onChange={handleBankInfoChange}
//         value={bankInfo.bank}
//         className="mt-1 block w-full shadow-sm sm:text-sm rounded-md text-capitalize"
//       >
//         <option value="Bbva">Bbva</option>
//         <option value="Santander">Santander</option>
//         <option value="Scotiabank">Scotiabank</option>
//         <option value="HSBC">HSBC</option>
//       </select>
//     </div>

//     <div className="col-span-6 sm:col-span-3">
//       <label
//         htmlFor="cardNumber"
//         className="block text-sm font-medium text-gray-700"
//       >
//         Tarjeta (opcional)
//       </label>
//       <input
//         type="text"
//         name="cardNumber"
//         id="cardNumber"
//         onChange={handleBankInfoChange}
//         value={bankInfo.cardNumber}
//         className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
//       />
//     </div>

//     <div className="col-span-6 sm:col-span-3">
//       <label
//         htmlFor="cardHolderName"
//         className="block text-sm font-medium text-gray-700"
//       >
//         Titular (opcional)
//       </label>
//       <input
//         type="text"
//         name="cardHolderName"
//         id="cardHolderName"
//         onChange={handleBankInfoChange}
//         value={bankInfo.cardHolderName}
//         className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
//       />
//     </div>

//     <div className="col-span-6 sm:col-span-3">
//       <label
//         htmlFor="routingNumber"
//         className="block text-sm font-medium text-gray-700"
//       >
//         Clabe (opcional)
//       </label>
//       <input
//         type="text"
//         name="routingNumber"
//         id="routingNumber"
//         onChange={handleBankInfoChange}
//         value={bankInfo.routingNumber}
//         className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
//       />
//     </div>

//     <div className="col-span-6 sm:col-span-3">
//       <label
//         htmlFor="accountName"
//         className="block text-sm font-medium text-gray-700"
//       >
//         Cuenta (opcional)
//       </label>
//       <input
//         type="text"
//         name="accountName"
//         id="accountName"
//         onChange={handleBankInfoChange}
//         value={bankInfo.accountName}
//         className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
//       />
//     </div>

//     <div className="col-span-6 sm:col-span-3">
//       <label
//         htmlFor="cardHolderName"
//         className="block text-sm font-medium text-gray-700"
//       >
//         Card Holder Name (optional)
//       </label>
//       <input
//         type="text"
//         name="cardHolderName"
//         id="cardHolderName"
//         onChange={handleBankInfoChange}
//         value={bankInfo.cardHolderName}
//         className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
//       />
//     </div>

//     <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
//         <button
//           type="submit"
//           className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Agregar
//         </button>
//       </div>
//     </form>
//   );
// }

import React, { useState } from "react";

export default function AccountForm({ handleBankInfoSubmit }) {
  const [bankInfo, setBankInfo] = useState({
    paymentMethod: "",
    bank: "",
    cardNumber: "",
    routingNumber: "",
    accountName: "",
    cardHolderName: "",
  });

  const handleBankInfoChange = (e) => {
    setBankInfo({
      ...bankInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBankInfoSubmit(bankInfo);
    setBankInfo({
      paymentMethod: "",
      bank: "",
      cardNumber: "",
      routingNumber: "",
      accountName: "",
      cardHolderName: "",
    });
  };

  const accordionItems = [
    {
      bank: "Banorte",
      paymentMethod: "Transferencia",
      cardNumber: "4915 6631 2047 9283",
      routingNumber: "",
      accountName: "",
      cardHolderName: "Ángel Paredes",
    },
    {
      bank: "Scotiabank",
      paymentMethod: "Oxxo",
      cardNumber: "4043 1300 1296 2979",
      routingNumber: "",
      accountName: "",
      cardHolderName: "",
    },
    {
      bank: "Spin",
      paymentMethod: "Oxxo",
      cardNumber: "4217 4700 2246 6086",
      routingNumber: "",
      accountName: "",
      cardHolderName: "",
    },
  ];

  return (
    <form className="mt-3 border rounded p-3" onSubmit={handleSubmit}>
      {accordionItems.map((item, index) => (
        <div key={index} className="mb-3">
          <div className="accordion">
            <input
              type="checkbox"
              className="accordion-checkbox"
              id={`accordion-item-${index}`}
            />
            <label
              className="accordion-label flex items-center justify-between cursor-pointer"
              htmlFor={`accordion-item-${index}`}
            >
              <span className="text-capitalize">{item.bank}</span>
              <span
                className="accordion-arrow"
                role="presentation"
                aria-hidden="true"
              >
                &#8250;
              </span>
            </label>
            <div className="accordion-content">
              <div className="mb-3">
                <label className="form-label">Tipo</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  value={item.paymentMethod}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Banco</label>
                <input
                  readOnly
                  type="text"
                  className="text-capitalize form-control"
                  value={item.bank}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tarjeta (opcional)</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.cardNumber}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Clabe (opcional)</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.routingNumber}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cuenta (opcional)</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.accountName}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.cardHolderName}
                />
              </div>
              <button
                disabled
                type="button"
                className="me-1 btn btn-secondary"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="save"
                  className="svg-inline--fa fa-save fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"
                  ></path>
                </svg>
              </button>
              <button type="button" className="btn btn-danger">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="trash"
                  className="svg-inline--fa fa-trash fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Agregar
        </button>
      </div>
    </form>
  );
}
