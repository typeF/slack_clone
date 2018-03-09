import React, { Component } from 'react';
import { Message, Form, Button, Input, Container, Header } from "semantic-ui-react";
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class CreateTeam extends Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      name: '',
      errors: {},
    });
  }

  onSubmit = async () => {
    const { name } = this;

    const response = await this.props.mutate({
      variables: { name }
    });

    const { ok, errors } = response.data.createTeam;

    if (ok) {
      this.props.history.push("/");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}error`] = message;
      });

      this.errors = err;
    }
  }

  onChange = e => {
    const { name, value  } = e.target;
    this[name] = value;
  }

  render() {
    const { name, errors: { nameerror, } } = this;

    const errorList = [];

    if (nameerror) {
      errorList.push(nameerror);
    }


    return (
      <Container text>
        <Header as="h2">Create Team</Header>
        <Form>
          <Form.Field error={!!nameerror}>
            <Input
              name="name"
              onChange={this.onChange}
              value={name}
              placeholder="Name"
              fluid
            />
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>

        {errorList.length ?
          (<Message
            error
            header="There was an error with the submission"
            list={errorList}
          />)
          :
          null
        }

      </Container>
    )
  }
}

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createTeamMutation)(observer(CreateTeam));
