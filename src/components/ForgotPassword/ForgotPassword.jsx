import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

export default function Login() {
  let navigate = useNavigate();
  let { userLogin, setuserLogin } = useContext(UserContext);
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
  });
  function forgotPassword(values) {
    setisLoading(true);
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then((res) => {
        setisLoading(false);
        if (res.data.statusMsg == "success") {
          navigate("/resetcode");
          toast.success(res.data.message, {
            position: "bottom-right",
            className: "custom-toast",
            duration: 3000,
          });
        }
      })
      .catch((res) => {
        setisLoading(false);
        setapiError(res?.response?.data?.message);
      });
  }
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgotPassword,
  });
  return (
    <>
      {apiError ? (
        <div className="w-1/2 mx-auto bg-red-500 text-white font-bold text-xl p-3 text-center rounded-lg">
          {apiError}
        </div>
      ) : null}

      <div className="my-8">
        <h2 className="font-bold text-2xl text-emerald-600 mb-3">
          Reset New Password
        </h2>
        <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your email
            </label>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : null}

          <div className="">
            <button
              type="submit"
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Get Verify Code"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
