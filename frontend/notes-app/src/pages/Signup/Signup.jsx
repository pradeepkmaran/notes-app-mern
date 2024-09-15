import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if(!name) {
            setError("Please enter your name.");
            return;
        }

        if(!validateEmail(email)) {
            setError("Please enter a valid email.");
            return;
        }

        if(!password) {
            setError("Please enter a password.");
            return;
        }

        setError("");

        // signup api call
        try {
            const response = await axiosInstance.post("/create-account", {
                fullName: name,
                email: email,
                password: password,
            });

            // Handle registration success
            if(response.data && response.data.error) {
                setError(response.data);
                return;
            }

            if(response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate('/dashboard');
            }

        } catch(error) {
            // Handle login failure
            console.log(error);
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    }

    return (
        <>
            <Navbar />

            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <form onSubmit={handleSignup}>
                        <h4 className='text-2xl mb-7'>Sign Up</h4>

                        <input 
                            type="text" 
                            placeholder='Name' 
                            className='input-box'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input 
                            type="text" 
                            placeholder='Email' 
                            className='input-box'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        
                        <PasswordInput 
                        value={password}
                        onChange={(p) => setPassword(p.target.value)}
                        />

                        {error && <p className='text-red-500 text-xs pb-1'> {error} </p>}
                        <button type='submit' className='btn-primary'> Create Account </button>

                        <p className='text-sm text-center mt-4'>
                            Already have an account? {" "}
                            <Link to='/login' className='font-medium text-primary underline'>
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;