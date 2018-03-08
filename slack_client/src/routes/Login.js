import React, { Component } from 'react';
import { Message, Form, Button, Input, Container, Header } from "semantic-ui-react";
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class Login extends Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      email: '',
      password: '',
      errors: {},
    });
  }

  onSubmit = async () => {
    const { email, password } = this;

    const response = await this.props.mutate({
      variables: { email, password }
    });

    const { ok, token, refreshToken, errors } = response.data.login;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
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
    const { email, password, errors: { emailerror, passworderror } } = this;

    const errorList = [];

    if (emailerror) {
      errorList.push(emailerror);
    }

    if (passworderror) {
      errorList.push(passworderror);
    }


    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Form>
          <Form.Field error={!!emailerror}>
            <Input
              name="email"
              onChange={this.onChange}
              value={email}
              placeholder="Email"
              fluid
            />
          </Form.Field>
          <Form.Field error={!!passworderror}>
            <Input
              name="password"
              onChange={this.onChange}
              value={password}
              placeholder="Password"
              type="password"
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

const loginMutation = gql`
  mutation($email:String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));
