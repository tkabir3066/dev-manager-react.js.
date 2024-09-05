import React, { useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import FormTextInput from "../layouts/FormTextInput";
import { AuthContext } from "../context/Auth.Context";
// schema validation
const schema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .lowercase()
    .required("Email is Required"),
});

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {};
  return (
    <>
      <h2 className="text-center">Forgot Password</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          type="email"
          name="email"
          label="Email"
          defaultValue="tkabir3066@gmail.com"
          register={register}
          errors={errors}
          placeholder="Enter Your Email Id"
        />

        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={isSubmitting ? "disabled" : ""}
          className="text-center d-inline-block w-auto"
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

export default ForgotPassword;
