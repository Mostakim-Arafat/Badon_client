'use client'

import { Table } from "@heroui/react";
import { Button } from "@heroui/react";
import { redirect } from "next/navigation";
import { patchFLocal } from "@/lib/allget";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown, Header, Label } from "@heroui/react";
import { ToastContainer, toast } from 'react-toastify';

const MyDonationRequestTable = ({ datas, role }) => {
    const [selected, setSelected] = useState(new Set(["all"]));
    const router = useRouter()
    const activeStatusFilter = Array.from(selected)[0];
    const optionData = datas.filter( item => {
        if(activeStatusFilter === 'all'){
            return true
        }
       return item.donationStatus === activeStatusFilter
    })

    const handleView = (id) => {
        redirect(`/donation_requests/${id}`)
    }
    const handleEdit = (id, data) => {
        const jsondata = encodeURIComponent(JSON.stringify(data))
        router.push(`/dashboard/Edit-donation-request?id=${id}&data=${jsondata}`)
    }
    const handleDelete = async (id) => {
        const deleted = await patchFLocal(`/donation_requests/${id}?donationstatus=canceled`)
        console.log(deleted)
        if(deleted.modifiedCount>0){
            toast.success('Request canceled')
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }
    }

    const getBadgeStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm inline-flex items-center gap-1';
            case 'in progress':
                return 'bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm inline-flex items-center gap-1';
            case 'done':
                return 'bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm inline-flex items-center gap-1';
            case 'canceled':
                return 'bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm inline-flex items-center gap-1';
            default:
                return 'bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm inline-flex items-center gap-1';
        }
    }

    return (
        <div className="w-full bg-white rounded-2xl border border-red-100 shadow-xl p-6 flex flex-col gap-6 text-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-50 pb-5">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 font-bold text-2xl shadow-sm">
                        🩸
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-red-700 tracking-wide uppercase">Donation Records</h2>
                        <p className="text-xs text-rose-500 font-medium">Monitor ongoing emergency distribution and operational metrics</p>
                    </div>
                </div>

                <div className="self-end sm:self-center">
                    <Dropdown>
                        <Button aria-label="Menu" variant="secondary" className="font-semibold border border-slate-200 shadow-sm rounded-xl px-5 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                            🔍 Filter Status: <span className="capitalize text-red-600 font-bold">{activeStatusFilter}</span>
                        </Button>
                        <Dropdown.Popover className="min-w-[256px] bg-white border border-slate-100 shadow-xl rounded-2xl p-2 z-50">
                            <Dropdown.Menu
                                selectedKeys={selected}
                                selectionMode="single"
                                onSelectionChange={setSelected}
                                className="flex flex-col gap-1 focus:outline-none"
                            >
                                <Dropdown.Section>
                                    <Header className="px-3 py-1.5 text-xs font-bold tracking-wider text-slate-400 uppercase">Select Status</Header>
                                    <Dropdown.Item id="all" textValue="All" className="flex items-center gap-2 p-2 hover:bg-rose-50/50 rounded-lg cursor-pointer transition-colors focus:outline-none">
                                        <Dropdown.ItemIndicator />
                                        <Label className="text-slate-600 text-sm font-semibold pointer-events-none">All Dashboard Data</Label>
                                    </Dropdown.Item>
                                    <Dropdown.Item id="pending" textValue="Pending" className="flex items-center gap-2 p-2 hover:bg-amber-50/50 rounded-lg cursor-pointer transition-colors focus:outline-none">
                                        <Dropdown.ItemIndicator />
                                        <Label className="text-amber-600 text-sm font-semibold pointer-events-none">⏳ Pending</Label>
                                    </Dropdown.Item>
                                    <Dropdown.Item id="In progress" textValue="In Progress" className="flex items-center gap-2 p-2 hover:bg-blue-50/50 rounded-lg cursor-pointer transition-colors focus:outline-none">
                                        <Dropdown.ItemIndicator />
                                        <Label className="text-blue-600 text-sm font-semibold pointer-events-none">🏃 In Progress</Label>
                                    </Dropdown.Item>
                                    <Dropdown.Item id="canceled" textValue="Canceled" className="flex items-center gap-2 p-2 hover:bg-red-50/50 rounded-lg cursor-pointer transition-colors focus:outline-none">
                                        <Dropdown.ItemIndicator />
                                        <Label className="text-red-600 text-sm font-semibold pointer-events-none">❌ Canceled</Label>
                                    </Dropdown.Item>
                                    <Dropdown.Item id="done" textValue="Done" className="flex items-center gap-2 p-2 hover:bg-green-50/50 rounded-lg cursor-pointer transition-colors focus:outline-none">
                                        <Dropdown.ItemIndicator />
                                        <Label className="text-green-600 text-sm font-semibold pointer-events-none">✅ Done</Label>
                                    </Dropdown.Item>
                                </Dropdown.Section>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
                </div>
            </div>

            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-inner bg-slate-50/30">
                <Table variant="secondary" className="w-full text-left border-collapse">
                    <Table.ScrollContainer className="w-full overflow-x-auto">
                        <Table.Content aria-label="Team members" className="min-w-[1000px] w-full text-sm">
                            <Table.Header className="bg-slate-100/80 border-b border-slate-200 text-slate-500 font-bold tracking-wider text-xs uppercase">
                                <Table.Column isRowHeader className="p-4">Recipient</Table.Column>
                                <Table.Column className="p-4">Recipient Location</Table.Column>
                                <Table.Column className="p-4">Donate_Date</Table.Column>
                                <Table.Column className="p-4">Donate_Time</Table.Column>
                                <Table.Column className="p-4">Blood_Group</Table.Column>
                                <Table.Column className="p-4">Donation_Status</Table.Column>
                                <Table.Column className="p-4">Donor name</Table.Column>
                                <Table.Column className="p-4">Donate email</Table.Column>
                                <Table.Column className="p-4 text-center">Action</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {optionData.map(i => {
                                    const {
                                        _id,
                                        recipientName,
                                        recipientDistrict,
                                        bloodGroup,
                                        donationDate,
                                        donationTime,
                                        donationStatus,
                                        donorName,
                                        donorEmail
                                    } = i
                                    return (
                                        <Table.Row key={_id} className="border-b border-slate-100 hover:bg-rose-50/20 bg-white transition-colors duration-150">
                                            <Table.Cell className="p-4 font-bold text-slate-700">{recipientName}</Table.Cell>
                                            <Table.Cell className="p-4 text-slate-600 font-medium">📍 {recipientDistrict}</Table.Cell>
                                            <Table.Cell className="p-4 text-slate-600">{donationDate}</Table.Cell>
                                            <Table.Cell className="p-4 text-slate-500 font-mono text-xs">{donationTime}</Table.Cell>
                                            <Table.Cell className="p-4">
                                                <span className="bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-md shadow-sm shadow-red-100">
                                                    {bloodGroup}
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell className="p-4">
                                                <span className={getBadgeStyle(donationStatus)}>
                                                    {donationStatus}
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell className="p-4 font-semibold text-slate-700">
                                                {donationStatus === 'In progress' && donorName ? donorName : <span className="text-slate-300 italic font-normal">-</span>}
                                            </Table.Cell>
                                            <Table.Cell className="p-4 text-slate-500 font-medium">
                                                {donationStatus === 'In progress' && donorEmail ? donorEmail : <span className="text-slate-300 italic font-normal">-</span>}
                                            </Table.Cell>
                                            <Table.Cell className="p-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button onClick={() => handleView(_id)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer shadow-sm">
                                                        View
                                                    </Button>
                                                    <Button onClick={() => handleEdit(_id, i)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-all cursor-pointer shadow-sm">
                                                        Edit
                                                    </Button>
                                                    {(role === 'admin' || role === 'donor') && (
                                                        <Button onClick={() => handleDelete(_id)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer shadow-sm">
                                                            Delete
                                                        </Button>
                                                    )}
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default MyDonationRequestTable;