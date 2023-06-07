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

import { cognitoLoginUrl, clientId } from "../../cognitoConfig";

const Register = async () => {

  const sha256 = async (str: string): Promise<ArrayBuffer> => {
    return await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  };

  const generateNonce = async (): Promise<string> => {
    const hash = await sha256(
      crypto.getRandomValues(new Uint32Array(4)).toString()
    );
    const hashArray = Array.from(new Uint8Array(hash));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const base64URLEncode = (arrayBuffer: ArrayBuffer): string => {
    const uint8Array = new Uint8Array(arrayBuffer);
    const base64String = btoa(String.fromCharCode(...uint8Array));
    return base64String
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  };


  const redirectToLogin = async (): Promise<void> => {
    const state = await generateNonce();
    const codeVerifier = await generateNonce();
    sessionStorage.setItem(`codeVerifier-${state}`, codeVerifier);
    const codeChallenge = base64URLEncode(await sha256(codeVerifier));
    // const url = `${cognitoLoginUrl}/login?response_type=code&client_id=${clientId}&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}&redirect_uri=${window.location.origin}`;
    // console.log(url);
    // alert(url);
    window.location.href = `${cognitoLoginUrl}/login?response_type=code&client_id=${clientId}&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}&redirect_uri=http://localhost:5173/Backgammon`;
    // window.location.href =
    //   `https://sosepbackgammon.auth.ca-central-1.amazoncognito.com/login?response_type=code&client_id=35r5v11v77trsrts6b7lmebupn&redirect_uri=http://localhost:5173/Backgammon/signup&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
  };

  // document.querySelector("#loginButton")?.addEventListener("click", () => {
  //   redirectToLogin();
  // });

  const init = async (tokens: any): Promise<void> => {
    console.log(tokens);
    const access_token = tokens.access_token;

    try {
      const apiRes = await fetch("/api/user", {
        headers: new Headers({ Authorization: `Bearer ${access_token}` }),
      });
      if (!apiRes.ok) {
        throw new Error(apiRes.statusText);
      }
      const apiResp = await apiRes.json();
      // document.querySelector(
      //   "#user"
      // )!.innerText = `You are signed in as ${apiResp.userId}`;
      console.log(`You are signed in as ${apiResp.userId}`); //review
    } catch (e) {
      console.error(e);
      // document.querySelector(
      //   "#user"
      // )!.innerText = `Failed to get userid. Are you logged in with a valid token?`;
      console.error(
        `Failed to get userid. Are you logged in with a valid token?`
      );
    }

    const refreshStatus: (() => Promise<void>)[] = [];
    let currentId = 0;
    const doRefreshStatus = async (): Promise<void> => {
      await refreshStatus.reduce(async (memo, fn) => {
        await memo;
        return fn();
      }, Promise.resolve());
    };

    const refreshStatusButton = document.querySelector(
      "#refreshStatus"
    ) as HTMLButtonElement;
    refreshStatusButton.addEventListener("click", async () => {
      refreshStatusButton.disabled = true;
      await doRefreshStatus();
      refreshStatusButton.disabled = false;
    });

    const insertTokens = (parent: any, id: number, tokens: any): void => {
      const table = document.querySelector(
        "#tokens tbody"
      ) as HTMLTableSectionElement;
      const row = table.insertRow();
      row.insertCell().innerText = parent;
      row.insertCell().innerText = id.toString();
      row.insertCell().innerText = `${tokens.refresh_token ? "refresh_token\n" : ""
        }${tokens.access_token ? "access_token\n" : ""}${tokens.id_token ? "id_token" : ""
        }`;
      const buttonsCell = row.insertCell();
      if (tokens.refresh_token) {
        buttonsCell.innerHTML = `
        <button class="revoke">Revoke token</button>
        <button class="request">Refresh token</button>
      `;
        const revokeButton = buttonsCell.querySelector(
          ".revoke"
        ) as HTMLButtonElement;
        revokeButton.addEventListener("click", async () => {
          revokeButton.disabled = true;
          const res = await fetch(`${cognitoLoginUrl}/oauth2/revoke`, {
            method: "POST",
            headers: new Headers({
              "content-type": "application/x-www-form-urlencoded",
            }),
            body: Object.entries({
              token: tokens.refresh_token,
              client_id: clientId,
            })
              .map(([k, v]) => `${k}=${v}`)
              .join("&"),
          });
          if (!res.ok) {
            throw new Error(await res.json());
          }
          await doRefreshStatus();
        });
        const requestButton = buttonsCell.querySelector(
          ".request"
        ) as HTMLButtonElement;
        requestButton.addEventListener("click", async () => {
          requestButton.disabled = true;
          const res = await fetch(`${cognitoLoginUrl}/oauth2/token`, {
            method: "POST",
            headers: new Headers({
              "content-type": "application/x-www-form-urlencoded",
            }),
            body: Object.entries({
              grant_type: "refresh_token",
              client_id: clientId,
              redirect_uri: window.location.origin,
              refresh_token: tokens.refresh_token,
            })
              .map(([k, v]) => `${k}=${v}`)
              .join("&"),
          });
          if (!res.ok) {
            throw new Error(await res.json());
          }
          const newTokens = await res.json();
          insertTokens(id, currentId++, newTokens);
          await doRefreshStatus();
          requestButton.disabled = false;
        });
      }
      const statusCell = row.insertCell();
      refreshStatus.push(async () => {
        statusCell.innerHTML = "";
        const userInfoRes = await fetch(`${cognitoLoginUrl}/oauth2/userInfo`, {
          headers: new Headers({
            Authorization: `Bearer ${tokens.access_token}`,
          }),
        });
        const apiRes = await fetch("/api/user", {
          headers: new Headers({
            Authorization: `Bearer ${tokens.access_token}`,
          }),
        });
        const apiResIdToken = await fetch("/api/user", {
          headers: new Headers({ Authorization: `Bearer ${tokens.id_token}` }),
        });
        statusCell.innerText = `userInfo: ${userInfoRes.ok}\napi access_token: ${apiRes.ok}\napi id_token: ${apiResIdToken.ok}`;
      });
    };
    insertTokens(null, currentId++, tokens);
    await doRefreshStatus();
  };

  const searchParams = new URL(location.href).searchParams;

  if (searchParams.get("code") !== null) {
    window.history.replaceState({}, document.title, "/Backgammon/");
    const state = searchParams.get("state");
    const codeVerifier = sessionStorage.getItem(`codeVerifier-${state}`);
    sessionStorage.removeItem(`codeVerifier-${state}`);
    if (codeVerifier === null) {
      throw new Error("Unexpected code");
    }
    const res = await fetch(`${cognitoLoginUrl}/oauth2/token`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/x-www-form-urlencoded",
      }),
      body: Object.entries({
        grant_type: "authorization_code",
        client_id: clientId,
        code: searchParams.get("code")!,
        code_verifier: codeVerifier,
        // redirect_uri: window.location.origin,
        redirect_uri: "http://localhost:5173/Backgammon",
      })
        .map(([k, v]) => `${k}=${v}`)
        .join("&"),
    });
    if (!res.ok) {
      throw new Error(await res.json());
    }
    const tokens = await res.json();
    localStorage.setItem("tokens", JSON.stringify(tokens));

    init(tokens);
  } else {
    if (localStorage.getItem("tokens")) {
      const tokens = JSON.parse(localStorage.getItem("tokens")!);
      init(tokens);
    } else {
      redirectToLogin();
    }
  }

};


export default Register;
