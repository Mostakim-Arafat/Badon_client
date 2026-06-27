import React from 'react';
import { Table } from '@heroui/react';
const Fundtable = ( ) => {
    return (
        <Table variant="secondary">
            <Table.ScrollContainer>
                <Table.Content aria-label="Team members" className="min-w-[600px]">
                    <Table.Header>
                        <Table.Column isRowHeader>Name</Table.Column>
                        <Table.Column>Amount</Table.Column>
                        <Table.Column>Date</Table.Column>
                        
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Michael Brown</Table.Cell>
                            <Table.Cell>CFO</Table.Cell>
                            <Table.Cell>Active</Table.Cell> 
                        </Table.Row>
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};

export default Fundtable;

