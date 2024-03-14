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
import { VideoList } from "./features/videos/VideoList";
import { AddVideo } from "./features/videos/AddVideo";

const ProtectedRoute = ({ isLoggedIn, redirectPath = "/" }) => {
  if (!isLoggedIn) {
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
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <VideoList />
              </Layout>
            }
          />
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route
              path="/share"
              element={
                <Layout>
                  <AddVideo />
                </Layout>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
