import React from "react";
import { Form, Row, Col } from "react-bootstrap";
function FormTextInput({
  name,
  label,
  placeholder,
  type,
  errors,
  register,
  defaultValue,
  ...rest
}) {
  return (
    <Form.Group as={Row} className="mb-3">
      <Col xs={3}>
        <Form.Label htmlFor={name} column>
          {label}
        </Form.Label>
      </Col>
      <Col xs={9}>
        <Form.Control
          type={type}
          id={name}
          defaultValue={defaultValue}
          {...register(name)}
          isInvalid={errors?.name}
          placeholder={placeholder}
          {...rest}
        />
        <Form.Control.Feedback type="invalid" className="d-block">
          {errors[name]?.message}
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
}

export default FormTextInput;
