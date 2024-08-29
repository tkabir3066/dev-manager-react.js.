import React from "react";
import Contacts from "./pages/Contacts";
import Header from "./layouts/Header";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import ContactDetails from "./pages/ContactDetails";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />

      <BrowserRouter>
        <Header />
        <Container
          style={{ width: "800px", margin: "0 auto" }}
          className="pt-2"
        >
          <Routes>
            <Route index element={<Home />} />
            <Route path="/contacts" index element={<Contacts />} />
            <Route path="/add-contact" element={<AddContact />} />
            <Route path="/contacts/:id" element={<ContactDetails />} />
            <Route path="/edit-contact/:id" element={<EditContact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
