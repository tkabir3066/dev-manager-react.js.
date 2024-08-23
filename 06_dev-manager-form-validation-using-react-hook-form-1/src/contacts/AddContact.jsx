import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required("First Name is Required"),
});
function AddContact({ addContact }) {
  // const [contact, setContact] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   profession: "",
  //   gender: "male",
  //   image: "",
  //   bio: "",
  // });

  const [startDate, setStartDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const { firstName, lastName, email, profession, gender, image, bio } =
  //   contact;

  //    const handleChange = (e) => {
  //   setContact({
  //     ...contact,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(contact);
  //   console.log("Submitted Successfully");
  //   // checking validation

  //   //form submission
  //   addContact(contact);
  //   setContact({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     profession: "",
  //     gender: "male",
  //     dateOfBirth: new Date(),
  //     image: "",
  //     bio: "",
  //   });
  // };

  const validateImageUrl = (url) => {
    // Regex pattern to validate common image extensions
    const pattern = /\.(jpeg|jpg|gif|png|webp)$/i;
    return (
      pattern.test(url) ||
      "Invalid image URL. Only .jpeg, .jpg, .gif, .png, and .webp are allowed."
    );
  };
  const onSubmit = (data) => {
    addContact(data);
  };
  return (
    <>
      <h2 className="text-center">Add Contact</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
              defaultValue=""
              {...register("firstName", {
                required: "FirstName is required",
                minLength: { value: 3, message: "Length must be minimum 3" },
              })}
              isInvalid={errors?.firstName}
              placeholder="Enter First Name"
            />
            <Form.Control.Feedback type="invalid">
              {errors?.firstName?.message}
            </Form.Control.Feedback>
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
              id="lastName"
              defaultValue=""
              {...register("lastName", {
                required: "lastName is required",
                minLength: { value: 3, message: "Length must be minimum 3" },
              })}
              isInvalid={errors?.lastName}
              placeholder="Enter Last Name"
            />

            <Form.Control.Feedback type="invalid">
              {errors?.lastName?.message}
            </Form.Control.Feedback>
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
              defaultValue=""
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email is not Valid",
                },
              })}
              isInvalid={errors?.email}
              placeholder="Enter Your Email Id"
            />
            <Form.Control.Feedback type="invalid">
              {errors?.email?.message}
            </Form.Control.Feedback>
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
              defaultValue=""
              {...register("profession", {
                required: "Profession is required",
              })}
              isInvalid={errors?.profession}
              placeholder="Enter Your Profession"
            />
            <Form.Control.Feedback type="invalid">
              {errors?.profession?.message}
            </Form.Control.Feedback>
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
              defaultValue=""
              {...register("image", {
                required: "Profile Picture Url is required",
                validate: validateImageUrl,
              })}
              isInvalid={errors?.image}
              placeholder="Enter Your Profile Picture URL"
            />
            <Form.Control.Feedback type="invalid">
              {errors?.image?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        {/* dateOfBirth field */}

        <Form.Group as={Row} className="mb-3">
          <Col xs={3}>
            <Form.Label htmlFor="dateOfBirth" column>
              Date Of Birth
            </Form.Label>
          </Col>
          <Col xs={9}>
            <DatePicker
              selected={startDate}
              name="dateOfBirth"
              id="dateOfBirth"
              onChange={(date) => setStartDate(date)}
              maxDate={new Date()}
              // peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
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
            <Form.Check type="radio" label="Male" name="gender" value="Male" />
          </Col>
          <Col xs="auto">
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value="Female"
            />
          </Col>
          <Col xs="auto">
            <Form.Check
              type="radio"
              label="Other"
              name="gender"
              value="other"
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
              {...register("bio", {
                required: "Bio is required",
                minLength: { value: 10, message: "Length must be minimum 10" },
                maxLength: {
                  value: 300,
                  message: "Maximum length should be upto 300",
                },
              })}
              isInvalid={errors?.bio}
              placeholder="Enter Your Bio"
            />
            <Form.Control.Feedback type="invalid">
              {errors?.bio?.message}
            </Form.Control.Feedback>
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
