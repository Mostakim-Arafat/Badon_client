"use client";
import { Button, FieldError, Form, Input, Label, ListBox, Select } from "@heroui/react";
import { userData } from "@/lib/allget";
import { patchFLocal } from "@/lib/allget";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const EditForm = () => {
    const searchParams = useSearchParams();
    // console.log(searchParams)
    const id = searchParams.get('id');
    const data = searchParams.get('data')
    let parsedData = {};
    if (data) {
        parsedData = JSON.parse(decodeURIComponent(data));
    }
    const userInfo = userData()
    // console.log(userInfo)
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    console.log(id, parsedData)
    const {
        _id,
        recipientName,

        recipientDistrict,

        recipientUpazila,

        hospitalName,

        fullAddress,

        bloodGroup,

        donationDate,

        donationTime,

        requestMessage,

        requesterName,

        requesterEmail,

        donationStatus,
        donorName,
        donorEmail
    } = parsedData
    const onSubmit = async (e) => {

        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formEntries = Object.fromEntries(formData.entries());

        const submissionPayload = {
            ...formEntries,
            requesterName: userInfo?.name,
            requesterEmail: userInfo?.email,
            donationStatus: donationStatus
        };
        const jsondata = encodeURIComponent(JSON.stringify(submissionPayload))
        console.log(submissionPayload, jsondata)
        const data = await patchFLocal(`/donation_requests?data=${jsondata}&id=${_id}`)
        console.log(data)

        alert("Blood Donation Request Created Successfully!");
    }

    return (
        <div>
            <Form className="flex flex-col gap-5 mt-2" onSubmit={onSubmit}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <div className="flex flex-col gap-1">
                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Requester Name</Label>
                        <Input
                            readOnly
                            defaultValue={userInfo?.name}
                            type="text"
                            className="w-full bg-transparent font-medium text-slate-700"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Requester Email</Label>
                        <Input
                            readOnly
                            defaultValue={userInfo?.email}
                            type="email"
                            className="w-full bg-transparent font-medium text-slate-700"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <Label className="text-sm font-semibold text-slate-700">Recipient Name</Label>
                    <Input required name="recipientName" defaultValue={recipientName} type="text" className="w-full" />
                    <FieldError />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <Select required name="recipientDistrict" defaultValue={recipientDistrict} className="w-full">
                            <Label className="text-sm font-semibold text-slate-700">Recipient District</Label>
                            <Select.Trigger>
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="dhaka" textValue="Dhaka" className="text-slate-800">Dhaka</ListBox.Item>
                                    <ListBox.Item id="chittagong" textValue="Chittagong" className="text-slate-800">Chittagong</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                            <FieldError />
                        </Select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Select required name="recipientUpazila" defaultValue={recipientUpazila} className="w-full">
                            <Label className="text-sm font-semibold text-slate-700">Recipient Upazila</Label>
                            <Select.Trigger>
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="mirpur" textValue="Mirpur" className="text-slate-800">Mirpur</ListBox.Item>
                                    <ListBox.Item id="dhanmondi" textValue="Dhanmondi" className="text-slate-800">Dhanmondi</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                            <FieldError />
                        </Select>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <Label className="text-sm font-semibold text-slate-700">Hospital Name</Label>
                    <Input required name="hospitalName" defaultValue={hospitalName} type="text" className="w-full" />
                    <FieldError />
                </div>

                <div className="flex flex-col gap-1">
                    <Label className="text-sm font-semibold text-slate-700">Full Address Line</Label>
                    <Input required name="fullAddress" defaultValue={fullAddress} type="text" className="w-full" />
                    <FieldError />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                        <Select required name="bloodGroup" defaultValue={bloodGroup} className="w-full">
                            <Label className="text-sm font-semibold text-slate-700">Blood Group</Label>
                            <Select.Trigger>
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    {bloodGroups.map((group) => (
                                        <ListBox.Item key={group} id={group} textValue={group} className="text-red-700 font-medium">
                                            {group}
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                            <FieldError />
                        </Select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-sm font-semibold text-slate-700">Donation Date</Label>
                        <Input required name="donationDate" defaultValue={donationDate} type="date" className="w-full" />
                        <FieldError />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-sm font-semibold text-slate-700">Donation Time</Label>
                        <Input required name="donationTime" defaultValue={donationTime} type="time" className="w-full" />
                        <FieldError />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <Label className="text-sm font-semibold text-slate-700">Request Message</Label>
                    <Input
                        required
                        name="requestMessage"
                        type="textarea"
                        defaultValue={requestMessage}
                        className="w-full"
                    />
                    <FieldError />
                </div>

                <Button type="submit" className="w-full font-bold tracking-wide mt-4 bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200 transition-colors py-6 text-base">
                    Update Donation Request 🩸
                </Button>
            </Form>

        </div>
    )
}





const EditDonationRequest = () => {


    return (
        <div className="flex min-h-screen items-center justify-center p-6 bg-rose-50 text-slate-800">
            <div className="w-full max-w-2xl border border-red-100 p-8 rounded-xl shadow-lg bg-white flex flex-col gap-4">
                <div className="flex flex-col items-center gap-1 border-b pb-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-2xl">
                        ❤️
                    </div>
                    <h2 className="text-2xl font-bold text-red-700 mt-2 tracking-wide">Edit Blood Donation Request</h2>

                </div>
                <Suspense fallback={<div className="p-10 text-center">Loading edit form ......</div>}>
                    <EditForm></EditForm>
                </Suspense>

            </div>
        </div>
    );
};

export default EditDonationRequest;