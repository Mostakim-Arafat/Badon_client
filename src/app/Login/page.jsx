'use client'

import Link from "next/link";
import { Form } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const readyLogin = async (e) => {
        e.preventDefault()
        const data1 = new FormData(e.currentTarget)
        const data2 = Object.fromEntries(data1.entries())
        console.log(data2)
        const { data, error } = await authClient.signIn.email({
            email: data2.email, // required
            password: data2.password, // required
            rememberMe: true,
            callbackURL: "/dashboard",
        });
        if (data) {
            toast('login success')
        }
        else {
            toast(error.message)
        }
    }
    const signIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
        console.log(data)
    };
    return (
        <div className="flex justify-center items-center text-center">
            <div>
                 <h1 className="text-2xl text-center font-serif my-1.5 ">Login</h1>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <Form onSubmit={readyLogin}>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email" name="email" required />
                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Password" name="password" required />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                    </Form>
                </div>
            </div>

            <p>Donot have a account?: <span className="text-blue-400"><Link href={'/Register'}>Register</Link></span></p>
            <ToastContainer />
            </div>
            
        </div>
    );
};

export default Login;