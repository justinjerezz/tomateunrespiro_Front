import React, { useCallback } from "react";
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { Post } from "../../../../api";
import { Auth } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
import { initialValues, validationSchema } from "./PostForm.form";
import "./PostForm.scss";

const postController = new Post();
const authController = new Auth();

export function PostForm(props) {
  const { onClose, onReload, post } = props;
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(post),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      formValue.idUserCreate = authController.getIdUser();
      try {
        if (post) {
          await postController.updatePost(accessToken, post._id, formValue);
        } else {
          await postController.createPost(accessToken, formValue);
        }

        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    formik.setFieldValue("miniature", URL.createObjectURL(file));
    formik.setFieldValue("file", file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] },
    onDrop,
  });

  const getMiniature = () => {
    if (formik.values.file) {
      return formik.values.miniature;
    } else if (formik.values.miniature) {
      return `${ENV.BASE_PATH}/${formik.values.miniature}`;
    }
    return null;
  };

  return (
    <Form className="post-form" onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="title"
          placeholder="Titulo de la publicación"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
        ></Form.Input>

        <Form.Input
          name="city"
          placeholder="Ciudad o Direccion"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city}
        ></Form.Input>
        <Form.Input
          name="path"
          placeholder="nombre de la ruta en la web"
          onChange={formik.handleChange}
          value={formik.values.path}
          error={formik.errors.path}
        ></Form.Input>
      </Form.Group>

      <Editor
        init={{
          //CONFIGURACION 1 EDITOR

          //     height: 500,
          // menubar: false,
          // plugins: [
          //    'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
          //    'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
          //    'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
          // ],
          // toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
          //    'alignleft aligncenter alignright alignjustify | ' +
          //    'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
          // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'

          //CONFIGURACION 2 EDITOR

          height: 400,
          menubar: true,
          placeholder:"Añade una descripción de la ruta",
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            // eslint-disable-next-line no-multi-str
            "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
        }}
        initialValue={formik.values.content}
        onBlur={(e) => formik.setFieldValue("content", e.target.getContent())}
      ></Editor>

      <div className="post-form__miniature" {...getRootProps()}>
        <input {...getInputProps()}></input>
        {getMiniature() ? (
          <Image size="small" src={getMiniature()}></Image>
        ) : (
          <div>
            <span>Arrastra tu imagen</span>
          </div>
        )}
      </div>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {post ? "Actualizar post" : "Crear post"}
      </Form.Button>
    </Form>
  );
}
