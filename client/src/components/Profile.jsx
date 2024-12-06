import "../index.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5050/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const result = await response.json();
        setUser(result); // Set user data in state
      } catch (error) {
        console.error(error);
        // Navigate to login if fetch fails
        navigate("/login");
      }
    };

    if (token && id) {
      fetchUser();
    } else {
      navigate("/login");
    }
  }, [id, navigate, token]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Loading state while user is being fetched from DB
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Welcome back, {user.name}</h1>
      <div className="profile w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div
              id="dropdown"
              className="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul className="py-2" aria-labelledby="dropdownButton">
                <li>
                  <a
                    href="/update"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="/delete"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={user.picture || "./default_profile.png"}
            alt="profile pic"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Age: {user.age || "N/A"}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Height: {user.feet}&apos; {user.inches}&quot;
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Weight: {user.weight || "N/A"}
          </span>
        </div>
      </div>
    </>
  );
}
