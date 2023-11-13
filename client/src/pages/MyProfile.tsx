import Profile  from "../components/Profile-V1";
import PageClass from "../components/PageClass";

const MyProfile: React.FC = () => {
  return (
    <div className="w-1/2">
      <PageClass inputComponent={Profile} />
    </div>
  );
};

export default MyProfile;
