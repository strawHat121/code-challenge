import { graphql, commitMutation } from "react-relay";
import RelayEnvironment from "../RelayEnvironment";
import { PayloadError } from "relay-runtime";

interface TransferMoneyInput {
  input: {
    fromAccountId: string;
    toAccountId: string;
    amount: number;
  };
}

interface TransferMoneyResponse {
  transferMoney: {
    transaction: {
      id: string;
      fromAccountId: string;
      toAccountId: string;
      amount: number;
    };
  };
}

const mutation = graphql`
  mutation TransferMoneyMutation($input: TransferMoneyInput!) {
    transferMoney(input: $input) {
      transaction {
        id
        fromAccountId
        toAccountId
        amount
      }
    }
  }
`;

function transferMoney(
  fromAccountId: string,
  toAccountId: string,
  amount: number,
  onCompleted: (
    response: TransferMoneyResponse,
    errors: readonly PayloadError[] | null | undefined
  ) => void,
  onError: (error: Error) => void
) {
  const variables: TransferMoneyInput = {
    input: {
      fromAccountId,
      toAccountId,
      amount,
    },
  };

  commitMutation(RelayEnvironment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      onCompleted(response as TransferMoneyResponse, errors);
    },
    onError,
  });
}

export default transferMoney;
