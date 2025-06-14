import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Cancel() {
  const navigate = useNavigate();

  function handleRedirect() {
    navigate("/");
  }

  useEffect(() => {
    setTimeout(handleRedirect, 5000);
  }, []);

  return (
    <div className="bg-gray-100 h-screen flex">
      <div className="bg-white p-6  m-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="red"
          className="text-green-600 w-16 h-16 mx-auto my-6"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Cancelled!
          </h3>
          <p className="text-gray-600 my-2">Please Try Again Later!</p>
          <p> Automatically Redirecting to Home Page </p>
          <div className="py-10 text-center">
            <span
              onClick={handleRedirect}
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 cursor-pointer"
            >
              GO TO HOME PAGE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
