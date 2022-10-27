import React from "react";
import "./App.css";
import axios from "axios";
import Nav from "./NavComponent.js";
import Table from "react-bootstrap/Table";
import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'
import {BrowserRouter, Switch, Route, Redirect, Link} from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Orders extends React.Component {
  state = {
		pickingRoute: "DOM01",
		selectedDespDate: null,
		selectedCompDate: null,
		selectedKitDate: null,
		selectedCustomer: null,
		orders: []
	}
	getOpenOrders = async (findOrders) => {
		let orders = await axios.get(`http://localhost:4420/orders`,
			{findOrders}, {withCredentials: true})
			// let filteredOrders = orders.data.filter(order => order)
			let filteredOrders = orders
			console.log(filteredOrders)
			this.setState({
					orders: filteredOrders.data
			})
	}
	componentDidMount() {
		this.getOpenOrders()
	}

  render() {
		return (
				localStorage.storedAccess >= 'B' ?
				<>
					<Nav />
					{/*PAGE SELECTION*/}
					<Tabs
			      defaultActiveKey="home"
			      transition={false}
			      id="noanim-tab-example"
			      className="mb-1"
			    >
			      <Tab eventKey="KIT01" title="Domestic Kitting">

			      </Tab>
			      <Tab eventKey="KIT02" title="Commercial Kitting">

			      </Tab>
			      <Tab eventKey="KIT03" title="USA Kitting">

			      </Tab>
						<Tab eventKey="COMP01" title="Domestic Completing">

						</Tab>
						<Tab eventKey="COMP02" title="Commercial Completing">

						</Tab>
						<Tab eventKey="COMP03" title="USA Completing">

						</Tab>
						<Tab eventKey="DESP01" title="Despatch">

						</Tab>
			    </Tabs>
					{/*SCHEDULING SECTION*/}
						<Accordion defaultActiveKey="0">
							<Accordion.Item eventKey="0">
								<Accordion.Header >Scheduling Charts</Accordion.Header>
								<Accordion.Body>
								</Accordion.Body>
								</Accordion.Item>
						</Accordion>
					{/*FILTER SECTION*/}
						<div>
						</div>
					{/*HEADER SECTION*/}
					{/*ORDER SECTION*/}
						<Accordion defaultActiveKey="1" alwaysOpen>
							{this.state.orders.map((order, i) => (
								<Accordion.Item eventKey={i} key={i} className="m-0 p-0" >
									<Accordion.Header >
									<Table striped bordered hover responsive size="sm" className="m-0 p-0">
										<thead>
											<tr>
												<th style={{width: '100px', margin: '0', padding: '0'}}>Order Number</th>
												<th style={{width: '100px', margin: '0', padding: '0'}}>Despatch Date</th>
												<th style={{width: '100px', margin: '0', padding: '0'}}>Completing Date</th>
												<th style={{width: '100px', margin: '0', padding: '0'}}>Kitting Date</th>
												<th style={{width: '350px', margin: '0', padding: '0'}}>Customer</th>
												<th style={{width: '80px', margin: '0', padding: '0'}}>Order Lines</th>
												<th style={{width: '80px', margin: '0', padding: '0'}}>Lines Picked</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td style={{width: '100px', margin: '0', padding: '0'}}>{order.docNum}</td>
												<td style={{width: '100px', margin: '0', padding: '0'}}>{order.docDueDate}</td>
												<td style={{width: '100px', margin: '0', padding: '0'}}>{order.kittingDate}</td>
												<td style={{width: '100px', margin: '0', padding: '0'}}>{order.kittingDate}</td>
												<td style={{width: '350px', margin: '0', padding: '0'}}>{order.customer.cardName}</td>
												<td style={{width: '80px', margin: '0', padding: '0'}}>{order.orderItems.length} Lines</td>
												<td style={{width: '80px', margin: '0', padding: '0'}}>0 Picked</td>
											</tr>
										</tbody>
									</Table>
									</Accordion.Header>
									<Accordion.Body>
											<h3>Sales Order {order.docNum} Lines</h3>
											<Form.Group controlId="formFileMultiple" className="m-3" size="sm">
											<Row>
											<Col sm="2">
												<Form.Label>Assembly Photos</Form.Label>
											</Col>
											<Col sm="3">
												<Form.Control type="file" multiple />
											</Col>
											</Row>
											</Form.Group>

											<Table striped bordered hover responsive size="sm">
												<thead>
													<tr>
														<th>Line #</th>
														<th>Item Code</th>
														<th>Item Description</th>
														<th>Stock Location</th>
														<th>Required Qty</th>
														<th>Issued Balance</th>
														<th>Picked</th>
													</tr>
												</thead>
												<tbody>
												{order.orderItems.map((line, i) => (
													<tr key={i}>
														<td>{line.lineNum}</td>
														<td>{line.itemCode}</td>
														<td>{line.itemDescription}</td>
														<td>{line.invWhse}</td>
														<td>{line.qtyReq}</td>
														<td>{line.issuedBalance}</td>
														<td>
															<Form.Check
															type="checkBox"
															label="Picked"
															name="ConDespPerm"
															value='4'
																/>
														</td>
													</tr>
													))}
												</tbody>
											</Table>
									</Accordion.Body>
								</Accordion.Item>
							))}
						</Accordion>
				</>
				: <Redirect to="/" />
		)
	}

}

export default Orders;
