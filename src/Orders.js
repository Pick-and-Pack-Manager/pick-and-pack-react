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
import {closeStyle} from 'simple-react-modal'
import Modal from 'react-bootstrap/Modal'
import moment from 'moment';

class Orders extends React.Component {
  state = {
		kittingDate: moment(Date.now()).format('YYYY-MM-DD'),
		completingDate: null,
		despatchDate: null,
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
		orders: [],
		show: false,
		selectedLineDetails: {
			lineNum: 0,
			itemCode: 0,
			itemDescription: 0,
			qtyReq: 0,
			issuedBalance: 0,
			issued: 0,
			delWhse: 0,
			invWhse: 0,
			pickedBy: 0,
			pickedDate: 0,
			checkedBy: 0,
			checkedDate: 0,
		}
	}
	getOpenOrders = async () => {
		let findOrders = {
			kittingDate: this.state.kittingDate,
			kittingRoute: this.state.kittingRoute,
			completingDate: this.state.completingDate,
			completingRoute: this.state.completingRoute,
			despatchDate: this.state.despatchDate,
			despatchRoute: this.state.despatchRoute,
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
						line.transferStatus = "Not Picked"
					} else if (line.issued == "Y") {
						line.pickStatusMsg = `Issued - picked on ${moment(line.pickedDate).format('DD-MM-YYYY')}`
						line.transferStatus = "Transfered in SAP"
					} else if (line.issued == "I") {
						line.pickStatusMsg = `Picked on ${moment(line.pickedDate).format('DD-MM-YYYY')}`
						line.transferStatus = "Picked not Transfered"
					}
					if (line.issued == "N" || line.issued == null  || line.issued == undefined) {
						line.checkStatusMsg = "Cant Check until Picked"
					} else if (line.checked == "N" && localStorage.userId == line.pickedBy || line.checked == null && localStorage.userId == line.pickedBy || line.checked == undefined && localStorage.userId == line.pickedBy) {
						line.checkStatusMsg = `Picker cannot Check`
					} else if (line.checked =="N" || line.checked == null  || line.checked == undefined) {
						line.checkStatusMsg = `Not Checked`
					} else if (line.checked == "Y") {
						line.checkStatusMsg = `Checked on ${moment(line.checkedDate).format('DD-MM-YYYY')}`
					}
				})
			})
			await this.setState({
					orders: filteredOrders.data
			})
			console.log(this.state.orders)
	}
	updateOrder = async (order, ordIndex) => {
		console.log('UPDATE Order')
		console.log(ordIndex)
		console.log(order._id)
		console.log(order)
		console.log(order.orderItems)
			let updateOrder = await axios.patch(`http://localhost:4420/orders`, {order}, {withCredentials: true})
				await this.getOpenOrders()
}
	findActiveStaff = async () => {
				let staffUsers = await axios.get(`http://localhost:4420/users/staff`,
					{}, {withCredentials: true})
					let filteredUsers = staffUsers.data.filter((user) => user.permission > "B" && user.permission != "Z")
					this.state.activeStaff = filteredUsers
					console.log(this.state.activeStaff)
	}
show(e){
	this.state.selectedLineDetails.lineNum = e.lineNum
	this.state.selectedLineDetails.itemCode = e.itemCode
	this.state.selectedLineDetails.itemDescription = e.itemDescription
	this.state.selectedLineDetails.qtyReq = e.qtyReq
	this.state.selectedLineDetails.issuedBalance = e.issuedBalance
	this.state.selectedLineDetails.issued = e.issued
	this.state.selectedLineDetails.delWhse = e.delWhse
	this.state.selectedLineDetails.invWhse = e.invWhse
	this.state.selectedLineDetails.pickedBy = e.pickedByName
	this.state.selectedLineDetails.pickedDate = e.pickedDate
	this.state.selectedLineDetails.checkedBy = e.checkedByName
	this.state.selectedLineDetails.checkedDate = e.checkedDate
	this.state.selectedLineDetails.transferStatus = e.transferStatus
	this.setState({show: true})
	console.log(this.state.selectedLineDetails)
}

