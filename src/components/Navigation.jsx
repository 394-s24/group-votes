import { NavLink } from 'react-router-dom';
import useFirebase from '../utilities/firebase';
import "./Navigation.css";

const { signInWithGoogle, signOutUser, useAuthState } = useFirebase();

const SignInButton = () => (
  <button className="ms-auto btn" onClick={signInWithGoogle}>Sign in</button>
);

const SignOutButton = () => (
  <button className="ms-auto btn" onClick={signOutUser}>Sign out</button>
);

const AuthButton = () => {
  const [user] = useAuthState();
  return user ? <SignOutButton /> : <SignInButton />;
};
export {AuthButton};
const activation = ({isActive}) => isActive ? 'active' : 'inactive';

const Navigation = () => (
  <nav className="d-flex">
    <NavLink to="/" className={activation} end>Feed</NavLink>
    <NavLink to="/group" className={activation} end>Group</NavLink>
    <AuthButton />
  </nav>
);

export default Navigation;
