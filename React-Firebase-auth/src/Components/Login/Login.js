import React, { useState } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleButton from 'react-google-button';

const Login = ({ setUserState }) => {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUserDetails] = useState({
        email: "",
        password: "",
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...user,
            [name]: value,
        });
    };

    const validateForm = (values) => {
        const errors = {};
        const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!regex.test(values.email)) {
            errors.email = "Please enter a valid email address";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }
        return errors;
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        const errors = validateForm(user);
        setFormErrors(errors);
        setIsSubmit(true);
        if (Object.keys(errors).length === 0) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
                setUserState(userCredential.user);
                navigate('/', { replace: true });
            } catch (error) {
                console.error(error);
                setFormErrors(prev => ({ ...prev, firebase: error.message }));
            }
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUserState(result.user);
            navigate('/', { replace: true });
        } catch (error) {
            console.error(error);
            setFormErrors(prev => ({ ...prev, firebase: error.message }));
        }
    };

    return (
        <div className={loginstyle.login}>
            <form onSubmit={loginHandler}>
                <h1>Login</h1>
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
                {formErrors.firebase && <p className={basestyle.error}>{formErrors.firebase}</p>}
                <button type="submit" className={basestyle.button_common}>
                    Login
                </button>
            </form>
            <NavLink to="/signup" className={loginstyle.link}>Not yet registered? Register Now</NavLink>
            <GoogleButton className={loginstyle['google-button']} onClick={signInWithGoogle} />
        </div>
    );
};

export default Login;
