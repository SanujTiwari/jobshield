import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between">
      <h1 className="text-2xl font-bold">
        JobShield
      </h1>

      <button
        onClick={logoutHandler}
        className="bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;