import React, { useState } from "react";
import Contacts from "./contacts/Contacts";
import Header from "./layouts/Header";
import { Container } from "react-bootstrap";
import AddContact from "./contacts/AddContact";
import { v4 as uuidv4 } from "uuid";

const initialContacts = [
  {
    id: 1,
    firstName: "Barbette",
    lastName: "Pfertner",
    email: "bpfertner0@drupal.org",
    profession: "Web Developer",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    dateOfBirth: "17/05/1996",
    bio: "All about me.",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    profession: "Software Engineer",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    dateOfBirth: "22/08/1990",
    bio: "Passionate coder and tech enthusiast.",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    profession: "Graphic Designer",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/85.jpg",
    dateOfBirth: "10/11/1992",
    bio: "Creativity is my forte.",
  },
  {
    id: 4,
    firstName: "Michael",
    lastName: "Johnson",
    email: "mjohnson@example.com",
    profession: "Product Manager",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    dateOfBirth: "15/03/1988",
    bio: "Bringing ideas to life.",
  },
  {
    id: 5,
    firstName: "Emma",
    lastName: "Williams",
    email: "emma.williams@example.com",
    profession: "Data Analyst",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
    dateOfBirth: "28/09/1994",
    bio: "Turning data into decisions.",
  },
  {
    id: 6,
    firstName: "Robert",
    lastName: "Brown",
    email: "robert.brown@example.com",
    profession: "UX Designer",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/78.jpg",
    dateOfBirth: "19/01/1987",
    bio: "Designing intuitive user experiences.",
  },
  {
    id: 7,
    firstName: "Sophia",
    lastName: "Taylor",
    email: "sophia.taylor@example.com",
    profession: "Marketing Specialist",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    dateOfBirth: "05/07/1995",
    bio: "Connecting brands with people.",
  },
  {
    id: 8,
    firstName: "David",
    lastName: "Martinez",
    email: "david.martinez@example.com",
    profession: "Cybersecurity Analyst",
    gender: "Male",
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

  const addContact = (contact) => {
    const contactToAdd = {
      id: uuidv4(),
      ...contact,
    };

    setContacts([contactToAdd, ...contacts]);
  };
  return (
    <>
      <Header />
      <Container style={{ width: "800px", margin: "0 auto" }} className="pt-2">
        <AddContact addContact={addContact} />
        <Contacts
          contacts={contacts}
          deleteContact={deleteContact}
          addContact={addContact}
        />
      </Container>
    </>
  );
}

export default App;
