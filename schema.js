export default `
  type Team {
    owner: User!
    members: [User!]!
    channels: [Channel!]!
  }

  type Channel {
    id: Int!
    name: String!
    messages: [Message!]!
  }

  type Message {
    id: Int!
    text: String!
    user: User!
    channel: Channel!
  }

  type User {
    email: String!
    id: Int!
    username: String!
    messages: Message!
    teams: [Team!]!
  }
  
  type Query {
    hi: String
  }
`;
