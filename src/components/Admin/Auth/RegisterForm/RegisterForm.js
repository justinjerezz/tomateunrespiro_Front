import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import {Auth} from "../../../../api";
import { initialValues, validationSchema } from "./RegisterForm.form";
import "./RegisterForm.scss";


const authController = new Auth();


export function RegisterForm(props) {
  const {openLogin}=props;
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema:validationSchema,
    validateOnChange:false,
    onSubmit: async (formValue) => {
      try {
        setError("");
        await authController.register(formValue)
        openLogin();
      } catch (error) {
        setError("El correo introducido ya existe");
      }
    },
  });

  return (
    <Form className="register-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        placeholder="Nombre"
        onChange={formik.handleChange}
        value={formik.values.name}
        error={formik.errors.name}
      ></Form.Input>
      <Form.Input
        name="surnames"
        placeholder="Apellidos"
        onChange={formik.handleChange}
        value={formik.values.surnames}
        error={formik.errors.surnames}
      ></Form.Input>
      <Form.Input
        name="email"
        placeholder="Correo electrónico"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />

      <Form.Input
        name="password"
        placeholder="Contraseña"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />

      <Form.Input
        name="repeatPassword"
        placeholder="Repetir contraseña"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      />

      <Form.Checkbox
        name="conditionsAccepted"
        label="He leído y acepto las políticas de privacidad"
        onChange={(_,data)=>formik.setFieldValue("conditionsAccepted",data.checked)}
        checked={formik.values.conditionsAccepted}
        error={formik.errors.conditionsAccepted}
      >
      </Form.Checkbox>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Crear cuenta
      </Form.Button>

      <p className="register-form__error">{error}</p>
    </Form>
  );
}
