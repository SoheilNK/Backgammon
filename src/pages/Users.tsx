import { Intro } from "../components/Intro";
import PageClass from "../components/PageClass";


const UsersPage: React.FC = () => {
  return (
    <div className="w-1/2">
      <PageClass inputComponent={Intro} />
    </div>
  );
};

export default UsersPage;
 

