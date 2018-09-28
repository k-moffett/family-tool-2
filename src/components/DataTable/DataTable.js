import React, { Component } from 'react';
import { Row, Col, Table, FormGroup, Label, Input } from 'reactstrap';
import matchWorker from './worker'
import './DataTable.css'

export default class DataTable extends Component {
  constructor(props) {
    super(props)
  }

  isFamilyFriendly(eventTitle, eventID, venueID, blacklists) {
    // true means it is not family friendly

    if (matchWorker.svidCheck(eventTitle, eventID, venueID, blacklists) === false) {
      return(
        <td>
          <FormGroup check>
            <Label check>
              <Input type="radio" checked='checked' name={`family-${eventID}`} value={'family_on'} />{' '}
                Yes
            </Label>
          </FormGroup>

          <FormGroup check>
            <Label check>
              <Input type="radio" name={`family-${eventID}`} value={'family_off'} />{' '}
                No
              </Label>
          </FormGroup>
        </td>
      )
    } else if (matchWorker.svidCheck(eventTitle, eventID, venueID, blacklists) === true) {
      return (
        <td className="notFamilyFriendly">
          <FormGroup check>
            <Label check>
              <Input type="radio" name={`family-${eventID}`} value={'family_on'} />{' '}
                Yes
            </Label>
          </FormGroup>

          <FormGroup check>
            <Label check>
              <Input type="radio" checked='checked' name={`family-${eventID}`} value={'family_off'} />{' '}
                No
              </Label>
          </FormGroup>
        </td>
      )
    }


  }

  render() {
    const { error, isLoaded, items, blacklists } = this.props.state

    if (error) { return <div>Error: {error}</div>}
    if (!isLoaded) {return <div>Loading...</div>}
    else {
      return(
        <Row id="DataTable">
          <Col>
            <Table bordered hover>

              <thead>
                <tr>
                  <th>Title</th>
                  <th>Owner</th>
                  <th>SVID</th>
                  <td>Set Family Category</td>
                </tr>
              </thead>

              <tbody>
                {items.map((event) => {
                  return (
                    <tr key={event.id}>
                    <td><a href={`http://eventful.com/${event.id}`} target="_blank">{event.title}</a></td>
                    <td>{event.owner}</td>
                    <td><a href={event.venue_url} target="_blank">{event.venue_id}</a></td>
                    {this.isFamilyFriendly(event.title, event.id, event.venue_id, blacklists)}
                </tr>
                  )
                })}
              </tbody>

            </Table>
          </Col>
        </Row>
      )
    }
}

}