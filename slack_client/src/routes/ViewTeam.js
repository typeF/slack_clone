import React from 'react';

import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sidebar';

export default () => ( 
  <AppLayout>
    <Sidebar currentTeamId={7}/>
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
