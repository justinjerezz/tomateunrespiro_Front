import * as Yup from "yup";

export function initialValues() {
  return {
    name:"",
    surnames:"",
    email: "",
    password: "",
    repeatPassword: "",
    conditionsAccepted: false,
  };
}

export function validationSchema() {
  return Yup.object({
    name:Yup.string().required("Campo obligatorio"),
    surnames:Yup.string().required("Campo obligatorio"),
    email: Yup.string()
      .email("El email no es valido")
      .required("Campo obligatorio"),
    password: Yup.string().required("Campo obligatorio"),
    repeatPassword: Yup.string()
      .required("Campo obligatorio")
      .oneOf([Yup.ref("password")], "Las contraseñas tienen que ser iguales"),
    conditionsAccepted: Yup.bool().isTrue(true),
  });
}
