import React, { Component } from 'react';
import { Form, Input, Button, Modal } from 'semantic-ui-react';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

const AddChannelModal = ({ 
  open, 
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => ( 
  <Modal open={open} onClose={onClose}>
    <Modal.Header>
      Add Channel
    </Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input 
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name='name'
            fluid
            placeholder='Channel Name' />
        </Form.Field>
        <Form.Group widths='equal'>
          <Button 
            disabled={isSubmitting}
            fluid onClick={onClose}>
            Cancel
          </Button>
          <Button 
            disabled={isSubmitting}
            fluid 
            onClick={handleSubmit}>
            Create Channel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const creatChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name)
  }
`;

export default compose(
  graphql(creatChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: '' }),
    handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting }) => {
      const response = await mutate({ variables: { teamId, name: values.name } });
      onClose();
      console.log(response);
      setSubmitting(false);
    },
  })
)(AddChannelModal);
