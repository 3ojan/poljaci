import React from "react";
import { useForm } from "react-hook-form";

const isValidEmail = email =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

export default function NewItem(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (values) => {
    props.onSubmit(values);
  };

  const handleEmailValidation = email => {
    console.log("ValidateEmail was called with", email);

    const isValid = isValidEmail(email);

    const validityChanged =
      (errors.email && isValid) || (!errors.email && !isValid);
    if (validityChanged) {
      console.log("Fire tracker with", isValid ? "Valid" : "Invalid");
    }

    return isValid;
  };

  return (
    <div className="modal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  name="name"
                  autoComplete="off"
                  {...register("name", {
                    required: "Required",
                  })}
                />
                {errors.name && errors.name.message && <p className="help is-danger">Enter Name</p>}
              </div>
            </div>
            <div className="field">
              <label className="label">email</label>
              <div className="control">
                <input
                  className="input"
                  name="email"
                  autoComplete="off"
                  {...register("email", { required: "email Required", validate: handleEmailValidation })}
                />
                {errors.email && errors.email.message && <p className="help is-danger">This email is invalid</p>}
              </div>
            </div>

            <button type="submit" className="button is-primary" >Submit</button>
            <button className="button is-danger" onClick={props.onCancel} >Cancel</button>
          </form >
        </div >
      </div>
    </div>

  );
}