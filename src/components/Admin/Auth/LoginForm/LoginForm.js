import React, {useState} from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import {Auth} from "../../../../api";
import {useAuth} from "../../../../hooks";
import { initialValues, validationSchema } from "./LoginForm.form";

const authController=new Auth();


export function LoginForm() {

  const {login} = useAuth();
  const [error,setError]=useState([]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError([]);
        const response=await authController.login(formValue);

        authController.setAccessToken(response.access);
        authController.setRefreshToken(response.refresh);
        authController.setIdUser(response.idUser)
        login(response.access);
      } catch (error) {
        setError(error.msg);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      
      <Form.Input
        name="email"
        placeholder="Correo electronico"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      ></Form.Input>

      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      ></Form.Input>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Entrar
      </Form.Button>
      <p className="register-form__error">{error}</p>
    </Form>
  );
}