close(){
	this.setState({show: false})
}
	componentDidMount() {
		this.getOpenOrders()
		this.findActiveStaff()
		console.log(this.state)
	}

  render() {
		return (
				localStorage.storedAccess >= 'B' ?
				<>
					<Nav />
						<Modal size="lg"
						containerClassName="test"
						closeOnOuterClick={true}
						show={this.state.show}
						onClose={this.close.bind(this)}>
							<Modal.Header>
		          <Modal.Title>Line Details</Modal.Title>
		        	</Modal.Header>
							<Modal.Body>
								<div><strong>Line {this.state.selectedLineDetails.lineNum} - {this.state.selectedLineDetails.itemCode} - {this.state.selectedLineDetails.itemDescription}</strong></div>
								<Table striped bordered hover>
					      <thead>
									<tr>
										<th>Picking Route</th>
										<th>Planned Date</th>
										<th>Picked By</th>
										<th>Picked Date</th>
										<th>Checked By</th>
										<th>Checked Date</th>
									</tr>
					      </thead>
					      <tbody>
					        <tr>
					          <td>{this.state.selectedLineDetails.pickRoute}</td>
					          <td>{moment(this.state.selectedLineDetails.plannedDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
										<td>{this.state.selectedLineDetails.pickedBy}</td>
					          <td>{moment(this.state.selectedLineDetails.pickedDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
					          <td>{this.state.selectedLineDetails.checkedBy}</td>
					          <td>{moment(this.state.selectedLineDetails.checkedDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
					        </tr>
					      </tbody>
					    </Table>
							<div><strong>Inventory Details</strong></div>
							<Table striped bordered hover>
							<thead>
								<tr>
									<th>Required Qty</th>
									<th>Stock Warehouse</th>
									<th>Stock in Whse</th>
									<th>Del Warehouse</th>
									<th>Issue Status</th>
									<th>Not Transfered</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{this.state.selectedLineDetails.qtyReq}</td>
									<td>{this.state.selectedLineDetails.invWhse}</td>
									<td>{this.state.selectedLineDetails.linestock}</td>
									<td>{this.state.selectedLineDetails.delWhse}</td>
									<td>
									{this.state.selectedLineDetails.transferStatus}
									</td>
									<td>{this.state.selectedLineDetails.issuedBalance}</td>
								</tr>
							</tbody>
						</Table>

							</Modal.Body>
							<Modal.Footer>
							<Button variant="secondary" onClick={this.close.bind(this)}>
								Close
							</Button>
							</Modal.Footer>
						</Modal>
					{/*PAGE SELECTION*/}
					<Tabs
			      defaultActiveKey="KIT1"
			      transition={false}
			      id="noanim-tab-example"
			      className="mb-1"
						onSelect={(e) => {
							if (e == "KIT1" || e == "KIT2" || e == "KIT3") {
								this.state.kittingDate = moment(Date.now()).format('YYYY-MM-DD')
								this.state.kittingRoute = e
								this.state.completingDate = null
								this.state.completingRoute = null
								this.state.despatchDate = null
								this.state.despatchRoute = null
								this.state.pageTitle = `${e} Kitting Schedule`
							} else if (e == "COM1" || e == "COM2" || e == "COM3") {
								this.state.kittingDate = null
								this.state.kittingRoute = null
								this.state.completingDate = moment(Date.now()).format('YYYY-MM-DD')
								this.state.completingRoute = e
								this.state.despatchDate = null
								this.state.despatchRoute = null
								this.state.pageTitle = `${e} Completing Schedule`
							} else if (e == "DESP1" || e == "DESP2") {
								this.state.kittingDate = null
								this.state.kittingRoute = null
								this.state.completingDate = null
								this.state.completingRoute = null
								this.state.despatchDate = moment(Date.now()).format('YYYY-MM-DD')
								this.state.despatchRoute = e
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
					{/*FILTER SECTION*/}
						<div>
						<input type="date" className="mx-4"/>
						</div>
					{/*HEADER SECTION*/}
					<Form.Group className="px-4 py-1">
					<Row>
						<Form.Label>Schedule Progress</Form.Label>
						<ProgressBar now={this.state.scheduleAllPickedPercentage} label={`${this.state.scheduleAllPickedPercentage}%`} />
					</Row>
					</Form.Group>
					{/*ORDER SECTION*/}

						<Accordion defaultActiveKey="1" alwaysOpen>
							{this.state.orders.map((order, ordIndex) => (
								<Accordion.Item eventKey={"Ord_" + this.state.orders[ordIndex].docNum} key={ordIndex} className="m-0 p-0" >
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
												<td style={{width: '100px', margin: '0', padding: '0'}}>{moment(order.docDueDate).format('DD MMM YYYY')}</td>
												<td style={{width: '100px', margin: '0', padding: '0'}}>{order.kittingRoute}</td>
												<td style={{width: '100px', margin: '0', padding: '0'}}>{moment(order.kittingDate).format('DD MMM YYYY')}</td>
												<td style={{width: '100px', margin: '0', padding: '0'}}>{order.completingRoute}</td>
												<td style={{width: '100px', margin: '0', padding: '0'}}>{moment(order.completingDate).format('DD MMM YYYY')}</td>
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
												this.updateOrder(order, ordIndex)
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
														<th>Pick Route</th>
														<th>Stock Location</th>
														<th>Required Qty</th>
														<th>Issued Balance</th>
														<th>Fully Picked</th>
														<th>Checked</th>
														<th>Item Details</th>
													</tr>
												</thead>
												<tbody>
												{order.orderItems.map((line, lineIndex) => (
													<tr key={"Table_" + this.state.orders[ordIndex].docNum + "-" + this.state.orders[ordIndex].orderItems[lineIndex].lineNum}>
														<td>{line.lineNum}</td>
														<td>{line.itemCode}</td>
														<td>{line.itemDescription}</td>
														<td></td>
														<td>{line.invWhse}</td>
														<td>{line.qtyReq}</td>
														<td>{line.issuedBalance}</td>
														<td>

															<Form.Check
															type="checkbox"
															label={line.pickStatusMsg}
															name="picked"
															defaultChecked={this.state.orders[ordIndex].orderItems[lineIndex].issued == "Y" || this.state.orders[ordIndex].orderItems[lineIndex].issued == "I"}
															id={"Ord_" + this.state.orders[ordIndex].docNum + "-" + this.state.orders[ordIndex].orderItems[lineIndex].lineNum}
															onClick={e => {
																let setPickStatus = this.state.orders[ordIndex].orderItems[lineIndex]
																if (e.target.checked == true && line.issued == "N") {
																	setPickStatus.issued = "I"
																	setPickStatus.pickedBy = localStorage.userId
																	setPickStatus.pickedByName = localStorage.userFullName
																	setPickStatus.pickedDate = Date.now()
																} else
																	if (e.target.checked == false && line.issued == "I" || e.target.checked == false && line.issued == "Y") {
																		setPickStatus.issued = "N"
																		setPickStatus.pickedBy = null
																		setPickStatus.pickedDate = null
																	}
																setPickStatus.pickedStatus = e.target.checked
																this.setState({setPickStatus})
																console.log(localStorage)
																console.log(line)
																}
															}
																/>
														</td>
														<td>

															<Form.Check
															type="checkbox"
															label={line.checkStatusMsg}
															disabled={localStorage.userId == line.pickedBy || this.state.orders[ordIndex].orderItems[lineIndex].issued == "N" ? true : false}
															name="checked"
															defaultChecked={line.checked == "Y"}
															id={"Ord_" + this.state.orders[ordIndex].docNum + "-" + this.state.orders[ordIndex].orderItems[lineIndex].lineNum}
															onClick={e => {
																let setCheckStatus = this.state.orders[ordIndex].orderItems[lineIndex]
																if (e.target.checked == true && line.checked == "N" || e.target.checked == true && line.checked == null  || e.target.checked == true && line.checked == undefined) {
																	setCheckStatus.checked = "Y"
																	setCheckStatus.checkedBy = localStorage.userId
																	setCheckStatus.checkedByName = localStorage.userFullName
																	setCheckStatus.checkedDate = Date.now()
																	console.log('CHECKED')
																} else
																	if (e.target.checked == false && line.checked == "Y" || e.target.checked == false && line.checked == null  || e.target.checked == false && line.checked == undefined) {
																		setCheckStatus.checked = "N"
																		setCheckStatus.checkedBy = null
																		setCheckStatus.checkedByName = null
																		setCheckStatus.checkedDate = null
																		console.log('NOT Checked')
																	}
																setCheckStatus.checkedStatus = e.target.checked
																this.setState({setCheckStatus})
																console.log(line)
																}
															}
																/>
														</td>
														<td>
														<div>
												      <Button onClick={(e) => {
																this.show(line)
															}
															}>Details</Button>
												      </div>
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
