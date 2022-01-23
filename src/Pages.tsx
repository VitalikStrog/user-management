import React from 'react';
import './App.css';
import {
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import { UsersList } from "./pages/UsersList";
import { UserDetails } from "./pages/UserDetails";
import { CreateUser } from "./pages/CreateUser";

const Pages: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:userId" element={<UserDetails />}/>
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="*" element={<UsersList />} />
      </Routes>
    </HashRouter>
  );
}

export default Pages;
