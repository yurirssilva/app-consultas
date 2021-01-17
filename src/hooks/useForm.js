import React from "react";

const useForm = () => {
  const [values, setValues] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    const auxValues = { ...values };
    auxValues[event.target.name] = event.target.value;
    setValues(auxValues);
  };
  const handleSubmit = (callback) => (event) => {
    event.preventDefault();
    setLoading(true);
    callback();
    setLoading(false);
  };
  return [{ values, loading }, handleChange, handleSubmit, setValues];
};

export default useForm;
