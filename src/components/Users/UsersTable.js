import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import classes from "./UsersTable.module.css";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  const fetchUsersHandler = useCallback(async () => {
    /* setIsLoading(true);
    setError(null); */
    try {
      const response = await fetch(
        "https://react-http-fb62d-default-rtdb.firebaseio.com/users.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedUsers = [];
      console.log(data);

      for (const key in data) {
        loadedUsers.push({
          id: key,
          name: data[key].name,
          role: data[key].role,
        });
      }

      setUsers(loadedUsers);
    } catch (error) {
      /* setError(error.message); */
      console.log(error);
    }
    /* setIsLoading(false); */
  }, []);

  const removeUserHandler = async (userId) => {
    console.log(userId);

    const response = await fetch(
      `https://react-http-fb62d-default-rtdb.firebaseio.com/users/${userId}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    fetchUsersHandler();
  };

  const editUserHandler = (user) => {
    /* console.log(user); */
    history.push("/editUser", { params: user });
  };

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  return (
    <section className={classes.container}>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td className={classes.edit}>
                    <button type="button" onClick={() => editUserHandler(user)}>
                      <FaUserEdit />
                    </button>
                  </td>
                  <td className={classes.delete}>
                    <button
                      type="button"
                      onClick={() => removeUserHandler(user.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default UsersTable;
