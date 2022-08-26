import ProfileSection from '../components/ProfileSection';
import { useAuth } from '../utils/context/authContext';

export default function ProfilePage() {
  const { user } = useAuth();
  console.warn(user);
  return (
    <ProfileSection displayName={user.displayName} photoURL={user.photoURL} email={user.email} />
  );
}
