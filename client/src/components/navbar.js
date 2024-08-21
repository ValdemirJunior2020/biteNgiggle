import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">RecipeApp</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create-recipe">Create Recipe</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/saved-recipes">Saved Recipes</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {!cookies.access_token ? (
              <li className="nav-item">
                <Link className="nav-link" to="/auth">Login/Register</Link>
              </li>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={logout}> Logout </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
