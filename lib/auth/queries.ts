import gql from 'graphql-tag';

export const currentUserQuery = gql`
    query {
        currentUser {
            id,
            firstName,
            surname,
            email,
            roles {
                name
            }
        }
    }
`;
