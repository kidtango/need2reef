import { gql } from 'apollo-boost';

// User query
export const GET_CURRENT_USER = gql`
  query {
    me {
      name
      email
      createdAt
      profile {
        id
      }
    }
  }
`;

// Profile query
export const GET_CURRENT_USER_PROFILE = gql`
  query GET_CURRENT_USER_PROFILE($id: ID!) {
    profile(id: $id) {
      id
      tanks {
        id
        title
        posts {
          id
          author {
            id
            name
          }
          createdAt
          body
          replies {
            id
            createdAt
            author {
              id
              name
            }
            body
          }
        }
        images {
          id
          image
        }
      }
    }
  }
`;

// Create new tank
export const CREATE_TANK_MUTATION = gql`
  mutation CREATE_TANK($title: String!, $profileId: String!) {
    createTank(data: { title: $title, profileId: $profileId }) {
      id
      title
    }
  }
`;

// Remove tank
export const DELETE_TANK_MUTATION = gql`
  mutation DELETE_TANK_MUTATION($id: ID!) {
    deleteTank(id: $id) {
      id
    }
  }
`;

// Add new comments to tank profile
// export const CREATE_TANK_COMMENT_MUTATION = gql`
// mutation CREATE_TANK_COMMENT_MUTATION($)

// `;
