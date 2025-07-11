import React, { useState, useEffect, useRef } from "react";
import { FaWindowClose } from "react-icons/fa";
import "boxicons/css/boxicons.min.css";
import "./AuthModal.css";

const AuthModal = ({ type, onClose }) => {
  const [isRegister, setIsRegister] = useState(type === "signup");
  const modalRef = useRef(null);

  useEffect(() => {
    setIsRegister(type === "signup");
  }, [type]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-full max-w-5xl">
        <div
          ref={modalRef}
          className={`containerCSS ${isRegister ? "active" : ""}`}
        >
          <button
            className="absolute top-4 right-4 text-3xl text-gray-300 hover:text-red-500 transition-colors duration-300 z-50"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FaWindowClose />
          </button>

          {/* Background Shapes */}
          <div className="curved-shape"></div>
          <div className="curved-shape2"></div>

          {/* Sign In Form */}
          <div className="form-box Login">
            <h2 className="animation" style={{ "--D": 0, "--S": 21 }}>
              Sign In
            </h2>

            <form>
              <div className="input-box animation" style={{ "--D": 1, "--S": 22 }}>
                <input type="email" required />
                <label htmlFor="">CUET Email</label>
                <i className="bx bxs-envelope" />
              </div>

              <div className="input-box animation" style={{ "--D": 2, "--S": 23 }}>
                <input type="password" required />
                <label htmlFor="">Password</label>
                <i className="bx bxs-lock" />
              </div>

              <div className="input-box animation" style={{ "--D": 3, "--S": 24 }}>
                <button className="btnCSS" type="submit">Sign In</button>
              </div>

              <div className="regi-link animation" style={{ "--D": 4, "--S": 25 }}>
                <p>
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="SignUpLink"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegister(true);
                    }}
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Login Info Panel */}
          <div className="info-content Login">
            <h2 className="animation" style={{ "--D": 0, "--S": 20 }}>
              Welcome Back!
            </h2>
            <p className="animation" style={{ "--D": 1, "--S": 21 }}>
              Access your <b>CUET Trade & Lost-Found Portal</b> account to continue.
            </p>
          </div>

          {/* Sign Up Form */}
          <div className="form-box Register">
            <h2 className="animation" style={{ "--li": 17, "--S": 0 }}>
              Sign Up
            </h2>

            <form>
              <div className="input-box animation" style={{ "--li": 18, "--S": 1 }}>
                <input type="text" required />
                <label htmlFor="">Full Name</label>
                <i className="bx bxs-user" />
              </div>

              <div className="input-box animation" style={{ "--li": 18, "--S": 1 }}>
                <input type="email" required />
                <label htmlFor="">CUET Email</label>
                <i className="bx bxs-envelope" />
              </div>

              <div className="input-box animation" style={{ "--li": 19, "--S": 2 }}>
                <input type="password" required />
                <label htmlFor="">Password</label>
                <i className="bx bxs-lock" />
              </div>

              <div className="input-box animation" style={{ "--li": 20, "--S": 3 }}>
                <button className="btnCSS" type="submit">Sign Up</button>
              </div>

              <div className="regi-link animation" style={{ "--li": 21, "--S": 4 }}>
                <p>
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="SignInLink"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegister(false);
                    }}
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Register Info Panel */}
          <div className="info-content Register">
            <h2 className="animation" style={{ "--li": 17, "--S": 0 }}>
              Join Our Portal!
            </h2>
            <p className="animation" style={{ "--li": 18, "--S": 1 }}>
              Create your account to access the <b>CUET Trade & Lost-Found Portal</b> services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
