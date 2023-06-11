import PageClass from "../components/PageClass";
import Register from "../components/Register";
import redirectToLogin from "../components/Register";


const SignUpPage: React.FC = () => {
    redirectToLogin();
    return null;

  // return (
  //     <PageClass inputComponent={Register} />
  // );
};

export default SignUpPage;