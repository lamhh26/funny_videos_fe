import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StyleReset } from "atomize";

import {
  fetchCurrentUser,
  selectIsLoggedIn,
} from "./features/session/sessionSlice";
import { Layout } from "./features/layout/Layout";

const ProtectedRoute = ({ user, redirectPath = "/login" }) => {
  if (!user.id) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div className="App">
      <StyleReset />
      <Router>
        {isLoggedIn ? <Navigate to="/" /> : null}
        <Routes>
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
