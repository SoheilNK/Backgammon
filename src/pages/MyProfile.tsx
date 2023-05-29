import Profile  from "../components/Profile";
import PageClass from "../components/PageClass";

const MyProfile: React.FC = () => {
  return (
    <div className="w-1/2">
      <PageClass inputComponent={Profile} />
    </div>
  );
};

export default MyProfile;
