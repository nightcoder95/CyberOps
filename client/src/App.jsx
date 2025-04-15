import { useState } from "react";
import HomePage from "./components/HomePage/HomePage.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateRecord from "./components/CreateRecord/CreateRecord.jsx";
import UpdateRecord from "./components/UpdateRecord/UpdateRecord";
import DeleteRecord from "./components/DeleteRecord/DeleteRecord";
import RecordDetail from "./components/RecordDetail/RecordDetail";
import Login from "./components/LoginPage/Login";
// import Register from "./components/Register/Register.jsx";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import AllRecords from "./components/AllRecords/AllRecords.jsx";
import "./App.css";

function App() {
  const route = createBrowserRouter([
    {
      path: "/dashboard",
      element: <HomePage />,
    },
    {
      path: "/data-table",
      element: <AllRecords />,
    },
    {
      path: "/create-record",
      element: <CreateRecord />,
    },
    {
      path: "/update-record/:id",
      element: <UpdateRecord />,
    },
    {
      path: "/delete-record/:id",
      element: <DeleteRecord />,
    },
    {
      path: "/record-detail/:id",
      element: <RecordDetail />,
    },
    {
      path: "/",
      element: <Login />,
    },
    // {
    //   path: "/register",
    //   element: <Register/>,
    // },
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
