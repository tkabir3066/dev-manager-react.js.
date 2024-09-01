import React, { useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormTextInput from "../layouts/FormTextInput";
import { AuthContext } from "../context/Auth.Context";
// schema validation
const schema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .lowercase()
    .required("Email is Required"),
  password: yup.string().required("password is required"),
});
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { login } = useContext(AuthContext);
  const onSubmit = (data) => {
    const { email, password } = data;
    //login user
    login({ identifier: email, password: password });
  };
  return (
    <>
      <h2 className="text-center">Login Page</h2>
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
        <FormTextInput
          name="password"
          label="password"
          placeholder="Enter password"
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
          Login
        </Button>
      </Form>
    </>
  );
}

export default Login;
