import React from 'react';
import { Table } from '@heroui/react';
const Fundtable = ({ data }) => {
    console.log(data)
    return (
        <Table variant="secondary">
            <Table.ScrollContainer>
                <Table.Content aria-label="Team members" className="min-w-[600px]">
                    <Table.Header>
                        <Table.Column isRowHeader>Name</Table.Column>
                        <Table.Column>Amount</Table.Column>
                        <Table.Column>email</Table.Column>

                    </Table.Header>
                    <Table.Body>
                        
                            {
                                data.map(i => 
                                    <Table.Row key={i._id}>
                                    <Table.Cell>{i.name}</Table.Cell>
                            <Table.Cell>{i.amount}</Table.Cell>
                            <Table.Cell>{i.email}</Table.Cell>
                              </Table.Row>
                                )
                            }

                      
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};

export default Fundtable;

