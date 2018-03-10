import React from 'react';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';

export default () => ( 
  <AppLayout>
    <Teams
      teams={[{id: 1, name: "T"}, {id: 2, name: 'Q'}]}
    />
    <Channels 
      teamName="Team name" 
      userName="Username" 
      channels={[{id: 1, name: "General"}, { id: 2, name: "Random" }]}
      users={[{id: 1, name: "slackbot"}, { id: 2, name: "user1" }]}
    />
    <Header channelName="General"/>
    <Messages>
      <ul className="message-list">
        <li></li>
        <li></li>
      </ul>
    </Messages>
    <SendMessage channelName="General"/>
  </AppLayout>
);
