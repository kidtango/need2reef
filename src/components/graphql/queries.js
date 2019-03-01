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
      profilePicture {
        id
        picture
      }
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
      author {
        id
        name
      }
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
  query GET_COMMENTS_QUERY($id: ID!) {
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
          author {
            id
            name
            profile {
              id
            }
            profilePicture {
              id
              picture
            }
          }
          replies(orderBy: createdAt_DESC) {
            id
            body
            createdAt
            author {
              id
              name
              profile {
                id
              }

              profilePicture {
                id
                picture
              }
            }
          }
        }
      }
    }
  }
`;

// Get more comments for tank profiles
export const GET_MORE_COMMENTS_QUERY = gql`
  query GET_MORE_COMMENTS_QUERY($cursor: String!, $id: ID!) {
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
          author {
            id
            name
            profile {
              id
            }
            profilePicture {
              id
              picture
            }
          }
          replies(orderBy: createdAt_DESC) {
            id
            body
            createdAt
            author {
              id
              name
              profile {
                id
              }
              p
              profilePicture {
                id
                picture
              }
            }
          }
        }
      }
    }
  }
`;

// Query for feeds
export const GET_FEEDS_QUERY = gql`
  query {
    feedsConnection(orderBy: createdAt_DESC, first: 4) {
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
            profile {
              id
            }
            profilePicture {
              id
              picture
            }
          }
        }
      }
    }
  }
`;

// Get more feeds
export const GET_MORE_FEEDS_QUERY = gql`
  query GET_MORE_FEEDS_QUERY($cursor: String!) {
    feedsConnection(orderBy: createdAt_DESC, first: 10, after: $cursor) {
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
            profile {
              id
            }
            profilePicture {
              id
              picture
            }
          }
        }
      }
    }
  }
`;

// Query for feed comments
export const GET_FEED_COMMENTS_QUERY = gql`
  query GET_FEED_COMMENTS_QUERY($id: ID!) {
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
            profile {
              id
            }
            profilePicture {
              id
              picture
            }
          }
          createdAt
          id
          body
        }
      }
    }
  }
`;

// Query for more feed comments
export const GET_MORE_FEED_COMMENTS_QUERY = gql`
  query GET_MORE_FEED_COMMENTS_QUERY($id: ID!, $cursor: String!) {
    feedCommentsConnection(
      where: { feed: { id: $id } }
      orderBy: createdAt_DESC
      first: 4
      after: $cursor
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
            profile {
              id
            }
            profilePicture {
              id
              picture
            }
          }
          createdAt
          id
          body
        }
      }
    }
  }
`;

// Query replies for feed comments
export const GET_FEED_COMMENT_REPLIES = gql`
  query GET_FEED_COMMENT_REPLIES($commentId: ID!) {
    feedCommentRepliesConnection(
      orderBy: createdAt_DESC
      first: 2
      where: { comment: { id: $commentId } }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          body
          createdAt
          author {
            id
            name
            profile {
              id
            }
            profilePicture {
              id
              picture
            }
          }
        }
      }
    }
  }
`;

// Query more replies for feed comments
export const GET_MORE_FEED_COMMENT_REPLIES = gql`
  query GET_FEED_COMMENT_REPLIES($commentId: ID!, $cursor: String!) {
    feedCommentRepliesConnection(
      orderBy: createdAt_DESC
      first: 4
      where: { comment: { id: $commentId } }
      after: $cursor
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          body
          createdAt
          author {
            id
            name
            profile {
              id
            }
            profilePicture {
              id
              picture
            }
          }
        }
      }
    }
  }
`;
