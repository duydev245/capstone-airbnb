import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";


const AuthLayout = ({ children }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1250);
  }, []);

  return (
    <div className="authLayout">
      {
        isLoading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="py-8 px-10" id="overlayCompo">
            <div className="flex justify-center">
              <img
                className="cursor-pointer"
                src="/logo.png"
                width={90}
                alt="Login"
                onClick={() => navigate(PATH.HOME)}
              />
            </div>
            <button
              className="button1 cursor-pointer"
              onClick={() => navigate(PATH.HOME)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            {children}
          </div>
        )
      }
    </div>
  );
};
export default AuthLayout;
