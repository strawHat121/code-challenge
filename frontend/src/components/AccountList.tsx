import React from 'react';
import { Card } from "@/components/ui/card"
import Account from './Account';

interface Account {
    id: string;
    name: string;
    balance: number;
}

interface AccountListProps {
    accounts: Account[];
}

const AccountList: React.FC<AccountListProps> = ({ accounts }) => {
    return (
        <Card>
            <h2>Account List</h2>
            {accounts.map((account) => (
                <Account
                    key={account.id}
                    id={account.id}
                    name={account.name}
                    balance={account.balance}
                />
            ))}
        </Card>
    );
};

export default AccountList;
