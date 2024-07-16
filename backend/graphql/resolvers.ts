import { IResolvers } from "apollo-server-koa";
import Account from "../models/Account";
import Transaction from "../models/Transaction";

const resolvers: IResolvers = {
  Query: {
    accounts: () => Account.find(),
    account: (_, { id }) => Account.findById(id),
    transactions: () =>
      Transaction.find().populate("senderAccount receiverAccount"),
    transaction: (_, { id }) =>
      Transaction.findById(id).populate("senderAccount receiverAccount"),
  },
  Mutation: {
    createAccount: async (_, { accountNumber, accountHolder }) => {
      const account = new Account({ accountNumber, accountHolder });
      await account.save();
      return account;
    },
    transferMoney: async (_, { senderId, receiverId, amount }) => {
      const sender = await Account.findById(senderId);
      const receiver = await Account.findById(receiverId);

      if (!sender || !receiver) {
        throw new Error("Invalid account(s)");
      }

      if (sender.balance < amount) {
        throw new Error("Low on funds");
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
