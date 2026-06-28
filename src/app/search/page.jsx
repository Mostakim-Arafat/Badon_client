'use client'
import { getFLocal } from "@/lib/allget";
import { useState } from "react";
import DonationRequestCard from "@/Components/B_Request_card";
import { useEffect } from "react";

const Search = () => {
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const [output, setoutput] = useState([])
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









    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const filters = Object.fromEntries(formData.entries());
        const searchParamsObj = {};

        if (selectDID) {
        const matchingDistrict = districts.find(
            (d) => String(d.id) === String(selectDID)
        );
        if (matchingDistrict && filters.district) {
            searchParamsObj.district = matchingDistrict.name;
        }
    }



        if (filters.bloodGroup) searchParamsObj.blood = filters.bloodGroup;
        // if (filters.district) searchParamsObj.district = filters.district;
        if (filters.upazila) searchParamsObj.upazila = filters.upazila;

        const params = new URLSearchParams(searchParamsObj);
        // console.log(filters.district)

        const filteredCard = await getFLocal(`/donation_requests?${params.toString()}`);
        setoutput(filteredCard)
        console.log(filteredCard)
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 my-6 min-h-screen">
            <form
                onSubmit={handleSearch}
                className="bg-white border border-red-100 rounded-2xl shadow-md shadow-red-50/50 p-4 md:p-6 flex flex-col md:flex-row items-end gap-4 bg-gradient-to-r from-white to-rose-50/30"
            >

                <div className="w-full md:w-1/4 flex flex-col gap-2">
                    <label className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1">
                        🩸 Blood Group
                    </label>
                    <select
                        name="bloodGroup"
                        defaultValue=''
                        className="w-full h-12 px-4 rounded-xl border border-red-200 bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all cursor-pointer"
                    >
                        <option value="" disabled hidden>Select Group</option>
                        {bloodGroups.map((group) => (
                            <option key={group} value={group} className="text-red-700 font-semibold">
                                {group}
                            </option>
                        ))}
                    </select>
                </div>


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
                            <option key={district._id} value={district.id} name={district.name}>
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


                {/* Search Button */}
                <div className="w-full md:w-1/4">
                    <button
                        type="submit"
                        className="w-full h-12 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold tracking-wide rounded-xl shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300 transition-all flex items-center justify-center gap-2 duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-51-5.197M16.8 10.8a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
                        </svg>
                        Find Donors
                    </button>
                </div>
            </form>
            {
                output.length > 0 &&
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-2">
                    {
                        output.map(i =>
                            <DonationRequestCard key={i._id} request={i}></DonationRequestCard>
                        )
                    }
                </div>
            }
            {
                output.length == 0 &&
                <div className=" text-2xl text-center">
                    <h1>No Match found</h1>
                </div>
            }

        </div>
    );
};

export default Search;