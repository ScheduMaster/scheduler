import React, { Component } from 'react';
import { Table, Pagination, Dropdown } from 'react-bootstrap';
import { ActionDropdown } from "./ActionDropdown";
import '../static/css/data-table.css';
import { actions } from '../data/calendar';

export class DataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entriesPerPage: 5,
      activePage: 1
    };

    this.handleSelectPage = this.handleSelectPage.bind(this);
    this.handleSelectEntries = this.handleSelectEntries.bind(this);
  }

  handleSelectPage(eventKey) {
    this.setState({
      activePage: eventKey
    });
  }

  handleSelectEntries(eventKey) {
    this.setState({
      entriesPerPage: eventKey,
      activePage: 1
    });
  }

  render() {
    const { entries } = this.props;
    const { entriesPerPage, activePage } = this.state;
    const pageCount = Math.ceil(entries.length / entriesPerPage);

    const startIndex = (activePage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentEntries = entries.slice(startIndex, endIndex);
    
    return (
      <>
        <div className="table-responsive">
          <Table bordered hover >
            <thead>
              <tr>
                <th>NO.</th>
                <th>Title</th>
                <th>Client</th>
                <th>Location</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {currentEntries.map(({ id, title, client, location, start, end, status }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{client}</td>
                  <td>{location}</td>
                  <td>{start.toLocaleString()}</td>
                  <td>{end.toLocaleString()}</td>
                  <td>{status}</td>
                  <td className="text-end">
                    <ActionDropdown actions={actions}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-entries">
              Entries per page: {entriesPerPage}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {[10, 25, 50].map((entries) => (
                <Dropdown.Item
                  key={entries}
                  active={entries === entriesPerPage}
                  onClick={() => this.handleSelectEntries(entries)}
                >
                  {entries}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Pagination>
            {[...Array(pageCount)].map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === activePage}
                onClick={() => this.handleSelectPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </>
    );
  }
}