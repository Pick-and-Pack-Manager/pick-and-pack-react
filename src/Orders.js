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
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';

class Orders extends React.Component {
  state = {
		scheduleTotalLines: 0,
		scheduleTotalPicked: 0,
		pageTitle: "KIT1 Kitting Schedule",
		kittingRoute: "KIT1",
		completingRoute: null,
		despatchRoute: null,
		selectedDespDate: null,
		selectedCompDate: null,
		selectedKitDate: null,
		selectedCustomer: null,
		orders: []
	}
	getOpenOrders = async () => {
		let findOrders = {
			kittingRoute: this.state.kittingRoute,
			completingRoute: this.state.completingRoute,
			despatchRoute: this.state.despatchRoute
		}
		let orders = await axios.post(`http://localhost:4420/orders`,
			findOrders, {withCredentials: true})
			// let filteredOrders = orders.data.filter(order => order)
			let filteredOrders = orders

			await filteredOrders.data.forEach((order, ordIndex) => {
				order.pickedQty = order.orderItems.filter((line, lineIndex) => line.issued == "I" || line.issued == "Y").length
				this.state.scheduleTotalLines = this.state.scheduleTotalLines + order.orderItems.length
				this.state.scheduleTotalPicked = this.state.scheduleTotalPicked + order.pickedQty
				this.state.scheduleAllPickedPercentage = Math.trunc((this.state.scheduleTotalPicked / this.state.scheduleTotalLines) * 100)
				order.allPickedPercentage = Math.trunc((order.pickedQty / order.orderItems.length) * 100)
				order.orderItems.forEach((line, lineIndex) => {
					if (line.issued == "N" || line.issued == null  || line.issued == undefined) {
						line.pickStatusMsg = "To Pick"
					} else if (line.issued == "Y") {
						line.pickStatusMsg = "Transferred"
					} else if (line.issued == "I") {
						line.pickStatusMsg = "Picked SAP"
					}
				})
			})
			await this.setState({
					orders: filteredOrders.data
			})
	}
	updateOrder = async (order, e) => {
		console.log('UPDATE Order')
		console.log(order._id)
		console.log(order.docNum)
		console.log(order.orderItems)
			// let updateOrder = await axios.patch(`http://localhost:4420/orders`, {order}, {withCredentials: true})
				// console.log(order)
				let setSubState = this.state.order
				// setSubState.id = updateUser.data.user.id
				// setSubState.userFullName = fullName
				// setSubState.firstName = updateUser.data.user.firstName
				// setSubState.lastName = updateUser.data.user.lastName
				// setSubState.email = updateUser.data.user.email
				// setSubState.userName = updateUser.data.user.userName
				// setSubState.password = updateUser.data.user.password
				// setSubState.storedAccess = updateUser.data.user.storedAccess
				// setSubState.userSupervisor = updateUser.data.user.supervisor
				// this.setState({setSubState})

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
			      defaultActiveKey="KIT1"
			      transition={false}
			      id="noanim-tab-example"
			      className="mb-1"
						onSelect={(e) => {
							if (e == "KIT1" || e == "KIT2" || e == "KIT3") {
								this.state.kittingRoute = e
								this.state.completingRoute = null
								this.state.despatchRoute = null
								this.state.pageTitle = `${e} Kitting Schedule`
							} else if (e == "COM1" || e == "COM2" || e == "COM3") {
								this.state.kittingRoute = null
								this.state.completingRoute = e
								this.state.despatchRoute = null
								this.state.pageTitle = `${e} Completing Schedule`
							} else if (e == "DESP1" || e == "DESP2") {
								this.state.kittingRoute = null
								this.state.completingRoute = null
								this.state.despatchRoute = null
								this.state.pageTitle = `${e} Despatch Schedule`
							}
							this.getOpenOrders()
						}
					}
			    >
			      <Tab eventKey="KIT1" title="Domestic Kitting" value="KIT1">
			      </Tab>
			      <Tab eventKey="KIT2" title="Commercial Kitting">

			      </Tab>
			      <Tab eventKey="KIT3" title="USA Kitting">

			      </Tab>
						<Tab eventKey="COM1" title="Domestic Completing">

						</Tab>
						<Tab eventKey="COM2" title="Commercial Completing">

						</Tab>
						<Tab eventKey="COM3" title="USA Completing">

						</Tab>
						<Tab eventKey="DESP1" title="Despatch">

						</Tab>
			    </Tabs>
					<h1>{this.state.pageTitle}</h1>
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
					<Form.Group className="px-4 py-1">
					<Row>
						<Form.Label>Schedule Progress</Form.Label>
						<ProgressBar now={(this.state.scheduleTotalPicked / this.state.scheduleTotalLines) * 100} label={`${(this.state.scheduleTotalPicked / this.state.scheduleTotalLines) * 100}%`} />
					</Row>
					</Form.Group>
					{/*ORDER SECTION*/}
						<Accordion defaultActiveKey="1" alwaysOpen>
							{this.state.orders.map((order, ordIndex) => (
								<Accordion.Item eventKey={ordIndex} key={ordIndex} className="m-0 p-0" >
									<Accordion.Header >
									<Row>
									<ProgressBar now={order.allPickedPercentage} label={`${order.allPickedPercentage}%`} className="py-1"/>
									<Table striped bordered hover responsive size="sm" className="m-0 p-0">
										<thead>
											<tr>
												<th style={{width: '100px', margin: '0', padding: '0'}}>Order Number</th>
												<th style={{width: '100px', margin: '0', padding: '0'}}>Despatch Date</th>
												<th style={{width: '100px', margin: '0', padding: '0'}}>Kitting Route</th>
												<th style={{width: '100px', margin: '0', padding: '0'}}>Kitting Date</th>
												<th style={{width: '100px', margin: '0', padding: '0'}}>Completing Route</th>
												<th style={{width: '100px', margin: '0', padding: '0'}}>Completing Date</th>
												<th style={{width: '350px', margin: '0', padding: '0'}}>Customer</th>
												<th style={{width: '80px', margin: '0', padding: '0'}}>Order Lines</th>
												<th style={{width: '80px', margin: '0', padding: '0'}}>Lines Picked</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td style={{width: '100px', margin: '0', padding: '0'}}>{order.docNum}</td>
												<td style={{width: '100px', margin: '0', padding: '0'}}>{order.docDueDate}</td>
												<td style={{width: '100px', margin: '0', padding: '0'}}>{order.kittingRoute}</td>
												<td style={{width: '100px', margin: '0', padding: '0'}}>{order.kittingDate}</td>
												<td style={{width: '100px', margin: '0', padding: '0'}}>{order.completingRoute}</td>
												<td style={{width: '100px', margin: '0', padding: '0'}}>{order.completingDate}</td>
												<td style={{width: '350px', margin: '0', padding: '0'}}>{order.customer.cardName}</td>
												<td style={{width: '80px', margin: '0', padding: '0'}}>{order.orderItems.length} Lines</td>
												<td style={{width: '80px', margin: '0', padding: '0'}}>{order.pickedQty} Picked</td>
											</tr>
										</tbody>
									</Table>
									</Row>
									</Accordion.Header>
									<Accordion.Body>
											<h3>Sales Order {order.docNum} Inventory Items to Pick </h3>
											<Form.Group controlId="formFileMultiple" className="m-1" size="sm">
											<Row>
											<Col sm="2">
												<Form.Label>Assembly Photos</Form.Label>
											</Col>
											<Col sm="3">
												<Form.Control type="file" multiple />
											</Col>
											<Col sm="4">
											</Col>
											<Col>
											<Button variant="primary" type="submit" onClick={(e) => {
												console.log(e.target)
												console.log(order)
												e.preventDefault()
												this.updateOrder(order)
											}
										}>Update Order in SAP</Button>
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
														<th>Fully Picked</th>
													</tr>
												</thead>
												<tbody>
												{order.orderItems.map((line, lineIndex) => (
													<tr key={lineIndex}>
														<td>{line.lineNum}</td>
														<td>{line.itemCode}</td>
														<td>{line.itemDescription}</td>
														<td>{line.invWhse}</td>
														<td>{line.qtyReq}</td>
														<td>{line.issuedBalance}</td>
														<td>

															<Form.Check
															type="checkbox"
															label={line.pickStatusMsg}
															name="picked"
															defaultChecked={line.issued == "Y" || line.issued == "I"}
															id={lineIndex}
															onClick={e => {
																let setPickStatus = this.state.orders[ordIndex].orderItems[lineIndex]
																if (e.target.checked == true && line.issued == "N") {
																	setPickStatus.issued = "I"
																} else
																	if (e.target.checked == false && line.issued == "I" || e.target.checked == false && line.issued == "Y") {
																		setPickStatus.issued = "N"
																	}
																setPickStatus.pickedStatus = e.target.checked
																this.setState({setPickStatus})
																console.log(order)
																console.log(line)
																}
															}
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
