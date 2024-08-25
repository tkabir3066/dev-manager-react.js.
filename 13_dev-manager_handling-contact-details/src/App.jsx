import React, { useState } from "react";
import Contacts from "./pages/Contacts";
import Header from "./layouts/Header";
import { Container } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import ContactDetails from "./pages/ContactDetails";

const initialContacts = [
  {
    id: "1",
    firstName: "Barbette",
    lastName: "Pfertner",
    email: "bpfertner0@drupal.org",
    profession: "Web Developer",
    gender: "female",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    dateOfBirth: "17/05/1996",
    bio: "All about me.",
  },
  {
    id: "2",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    profession: "Software Engineer",
    gender: "male",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    dateOfBirth: "22/08/1990",
    bio: "Passionate coder and tech enthusiast.",
  },
  {
    id: "3",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    profession: "Graphic Designer",
    gender: "female",
    image: "https://randomuser.me/api/portraits/women/85.jpg",
    dateOfBirth: "10/11/1992",
    bio: "Creativity is my forte.",
  },
  {
    id: "4",
    firstName: "Michael",
    lastName: "Johnson",
    email: "mjohnson@example.com",
    profession: "Product Manager",
    gender: "male",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    dateOfBirth: "15/03/1988",
    bio: "Bringing ideas to life.",
  },
  {
    id: "5",
    firstName: "Emma",
    lastName: "Williams",
    email: "emma.williams@example.com",
    profession: "Data Analyst",
    gender: "female",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
    dateOfBirth: "28/09/1994",
    bio: "Turning data into decisions.",
  },
  {
    id: "6",
    firstName: "Robert",
    lastName: "Brown",
    email: "robert.brown@example.com",
    profession: "UX Designer",
    gender: "male",
    image: "https://randomuser.me/api/portraits/men/78.jpg",
    dateOfBirth: "19/01/1987",
    bio: "Designing intuitive user experiences.",
  },
  {
    id: "7",
    firstName: "Sophia",
    lastName: "Taylor",
    email: "sophia.taylor@example.com",
    profession: "Marketing Specialist",
    gender: "female",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    dateOfBirth: "05/07/1995",
    bio: "Connecting brands with people.",
  },
  {
    id: "8",
    firstName: "David",
    lastName: "Martinez",
    email: "david.martinez@example.com",
    profession: "Cybersecurity Analyst",
    gender: "male",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    dateOfBirth: "23/10/1991",
    bio: "Protecting digital assets.",
  },
];

function App() {
  const [contacts, setContacts] = useState(initialContacts);

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);

    setContacts(updatedContacts);
  };

  const updateContact = (contactToUpdate, id) => {
    const contactsWithUpdate = contacts.map((contact) => {
      if (contact?.id === id) {
        return {
          id: id,
          ...contactToUpdate,
        };
      } else {
        return contact;
      }
    });

    setContacts(contactsWithUpdate);
  };

  const addContact = (contact) => {
    const contactToAdd = {
      id: uuidv4(),
      ...contact,
    };

    setContacts([contactToAdd, ...contacts]);
  };
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
            <Route
              path="/contacts"
              index
              element={
                <Contacts
                  contacts={contacts}
                  deleteContact={deleteContact}
                  addContact={addContact}
                />
              }
            />
            <Route
              path="/add-contact"
              element={<AddContact addContact={addContact} />}
            />
            <Route
              path="/contacts/:id"
              element={
                <ContactDetails
                  contacts={contacts}
                  deleteContact={deleteContact}
                />
              }
            />
            <Route
              path="/edit-contact/:id"
              element={
                <EditContact
                  contacts={contacts}
                  updateContact={updateContact}
                />
              }
            />
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
