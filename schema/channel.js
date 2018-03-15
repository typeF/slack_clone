export default `
  type Channel {
    id: Int!
    name: String!
    publiec: Boolean!
    messages: [Message!]!
    users: [User!]!
  }

  type Mutation {
    createChannel(teamId: Int!, name: String!, public: Boolean=false): Boolean!
  }
`
