import React, { useState } from 'react';
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import createAccount from '../mutations/CreateAccountMutation';

const CreateAccount: React.FC = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateAccount = () => {
        createAccount(
            name,
            (response) => {
                setMessage(`Account created: ${response.createAccount.account.name}`);
            },
            (error) => {
                setMessage(`Error creating account: ${error.message}`);
            }
        );
    };

    return (
        <Card>
            <h2>Create Account</h2>
            <Input
                placeholder="Account Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleCreateAccount}>Create Account</Button>
            {message && <p>{message}</p>}
        </Card>
    );
};

export default CreateAccount;
