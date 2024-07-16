import { Schema, model, Document } from "mongoose";

interface IAccount extends Document {
  accountNumber: string;
  accountHolder: string;
  balance: number;
}

const accountSchema = new Schema<IAccount>({
  accountNumber: { type: String, required: true, unique: true },
  accountHolder: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
});

const Account = model<IAccount>("Account", accountSchema);

export default Account;

export { IAccount };
