import { Schema, model, Document, Types } from "mongoose";
import { IAccount } from "./Account";

interface ITransaction extends Document {
  senderAccount: Types.ObjectId | IAccount;
  receiverAccount: Types.ObjectId | IAccount;
  amount: number;
  date: Date;
}

const transactionSchema = new Schema<ITransaction>({
  senderAccount: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  receiverAccount: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Transaction = model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
export { ITransaction };
