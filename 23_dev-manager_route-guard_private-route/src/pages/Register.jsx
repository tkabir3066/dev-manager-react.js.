import React, { useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormTextInput from "../layouts/FormTextInput";
import { AuthContext } from "../context/Auth.Context";
// schema validation
const schema = yup.object({
  username: yup
    .string()
    .required("username is Required")
    .min(5, "username must be 5 or more character in length"),
  email: yup
    .string()
    .email("Must be a valid email")
    .lowercase()
    .required("Email is Required"),
  password: yup
    .string()
    .required("password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: yup
    .string()
    .required("confirm Password is Required")
    .oneOf([yup.ref("password")], "confirm password doesn't match"),
});
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { registerUser } = useContext(AuthContext);
  const onSubmit = (data) => {
    const { username, email, password } = data;
    //registering user
    registerUser({ username: username, email: email, password: password });
  };
  return (
    <>
      <h2 className="text-center">Register Page</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          type="text"
          name="username"
          label="User Name"
          defaultValue="tutul"
          register={register}
          errors={errors}
          placeholder="Enter Your User Name"
        />
        <FormTextInput
          type="email"
          name="email"
          label="Email"
          defaultValue="tkabir3066@gmail.com"
          register={register}
          errors={errors}
          placeholder="Enter Your Email Id"
        />
        <FormTextInput
          name="password"
          label="password"
          placeholder="Enter password"
          errors={errors}
          register={register}
          type="password"
          defaultValue="abcdeFf1@"
        />
        <FormTextInput
          name="confirmPassword"
          label="confirm Password"
          placeholder="Confirm password"
          errors={errors}
          register={register}
          type="password"
          defaultValue="abcdeFf1@"
        />

        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={isSubmitting ? "disabled" : ""}
          className="text-center d-inline-block w-auto"
        >
          Register
        </Button>
      </Form>
    </>
  );
}

export default Register;
