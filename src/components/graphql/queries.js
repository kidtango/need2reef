import { gql } from 'apollo-boost';

// Get first 10 tank profiles
export const GET_TANK_PROFILES_QUERY = gql`
  query {
    tanksConnection(first: 40) {
      edges {
        node {
          id
          title
          images {
            id
            url
          }
        }
        __typename
      }
    }
  }
`;

// Get all tanks - starting with 10 tank profiles per query
export const MORE_TANK_PROFILES_QUERY = gql`
  query moreTankProfiles($cursor: String!) {
    tanksConnection(first: 6, after: $cursor) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          title
          images {
            id
            url
          }
        }
        __typename
      }
    }
  }
`;

// User query
export const GET_CURRENT_USER = gql`
  query {
    me {
      id
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
        }
        images {
          id
          url
        }
      }
    }
  }
`;

// Get comments for tank profiles
export const GET_COMMENTS_QUERY = gql`
  query getComments($id: ID!) {
    tankPostsConnection(
      orderBy: createdAt_DESC
      first: 4
      where: { tank: { id: $id } }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          body
          createdAt
          replies(orderBy: createdAt_DESC) {
            id
            body
            createdAt
            author {
              id
              name
            }
          }
          author {
            id
            name
          }
        }
      }
    }
  }
`;

// Get more comments for tank profiles
export const GET_MORE_COMMENTS_QUERY = gql`
  query getMoreComments($cursor: String!, $id: ID!) {
    tankPostsConnection(
      orderBy: createdAt_DESC
      after: $cursor
      first: 4
      where: { tank: { id: $id } }
    ) {
      pageInfo {
        endCursor

        hasNextPage
      }
      edges {
        node {
          id
          body
          createdAt
          replies(orderBy: createdAt_DESC) {
            id
            body
            createdAt
            author {
              id
              name
            }
          }
          author {
            id
            name
          }
        }
      }
    }
  }
`;

// Query for feeds
export const GET_FEEDS_QUERY = gql`
  query {
    feedsConnection(orderBy: createdAt_DESC, first: 20) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          createdAt
          id
          message
          createdAt
          images {
            url
          }
          author {
            name
            id
          }
        }
      }
    }
  }
`;

// Query for feed comments
export const GET_FEED_COMMENTS_QUERY = gql`
  query getFeedComments($id: ID!) {
    feedCommentsConnection(
      where: { feed: { id: $id } }
      orderBy: createdAt_DESC
      first: 4
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          author {
            id
            name
          }
          createdAt
          id
          body
          reply(orderBy: createdAt_DESC) {
            id
            body
            author {
              id
              name
            }
          }
        }
      }
    }
  }
`;
