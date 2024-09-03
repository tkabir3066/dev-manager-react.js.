import {
  ADD_CONTACT,
  DELETE_CONTACT,
  LOAD_CONTACTS,
  UPDATE_CONTACT,
} from "./types";
import { v4 as uuidv4 } from "uuid";

export const contactsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    //load contacts
    case LOAD_CONTACTS:
      return [...action.payload];

    //delete contact
    case DELETE_CONTACT:
      const updatedContacts = state.filter((contact) => contact.id !== payload);
      return [...updatedContacts];

    //update contact
    case UPDATE_CONTACT:
      const { contactToUpdate, id } = payload;
      const contacts = state.map((contact) => {
        if (contact.id === id) {
          return {
            id: id,
            ...contactToUpdate,
          };
        } else {
          return contact;
        }
      });

      return [...contacts];

    //add contact
    case ADD_CONTACT:
      const contactToAdd = {
        id: uuidv4(),
        ...payload,
      };
      return [contactToAdd, ...state];

    default:
      return state;
  }
};
