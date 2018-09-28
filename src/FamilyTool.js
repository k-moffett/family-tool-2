import React, { Component } from 'react';
import './FamilyTool.css';
import { Container } from 'reactstrap';
import Header from './components/Header/Header'
import DataTable from './components/DataTable/DataTable.js'

export default class FamilyTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      blacklists: {}
    };
    this.fetchBlacklists = this.fetchBlacklists.bind(this)
  }

  componentWillMount() {
    this.getAllData()
  }

  getAllData() {
    this.fetchBlacklists()
  }

  fetchEvents() {

    const URL = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/family?app_key=LkRczZ6Mw7zvVqtS`
    
    fetch(URL)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.event
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  fetchBlacklists() {
    fetch('/get_all_blacklists')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          blacklists: result
        }, this.fetchEvents())
      },
      (error) => {
        console.log(error)
      }
    )
  }

  render() {
    return (
      <Container id="FamilyTool">
        <Header fetchBlacklists={this.fetchBlacklists} />
        <DataTable state={this.state}/>
      </Container>
    );
  }
}