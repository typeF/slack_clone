"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "\n  type Channel {\n    id: Int!\n    messages: [Message!]!\n    name: String!\n    users: [User!]!\n  }\n\n  type Mutation {\n    createChannel(teamId: Int!, name: String!, public: Boolean=false) : Boolean!\n  }\n";
//# sourceMappingURL=channel.js.map