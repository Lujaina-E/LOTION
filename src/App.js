import React from "react";
import { useState } from "react";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
import { Outlet, useNavigate } from "react-router-dom";
import View from "./View";
import {
  BrowserRouter as Router,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import MainPage from "./MainPage";
import Empty from "./Empty";
import Edit from "./Edit";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/base/" element={<Empty />} />
          <Route path="view/:id" element={<View />} />
          <Route path="edit/:id" element={<Edit />} />
        </Route>
      </Routes>
    </Router>
  );
}
