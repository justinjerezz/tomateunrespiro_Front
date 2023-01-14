import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Newsletter as NewsletterController } from "../../../../api";
import { initialValues, validationSchema } from "./Newsletter.form";
import "./Newsletter.scss";

const newsletterController = new NewsletterController();

export function Newsletter() {
  const [successs, setSuccesss] = useState(1);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setSuccesss(1)
      try {
        await newsletterController.registerEmail(formValue.email);
        formik.resetForm();
        setSuccesss(2);
      } catch (error) {
        setSuccesss(3);
      }
    },
  });

  return (
    <div className="footer-newsletter">
      <h4>¡Apuntate y aprende!</h4>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="email"
          placeholder="Correo electronico"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
          ¡Me suscribo!
        </Form.Button>
        {successs === 1 && (
          <p className="success"></p>
        )}
        {successs === 2 && (
          <p className="success">¡Suscripción realizada con exito!</p>
        )}
        {successs === 3 && (
          <p className="failed">¡Lo siento, este email ya está suscrito!</p>
        )}
      </Form>
    </div>
  );
}
