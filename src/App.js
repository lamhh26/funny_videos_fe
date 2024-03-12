import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { StyleReset } from "atomize";

import { selectCurrentUser } from "./features/session/sessionSlice";
import { Layout } from "./features/layout/Layout";

const ProtectedRoute = ({ user, redirectPath = "/login" }) => {
  if (!user.id) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

function App() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="App">
      <StyleReset />
      <Router>
        <Routes>
          {currentUser.id ? <Navigate from="/login" to="/" /> : null}
          <Route path="/" element={<Layout />} />
          {/* <Route element={<ProtectedRoute user={currentUser} />}>
            <Route path="/" element={<HomePage />} />
          </Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
