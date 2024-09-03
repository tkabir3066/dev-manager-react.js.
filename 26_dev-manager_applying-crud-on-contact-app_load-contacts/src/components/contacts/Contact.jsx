import React, { useContext } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { FaEye, FaRegTrashCan } from "react-icons/fa6";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ContactContext } from "../../context/Contact.context";

function Contact({ contact }) {
  const { deleteContact } = useContext(ContactContext);
  const {
    id,
    firstName,
    lastName,
    email,
    image,
    profession,
    dateOfBirth,
    gender,
    bio,
  } = contact;

  // console.log(bio);
  const handleDelete = (id) => {
    // flush message
    toast.success("Contact is deleted successfully");
    deleteContact(id);
  };

  return (
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
          <Card.Text>Bio: {bio[0].children[0].text}</Card.Text>

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
            <Card.Link as={Link} to={`/contacts/${id}`}>
              <Button variant="warning ms-3" size="md" type="view">
                <FaEye />
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
  );
}

export default Contact;
