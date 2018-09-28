import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import './Header.css'

import EventBlackList from './EventBlacklist'
import VenueBlackList from './VenueBlacklist'

export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
      return(
          <Row id="Header">
            <Col md="4">
              <h1>Family Review Tool</h1>
            </Col>
            <Col md="3">
              <EventBlackList fetchBlacklists={this.props.fetchBlacklists} />
            </Col>
            <Col md="3">
              <VenueBlackList fetchBlacklists={this.props.fetchBlacklists} />
            </Col>
            <Col md="2" id="blacklist-btns">
                <Button className="family-btn">
                  View Event Blacklist
                </Button>
                <Button className="family-btn">
                  View Venue Blacklist
                </Button>
            </Col>
          </Row>
      )
  }
}