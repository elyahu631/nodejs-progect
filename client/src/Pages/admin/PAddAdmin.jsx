// PAddAdmin.jsx
import React, { useContext, useState } from "react";
import { AdminContext } from "../../Contexts/AdminContext";
import { AdminValues } from "../../utils/initialValues";
import { AddAdminSchema } from "../../utils/validationSchema";
import AdminForm from "./AdminForm";
import CustomSnackbar from "../../Components/CustomSnackbar";

const PAddAdmin = () => {
  const context = useContext(AdminContext);
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
      account_activated: values.account_activated ? true : false,
      image_URL: values.image_URL,
    };
    let res = await context.addUser(data);
    if (!res.status) {
      setError(res.error.message);
    }
    else{
      setError( "system user created");
    }
    setOpen(true);
  };

  const userAdminValuese = {...AdminValues, role: 'helpdesk'}

  return (
    <>
      <AdminForm
        initialValues={userAdminValuese}
        validationSchema={AddAdminSchema}
        onSubmit={handleSubmit}
        formTitle="Add Admin"
        submitButtonTitle="Add Admin"
      />
      <CustomSnackbar
        open={open}
        handleClose={handleClose}
        message={error}
        severity={error === "system user created" ? "success" : "error"}
      />
    </>
  );
};

export default PAddAdmin;
