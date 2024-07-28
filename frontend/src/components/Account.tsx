import React from 'react';
import { Card } from "@/components/ui/card"

interface AccountProps {
    id: string;
    name: string;
    balance: number;
}

const Account: React.FC<AccountProps> = ({ id, name, balance }) => {
    return (
        <Card>
            <h3>{name}</h3>
            <p>Account ID: {id}</p>
            <p>Balance: {balance}</p>
        </Card>
    );
};

export default Account;
