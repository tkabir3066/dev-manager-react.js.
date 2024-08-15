import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { FaEye, FaRegTrashCan } from "react-icons/fa6";

function Contact({ contact }) {
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
  console.log(contact);
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
          <Card.Text>Bio: {bio}</Card.Text>

          <ListGroup className="list-group-flush">
            <ListGroup.Item>Gender: {gender}</ListGroup.Item>
            <ListGroup.Item>Email: {email}</ListGroup.Item>
            <ListGroup.Item>D.O.B: {dateOfBirth}</ListGroup.Item>
          </ListGroup>

          <div className="card-btn mt-3">
            <Card.Link href="#">
              <Button variant="warning ms-3" size="md" type="view">
                <FaEye />
              </Button>
            </Card.Link>
            <Card.Link href="#">
              <Button variant="danger" size="md">
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
