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

class Inventory extends React.Component {
  state = {
		inventory: null,
		inventoryCount: 0
	};
	getInventory = async () => {
				let inventoryData = await axios.get(`http://localhost:4420/inventory`,
					{}, {withCredentials: true})
					console.log(inventoryData.data)
					this.setState(
						{
							inventory: inventoryData.data,
							inventoryCount: inventoryData.data.length
						}
					)

			}
			componentDidMount() {
				this.getInventory()
				console.log(this.state.inventory)
			}
			render() {
		  return (
				<body>
				<h1>
				Returned Items: {this.state.inventoryCount}
				</h1>
				<div>
		      {this.state.inventory && this.state.inventory.map(item => (
		        <div key={item}>
		          <p>WhseItemkey: {item.WhsCode + '-' + item.ItemCode}</p>
							<p>Code: {item.ItemCode}</p>
							<p>Description: {item.itemName}</p>
							<p>Group: {item.itmsGrpNam}</p>
							<p>Whse: {item.WhsCode}</p>
		          <p>Qty: {item.OnHand}</p>
							<p>StockValue: {item.StockValue}</p>
		          {/* Add additional properties rendering as needed */}
		        </div>
		      ))}
		    </div>
				</body>
		  );
		}
			}

export default Inventory;
