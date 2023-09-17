import { Intro } from "../components/Intro";
import PageClass from "../components/PageClass";
import { clearGameData } from "../services/user.service";


const UsersPage: React.FC = () => {
  clearGameData();
  return (
    <div className="w-1/2">
      <PageClass inputComponent={Intro} />
    </div>
  );
};

export default UsersPage;
 

