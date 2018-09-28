import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
   
  Modal.setAppElement('#root')

export default class EventBlackList extends Component {
  constructor(props) {
    super(props)
    this.state = {
        value: '',
        modalIsOpen: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addToBL = this.addToBL.bind(this)
  }

  handleChange(e) {
      e.preventDefault()
      this.setState({value: e.target.value});
  }

  handleSubmit(e) {
      e.preventDefault()
      this.openModal()
      
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false},
        this.clearInput());
  }

  addToBL() {
    fetch('/blacklist_event', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({data: this.state.value})
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result.response)
        this.closeModal()
        this.clearInput()
        this.props.fetchBlacklists()
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  clearInput() {
      this.setState({
          value: ''
      })
  }

  render() {
      return(
        <div>
        <Form>
            <Label>Event Blacklist</Label>
            <FormGroup id="event-blacklist">
                    <Input 
                      type="text" 
                      className="blacklist-inputs" 
                      value={this.state.value} 
                      onChange={(e) => {this.handleChange(e)}} 
                      placeholder="event title or phrase" />   
                    <Button 
                      type="submit" 
                      onClick={(e) => {this.handleSubmit(e)}} 
                      className="submit-btns">
                      {/* btn text */}
                      Submit
                    </Button>
            </FormGroup>
        </Form>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}>Are you sure you want to blacklist: {this.state.value}?</h2>
          <button className="modal-btn" onClick={this.addToBL}>Yes</button>
          <button className="modal-btn" onClick={this.closeModal}>close</button>
        </Modal>

        </div>
      )
  }
}