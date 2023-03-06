import React from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../store/slices/user";
import { useFormik } from "formik";
import toast from "react-simple-toasts";
// import { toast } from "react-toastify";

const loginValidate = Yup.object().shape({
  username: Yup.string().trim().required("Username is required."),
  password: Yup.string().trim().required("Password is required."),
});

function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitFun = async (values1, errors) => {
    const res = await dispatch(login(values1, errors));
    let data = localStorage.getItem("user");
    if (data) {
      toast("Successfully logged");
      setTimeout(() => {
        navigate("/todo");
      }, 1000);
    } else {
      console.log("error");
      toast("Please enter the valid input");
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidate,
    onSubmit: submitFun,
  });
  //   console.log(formik.values);
  return { formik };
}

export default useLogin;
