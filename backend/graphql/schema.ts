import { gql } from "apollo-server-koa";

const typeDefs = gql`
  type Account {
    id: ID!
    accountNumber: String!
    accountHolder: String!
    balance: Float!
  }

  type Transaction {
    id: ID!
    senderAccount: Account!
    receiverAccount: Account!
    amount: Float!
    date: String!
  }

  type Query {
    accounts: [Account!]!
    account(id: ID!): Account
    transactions: [Transaction!]!
    transaction(id: ID!): Transaction
  }

  type Mutation {
    createAccount(accountNumber: String!, accountHolder: String!): Account!
    transferMoney(senderId: ID!, receiverId: ID!, amount: Float!): Transaction!
  }
`;

export default typeDefs;
