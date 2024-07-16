import { IResolvers } from "@graphql-tools/utils";
import Account from "../models/Account";
import Transaction from "../models/Transaction";
import {
  AccountArgs,
  CreateAccountArgs,
  TransferMoneyArgs,
  TransactionArgs,
} from "./types";

const resolvers: IResolvers = {
  Query: {
    accounts: () => Account.find(),
    account: (_: unknown, { id }: AccountArgs) => Account.findById(id),
    transactions: () =>
      Transaction.find().populate("senderAccount receiverAccount"),
    transaction: (_: unknown, { id }: TransactionArgs) =>
      Transaction.findById(id).populate("senderAccount receiverAccount"),
  },
  Mutation: {
    createAccount: async (
      _: unknown,
      { accountNumber, accountHolder }: CreateAccountArgs
    ) => {
      const account = new Account({ accountNumber, accountHolder });
      await account.save();
      return account;
    },
    transferMoney: async (
      _: unknown,
      { senderId, receiverId, amount }: TransferMoneyArgs
    ) => {
      const sender = await Account.findById(senderId);
      const receiver = await Account.findById(receiverId);

      if (!sender || !receiver) {
        throw new Error("Invalid account(s)");
      }

      if (sender.balance < amount) {
        throw new Error("Insufficient funds");
      }

      sender.balance -= amount;
      receiver.balance += amount;

      await sender.save();
      await receiver.save();

      const transaction = new Transaction({
        senderAccount: senderId,
        receiverAccount: receiverId,
        amount,
      });
      await transaction.save();

      return transaction.populate("senderAccount receiverAccount");
    },
  },
};

export default resolvers;
