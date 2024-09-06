import React, { useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import FormTextInput from "../layouts/FormTextInput";
import { AuthContext } from "../context/Auth.Context";
import { axiosPublicInstance } from "../config/axios";
import { toast } from "react-toastify";
// schema validation
const schema = yup.object({
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
function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const code = searchParams.get("code");

    try {
      const response = await axiosPublicInstance.post("/auth/reset-password", {
        code: code,
        password: data.password,
        passwordConfirmation: data.confirmPassword,
      });
      console.log(response.data);
      toast.success(
        "Password resetted successfully, now you can login with updated password"
      );
      navigate("/login");
    } catch (err) {
      console.log(err.response);
      toast.error("Issue in Resetting password please try again");
    }
  };
  return (
    <>
      <h2 className="text-center">Reset Password</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          type="password"
          name="password"
          label="Password"
          placeholder="Enter password"
          errors={errors}
          register={register}
        />
        <FormTextInput
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          errors={errors}
          register={register}
        />

        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={isSubmitting ? "disabled" : ""}
          className="text-center d-inline-block w-auto"
        >
          Reset Password
        </Button>
      </Form>
    </>
  );
}

export default ResetPassword;
