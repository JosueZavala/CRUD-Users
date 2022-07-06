export const getUsers = async () => {
  return fetch(`${process.env.REACT_APP_DB}/users.json`);
};
