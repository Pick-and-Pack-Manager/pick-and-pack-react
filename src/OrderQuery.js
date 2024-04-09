import React from "react";
import axios from "axios";
import "./App.css";
import Nav from "./NavComponent.js";

import {BrowserRouter, Switch, Route, Redirect, Link} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert'
import Accordion from 'react-bootstrap/Accordion'
import Table from "react-bootstrap/Table"

class OrderQuery extends React.Component {
  state = {
		orderData: null
	};
	getOrders = async () => {
				let orderData = await axios.get(`http://localhost:4420/orderQuery`,
					{}, {withCredentials: true})
					console.log(orderData.data)

					this.setState(
						{
							orders: orderData.data
						}
					)

			}
			componentDidMount() {
				this.getOrders()
				console.log(this.state.orderData)
			}
			render() {
				// // Ensure whsTotals is an object before proceeding
 				// const warehouseEntries = this.state.whsTotals ? Object.entries(this.state.whsTotals) : [];
		  return (
				<body>
			      {/* Existing Inventory Items List */}
								<div>
			      {this.state.orderData && this.state.orderData.map(order => (
			        <div key={order}>
			          <p style={{ margin: '2px' }}>Order: {order.orderNumber}</p>
			          {/* Add additional properties rendering as needed */}
								<hr />
			        </div>
			      ))}
			    </div>
				</body>
		  );
		}
			}

export default OrderQuery;
