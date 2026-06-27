'use client'
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import { getFLocal } from "@/lib/allget";
import { useState } from "react";

const Register = () => {
   
    const [districts, setdistricts] = useState([])
    const [upazilas, setupazilas] = useState([])
    const [selectDID, setDID] = useState('')
    const [selectU, setU] = useState('')
    
    useEffect(() => {
        const largeData = async () => {
            setdistricts(await getFLocal('/district'))
            setupazilas(await getFLocal('/upazila'))
        }
        largeData()
    }, [])

    const handleDistrictChange = (e) => {
        setDID(e.target.value);
        setU(""); // Reset the upazila whenever the district changes
    };

    const filteredUpazilas = upazilas.filter(
        (upazila) => upazila.district_id === selectDID
    );
    const onSubmit = async (e) => {
        e.preventDefault()
        const data1 = new FormData(e.currentTarget)
        const data2 = Object.fromEntries(data1.entries())
        // console.log(data2)
        // console.log(selectDID)

        const districtObj = districts.find( i => 
            String(i.id) === String(selectDID)
        )
        const districtName = districtObj?.name

        console.log(districtObj)

        const { data, error } = await authClient.signUp.email({
            name: data2.fullName, // required
            email: data2.email, // required
            password: data2.password, // required
            image: data2.photoURL,
            role: 'donor',
            status: 'active',
            district: districtName,
            upazila: selectU
        });
        if (data) {
            console.log(data)
            toast.success('Registered success')
        }
        else {
            toast.error(error.message)
        }

    }
    return (
        <div className="flex justify-center items-center my-3">
            <div>
                <h1 className="text-2xl text-center font-serif ">Register</h1>
                <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                    <TextField isRequired className="w-full max-w-64" name="fullName">
                        <Label>Full Name</Label>
                        <Input placeholder="John Doe" />
                        <Description>This field is required</Description>
                    </TextField>


                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>

                    <TextField className="w-full max-w-64" name="photoURL" defaultValue='https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/11/1200/675/e5c757ab-trump.jpg?ve=1&tl=1'>
                        <Label>photo URL</Label>
                        <Input placeholder="https://...." type="url" />
                        <Description>This field is required</Description>
                    </TextField>

                    <TextField
                        isRequired
                        minLength={6}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 6) {
                                return "Password must be at least 6 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[a-z]/.test(value)) {
                                return "Password must contain at least one Lowercase letter";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 Lowercase</Description>
                        <FieldError />
                    </TextField>

                    {/* select district */}
                    <div className="w-full sm:w-1/2 flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                            📍 Select District
                        </label>
                        <select
                            name="district"
                            value={selectDID}
                            onChange={handleDistrictChange}
                            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all cursor-pointer"
                        >
                            <option value="" disabled hidden>Select District</option>
                            {districts.map((district) => (
                                <option key={district._id} value={district.id}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 🏡 Upazila Selector */}
                    <div className="w-full sm:w-1/2 flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                            🏡 Select Upazila
                        </label>
                        <select
                            name="upazila"
                            value={selectU}
                            onChange={(e) => setU(e.target.value)}
                            disabled={!selectDID} // 💡 Keep disabled until a district is selected
                            className={`w-full h-12 px-4 rounded-xl border bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${!selectDID ? "bg-slate-50 cursor-not-allowed border-slate-100 text-slate-400" : "border-slate-200 cursor-pointer"
                                }`}
                        >
                            <option value="" disabled hidden>
                                {!selectDID ? "Choose a District first" : "Select Upazila"}
                            </option>
                            {filteredUpazilas.map((upazila) => (
                                <option key={upazila._id} value={upazila.name.toLowerCase()}>
                                    {upazila.name}
                                </option>
                            ))}
                        </select>
                    </div>





                    <div className="flex gap-2">
                        <Button type="submit">
                            <Check />
                            Submit
                        </Button>
                        <Button type="reset" variant="secondary">
                            Reset
                        </Button>
                    </div>
                </Form>
                <ToastContainer />
            </div>

        </div>
    );
};

export default Register;