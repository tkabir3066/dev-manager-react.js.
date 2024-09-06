import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { ContactContext } from "../../context/Contact.context";
import FormTextInput from "../../layouts/FormTextInput";
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
    .lowercase()
    .required("Email is required"),
  profession: yup
    .string()
    .required("Profession is Required")
    .oneOf(["developer", "designer", "marketer"]),
  gender: yup.string().lowercase().required("Gender is Required"),
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

  const defaultValues = {
    firstName: contact?.firstName || "Tutul",
    lastName: contact?.lastName || "Kabir",
    email: contact?.email || "tutulkabir@gmail.com",
    profession: contact?.firstName || "developer",
    gender: contact?.firstName || "male",
    image: contact?.image || "https://randomuser.me/api/portraits/men/33.jpg",
    dateOfBirth: contact?.dateOfBirth || new Date(),
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

  const [startDate, setStartDate] = useState(
    dateOfBirth ? dateOfBirth : new Date()
  );
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
    // console.log(data);
    if (contact?.id) {
      //show flash message
      toast.success("Contact Updated successfully");
      updateContact(data, contact?.id);
    } else {
      //adding contacts
      addContact(data);
    }
  };
  return (
    <>
      <h2 className="text-center">
        {contact?.id ? "Edit Contact" : "Add Contact"}
      </h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* firstName field */}

        <FormTextInput
          type="text"
          name="firstName"
          label="First Name"
          defaultValue={firstName}
          register={register}
          errors={errors}
          placeholder="Enter Your First Name"
        />

        {/* lastName field */}
        <FormTextInput
          type="text"
          name="lastName"
          label="Last Name"
          defaultValue={lastName}
          register={register}
          errors={errors}
          placeholder="Enter Your Last Name"
        />

        {/* email field */}
        <FormTextInput
          type="email"
          name="email"
          label="Email"
          defaultValue={email}
          register={register}
          errors={errors}
          placeholder="Enter Your Email Id"
        />

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

        <FormTextInput
          type="url"
          name="image"
          label="Image"
          defaultValue={image}
          register={register}
          errors={errors}
          placeholder="Enter Your Profile Picture Url"
        />

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

        <FormTextInput
          as="textarea"
          type="text"
          name="bio"
          label="Bio"
          defaultValue={bio}
          register={register}
          errors={errors}
          placeholder="Enter Your Bio"
        />

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
