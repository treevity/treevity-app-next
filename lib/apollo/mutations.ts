import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(loginData: { email: $email, password: $password }) {
            accessToken,
            expiresIn
        }
    }
`;
