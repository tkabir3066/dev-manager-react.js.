import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { contactsReducer } from "./reducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  LOAD_CONTACTS,
  UPDATE_CONTACT,
} from "./types";
import { axiosPrivateInstance } from "../config/axios";
import { formatContact } from "../utils/formatContacts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./Auth.Context";

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
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      await loadContacts();
    })();
  }, []);
  const loadContacts = async () => {
    try {
      const response = await axiosPrivateInstance.get("/contacts");
      const loadedContacts = response.data.data.map((contact) =>
        formatContact(contact)
      );

      dispatch({ type: LOAD_CONTACTS, payload: loadedContacts });
      setLoaded(true);
    } catch (err) {
      console.log(err.response.data.error.message);
      setLoaded(true);
    }
  };
  //delete contact
  const deleteContact = async (id) => {
    try {
      const response = await axiosPrivateInstance.delete(`/contacts/${id}`);

      //dispatch here
      dispatch({ type: DELETE_CONTACT, payload: response.data.data.id });
      //toast message
      toast.success("Contact deleted successfully");
      // redirecting to the contacts
      navigate("/contacts");
    } catch (err) {
      toast.error(err?.response?.data?.error?.message);
    }
  };

  //update contact
  const updateContact = async (contactToUpdate, id) => {
    try {
      const response = await axiosPrivateInstance.put(`/contacts/${id}`, {
        data: contactToUpdate,
      });

      //dispatch here
      dispatch({ type: UPDATE_CONTACT, payload: response?.data?.data });

      //toast message
      toast.success("Contact updated successfully");

      //redirection to the contacts
      navigate("/contacts");
    } catch (err) {
      toast.error(err?.response?.data?.error?.message);
    }
  };

  //add contact
  const addContact = async (contactData) => {
    contactData = {
      author: user.id,
      ...contactData,
    };
    try {
      const response = await axiosPrivateInstance.post("/contacts", {
        data: contactData,
      });
      const contact = formatContact(response.data.data);

      //dispatch here
      dispatch({ type: ADD_CONTACT, payload: contact });

      //toast message
      toast.success("Contact added successfully");
      //redirecting to the contacts
      navigate("/contacts");
    } catch (err) {
      toast.error(err?.response?.data?.error?.message);
    }
  };
  const value = {
    loaded,
    contacts,
    deleteContact,
    updateContact,
    addContact,
  };
  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};
