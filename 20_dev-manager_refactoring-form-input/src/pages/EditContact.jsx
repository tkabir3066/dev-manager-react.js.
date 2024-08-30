import React, { useContext } from "react";
import ContactForm from "../components/contacts/ContactForm";
import { useParams } from "react-router-dom";
import { ContactContext } from "../context/Contact.context";
function EditContact() {
  const { contacts } = useContext(ContactContext);
  const params = useParams();
  const { id } = params;

  const contactToFind = contacts.find((contact) => contact.id === id);
  return (
    <>
      <ContactForm contact={contactToFind} />
    </>
  );
}

export default EditContact;
