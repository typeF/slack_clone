"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "\n  type Message {\n    id: Int!\n    text: String!\n    user: User!\n    channel: Channel!\n  }\n\n  type Mutation {\n    createMessage(channelId: Int!, text: String!): Boolean!\n  }\n";
//# sourceMappingURL=message.js.map