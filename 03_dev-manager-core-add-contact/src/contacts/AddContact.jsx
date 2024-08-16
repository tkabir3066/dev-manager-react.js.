import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

function AddContact({ addContact }) {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profession: "",
    gender: "male",
    dateOfBirth: new Date(),
    image: "",
    bio: "",
  });

  const {
    firstName,
    lastName,
    email,
    profession,
    gender,
    dateOfBirth,
    image,
    bio,
  } = contact;

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contact);
    console.log("Submitted Successfully");
    // checking validation

    //form submission
    addContact(contact);
    setContact({
      firstName: "",
      lastName: "",
      email: "",
      profession: "",
      gender: "male",
      dateOfBirth: new Date(),
      image: "",
      bio: "",
    });
  };
  return (
    <>
      <h2 className="text-center">Add Contact</h2>
      <Form onSubmit={handleSubmit}>
        {/* firstName field */}
        <Form.Group as={Row} className="mb-3">
          <Col xs={3}>
            <Form.Label htmlFor="firstName" column>
              First Name
            </Form.Label>
          </Col>
          <Col xs={9}>
            <Form.Control
              type="text"
              name="firstName"
              id="firstName"
              onChange={handleChange}
              value={firstName}
              placeholder="Enter First Name"
            />
          </Col>
        </Form.Group>
        {/* lastName field */}
        <Form.Group as={Row} className="mb-3">
          <Col xs={3}>
            <Form.Label htmlFor="lastName" column>
              Last Name
            </Form.Label>
          </Col>
          <Col xs={9}>
            <Form.Control
              type="text"
              name="lastName"
              id="filaName"
              onChange={handleChange}
              value={lastName}
              placeholder="Enter Last Name"
            />
          </Col>
        </Form.Group>
        {/* email field */}
        <Form.Group as={Row} className="mb-3">
          <Col xs={3}>
            <Form.Label htmlFor="email" column>
              Email Id
            </Form.Label>
          </Col>
          <Col xs={9}>
            <Form.Control
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={email}
              placeholder="Enter Your Email Id"
            />
          </Col>
        </Form.Group>
        {/* profession field */}
        <Form.Group as={Row} className="mb-3">
          <Col xs={3}>
            <Form.Label htmlFor="profession" column>
              Profession
            </Form.Label>
          </Col>
          <Col xs={9}>
            <Form.Control
              type="text"
              name="profession"
              id="profession"
              onChange={handleChange}
              value={profession}
              placeholder="Enter Your Profession"
            />
          </Col>
        </Form.Group>
        {/* image field */}
        <Form.Group as={Row} className="mb-3">
          <Col xs={3}>
            <Form.Label htmlFor="image" column>
              Profile Picture
            </Form.Label>
          </Col>
          <Col xs={9}>
            <Form.Control
              type="text"
              name="image"
              id="image"
              onChange={handleChange}
              value={image}
              placeholder="Enter Your Profile Picture URL"
            />
          </Col>
        </Form.Group>

        {/* dateOfBirth field */}
        <Form.Group as={Row} className="mb-3">
          <Col xs={3}>
            <Form.Label htmlFor="dateOfBirth" column>
              Email Id
            </Form.Label>
          </Col>
          <Col xs={9}>
            <Form.Control
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              onChange={handleChange}
              value={dateOfBirth}
              placeholder="Enter Your Date of Birth"
            />
          </Col>
        </Form.Group>

        {/* gender field */}
        <Form.Group as={Row} className="mb-3">
          <Col xs={3}>
            <Form.Label htmlFor="gender" column>
              Gender
            </Form.Label>
          </Col>
          <Col xs="auto">
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={handleChange}
            />
          </Col>
          <Col xs="auto">
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value="Female"
              checked={gender === "Female"}
              onChange={handleChange}
            />
          </Col>
          <Col xs="auto">
            <Form.Check
              type="radio"
              label="Other"
              name="gender"
              value="other"
              checked={gender === "other"}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        {/* Bio field */}
        <Form.Group as={Row} className="mb-3">
          <Col xs={3}>
            <Form.Label htmlFor="bio" column>
              Bio
            </Form.Label>
          </Col>
          <Col xs={9}>
            <Form.Control
              as="textarea"
              type="text"
              name="bio"
              id="bio"
              onChange={handleChange}
              value={bio}
              placeholder="Enter Your Bio"
            />
          </Col>
        </Form.Group>

        <Button variant="primary" size="md" type="submit">
          Add Contact
        </Button>
      </Form>
    </>
  );
}

export default AddContact;
