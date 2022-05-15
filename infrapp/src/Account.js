import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './images/weiyun.jpg'
import line from './images/line.png'
import App from './App';
import ReactDOM from 'react-dom';
import emitter from './events';

import {
  Alert,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Row,
  Col,
  Form,
  FormText,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem
 } from 'reactstrap';

 import { Divider } from 'rsuite';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {

      users: []
    };

  }



  componentDidMount() {
    fetch('http://133.18.23.48:3001/getpatients')
    .then(res => res.json())
    .then((data) => {
        console.log(data);
      this.setState({ users: data })
    })
    .catch(console.log)
    
  }


  handleGetValue(event) {
    console.log(event.target.innerText);
    emitter.emit('activeTab', '2');
    emitter.emit('userno', event.target.innerText);
  }
  render () {
      return (
        <div className="container">
          <img src={logo} alt="wechat" width="300" height="300"/>

          <Form onSubmit={this.CreateAccount}>         

            <p><strong><font size="5">用户列表</font></strong>.</p>
            <ListGroup>
              {this.state.users.map((item, key) => {
                return (
                  <ListGroupItem  color="success" tag="a" href="#" onClick={this.handleGetValue}>{item.userid}</ListGroupItem>
                  
                )
              })}

            </ListGroup>
            <p />

          </Form>

        </div>  
      );
  }
}

export default Account;
