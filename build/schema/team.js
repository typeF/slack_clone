"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "\n  type Team {\n    owner: User!\n    members: [User!]!\n    channels: [Channel!]!\n  }\n\n\n  \n  type Mutation {\n    createTeam(name: String!) : Boolean!\n  }\n";
//# sourceMappingURL=team.js.map