'use client'
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import { getFLocal } from "@/lib/allget";
import { useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


const Register = () => {
    const [logoUrl, setlogoUrl] = useState('')
    const [districts, setdistricts] = useState([])
    const [upazilas, setupazilas] = useState([])
    const [selectDID, setDID] = useState('')
    const [selectU, setU] = useState('')


    const handleDistrictChange = (e) => {
        setDID(e.target.value);
        setU("");
    };

    const filteredUpazilas = upazilas.filter(
        (upazila) => upazila.district_id === selectDID
    );



    const handleLogoUrl = async (e) => {
        const file = e.currentTarget.files[0]
        console.log(file)
        if(!file) return
        if(file.size> 5*1024*1024){
            toast('file size too long')
            return
        }
        const formData = new FormData();
        formData.append('image', file);
        console.log(formData)
        const IMAGE = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API
        const upload = await fetch(`https://api.imgbb.com/1/upload?key=${IMAGE}`, {
            method: 'POST',
            body: formData
        })
        const feedback = await upload.json()
        console.log(feedback)
         if (feedback.success) {

                setlogoUrl(feedback.data.url);
            }
     }

    const onSubmit = async (e) => {
        e.preventDefault()
        const data1 = new FormData(e.currentTarget)
        const data2 = Object.fromEntries(data1.entries())

        const districtObj = districts.find(i =>
            String(i.id) === String(selectDID)
        )
        const districtName = districtObj?.name

        const { data, error } = await authClient.signUp.email({
            name: data2.fullName,
            email: data2.email,
            password: data2.password,
            image: data2.photoURL,
            role: 'donor',
            status: 'active',
            district: districtName,
            upazila: selectU
        });
        if (data) {
            toast.success('Registered success')
            setTimeout(() => {
                redirect('/Home')
            }, 2000)

        }
        else {
            toast.error(error.message)
        }
    }

    
    useEffect(() => {
        const largeData = async () => {
            setdistricts(await getFLocal('/district'))
            setupazilas(await getFLocal('/upazila'))
        }
        largeData()
    }, [])

    return (
        <div className="flex justify-center items-center min-h-screen bg-rose-50/50 p-6 text-slate-800">
            <div className="w-full max-w-xl border border-red-100 p-8 rounded-2xl shadow-xl bg-white flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2 border-b pb-5">
                    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-3xl shadow-sm">
                        🩸
                    </div>
                    <h1 className="text-3xl text-center font-bold text-red-700 tracking-wide mt-2">Join as a Donor</h1>
                    <p className="text-sm text-rose-500 font-medium">Become a lifesaver today. Register your account.</p>
                </div>

                <Image
                src={logoUrl || 'https://cdn.pixabay.com/photo/2012/03/01/01/45/baby-20374_1280.jpg'}
                alt="upload img"
                width={50}
                height={50}
                />

                <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
                    <TextField isRequired className="w-full" name="fullName">
                        <Label className="text-sm font-semibold text-slate-700 pb-1">Full Name</Label>
                        <Input placeholder="John Doe" className="w-full transition-all" />
                        <Description className="text-xs text-slate-400 mt-1">Please enter your legal name</Description>
                    </TextField>

                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        className="w-full"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-sm font-semibold text-slate-700 pb-1">Email Address</Label>
                        <Input placeholder="john@example.com" className="w-full" />
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    {/* <TextField className="w-full" name="photoURL"> */}
                        <Label className="text-sm font-semibold text-slate-700 pb-1">Profile Photo URL</Label>
                        <Input  type="file" accept="image/png, image/jpeg, image/jpg" className="w-full" onChange={handleLogoUrl} />
                        <Description className="text-xs text-slate-400 mt-1">Provide a valid image direct link</Description>
                    {/* </TextField> */}

                    <TextField
                        isRequired
                        minLength={6}
                        name="password"
                        type="password"
                        className="w-full"
                        validate={(value) => {
                            if (value.length < 6) {
                                return "Password must be at least 6 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[a-z]/.test(value)) {
                                return "Password must contain at least one lowercase letter";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-sm font-semibold text-slate-700 pb-1">Password</Label>
                        <Input placeholder="Enter your password" className="w-full" />
                        <Description className="text-xs text-slate-400 mt-1">Must contain 6+ characters, 1 uppercase and 1 lowercase</Description>
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                📍 Recipient District
                            </label>
                            <select
                                name="district"
                                value={selectDID}
                                onChange={handleDistrictChange}
                                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all cursor-pointer text-sm font-medium shadow-sm"
                            >
                                <option value="" disabled hidden>Select District</option>
                                {districts.map((district) => (
                                    <option key={district._id} value={district.id}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                🏡 Recipient Upazila
                            </label>
                            <select
                                name="upazila"
                                value={selectU}
                                onChange={(e) => setU(e.target.value)}
                                disabled={!selectDID}
                                className={`w-full h-11 px-3 rounded-xl border bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm font-medium shadow-sm ${!selectDID ? "bg-slate-100 cursor-not-allowed border-slate-200 text-slate-400" : "border-slate-200 cursor-pointer"}`}
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
                    </div>

                    <div className="flex gap-3 mt-4">
                        <Button type="submit" className="flex-1 font-bold tracking-wide bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-100 transition-all py-6 rounded-xl flex items-center justify-center gap-2 text-base">
                            <Check className="w-5 h-5" />
                            Complete Registration
                        </Button>
                        <Button type="reset" className="px-6 font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-all py-6 rounded-xl text-base">
                            Reset
                        </Button>
                    </div>
                </Form>
                <div>Have an account? <span>     </span>
                    <Link href={'/Login'} className="font-bold text-green-500">Login</Link>
                </div>
                <ToastContainer position="top-right" autoClose={3000} theme="colored" />
            </div>
        </div>
    );
};

export default Register;