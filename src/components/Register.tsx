// import React, { useState } from "react";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";

// import { IUser } from "../types/user.type";
// import { register } from "../services/auth.service";
// import { useNavigate } from "react-router-dom";

// const Register: React.FC = () => {
//   const [successful, setSuccessful] = useState<boolean>(false);
//   const [message, setMessage] = useState<string>("");
//   const navigate = useNavigate();

//   const initialValues: IUser = {
//     username: "",
//     email: "",
//     password: "",
//   };

//   const validationSchema = Yup.object().shape({
//     username: Yup.string()
//       .test(
//         "len",
//         "The username must be between 3 and 20 characters.",
//         (val: any) =>
//           val && val.toString().length >= 3 && val.toString().length <= 20
//       )
//       .required("This field is required!"),
//     email: Yup.string()
//       .email("This is not a valid email.")
//       .required("This field is required!"),
//     password: Yup.string()
//       .test(
//         "len",
//         "The password must be between 6 and 40 characters.",
//         (val: any) =>
//           val && val.toString().length >= 6 && val.toString().length <= 40
//       )
//       .required("This field is required!"),
//   });

//   const handleRegister = (formValue: IUser) => {
//     const { username, email, password } = formValue;

//     register(username, email, password).then(
//       (response) => {
//         setMessage(response.data.message);
//         setSuccessful(true);
//         // navigate("/signin");
//       },
//       (error) => {
//         const resMessage =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         setMessage(resMessage);
//         setSuccessful(false);
//       }
//     );
//   };

//   return (
//     <div className=" max-w-sm m-auto">
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <img
//           src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//           alt="profile-img"
//           className="bg-white rounded-lg overflow-hidden shadow-md m-auto"
//         />
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleRegister}
//         >
//           <Form>
//             {!successful && (
//               <div>
//                 <div className="mb-4">
//                   <label htmlFor="username"> Username </label>
//                   <Field
//                     name="username"
//                     type="text"
//                     className="border border-gray-300 rounded-md p-2 w-full"
//                   />
//                   <ErrorMessage
//                     name="username"
//                     component="div"
//                     className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="email"> Email </label>
//                   <Field
//                     name="email"
//                     type="email"
//                     className="border border-gray-300 rounded-md p-2 w-full"
//                   />
//                   <ErrorMessage
//                     name="email"
//                     component="div"
//                     className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="password"> Password </label>
//                   <Field
//                     name="password"
//                     type="password"
//                     className="border border-gray-300 rounded-md p-2 w-full"
//                   />
//                   <ErrorMessage
//                     name="password"
//                     component="div"
//                     className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <button
//                     type="submit"
//                     className="bg-blue-900 hover:bg-sky-700 text-white font-medium py-2 px-4 w-full rounded"
//                   >
//                     Sign Up
//                   </button>
//                 </div>
//               </div>
//             )}

//             {message && (
//               <div>
//                 <div className="mb-4">
//                   <div
//                     className={
//                       successful
//                         ? " m-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center"
//                         : "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
//                     }
//                     role="alert"
//                   >
//                     {message}
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <button
//                     type="button"
//                     onClick={() => navigate("/signin")}
//                     className={
//                       successful
//                         ? "bg-blue-900 hover:bg-sky-700 text-white font-medium py-2 px-4 w-full rounded" : "hidden"
//                     }
//                         >
//                     Sign in
//                   </button>
//                 </div>
//               </div>
//             )}
//           </Form>
//         </Formik>
//       </div>
//     </div>
//   );
// };

const Register: React.FC = () => {
  return (
    <div>
      <h2>Registered</h2>
    </div>
  );
}; 

export default Register;
