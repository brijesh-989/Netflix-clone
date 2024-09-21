import HomePage from "./HomePage";
import SignUp from "./SignUp";

const Auth = () => {
  const user = true;
  return <div>{user ? <HomePage /> : <SignUp />}</div>;
};

export default Auth;
