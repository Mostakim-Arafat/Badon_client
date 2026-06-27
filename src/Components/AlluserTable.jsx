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
    return (
        <div>
            <Table variant="secondary">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Team members" className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader>Avater</Table.Column>
                            <Table.Column>Name</Table.Column>
                            <Table.Column>role</Table.Column>
                            <Table.Column>Email</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column>Action</Table.Column>
                            <Table.Column>more</Table.Column>
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
                                        <Table.Row key={user._id}>
                                            <Table.Cell>
                                                <Image
                                                    src={image}
                                                    alt={role || ''}
                                                    height={50}
                                                    width={50}
                                                    className='rounded-md'
                                                />
                                            </Table.Cell>
                                            <Table.Cell>{name}</Table.Cell>
                                            <Table.Cell>{role}</Table.Cell>
                                            <Table.Cell>{email}</Table.Cell>
                                            <Table.Cell>{status}</Table.Cell>
                                            <Table.Cell>
                                                <button onClick={() => handleBlock(_id)} className='btn btn-error'>Blocked</button>
                                                <button onClick={() => handleActive(_id)} className='btn btn-success'>Active</button>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Popover>
                                                    <Button isIconOnly variant="tertiary">
                                                        <Ellipsis />
                                                    </Button>
                                                    <Popover.Content className="max-w-64" offset={10}>
                                                        <Popover.Dialog>
                                                            <button onClick={() => handleV(_id)} className='btn'>make_Volunteer</button>
                                                            <button onClick={() => handleAdmin(_id)} className='btn'>make_Admin</button>
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
    );
};

export default AlluserTable;