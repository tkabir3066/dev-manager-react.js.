import React from "react";
import Contact from "./Contact";

function Contacts({ contacts }) {
  return (
    <>
      <h2 className="text-center">All Contacts</h2>
      {contacts.map((contact) => (
        <Contact key={contact?.id} contact={contact} />
      ))}
    </>
  );
}

export default Contacts;
