import React, { Component } from 'react';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import findIndex from 'lodash/findIndex';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';

class Sidebar extends Component {
  state = {
    openAddChannelModal: false,
  }

  handleCloseAddChannelModal = () => {
    this.setState({ openAddChannelModal: false });
  }

  handleAddChannelClick = () => {
    this.setState({ openAddChannelModal: true });
  }

  render() {
    const { data: { loading, allTeams }, currentTeamId } = this.props;
    if (loading) {
      return null;
    }

    const teamIdx = currentTeamId ? findIndex(allTeams, ['id', parseInt(currentTeamId, 10)]) : 0;
    const team = allTeams[teamIdx];
    let username = '';
    try {
      const token = localStorage.getItem('token');
      const { user } = decode(token);
      username = user.username;
    } catch (err) {
    }

    const style = {
      modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
      }
    }

    // console.log(teamIdx);
    // console.log('allteams: ', allTeams);
    console.log('currentTeamid: ', currentTeamId);

    return [
      <Teams
        key="team-sidebar"
        teams={allTeams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
      />,
      <Channels
        key="channels-sidebar"
        teamName={team.name}
        username={username}
        channels={team.channels}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
        onAddChannelClick={this.handleAddChannelClick}
      />,
      <AddChannelModal 
        teamId={currentTeamId}
        key="sidebar-add-channel-modal"
        onClose={this.handleCloseAddChannelModal}
        open={this.state.openAddChannelModal}/>
    ];
  };
}

const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

export default graphql(allTeamsQuery)(Sidebar);
