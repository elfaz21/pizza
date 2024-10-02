import React from "react";
import successModal from "../assets/successModal.svg";

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10">
      <div className="bg-white p-12 shadow-lg" style={{ borderRadius: "25px" }}>
        <img
          src={successModal}
          alt="Success"
          className="mx-auto mb-4 h-30 w-30"
        />
        <h2 className="text-lg text-green-500 font-bold text-center">
          {message}
        </h2>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
