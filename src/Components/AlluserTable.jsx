'use client'

import React from 'react';
import { Table } from "@heroui/react";
import Image from 'next/image';
import { patchFLocal } from '@/lib/allget';
import { Ellipsis } from "@gravity-ui/icons";
import { Button, Popover } from "@heroui/react";

const AlluserTable = ({ users }) => {
   
    // console.log(users)
    const handleBlock = async (id) => {
     
        console.log(id)
        const statusBlock = await patchFLocal(`/users?status=Blocked&id=${id}`)
        console.log(statusBlock)
    }
    const handleActive = async (id) => {
       
        const statusBlock = await patchFLocal(`/users?status=active&id=${id}`)
        console.log(statusBlock)
    }
    const handleV = async (id) => {
       
        const statusBlock = await patchFLocal(`/users?role=volunteer&id=${id}`)
        console.log(statusBlock)
    }
    const handleAdmin = async (id) => {
        
        const statusBlock = await patchFLocal(`/users?role=admin&id=${id}`)
        console.log(statusBlock)
    }

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm inline-flex items-center gap-1';
            case 'blocked':
                return 'bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm inline-flex items-center gap-1';
            default:
                return 'bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm inline-flex items-center gap-1';
        }
    }

    const getRoleStyle = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return 'bg-red-600 text-white font-black text-xs px-2.5 py-0.5 rounded shadow-sm uppercase tracking-wider';
            case 'volunteer':
                return 'bg-blue-600 text-white font-black text-xs px-2.5 py-0.5 rounded shadow-sm uppercase tracking-wider';
            default:
                return 'bg-slate-100 text-slate-700 font-bold text-xs px-2.5 py-0.5 rounded shadow-sm uppercase tracking-wider border border-slate-200';
        }
    }

    return (
        <div className="w-full bg-white rounded-2xl border border-red-100 shadow-xl p-6 flex flex-col gap-6 text-slate-800">
            <div className="flex items-center gap-3 border-b border-rose-50 pb-5">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 font-bold text-2xl shadow-sm">
                    👥
                </div>
                <div>
                    <h2 className="text-xl font-black text-red-700 tracking-wide uppercase">User Registry</h2>
                    <p className="text-xs text-rose-500 font-medium">Manage network access, authorization hierarchy, and donor profile statuses</p>
                </div>
            </div>

            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-inner bg-slate-50/30">
                <Table variant="secondary" className="w-full text-left border-collapse">
                    <Table.ScrollContainer className="w-full overflow-x-auto">
                        <Table.Content aria-label="Team members" className="min-w-[850px] w-full text-sm">
                            <Table.Header className="bg-slate-100/80 border-b border-slate-200 text-slate-500 font-bold tracking-wider text-xs uppercase">
                                <Table.Column isRowHeader className="p-4 w-20">Avatar</Table.Column>
                                <Table.Column className="p-4">Name</Table.Column>
                                <Table.Column className="p-4">Role</Table.Column>
                                <Table.Column className="p-4">Email</Table.Column>
                                <Table.Column className="p-4">Status</Table.Column>
                                <Table.Column className="p-4 text-center">Action</Table.Column>
                                <Table.Column className="p-4 text-center w-20">More</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {
                                    users.map(user => {
                                        const {
                                            _id,
                                            name,
                                            email,
                                            role,
                                            status,
                                            image
                                        } = user
                                        return (
                                            <Table.Row key={_id} className="border-b border-slate-100 hover:bg-rose-50/20 bg-white transition-colors duration-150">
                                                <Table.Cell className="p-4">
                                                    <div className="relative w-10 h-10 rounded-full border-2 border-rose-100 overflow-hidden shadow-inner bg-slate-50 flex items-center justify-center">
                                                        {image ? (
                                                            <Image
                                                                src={image}
                                                                alt={role || ''}
                                                                fill
                                                                sizes="40px"
                                                                className='object-cover'
                                                            />
                                                        ) : (
                                                            <span className="text-sm font-bold text-slate-400">👤</span>
                                                        )}
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="p-4 font-bold text-slate-700">{name}</Table.Cell>
                                                <Table.Cell className="p-4">
                                                    <span className={getRoleStyle(role)}>
                                                        {role}
                                                    </span>
                                                </Table.Cell>
                                                <Table.Cell className="p-4 text-slate-500 font-medium">{email}</Table.Cell>
                                                <Table.Cell className="p-4">
                                                    <span className={getStatusStyle(status)}>
                                                        {status}
                                                    </span>
                                                </Table.Cell>
                                                <Table.Cell className="p-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button onClick={() => handleBlock(_id)} className='btn btn-xs font-bold rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100/80 px-3 py-1.5 h-auto transition-all cursor-pointer shadow-sm'>Blocked</button>
                                                        <button onClick={() => handleActive(_id)} className='btn btn-xs font-bold rounded-lg bg-green-50 border border-green-200 text-green-700 hover:bg-green-100/80 px-3 py-1.5 h-auto transition-all cursor-pointer shadow-sm'>Active</button>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="p-4 text-center">
                                                    <Popover>
                                                        <Button isIconOnly variant="tertiary" className="hover:bg-slate-100 rounded-lg p-1 transition-colors cursor-pointer text-slate-400 hover:text-slate-600 focus:outline-none">
                                                            <Ellipsis className="size-5" />
                                                        </Button>
                                                        <Popover.Content className="max-w-64 bg-white border border-slate-100 shadow-xl rounded-2xl p-2 z-50 animate-fadeIn" offset={10}>
                                                            <Popover.Dialog className="flex flex-col gap-1 focus:outline-none">
                                                                <button onClick={() => handleV(_id)} className='btn btn-sm text-left w-full justify-start font-bold rounded-xl bg-white hover:bg-blue-50/50 text-blue-600 border border-transparent hover:border-blue-100/50 px-3 py-2 h-auto transition-all cursor-pointer'>🛡️ Make Volunteer</button>
                                                                <button onClick={() => handleAdmin(_id)} className='btn btn-sm text-left w-full justify-start font-bold rounded-xl bg-white hover:bg-red-50/50 text-red-600 border border-transparent hover:border-red-100/50 px-3 py-2 h-auto transition-all cursor-pointer'>👑 Make Admin</button>
                                                            </Popover.Dialog>
                                                        </Popover.Content>
                                                    </Popover>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                }
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </div>
    );
};

export default AlluserTable;