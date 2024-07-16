export interface AccountArgs {
  id: string;
}

export interface CreateAccountArgs {
  accountNumber: string;
  accountHolder: string;
}

export interface TransferMoneyArgs {
  senderId: string;
  receiverId: string;
  amount: number;
}

export interface TransactionArgs {
  id: string;
}
