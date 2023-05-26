import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faPencil, faLink } from '@fortawesome/free-solid-svg-icons';

export class Action extends Component {
  handleActionClick = () => {
    const { id, action, onView, onDelete, onUpdate, onAnother } = this.props;
    // Perform actions based on the clicked action and id
    switch (action) {
      case 'view':
        onView(id);
        break;
      case 'delete':
        onDelete(id);
        break;
      case 'update':
        onUpdate(id);
        break;
      case 'another':
        onAnother(id);
        break;
      default:
        break;
    }
  };
  
  render() {
    const { action } = this.props;

    if (action === "delete") {
      return (
        <Button variant="danger" onClick={this.handleActionClick} style={{ width: 10, height: 20 }}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      );
    }

    if (action === "update") {
      return (
        <Button variant="warning" onClick={this.handleActionClick} style={{ width: 10, height: 20 }}>
          <FontAwesomeIcon icon={faPencil} />
        </Button>
      );
    }

    if (action === "view") {
      return (
        <Button variant="info" onClick={this.handleActionClick} style={{ width: 10, height: 20 }}>
          <FontAwesomeIcon icon={faEye} />
        </Button>
      );
    }

    return (
      <Button variant="secondary" onClick={this.handleActionClick} style={{ width: 10, height: 20 }}>
        <FontAwesomeIcon icon={faLink} />
      </Button>
    ); 
  }
}
  