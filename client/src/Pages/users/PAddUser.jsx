// PAddAdmin.jsx
import React, { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { UserValues } from "../../utils/initialValues";
import { UserSchema } from "../../utils/validationSchema";
import UserFrom from "./UserForm";
import CustomSnackbar from "../../Components/CustomSnackbar";

const PAddUser = () => {
  const context = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    console.log("Form is submitted");
    const data = {
      ...values,
      image_URL: values.image_URL,
    };
    let res = await context.addUser(data);
    if (!res.status) {
      setError(res.error.message);
    }
    else{
      setError( "user created");
    }
    setOpen(true);
  };

  const userAdminValuese = {...UserValues, role: 'helpdesk'}
  return (
    <>
      <UserFrom
        initialValues={userAdminValuese}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
        formTitle="Add User"
        submitButtonTitle="Add User"
      />
      <CustomSnackbar
        open={open}
        handleClose={handleClose}
        message={error}
        severity={error === "user created" ? "success" : "error"}
      />
    </>
  );
};

export default PAddUser;
