import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ContactContext } from "../../context/Contact.context";
const schema = yup.object({
  firstName: yup
    .string()
    .required("First Name is Required")
    .min(3, "must be at least 3 characters"),
  lastName: yup
    .string()
    .required("Last Name is Required")
    .min(3, "must be at least 3 characters"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  profession: yup
    .string()
    .required("Profession is Required")
    .oneOf(["developer", "designer", "marketer"]),
  gender: yup.string().required("Gender is Required"),
  image: yup
    .string()
    // .url("Please enter a valid URL")
    .matches(
      /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif|bmp|webp)$/,
      "Please enter a valid image URL (e.g., .jpg, .png)"
    )
    .required("Image URL is required"),

  bio: yup
    .string()
    .required("Bio is Required")
    .min(10, "must be at least 10 characters")
    .max(300, "Bio should be maximum upto 300 characters"),
});
function ContactForm({ contact }) {
  const { updateContact, addContact } = useContext(ContactContext);
  const navigate = useNavigate();
  const defaultValues = {
    firstName: contact?.firstName || "Tutul",
    lastName: contact?.lastName || "Kabir",
    email: contact?.email || "tutulkabir@gmail.com",
    profession: contact?.firstName || "developer",
    gender: contact?.firstName || "male",
    image: contact?.image || "https://randomuser.me/api/portraits/men/33.jpg",
    dateOfBirth: contact?.firstName || new Date(),
    bio: contact?.bio || "This is Tutul Kabir, a talented web developer",
  };

  const {
    firstName,
    lastName,
    email,
    image,
    bio,
    profession,
    dateOfBirth,
    gender,
  } = defaultValues;

  const [startDate, setStartDate] = useState(new Date());
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("dateOfBirth", startDate);
  }, [startDate]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);
  const onSubmit = (data) => {
    if (contact?.id) {
      //show flash message
      toast.success("Contact Updated successfully");
      updateContact(data, contact?.id);
    } else {
      //show flash message
      toast.success("Contact added successfully");
      //adding contacts
      addContact(data);
    }

    navigate("/contacts");
  };
  return (
    <>
      <h2 className="text-center">
        {contact?.id ? "Edit Contact" : "Add Contact"}
      </h2>
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
              id="firstName"
              defaultValue={firstName}
              {...register("firstName")}
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
              id="lastName"
              defaultValue={lastName}
              {...register("lastName")}
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
              id="email"
              defaultValue={email}
              {...register("email")}
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
            {/* <Form.Control
              type="text"
              id="profession"
              defaultValue=""
              {...register("profession")}
              isInvalid={errors?.profession}
              placeholder="Enter Your Profession"
            /> */}
            <Form.Select
              id="profession"
              defaultValue=""
              {...register("profession")}
              isInvalid={errors?.profession}
              aria-label="Select Your Profession"
            >
              <option value="" disabled>
                Select Profession
              </option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="marketer">Marketer</option>
            </Form.Select>
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
              id="image"
              defaultValue={image}
              {...register("image")}
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
            <Form.Check
              type="radio"
              label="Male"
              value="Male"
              {...register("gender")}
              defaultChecked={gender === "male"}
            />
          </Col>
          <Col xs="auto">
            <Form.Check
              type="radio"
              label="Female"
              value="Female"
              {...register("gender")}
              defaultChecked={gender === "female"}
            />
          </Col>
          <Col xs="auto">
            <Form.Check
              type="radio"
              label="Other"
              value="other"
              {...register("gender")}
              defaultChecked={gender === "other"}
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
              id="bio"
              defaultValue={bio}
              {...register("bio")}
              isInvalid={errors?.bio}
              placeholder="Enter Your Bio"
            />
            <Form.Control.Feedback type="invalid">
              {errors?.bio?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={isSubmitting ? true : false}
        >
          {contact?.id ? "Update Contact" : "Add Contact"}
        </Button>
      </Form>
    </>
  );
}

export default ContactForm;
