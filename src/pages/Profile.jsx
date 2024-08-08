function Profile() {
  const { userId } = useParams();
  const {
    currentUserById,
    isLoading,
    error: errorCurrentUser,
  } = useCurrentDummyUser();

  const isCurrentUser = currentUserById?.id === userId;

  return <div>Profile</div>;
}

export default Profile;
