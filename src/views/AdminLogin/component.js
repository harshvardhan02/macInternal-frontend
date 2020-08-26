import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

const AdminLogin = (props) => {
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = values => {
        props.loginUser(values)
    };

    useEffect(() => {
        const user = localStorage.getItem('authToken')
        if (user && user !== 'undefined') {
            props.history.push('/')
        }
    }, [props.loginPhase])

    return (
        <div className="container d-flex min-vh-100">
            <div className="row flex-grow-1 justify-content-center align-items-center">
                <div className="col-lg-8">
                    <h4 className="text-center">Admin Login</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input
                                name="email"
                                type="email"
                                className={errors.email ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Enter email"
                                ref={register({
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Please enter correct email address"
                                    }
                                })}
                            />
                            <div className="invalid-feedback">
                                {errors.email && errors.email.message}
                            </div>
                            <small id="emailHelp" className="form-text text-muted">
                                We'll never share your email with anyone else.
                            </small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                name="password"
                                type="password"
                                className={errors.password ? 'form-control is-invalid' : 'form-control'}
                                placeholder="Password"
                                ref={register({
                                    required: "Password is required"
                                })}
                            />
                            <div className="invalid-feedback">
                                {errors.password && errors.password.message}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <small className="form-text text-muted">
                            Go back to user <Link to="/login">Login</Link>
                        </small>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;