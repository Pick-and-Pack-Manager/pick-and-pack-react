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
		inventoryCount: 0,
		totalInventoryValue: 0, // Set the total inventory value in the state
		whsTotals: null, // Set the total inventory value in the state
	};
	getInventory = async () => {
				let inventoryData = await axios.get(`http://localhost:4420/inventory`,
					{}, {withCredentials: true})
					console.log(inventoryData.data)

					// Calculate total inventory value assuming stockValue is already a number
					const totalValue = inventoryData.data.reduce((acc, item) => acc + item.StockValue, 0);

					// Initialize an object to hold the total StockValue for each WhsCode
				  const whsTotals = {};
				  inventoryData.data.forEach(item => {
				    if (!whsTotals[item.WhsCode]) {
				      whsTotals[item.WhsCode] = 0;
				    }
				    whsTotals[item.WhsCode] += item.StockValue;
				  });

					this.setState(
						{
							inventory: inventoryData.data,
							inventoryCount: inventoryData.data.length,
							totalInventoryValue: totalValue, // Set the total inventory value in the state
							whsTotals: whsTotals
						}
					)

			}
			componentDidMount() {
				this.getInventory()
				console.log(this.state.inventory)
			}
			render() {
				// Ensure whsTotals is an object before proceeding
 				const warehouseEntries = this.state.whsTotals ? Object.entries(this.state.whsTotals) : [];
		  return (
				<body>
				<h1>
				Returned Items: {this.state.inventoryCount},
        Inventory Value: ${this.state.totalInventoryValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
				<hr />
				</h1>
				<div>
		      {this.state.inventory && this.state.inventory.map(item => (
		        <div key={item}>
		          <p style={{ margin: '2px' }}>WhseItemkey: {item.WhsCode + '-' + item.ItemCode}</p>
							<b style={{ margin: '2px' }}>Code: {item.ItemCode}</b>
							<p style={{ margin: '2px' }}>Description: {item.itemName}</p>
							<p style={{ margin: '2px' }}>Group: {item.itmsGrpNam}</p>
							<p style={{ margin: '2px' }}>Whse: {item.WhsCode}</p>
		          <b style={{ margin: '2px' }}>Qty: {item.OnHand}</b>
							<p style={{ margin: '2px' }}>StockValue: {item.StockValue}</p>
		          {/* Add additional properties rendering as needed */}
							<hr />
		        </div>
		      ))}
		    </div>
				</body>
		  );
		}
			}

export default Inventory;
