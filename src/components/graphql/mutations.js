import { gql } from 'apollo-boost';

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
export const CREATE_TANK_COMMENT_MUTATION = gql`
  mutation CREATE_TANK_COMMENT_MUTATION($body: String!, $tankId: ID!) {
    createTankPost(data: { body: $body, tankId: $tankId }) {
      id
      body
    }
  }
`;

// Delete comments - Tank profile
export const DELETE_TANK_POST_MUTATION = gql`
  mutation DELETE_TANK_POST_MUTATION($id: ID!) {
    deleteTankPost(id: $id) {
      id
    }
  }
`;

// Update comments
export const UPDATE_TANK_POST_MUTATION = gql`
  mutation UPDATE_TANK_POST_MUTATION($postId: ID!, $body: String!) {
    updateTankPost(data: { postId: $postId, body: $body }) {
      id
      body
    }
  }
`;

// Replies

// Delete replies
export const DELETE_TANK_REPLY_MUTATION = gql`
  mutation DELETE_TANK_REPLY_MUTATION($id: ID!) {
    deleteTankReply(id: $id) {
      id
    }
  }
`;

// Create replies for comments
export const CREATE_TANK_REPLY_MUTATION = gql`
  mutation CREATE_TANK_REPLY_MUTATION($body: String!, $postId: ID!) {
    createTankReply(data: { body: $body, postId: $postId }) {
      id
    }
  }
`;

// Update replies
export const UPDATE_TANK_REPLY_MUTATION = gql`
  mutation UPDATE_TANK_REPLY_MUTATION($body: String!, $replyId: ID!) {
    updateTankReply(data: { replyId: $replyId, body: $body }) {
      id
    }
  }
`;

// Add images to tankProfile
export const CREATE_TANK_IMAGE_MUTATION = gql`
  mutation CREATE_TANK_IMAGE_MUTATION($url: String!, $tankId: ID!) {
    createTankImage(data: { tankId: $tankId, url: $url }) {
      id
      url
    }
  }
`;

// Add new feeds
export const CREATE_NEW_FEED_MUTATION = gql`
  mutation CREATE_NEW_FEED_MUTATION($message: String!, $url: String!) {
    createFeed(data: { url: $url, message: $message }) {
      id
    }
  }
`;

// Delete feeds
export const DELETE_FEED_MUTATION = gql`
  mutation DELETE_FEED_MUTATION($id: ID!) {
    deleteFeed(id: $id) {
      id
    }
  }
`;

// Add feed comments
export const CREATE_FEED_COMMENT = gql`
  mutation CREATE_FEED_COMMENT($body: String!, $feedId: ID!) {
    createFeedComment(data: { feedId: $feedId, body: $body }) {
      id
    }
  }
`;

// Delete feed comments
export const DELETE_FEED_COMMENT = gql`
  mutation DELETE_FEED_COMMENT($id: ID!) {
    deleteFeedComment(id: $id) {
      id
    }
  }
`;

// Update feed comments
export const UPDATE_FEED_COMMENT_MUTATION = gql`
  mutation UPDATE_FEED_COMMENT_MUTATION($feedCommentId: ID!, $body: String!) {
    updateFeedComment(data: { feedCommentId: $feedCommentId, body: $body }) {
      id
    }
  }
`;

// Create reply for feed comments
export const CREATE_FEED_COMMENT_REPLY = gql`
  mutation CREATE_FEED_COMMENT_REPLY($commentId: ID!, $body: String!) {
    createFeedCommentReply(data: { commentId: $commentId, body: $body }) {
      id
    }
  }
`;

// Delete reply for feed comments
export const DELETE_FEED_COMMENT_REPLY = gql`
  mutation DELETE_FEED_COMMENT_REPLY($replyId: ID!) {
    deleteFeedCommentReply(id: $replyId) {
      id
    }
  }
`;

// Update feed comment replies
export const UPDATE_FEED_COMMENT_REPLY_MUTATION = gql`
  mutation UPDATE_FEED_COMMENT_REPLY_MUTATION(
    $feedCommentReplyId: ID!
    $body: String!
  ) {
    updateFeedCommentReply(
      data: { feedCommentReplyId: $feedCommentReplyId, body: $body }
    ) {
      id
    }
  }
`;

// Add & Update user's profile picture
export const UPDATE_PROFILE_PICTURE_MUTATION = gql`
  mutation UPDATE_PROFILE_PICTURE_MUTATION(
    $profilePictureId: ID!
    $picture: String!
  ) {
    updateProfilePicture(
      data: { picture: $picture }
      where: { id: $profilePictureId }
    ) {
      id
    }
  }
`;
