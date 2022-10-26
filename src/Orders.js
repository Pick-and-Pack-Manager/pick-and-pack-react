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
								<Accordion.Header>Scheduling Charts</Accordion.Header>
								<Accordion.Body>
								</Accordion.Body>
								</Accordion.Item>
						</Accordion>
					{/*FILTER SECTION*/}
						<div>
						</div>
					{/*HEADER SECTION*/}
					{/*ORDER SECTION*/}
						<Accordion defaultActiveKey="1">
							{this.state.orders.map((order, i) => (
								<Accordion.Item eventKey={i} key={i}>
									<Accordion.Header>
									<Table striped bordered hover size="sm">
										<thead>
											<tr>
												<th width='1'>Order Number</th>
												<th width='1'>Despatch Date</th>
												<th width='1'>Completing Date</th>
												<th width='1'>Kitting Date</th>
												<th width='3'>Customer</th>
												<th width='1'>Order Lines</th>
												<th width='1'>Lines Kitted</th>
												<th width='1'>Minutes</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>{order.docNum}</td>
												<td>{order.docDueDate}</td>
												<td>{order.kittingDate}</td>
												<td>{order.kittingDate}</td>
												<td>{order.customer.cardName}</td>
												<td>30 Lines</td>
												<td>0 Kitted</td>
												<td>45 mins</td>
											</tr>
										</tbody>
									</Table>
									</Accordion.Header>
									<Accordion.Body>
										{order.orderItems.map((line, i) => (
											<Table striped bordered hover size="sm" variant="dark">
												<thead>
													<tr>
														<th width='1'>ItemCode</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>{line.itemCode}</td>
													</tr>
												</tbody>
											</Table>
										))}
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
