import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { createLog } from "../../services/logService";
import { createUser, updateUser } from "../../services/usersService";
import classes from "./UserForm.module.css";

const UserForm = (props) => {
  const [isEditForm, setIsEditForm] = useState(false);
  const history = useHistory();
  const newUserInputRef = useRef();
  const userRoleInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewUser = newUserInputRef.current.value;
    const enteredNewRole = userRoleInputRef.current.value;
    const user = { name: enteredNewUser, role: enteredNewRole };

    if (isEditForm) {
      updateUserHandler(user);
    } else {
      addUserHandler(user);
    }
  };

  async function updateUserHandler(user) {
    const id = props?.id;
    const response = await updateUser(id, user);
    if (response.ok) {
      await createLog("USER UPDATED");
    }
    cleanInputs();
  }

  async function addUserHandler(user) {
    const response = await createUser(user);

    if (response.ok) {
      await createLog("USER ADDED");
    }
    cleanInputs();
  }

  const cleanInputs = () => {
    newUserInputRef.current.value = "";
    userRoleInputRef.current.value = "";
    history.replace("/users");
  };

  useEffect(() => {
    if (props.name || props.role) {
      newUserInputRef.current.value = props.name;
      userRoleInputRef.current.value = props.role;
      setIsEditForm(true);
    }
  }, []);

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="user-name">User Name</label>
        <input
          type="text"
          id="user-name"
          maxLength="30"
          ref={newUserInputRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="user-name">User Role</label>
        <input
          type="text"
          id="user-role"
          maxLength="30"
          ref={userRoleInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>
          {!isEditForm && "Create User"}
          {isEditForm && "Update User"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
