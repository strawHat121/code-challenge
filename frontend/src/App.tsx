import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateAccount from './components/CreateAccount';
import TransferMoney from './components/TransferMoney';
import AccountList from './components/AccountList';

interface Account {
  id: string;
  name: string;
  balance: number;
}

const App: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', name: 'Default Account 1', balance: 1000 },
    { id: '2', name: 'Default Account 2', balance: 2000 },
  ]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/create-account">Create Account</Link></li>
            <li><Link to="/transfer-money">Transfer Money</Link></li>
            <li><Link to="/accounts">Accounts</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/transfer-money" element={<TransferMoney />} />
          <Route path="/accounts" element={<AccountList accounts={accounts} />} />
          <Route path="/" element={<AccountList accounts={accounts} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
