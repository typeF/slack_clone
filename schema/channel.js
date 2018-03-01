export default `
  type Channel {
    id: Int!
    messages: [Message!]!
    name: String!
    users: [User!]!
  }

  type Mutation {
    createChannel(teamId: Int!, name: String!, public: Boolean=false) : Boolean!
  }
`
