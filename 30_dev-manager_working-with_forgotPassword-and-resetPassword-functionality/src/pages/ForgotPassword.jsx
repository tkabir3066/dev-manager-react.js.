import React, { useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import FormTextInput from "../layouts/FormTextInput";
import { AuthContext } from "../context/Auth.Context";
import { axiosPublicInstance } from "../config/axios";
import { toast } from "react-toastify";
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

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublicInstance.post("/auth/forgot-password", {
        email: data.email,
      });

      console.log(response.data.ok);
      toast.success("Email sent successfully with password reset link");
    } catch (err) {
      console.log(err.response);
      toast.error(err?.response?.data?.error?.message);
    }
  };
  return (
    <>
      <h2 className="text-center">Forgot Password</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          type="email"
          name="email"
          label="Email"
          defaultValue="tutulkbr@gmail.com"
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
