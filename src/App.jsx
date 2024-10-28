import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./functionalApp/pages/homepage";
import MyProfile from "./functionalApp/pages/profile";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <h1>React App</h1>
        <h1>Myspace</h1>
        <div className="container">
          <nav className="navbar">
            <div className="navbar-left">
              <h2>React</h2>
            </div>
            <div className="navbar-right">
              <ul>
                <li>
                  <Link to="/">Homepage</Link>
                </li>
                <li>
                  <Link to="/subscriptions">My Subscriptions</Link>
                </li>
                <li>
                  <Link to="/profile">My Profile</Link>
                </li>
                <li>My Friends</li>
              </ul>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/subscriptions"
              element={<div>My Subscriptions Page</div>}
            />
            <Route path="/profile" element={<MyProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
