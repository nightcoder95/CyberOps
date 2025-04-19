import { useState } from "react";
import HomePage from "./components/HomePage/HomePage.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateRecord from "./components/CreateRecord/CreateRecord.jsx";
import UpdateRecord from "./components/UpdateRecord/UpdateRecord";
import DeleteRecord from "./components/DeleteRecord/DeleteRecord";
import RecordDetail from "./components/RecordDetail/RecordDetail";
import Login from "./components/LoginPage/Login";
import Register from "./components/RegisterPage/Register";
import AdminRoute from "./components/LoginPage/AdminRoute.jsx";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import AllRecords from "./components/AllRecords/AllRecords.jsx";
import "./App.css";
import ProtectedRoute from "./components/LoginPage/ProtectedRoute.jsx";
import AllProfiles from "./components/AllProfiles/AllProfiles.jsx";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/data-table",
      element: (
        <ProtectedRoute>
          <AllRecords />
        </ProtectedRoute>
      ),
    },
    {
      path: "/all-profiles",
      element: (
        <ProtectedRoute>
          <AllProfiles />
        </ProtectedRoute>
      ),
    },
    {
      path: "/create-record",
      element: (
        <ProtectedRoute>
          <CreateRecord />
        </ProtectedRoute>
      ),
    },
    {
      path: "/update-record/:id",
      element: (
        <ProtectedRoute>
          <UpdateRecord />
        </ProtectedRoute>
      ),
    },
    {
      path: "/delete-record/:id",
      element: (
        <ProtectedRoute>
          <DeleteRecord />
        </ProtectedRoute>
      ),
    },
    {
      path: "/record-detail/:id",
      element: (
        <ProtectedRoute>
          <RecordDetail />
        </ProtectedRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <AdminRoute>
          <Register />
        </AdminRoute>
      ),
    },
  ]);

  return (
    <>
      <div className="">
        <RouterProvider router={route}></RouterProvider>
      </div>
    </>
  );
}

export default App;
