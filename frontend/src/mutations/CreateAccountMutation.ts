import { graphql, commitMutation } from "react-relay";
import RelayEnvironment from "../RelayEnvironment";
import { PayloadError } from "relay-runtime";

interface CreateAccountInput {
  input: {
    name: string;
  };
}

interface CreateAccountResponse {
  createAccount: {
    account: {
      id: string;
      name: string;
    };
  };
}

const mutation = graphql`
  mutation CreateAccountMutation($input: CreateAccountInput!) {
    createAccount(input: $input) {
      account {
        id
        name
      }
    }
  }
`;

function createAccount(
  name: string,
  onCompleted: (
    response: CreateAccountResponse,
    errors: readonly PayloadError[] | null | undefined
  ) => void,
  onError: (error: Error) => void
) {
  const variables: CreateAccountInput = {
    input: {
      name,
    },
  };

  commitMutation(RelayEnvironment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      onCompleted(response as CreateAccountResponse, errors);
    },
    onError,
  });
}

export default createAccount;
