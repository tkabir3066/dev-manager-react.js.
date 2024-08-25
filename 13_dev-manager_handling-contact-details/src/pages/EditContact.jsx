import React from "react";
import ContactForm from "../components/contacts/ContactForm";
import { useParams } from "react-router-dom";
function EditContact({ contacts, updateContact }) {
  const params = useParams();
  const { id } = params;

  const contactToFind = contacts.find((contact) => contact.id === id);
  return (
    <>
      <ContactForm contact={contactToFind} updateContact={updateContact} />
    </>
  );
}

export default EditContact;
