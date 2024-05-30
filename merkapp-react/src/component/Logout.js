import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("user");
    // Redirige al inicio de sesión
    navigate("/login");
  }, [navigate]);

  return null;
}

export default Logout;
