import { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { contactsReducer } from "./reducer";
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT } from "./types";

//create context(for data managing)
export const ContactContext = createContext();

const initialContacts = [
  {
    id: "1",
    firstName: "Barbette",
    lastName: "Pfertner",
    email: "bpfertner0@drupal.org",
    profession: "Web Developer",
    gender: "female",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    dateOfBirth: new Date(),
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
    dateOfBirth: new Date(),
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
    dateOfBirth: new Date(),
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
    dateOfBirth: new Date(),
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
    dateOfBirth: new Date(),
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
    dateOfBirth: new Date(),
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
    dateOfBirth: new Date(),
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
    dateOfBirth: new Date(),
    bio: "Protecting digital assets.",
  },
];

//create provider(for data providing)
export const ContactProvider = ({ children }) => {
  const [contacts, dispatch] = useReducer(contactsReducer, initialContacts);

  //delete contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  //update contact
  const updateContact = (contactToUpdate, id) => {
    // const contactsWithUpdate = contacts.map((contact) => {
    //   if (contact?.id === id) {
    //     return {
    //       id: id,
    //       ...contactToUpdate,
    //     };
    //   } else {
    //     return contact;
    //   }
    // });

    dispatch({ type: UPDATE_CONTACT, payload: { contactToUpdate, id } });
    // setContacts(contactsWithUpdate);
  };

  //add contact
  const addContact = (contact) => {
    dispatch({ type: ADD_CONTACT, payload: contact });
    // setContacts([contactToAdd, ...contacts]);
  };
  const value = {
    contacts,
    deleteContact,
    updateContact,
    addContact,
  };
  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};
