import React, { useContext, useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ContactContext } from "../context/Contact.context";

function ContactDetails() {
  const [contact, setContact] = useState({});
  const { contacts, deleteContact } = useContext(ContactContext);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const foundContact = contacts.find((contact) => contact.id === +id);

  useEffect(() => {
    if (id && foundContact) {
      setContact(foundContact);
    }
  }, [id]);

  const {
    firstName,
    lastName,
    email,
    image,
    profession,
    dateOfBirth,
    gender,
    bio,
  } = contact;

  const handleDelete = (id) => {
    deleteContact(id);
  };

  return (
    <>
      <h2>Contact Details</h2>
      {Object.keys(contact).length === 0 ? (
        <p>No Contact to show</p>
      ) : (
        <Card className="mb-3">
          <div className="d-flex">
            <Card.Img variant="top" className="card-img" src={image} />
            <Card.Body>
              <Card.Title className="text-dark">
                Name: {firstName} {lastName}
              </Card.Title>
              <Card.Subtitle className="text-muted mb-3">
                Profession: {profession}
              </Card.Subtitle>
              <Card.Text>Bio: {bio}</Card.Text>

              <ListGroup className="list-group-flush">
                <ListGroup.Item>Gender: {gender}</ListGroup.Item>
                <ListGroup.Item>Email: {email}</ListGroup.Item>
                <ListGroup.Item>
                  D.O.B:{" "}
                  {dateOfBirth instanceof Object
                    ? format(dateOfBirth, "dd/MM/yyyy")
                    : dateOfBirth}
                </ListGroup.Item>
              </ListGroup>

              <div className="card-btn mt-3">
                <Card.Link as={Link} to={`/edit-contact/${id}`}>
                  <Button variant="warning ms-3" size="md" type="view">
                    <FaPencil />
                  </Button>
                </Card.Link>
                <Card.Link>
                  <Button
                    variant="danger"
                    size="md"
                    onClick={() => handleDelete(id)}
                  >
                    <FaRegTrashCan />
                  </Button>
                </Card.Link>
              </div>
            </Card.Body>
          </div>
        </Card>
      )}
    </>
  );
}

export default ContactDetails;
