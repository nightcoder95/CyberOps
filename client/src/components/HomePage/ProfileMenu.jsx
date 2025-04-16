import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="relative inline-block text-left">
      <div className="message">
        <div className="dp cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <img
            src="/user.png"
            className="dpicn w-8 h-8 rounded-full"
            alt="dp"
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1 text-sm text-gray-700">
            {isAdmin && (
              <button
                onClick={handleRegister}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                Register New User
              </button>
            )}
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
