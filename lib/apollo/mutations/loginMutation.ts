import gql from 'graphql-tag';

export const loginMutation = gql`
    mutation login($email: String!, $password: String!) {
        login(loginData: { email: $email, password: $password }) {
            accessToken,
            expiresIn
        }
    }
`;
