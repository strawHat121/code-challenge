import React, { useState } from 'react';
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import transferMoney from '../mutations/TransferMoneyMutation';

const TransferMoney: React.FC = () => {
    const [fromAccountId, setFromAccountId] = useState('');
    const [toAccountId, setToAccountId] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const [message, setMessage] = useState('');

    const handleTransferMoney = () => {
        transferMoney(
            fromAccountId,
            toAccountId,
            amount,
            (response) => {
                setMessage(`Transfer successful: ${response.transferMoney.transaction.id}`);
            },
            (error) => {
                setMessage(`Error transferring money: ${error.message}`);
            }
        );
    };

    return (
        <Card>
            <h2>Transfer Money</h2>
            <Input
                placeholder="From Account ID"
                value={fromAccountId}
                onChange={(e) => setFromAccountId(e.target.value)}
            />
            <Input
                placeholder="To Account ID"
                value={toAccountId}
                onChange={(e) => setToAccountId(e.target.value)}
            />
            <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
            <Button onClick={handleTransferMoney}>Transfer</Button>
            {message && <p>{message}</p>}
        </Card>
    );
};

export default TransferMoney;
