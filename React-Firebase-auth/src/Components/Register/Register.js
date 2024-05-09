import React, { useState } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate, NavLink } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUserDetails] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        cpassword: "",
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...user, [name]: value });
    };

    const validateForm = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid email format";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be at least 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password must not exceed 10 characters";
        }
        if (!values.cpassword) {
            errors.cpassword = "Confirmation of password is required";
        } else if (values.cpassword !== values.password) {
            errors.cpassword = "Passwords do not match";
        }
        return errors;
    };

    const signupHandler = async (e) => {
      e.preventDefault();
      const errors = validateForm(user);
      setFormErrors(errors);
      setIsSubmit(true);
      if (Object.keys(errors).length === 0 && isSubmit) {
          try {
              const userCredential = await createUserWithEmailAndPassword(
                  auth,
                  user.email,
                  user.password
              );
              console.log(userCredential.user);
              navigate('/', { replace: true });
          } catch (error) {
              console.error(error);
              setFormErrors(prev => ({ ...prev, firebase: error.message }));
          }
      }
  };
  
  return (
      <div className={registerstyle.register}>
          <form onSubmit={signupHandler}>
              <h1>Create your account</h1>
              <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={changeHandler}
                  value={user.email}
              />
              <p className={basestyle.error}>{formErrors.email}</p>
              <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={changeHandler}
                  value={user.password}
              />
              <p className={basestyle.error}>{formErrors.password}</p>
              <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  placeholder="Confirm Password"
                  onChange={changeHandler}
                  value={user.cpassword}
              />
              <p className={basestyle.error}>{formErrors.cpassword}</p>
              {formErrors.firebase && <p className={basestyle.error}>{formErrors.firebase}</p>}
              <button type="submit" className={basestyle.button_common}>
                  Register
              </button>
          </form>
          <NavLink to="/login">Already registered? Login</NavLink>
      </div>
  );
  
}
export default Register;
