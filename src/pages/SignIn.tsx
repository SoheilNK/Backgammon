// import PageClass from "../components/PageClass";
// import React, { useState } from "react";
// import { NavigateFunction, useNavigate } from "react-router-dom";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";

// import { login } from "../services/auth.service";
// import { Link } from "react-router-dom";

// type Props = {};
// const Login: React.FC<Props> = () => {
//   let navigate: NavigateFunction = useNavigate();

//   const [loading, setLoading] = useState<boolean>(false);
//   const [message, setMessage] = useState<string>("");

//   const initialValues: {
//     username: string;
//     password: string;
//   } = {
//     username: "",
//     password: "",
//   };

//   const validationSchema = Yup.object().shape({
//     username: Yup.string().required("This field is required!"),
//     password: Yup.string().required("This field is required!"),
//   });

//   const handleLogin = (formValue: { username: string; password: string }) => {
//     const { username, password } = formValue;

//     setMessage("");
//     setLoading(true);

//     login(username, password).then(
//       () => {
//         navigate("/myprofile");
//       },
//       (error) => {
//         const resMessage =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         setLoading(false);
//         setMessage(resMessage);
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
//           onSubmit={handleLogin}
//         >
//           <Form>
//             <div className="mb-4">
//               <label htmlFor="username" className="block mb-1">
//                 Username
//               </label>
//               <Field
//                 name="username"
//                 type="text"
//                 className="border border-gray-300 rounded-md p-2 w-full"
//               />
//               <ErrorMessage
//                 name="username"
//                 component="div"
//                 className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="password" className="block mb-1">
//                 Password
//               </label>
//               <Field
//                 name="password"
//                 type="password"
//                 className="border border-gray-300 rounded-md p-2 w-full"
//               />
//               <ErrorMessage
//                 name="password"
//                 component="div"
//                 className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//               />
//             </div>

//             <div className="mb-4">
//               <button
//                 type="submit"
//                 className="bg-blue-900 hover:bg-sky-700 text-white font-medium py-2 px-4 w-full rounded"
//                 disabled={loading}
//               >
//                 {loading && (
//                   <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900"></span>
//                 )}
//                 <span>Sign in</span>
//               </button>
//             </div>

//             {message && (
//               <div className="mb-4">
//                 <div
//                   className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//                   role="alert"
//                 >
//                   {message}
//                 </div>
//               </div>
//             )}
//           </Form>
//         </Formik>

//         <div className="text-center">
//           <Link
//             to="/forgot-password"
//             className="text-sm text-blue-500 hover:text-blue-600"
//           >
//             Forgot password?
//           </Link>
//         </div>
//         <div className="text-center">
//           <Link
//             to="/signup"
//             className="text-sm text-blue-500 hover:text-blue-600"
//           >
//             Don't have an account? Sign up
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// const LoginPage: React.FC = () => {
//   return <PageClass inputComponent={Login} />;
// };
import redirectToLogin from "../components/Register";

const LoginPage: React.FC = () => {
  // window.location.href = "https://sosepbackgammon.auth.ca-central-1.amazoncognito.com/login?response_type=code&client_id=35r5v11v77trsrts6b7lmebupn&redirect_uri=http://localhost:5173/Backgammon/signup";
  redirectToLogin();
  return null;
}

export default LoginPage;
