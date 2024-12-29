export const getDummyUserByUid = (users, id) => {
  const user = users.find((user) => user.id == id);
  return user ? user : null;
};
