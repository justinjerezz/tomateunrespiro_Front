import * as Yup from "yup";

export function initialValues(user){
    return {
        avatar: user?.avatar || "",
        fileAvatar:null,
        name:user?.name || "",
        surnames:user?.surnames || "",
        email:user?.email || "",
        role:user?.role || "",
        password:"",
    }
}


export function validationSchema(user){
    return Yup.object({
        name:Yup.string().required(true),
        surnames:Yup.string().required(true),
        email:Yup.string().email(true).required(true),
        role:Yup.string().required(true),
        password:user ? Yup.string() :  Yup.string().required(true)
    })
}