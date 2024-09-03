import React, { useContext } from "react";
import Contact from "../components/contacts/Contact";
import { ContactContext } from "../context/Contact.context";
import Loader from "../components/Loader";

function Contacts() {
  const { contacts, loaded } = useContext(ContactContext);
  return (
    <>
      <h2 className="text-center">All Contacts</h2>
      {loaded ? (
        contacts.map((contact) => (
          <Contact key={contact?.id} contact={contact} />
        ))
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Contacts;
