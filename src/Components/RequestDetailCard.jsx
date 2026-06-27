"use client";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField, Card } from "@heroui/react";
import { patchFLocal } from "@/lib/allget";
import { userData } from "@/lib/allget";


export default function DonationRequestDetails({ request }) {
    const {userInfo,isLoading} = userData();
    
   
  


    console.log(userInfo)
    console.log(request)
    const {
        _id,
        recipientName,
        bloodGroup,
        recipientDistrict,
        recipientUpazila,
        hospitalName,
        fullAddress,
        donationDate,
        donationTime,
        requestMessage,
        requesterName,
        requesterEmail
    } = request;
   
    const statusChange = async() => {
        const change = await patchFLocal(`/donation_requests/${_id}?donorName=${userInfo?.name}&donorEmail=${userInfo?.email}`)
        console.log(change)
    }
    if(isLoading){
        return(
            <div>
                <h1>Loading.......................</h1>
            </div>
        )
    }
    return (
        <Card className="max-w-md w-full border border-red-100 bg-white shadow-xl rounded-2xl overflow-hidden text-slate-800 transition-all hover:shadow-2xl hover:border-red-200">

            {/* CARD TOP SPLASH BANNER */}
            <div className="bg-gradient-to-r from-red-600 to-rose-500 p-5 flex justify-between items-center text-white">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        🚨 Urgent Request
                    </span>
                    <h3 className="text-xl font-bold mt-2 truncate max-w-[240px]">
                        {recipientName}
                    </h3>
                </div>

                {/* BIG BLOOD GROUP INSIGNIA */}
                <div className="w-16 h-16 rounded-full bg-white text-red-600 flex flex-col items-center justify-center font-black text-2xl shadow-md ring-4 ring-red-500/20">
                    <span className="leading-none">{bloodGroup}</span>
                    <span className="text-[10px] uppercase font-bold tracking-tight text-rose-500 mt-0.5">Blood</span>
                </div>
            </div>

            {/* CORE BODY DATA INFORMATION */}
            <div className="p-6 flex flex-col gap-4 text-sm">

                {/* TIME & DATE SEGMENT */}
                <div className="grid grid-cols-2 gap-3 bg-rose-50/50 border border-rose-100 p-3 rounded-xl text-center">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date Needed</p>
                        <p className="font-semibold text-red-700 mt-0.5">📅 {donationDate}</p>
                    </div>
                    <div className="border-l border-rose-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Time</p>
                        <p className="font-semibold text-red-700 mt-0.5">⏰ {donationTime}</p>
                    </div>
                </div>

                {/* SITE LOCATION FIELDS */}
                <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-start gap-3">
                        <span className="text-lg mt-0.5">🏢</span>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">Hospital</p>
                            <p className="font-semibold text-slate-700">{hospitalName}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="text-lg mt-0.5">📍</span>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">Address Details</p>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                {fullAddress}, <span className="text-slate-700 font-semibold">{recipientUpazila}, {recipientDistrict}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="border-slate-100 my-1" />

                {/* PATIENT EMERGENCY MESSAGE */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Patient Condition Note</p>
                    <p className="text-slate-600 italic font-medium leading-relaxed line-clamp-3">
                        {requestMessage}
                    </p>
                </div>

                {/* INSTRUCTION SPECIFIED DONATE BUTTON */}
                <Modal>
                    <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md shadow-red-100 transition-colors">
                        Confirm Donor Profile 🩸
                    </Button>

                    <Modal.Backdrop>
                        <Modal.Container placement="auto">
                            <Modal.Dialog className="sm:max-w-md border border-red-100 rounded-2xl overflow-hidden bg-white text-slate-800">
                                <Modal.CloseTrigger />

                                <Modal.Header className="bg-gradient-to-r from-red-600 to-rose-500 p-6 text-white relative">
                                    <div className="flex items-center gap-3">
                                        <Modal.Icon className="bg-white/20 text-white backdrop-blur-sm rounded-full p-2">
                                            <Envelope className="size-5" />
                                        </Modal.Icon>
                                        <Modal.Heading className="text-xl font-bold tracking-wide text-white">
                                            Donor Verification
                                        </Modal.Heading>
                                    </div>
                                    <p className="mt-2 text-xs leading-relaxed text-rose-100">
                                        Please verify your profile details before confirming your blood donation. These credentials are fixed to your registered account.
                                    </p>
                                </Modal.Header>

                                <Modal.Body className="p-6 bg-rose-50/30">
                                    <Surface variant="default" className="bg-transparent border-0 p-0 shadow-none">
                                        <form className="flex flex-col gap-4">

                                            {/* READ-ONLY DONOR NAME FIELD */}
                                            <TextField isReadOnly className="flex flex-col gap-1 w-full" name="donorName"  defaultValue={requesterName}>
                                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                    Donor Name
                                                </Label>
                                                <Input
                                                   
                                                    type="text"
                                                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-lg"
                                                />
                                            </TextField>

                                            {/* READ-ONLY DONOR EMAIL FIELD */}
                                            <TextField isReadOnly className="flex flex-col gap-1 w-full" name="donorEmail"  defaultValue={requesterEmail}>
                                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                    Email Address
                                                </Label>
                                                <Input
                                
                                                    type="email"
                                                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-lg"
                                                />
                                            </TextField>

                                        </form>
                                    </Surface>
                                </Modal.Body>

                                <Modal.Footer className="border-t border-rose-100 p-4 flex justify-end gap-2 bg-white">
                                    <Button
                                        slot="close"
                                        variant="secondary"
                                        className="border-slate-200 hover:bg-slate-50 text-slate-600 font-medium"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => statusChange()}
                                        slot="close"
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold tracking-wide shadow-md shadow-red-200 transition-colors"
                                    >
                                        Confirm Verification
                                    </Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>

            </div>
        </Card>
    );
}