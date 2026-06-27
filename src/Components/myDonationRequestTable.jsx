'use client'

import { Table } from "@heroui/react";
import { Button } from "@heroui/react";
import { redirect } from "next/navigation";
import { patchFLocal } from "@/lib/allget";
import { useState } from "react";
import { useRouter } from "next/navigation";


import { Dropdown, Header, Label } from "@heroui/react";

const MyDonationRequestTable = ({ datas, role }) => {
    //filter option
    const [selected, setSelected] = useState(new Set(["all"]));
    const router = useRouter()
    const activeStatusFilter = Array.from(selected)[0];
    console.log(activeStatusFilter)
    const optionData = datas.filter( item => {
        if(activeStatusFilter === 'all'){
            return true
        }
       return item.donationStatus === activeStatusFilter
    }
    )
   


    //action
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
    }

    return (
        <div>
            {/* go */}
            <Dropdown>
                <Button aria-label="Menu" variant="secondary">
                    Filter
                </Button>
                <Dropdown.Popover className="min-w-[256px]">
                    <Dropdown.Menu
                        selectedKeys={selected}
                        selectionMode="single"
                        onSelectionChange={setSelected}
                    >
                        <Dropdown.Section>
                                <Header>Select Status</Header>
                                <Dropdown.Item id="all" textValue="All">
                                    <Dropdown.ItemIndicator />
                                    <Label className="text-gray-600 font-medium">All</Label>
                                </Dropdown.Item>
                                <Dropdown.Item id="pending" textValue="Pending">
                                    <Dropdown.ItemIndicator />
                                    <Label className="text-amber-600 font-medium">Pending</Label>
                                </Dropdown.Item>
                                <Dropdown.Item id="In progress" textValue="In Progress">
                                    <Dropdown.ItemIndicator />
                                    <Label className="text-blue-600 font-medium">In Progress</Label>
                                </Dropdown.Item>
                                <Dropdown.Item id="canceled" textValue="Canceled">
                                    <Dropdown.ItemIndicator />
                                    <Label className="text-red-600 font-medium">Canceled</Label>
                                </Dropdown.Item>
                                <Dropdown.Item id="done" textValue="Done">
                                    <Dropdown.ItemIndicator />
                                    <Label className="text-green-600 font-medium">Done</Label>
                                </Dropdown.Item>
                            </Dropdown.Section>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
            {/* end */}
            <Table variant="secondary">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Team members" className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader>Recipient</Table.Column>
                            <Table.Column>Recipient Location</Table.Column>
                            <Table.Column>Donate_Date</Table.Column>
                            <Table.Column>Donate_Time</Table.Column>
                            <Table.Column>Blood_Group</Table.Column>
                            <Table.Column>Donation_Status</Table.Column>

                            <Table.Column>Donor name</Table.Column>
                            <Table.Column>Donate email</Table.Column>
                            <Table.Column>Action</Table.Column>




                        </Table.Header>
                        <Table.Body>
                            {
                                optionData.map(i => {
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
                                    } = i
                                    return (

                                        <Table.Row key={i._id}>
                                            <Table.Cell>{recipientName}</Table.Cell>
                                            <Table.Cell>{recipientDistrict}</Table.Cell>
                                            <Table.Cell>{donationDate}</Table.Cell>
                                            <Table.Cell>{donationTime}</Table.Cell>
                                            <Table.Cell>{bloodGroup}</Table.Cell>
                                            <Table.Cell>{donationStatus}</Table.Cell>
                                            <Table.Cell>
                                                {donationStatus === 'In progress' && donorName ? donorName : <span className="text-slate-300 italic">-</span>}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {donationStatus === 'In progress' && donorEmail ? donorEmail : <span className="text-slate-300 italic">-</span>}
                                            </Table.Cell>

                                            <Table.Cell>
                                                <Button className='btn' onClick={() => handleView(_id)}>view</Button>
                                                <Button className='btn' onClick={() => handleEdit(_id, i)}>edit</Button>
                                                {(role === 'admin' || role === 'donor') && <Button className='btn' onClick={() => handleDelete(_id)}>delete</Button>}

                                            </Table.Cell>
                                        </Table.Row>)
                                })


                            }
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default MyDonationRequestTable;