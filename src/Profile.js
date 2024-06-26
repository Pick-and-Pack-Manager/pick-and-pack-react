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

class Profile extends React.Component {
  state = {
		changeType: 'Your Profile',
		errorMessage: null,
		successMessage: null,
		canUpdate: localStorage.storedAccess > 'C' ? false : true,
		addOrUpdate: false,
		user: {
			id: localStorage.userId,
			firstName: localStorage.userFirstName,
			lastName: localStorage.userLastName,
			email: localStorage.userEmail,
			userName: localStorage.userName,
			password: localStorage.password,
			storedAccess: localStorage.storedAccess,
			userSupervisor: localStorage.supervisor,
			userFullName: localStorage.userFullName,
		},
		supervisors: [],
		staffUsers: [],
	}
	handlePermission = (e) => {
		let setSubState = this.state.user
		setSubState.storedAccess = e.target.value
		this.setState({setSubState})
	}
	handleSupervisorChange = (e) => {
		let setSubState = this.state.user
		setSubState.userSupervisor = e.target.value
		this.setState({setSubState})
	}
	updateLocalState = async () => {
		console.log('update state')
		console.log(this.state.user)
		await this.findUser(this.state.user)
		await sessionStorage.clear()
		await localStorage.removeItem("storedAccess")
		await localStorage.removeItem("userFullName")
		await localStorage.removeItem("userFirstName")
		await localStorage.removeItem("userLastName")
		await localStorage.removeItem("userId")
		await localStorage.removeItem("userEmail")
		await localStorage.removeItem("userName")
		await localStorage.removeItem("supervisor")
		await localStorage.removeItem("password")
		await localStorage.setItem("storedAccess", this.state.user.storedAccess)
		await localStorage.setItem("userFullName", this.state.user.userFullName)
		await localStorage.setItem("userFirstName", this.state.user.firstName)
		await localStorage.setItem("userLastName", this.state.user.lastName)
		await localStorage.setItem("userId", this.state.user.id)
		await localStorage.setItem("userEmail", this.state.user.email)
		await localStorage.setItem("userName", this.state.user.userName)
		await localStorage.setItem("supervisor", this.state.user.userSupervisor)
		await localStorage.setItem("password", this.state.user.password)
	}
	findSupervisors = async () => {
				let supervisors = await axios.get(`http://localhost:4420/users/supervisors`,
					{}, {withCredentials: true})
					let filteredSupervisors = supervisors.data.filter(user => user._id != this.state.user.id)
					// console.log(filteredSupervisors)
					this.setState({
							supervisors: filteredSupervisors
					})
	}
	findStaffUsers = async () => {
				let staffUsers = await axios.get(`http://localhost:4420/users/staff`,
					{}, {withCredentials: true})
					let filteredUsers = staffUsers.data.filter(user => user.userSupervisor == localStorage.userId && user._id != this.state.user.id || localStorage.storedAccess >= 'Z' && user._id != this.state.user.id)
					this.setState({
							staffUsers: filteredUsers
					})
	}
	updateUser = async (user, e) => {
		console.log('UPDATE USER')
		user = this.state.user
		console.log(user)
			let updateUser = await axios.patch(`http://localhost:4420/users`, {user}, {withCredentials: true})
				console.log(updateUser)
				let fullName = await updateUser.data.user.firstName + ' ' +  await updateUser.data.user.lastName
				let setSubState = this.state.user
				setSubState.id = updateUser.data.user.id
				setSubState.userFullName = fullName
				setSubState.firstName = updateUser.data.user.firstName
				setSubState.lastName = updateUser.data.user.lastName
				setSubState.email = updateUser.data.user.email
				setSubState.userName = updateUser.data.user.userName
				setSubState.password = updateUser.data.user.password
				setSubState.storedAccess = updateUser.data.user.storedAccess
				setSubState.userSupervisor = updateUser.data.user.supervisor
				this.setState({setSubState})
			if (this.state.user.id == localStorage.userId) {
				console.log('SAME USER')
				this.updateLocalState()}
				else {
					await this.findUser(this.state.user)
				}

}
	findUser = async (selectedUser) => {
		console.log('app FIND USER')
		console.log(selectedUser)
			let findUser = await axios.post(`http://localhost:4420/users/finduser`, {selectedUser}, {withCredentials: true})
				console.log('Find User Data')
				console.log(this.state.user)
				let fullName = await findUser.data.user.firstName + ' ' +  await findUser.data.user.lastName
				console.log(findUser.data.user)
				let setSubState = this.state.user
					setSubState.id = findUser.data.user._id
					setSubState.firstName = findUser.data.user.firstName
					setSubState.lastName = findUser.data.user.lastName
					setSubState.email = findUser.data.user.email
					setSubState.userName = findUser.data.user.userName
					setSubState.password = findUser.data.user.password
					setSubState.storedAccess = findUser.data.user.permission
					setSubState.userSupervisor = findUser.data.user.userSupervisor
					setSubState.userFullName = fullName
				this.setState({setSubState})
				console.log(this.state)
				this.findSupervisors()
				this.findStaffUsers()
				this.render()
				console.log(findUser.data.user)
			}
	addNewUserStart = () => {
		console.log('ADD NEW USER START')
		this.setState({changeType: 'Add New User'})
		let setSubState = this.state.user
		setSubState.id = null
		setSubState.firstName = 'First Name'
		setSubState.lastName = 'Last Name'
		setSubState.email = null
		setSubState.userName = 'Email User Name'
		setSubState.password = "1234"
		setSubState.storedAccess = "A"
		setSubState.userSupervisor = localStorage.userId
		setSubState.userFullName = null
		this.setState({setSubState})
		this.findSupervisors()
		this.render()
		console.log(setSubState)
	}
	addNewUser = async (user, e) => {
		console.log('ADD NEW USER TO DATABASE')
		user = this.state.user
		console.log(user)
			let addUser = await axios.post(`http://localhost:4420/users/addnewuser`, {user}, {withCredentials: true})
				console.log(addUser)
				let fullName = await addUser.data.returnData.newUser.firstName + ' ' +  await addUser.data.returnData.newUser.lastName
				let setSubState = this.state.user
				setSubState.id = addUser.data.returnData.newUser._id
				setSubState.userFullName = fullName
				setSubState.firstName = addUser.data.returnData.newUser.firstName
				setSubState.lastName = addUser.data.returnData.newUser.lastName
				setSubState.email = addUser.data.returnData.newUser.email
				setSubState.userName = addUser.data.returnData.newUser.userName
				setSubState.password = addUser.data.returnData.newUser.password
				setSubState.storedAccess = addUser.data.returnData.newUser.storedAccess
				setSubState.userSupervisor = addUser.data.returnData.newUser.supervisor
				this.setState({setSubState})
				this.setState({changeType: 'New User Profile'})
				this.setState({addOrUpdate: false})
				this.setState({successMessage: addUser.data.returnData.successMessage})
				this.setState({errorMessage: addUser.data.errorMessage})
				console.log(this.state)
				this.render()

}
	componentDidMount() {
		this.findSupervisors()
		this.findStaffUsers()
	}
  render() {
		console.log(this.state)
		let canAddUser = false
		if (this.state.user.firstName == "First Name" || this.state.user.lastName == "Last Name" || this.state.user.userName == "Email User Name" || this.state.user.password == "1234") {
			canAddUser = false
		} else canAddUser = true
		console.log(canAddUser)
		let addOrUpdateButton
		let addNewUserButton
		let warningMessage
		if (this.state.addOrUpdate == true || this.state.addOrUpdate == null || canAddUser == true && this.state.changeType == 'Add New User') {
			addOrUpdateButton = <Button type="submit" variant="danger" onClick={(e) => {
				console.log('Add User Clicked')
				console.log(this.state.user)
				e.preventDefault()
				let fullName = this.state.user.firstName + ' ' +  this.state.user.lastName
				let setSubState = this.state.user
				setSubState.userFullName = fullName
				setSubState.createdBy = localStorage.userId
				this.setState({setSubState})
				this.addNewUser()
			}}>Create New User. Email will be sent</Button>
		} else if (this.state.changeType == 'Add New User') {
			addOrUpdateButton = <></>
			warningMessage = <Alert key='danger' variant='danger'>New Users need all details completed. Please ensure correctly filled out. Then Button to add new user will show</Alert>
		} else addOrUpdateButton = <Button type="submit" variant="primary" type="submit">Save Changes</Button>
		if (localStorage.storedAccess >= 'D') {
			addNewUserButton = <Button type="submit" variant="warning" className="m-3" onClick={(e) => {
				console.log('Add New User Clicked')
				e.preventDefault()
				this.addNewUserStart()
			}}>Add New User. Email will be sent</Button>
		}
		let successMessagePopup
		let errorMessagePopup
		if (this.state.successMessage == null || this.state.successMessage == undefined ) {successMessagePopup = <></>} else successMessagePopup = <Alert key='success' variant='success'>{this.state.successMessage}</Alert>
		if (this.state.errorMessage == null || this.state.errorMessage == undefined ) {errorMessagePopup = <></>} else errorMessagePopup = <Alert key='danger' variant='danger'>{this.state.errorMessage}</Alert>

    return (
			localStorage.storedAccess >= 'B' ?
			<>
			<Nav />
			<Container>
      <Row>
        <Col>
						<Card style={{ width: '40rem' }} className="m-3">
						<Card.Header as="h5">{this.state.changeType}</Card.Header>
						{warningMessage}
						{successMessagePopup}
						{errorMessagePopup}
						<Form onSubmit={(e) => {
							e.preventDefault()
							this.updateUser(this.state.user, e)
						}
					}>
					<InputGroup className="p-1" >
					<InputGroup.Text>First and Last name</InputGroup.Text>
					<Form.Control aria-label="First name" value={this.state.user.firstName} placeholder="First Name"
					readOnly={this.state.canUpdate} name="firstName" disabled={localStorage.storedAccess <= 'C'} onChange={(e) => {
						let setSubState = this.state.user
						this.state.user.firstName = e.target.value
						this.setState({setSubState})
					}}/>
						<Form.Control aria-label="Last name" value={this.state.user.lastName} placeholder="Last Name"  readOnly={this.state.canUpdate} name="lastName"  disabled={localStorage.storedAccess <= 'C'}onChange={(e) => {
							let setSubState = this.state.user
							this.state.user.lastName = e.target.value
							this.setState({setSubState})}
						}/>
							</InputGroup>
							<Form.Group className="mb-3 p-1" controlId="formBasicEmail" style={{ width: '30rem' }}>
							<Form.Label>Email address</Form.Label>
							<InputGroup className="mb-3">
							<Form.Control
							placeholder="User Name"
							aria-label="Recipient's username"
							aria-describedby="basic-addon2"
							readOnly={this.state.canUpdate}
							name="userName"
							value={this.state.user.userName}
							disabled={localStorage.storedAccess <= 'C'}
							onChange={(e) => {
								let setSubState = this.state.user
								this.state.user.userName = e.target.value
								this.state.user.email = `${e.target.value}${localStorage.emailService}`
								this.setState({setSubState})
								}}
								/>
								<InputGroup.Text id="basic-addon2">{localStorage.emailService}</InputGroup.Text>
								</InputGroup>
								</Form.Group>

								<Form.Group className="mb-3 p-1" controlId="formBasicPassword" style={{ width: '30rem' }}>
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" name="password" value={this.state.user.password} placeholder="Password" onChange={(e) => {
									let setSubState = this.state.user
									this.state.user.password = e.target.value
									this.setState({setSubState})
									}}/>
									<Form.Text className="text-muted">
									Your password is not encrypted
									</Form.Text>
									</Form.Group>
									<Container>
									<Row>
									<Col>
									<fieldset >
									<Form.Group as={Row} className="m-2 p-1">
									<Form.Label>
									Permission Level
									</Form.Label>
									<Col >

									<Form.Check
									type="radio"
									label="No Access"
									name="permission"
									id="formHorizontalRadios1"
									value='A'
									checked={this.state.user.storedAccess == 'A'}
									disabled={localStorage.storedAccess <= 'C'}
									onClick={(e) => {
										this.handlePermission(e)
										console.log(e.target.value)
										console.log(this.state.user)}}

										/>
										<Form.Check
										type="radio"
										label="View Only"
										name="permission"
										id="formHorizontalRadios1"
										value='B'
										checked={this.state.user.storedAccess == 'B'}
										disabled={localStorage.storedAccess <= 'C'}
										onClick={(e) => {
											this.handlePermission(e)
											console.log(e.target.value)
											console.log(this.state.user)}}
											/>
											<Form.Check
											type="radio"
											label="Storeperson"
											name="permission"
											id="formHorizontalRadios1"
											value='C'
											checked={this.state.user.storedAccess == 'C'}
											disabled={localStorage.storedAccess <= 'C'}
											onClick={(e) => {
												this.handlePermission(e)
												console.log(e.target.value)
												console.log(this.state.user)}}
												/>
												<Form.Check
												type="radio"
												label="Supervisor"
												name="permission"
												id="formHorizontalRadios1"
												value='D'
												checked={this.state.user.storedAccess === 'D'}
												disabled={localStorage.storedAccess < 'D'}
												onClick={(e) => {
													this.handlePermission(e)
													console.log(e.target.value)
													console.log(this.state.user)}}
													/>
													<Form.Check
													type="radio"
													label="Full Admin"
													name="permission"
													id="formHorizontalRadios1"
													value='Z'
													disabled={localStorage.storedAccess !== 'Z'}
													checked={this.state.user.storedAccess === 'Z'}
													onClick={(e) => {
														this.handlePermission(e)
														console.log(e.target.value)
														console.log(this.state.user)}}
														/>
														</Col>
														</Form.Group>
														</fieldset>
														</Col>
														<Col>
														<Form.Group as={Row} className="mb-2 p-1">
														<Form.Label>
														Supervisor
														</Form.Label>
														{this.state.supervisors.map((user, i) => (
															<Form.Check key={i} type="radio" id={`formHorizontalRadios${i+10}`} label={`${user.firstName} ${user.lastName}`} name="supervisor"
															value={user._id}
															checked={this.state.user.userSupervisor === user._id}
															disabled={localStorage.storedAccess < 'D'}
															onClick={(e) => {
																this.handleSupervisorChange(e)
																console.log(this.state.user)
															}}
															/>
														))}
														</Form.Group>
														</Col>

														</Row>
														<Row className="m-2 p-1">
														<Accordion className="m-1 p-1" >
												      <Accordion.Item eventKey="0" >
												        <Accordion.Header>Kitting Permissions</Accordion.Header>
												        <Accordion.Body>
																<Table striped bordered hover size="sm" className="m-1">
																 {/*TABLE HEAD AND COLUMNS DEFINITION*/}
																 <thead size="sm">
																	 <tr >
																		 <th>Domestic Kitting</th>
																		 <th>Commercial Kitting</th>
																		 <th>USA Kitting</th>
																	 </tr>
																 </thead>
																 <tbody size="sm">
																		 <tr>
																			 <td>
																				 <Form.Check
																				 type="checkBox"
																				 label="Can View"
																				 name="DomKitPerm"
																				 value='1'
																				 disabled={localStorage.storedAccess <= 'C'}
																					 />
																			 </td>
																			 <td>
																				 <Form.Check
																				 type="checkBox"
																				 label="Can View"
																				 name="ComKitPerm"
																				 value='1'
																				 disabled={localStorage.storedAccess <= 'C'}
																					 />
																			 </td>
																			 <td>
																				 <Form.Check
																				 type="checkBox"
																				 label="Can View"
																				 name="USAKitPerm"
																				 value='1'
																				 disabled={localStorage.storedAccess <= 'C'}
																					 />
																			 </td>
																		 </tr>
																		 <tr>
																			 <td>
																				 <Form.Check
																				 type="checkBox"
																				 label="Create Packages"
																				 name="DomKitPerm"
																				 value='2'
																				 disabled={localStorage.storedAccess <= 'C'}
																					 />
																			 </td>
																			 <td>
																				 <Form.Check
																				 type="checkBox"
																				 label="Create Packages"
																				 name="ComKitPerm"
																				 value='2'
																				 disabled={localStorage.storedAccess <= 'C'}
																					 />
																			 </td>
																			 <td>
																				 <Form.Check
																				 type="checkBox"
																				 label="Create Packages"
																				 name="USAKitPerm"
																				 value='2'
																				 disabled={localStorage.storedAccess <= 'C'}
																					 />
																			 </td>
																		 </tr>
																		 <tr>
																			 <td>
																				 <Form.Check
																				 type="checkBox"
																				 label="Can Pick"
																				 name="DomKitPerm"
																				 value='3'
																				 disabled={localStorage.storedAccess <= 'C'}
																					 />
																			 </td>
																			 <td>
																				 <Form.Check
																				 type="checkBox"
																				 label="Can Pick"
																				 name="ComKitPerm"
																				 value='3'
																				 disabled={localStorage.storedAccess <= 'C'}
																					 />
																			 </td>
																			 <td>
																				 <Form.Check
																				 type="checkBox"
																				 label="Can Pick"
																				 name="USAKitPerm"
																				 value='3'
																				 disabled={localStorage.storedAccess <= 'C'}
																					 />
																			 </td>
																		 </tr>
																		 <tr>
																			 <td>
																				 <Form.Check
																				 type="checkBox"
																				 label="Mark Complete"
																				 name="DomKitPerm"
																				 value='4'
																				 disabled={localStorage.storedAccess <= 'C'}
																					 />
																			 </td>
																			 <td>
																				 <Form.Check
																				 type="checkBox"
																				 label="Mark Complete"
																				 name="ComKitPerm"
																				 value='4'
																				 disabled={localStorage.storedAccess <= 'C'}
																					 />
																			 </td>
																			 <td>
																				 <Form.Check
																				 type="checkBox"
																				 label="Mark Complete"
																				 name="USAKitPerm"
																				 value='4'
																				 disabled={localStorage.storedAccess <= 'C'}
																					 />
																			 </td>
																		 </tr>
																 </tbody>
															 </Table>
												        </Accordion.Body>
																</Accordion.Item>
															</Accordion>

															<Accordion className="m-1 p-1">
													      <Accordion.Item eventKey="0">
													        <Accordion.Header>Completing Permissions</Accordion.Header>
													        <Accordion.Body>
																	<Table striped bordered hover size="sm" className="m-1">
																	 {/*TABLE HEAD AND COLUMNS DEFINITION*/}
																	 <thead size="sm">
																		 <tr >
																			 <th>Domestic Completing</th>
																			 <th>Commercial Completing</th>
																			 <th>USA Completing</th>
																		 </tr>
																	 </thead>
																	 <tbody size="sm">
																			 <tr>
																				 <td>
																					 <Form.Check
																					 type="checkBox"
																					 label="Can View"
																					 name="DomComPerm"
																					 value='1'
																					 disabled={localStorage.storedAccess <= 'C'}
																						 />
																				 </td>
																				 <td>
																					 <Form.Check
																					 type="checkBox"
																					 label="Can View"
																					 name="ComComPerm"
																					 value='1'
																					 disabled={localStorage.storedAccess <= 'C'}
																						 />
																				 </td>
																				 <td>
																					 <Form.Check
																					 type="checkBox"
																					 label="Can View"
																					 name="USAComPerm"
																					 value='1'
																					 disabled={localStorage.storedAccess <= 'C'}
																						 />
																				 </td>
																			 </tr>
																			 <tr>
																				 <td>
																					 <Form.Check
																					 type="checkBox"
																					 label="Create Packages"
																					 name="DomComPerm"
																					 value='2'
																					 disabled={localStorage.storedAccess <= 'C'}
																						 />
																				 </td>
																				 <td>
																					 <Form.Check
																					 type="checkBox"
																					 label="Create Packages"
																					 name="ComComPerm"
																					 value='2'
																					 disabled={localStorage.storedAccess <= 'C'}
																						 />
																				 </td>
																				 <td>
																					 <Form.Check
																					 type="checkBox"
																					 label="Create Packages"
																					 name="USAComPerm"
																					 value='2'
																					 disabled={localStorage.storedAccess <= 'C'}
																						 />
																				 </td>
																			 </tr>
																			 <tr>
																				 <td>
																					 <Form.Check
																					 type="checkBox"
																					 label="Can Pick"
																					 name="DomComPerm"
																					 value='3'
																					 disabled={localStorage.storedAccess <= 'C'}
																						 />
																				 </td>
																				 <td>
																					 <Form.Check
																					 type="checkBox"
																					 label="Can Pick"
																					 name="ComComPerm"
																					 value='3'
																					 disabled={localStorage.storedAccess <= 'C'}
																						 />
																				 </td>
																				 <td>
																					 <Form.Check
																					 type="checkBox"
																					 label="Can Pick"
																					 name="USAComPerm"
																					 value='3'
																					 disabled={localStorage.storedAccess <= 'C'}
																						 />
																				 </td>
																			 </tr>
																			 <tr>
																				 <td>
																					 <Form.Check
																					 type="checkBox"
																					 label="Mark Complete"
																					 name="DomComPerm"
																					 value='4'
																					 disabled={localStorage.storedAccess <= 'C'}
																						 />
																				 </td>
																				 <td>
																					 <Form.Check
																					 type="checkBox"
																					 label="Mark Complete"
																					 name="ComComPerm"
																					 value='4'
																					 disabled={localStorage.storedAccess <= 'C'}
																						 />
																				 </td>
																				 <td>
																					 <Form.Check
																					 type="checkBox"
																					 label="Mark Complete"
																					 name="USAComPerm"
																					 value='4'
																					 disabled={localStorage.storedAccess <= 'C'}
																						 />
																				 </td>
																			 </tr>
																	 </tbody>
																 </Table>
													        </Accordion.Body>
																	</Accordion.Item>
																</Accordion>

																<Accordion className="m-1 p-1">
																	<Accordion.Item eventKey="0">
																		<Accordion.Header>Despatch Permissions</Accordion.Header>
																		<Accordion.Body>
																		<Table striped bordered hover size="sm" className="m-1">
																		 {/*TABLE HEAD AND COLUMNS DEFINITION*/}
																		 <thead size="sm">
																			 <tr >
																				 <th>Yard Despatch</th>
																				 <th>Container Despatch</th>
																			 </tr>
																		 </thead>
																		 <tbody size="sm">
																				 <tr>
																					 <td>
																						 <Form.Check
																						 type="checkBox"
																						 label="Can View"
																						 name="YardDespPerm"
																						 value='1'
																						 disabled={localStorage.storedAccess <= 'C'}
																							 />
																					 </td>
																					 <td>
																						 <Form.Check
																						 type="checkBox"
																						 label="Can View"
																						 name="ConDespPerm"
																						 value='1'
																						 disabled={localStorage.storedAccess <= 'C'}
																							 />
																					 </td>
																				 </tr>
																				 <tr>
																					 <td>
																						 <Form.Check
																						 type="checkBox"
																						 label="Create Packages"
																						 name="YardDespPerm"
																						 value='2'
																						 disabled={localStorage.storedAccess <= 'C'}
																							 />
																					 </td>
																					 <td>
																						 <Form.Check
																						 type="checkBox"
																						 label="Create Packages"
																						 name="ConDespPerm"
																						 value='2'
																						 disabled={localStorage.storedAccess <= 'C'}
																							 />
																					 </td>
																				 </tr>
																				 <tr>
																					 <td>
																						 <Form.Check
																						 type="checkBox"
																						 label="Can Pick"
																						 name="YardDespPerm"
																						 value='3'
																						 disabled={localStorage.storedAccess <= 'C'}
																							 />
																					 </td>
																					 <td>
																						 <Form.Check
																						 type="checkBox"
																						 label="Can Pick"
																						 name="ConDespPerm"
																						 value='3'
																						 disabled={localStorage.storedAccess <= 'C'}
																							 />
																					 </td>
																				 </tr>
																				 <tr>
																					 <td>
																						 <Form.Check
																						 type="checkBox"
																						 label="Mark Complete"
																						 name="YardDespPerm"
																						 value='4'
																						 disabled={localStorage.storedAccess <= 'C'}
																							 />
																					 </td>
																					 <td>
																						 <Form.Check
																						 type="checkBox"
																						 label="Mark Complete"
																						 name="ConDespPerm"
																						 value='4'
																						 disabled={localStorage.storedAccess <= 'C'}
																							 />
																					 </td>
																				 </tr>
																		 </tbody>
																	 </Table>
																		</Accordion.Body>
																		</Accordion.Item>
																	</Accordion>
														</Row>
														<Row>
															<Form.Group as={Row}>
															<Col sm={{offset: 4 }} className="mb-1">
															{addOrUpdateButton}
															</Col>
															</Form.Group>
														</Row>
														</Container>

														</Form>
														</Card>

				</Col>
        <Col>
				<Card style={{ width: '20rem' }} className="m-3">
					<Card.Header as="h5">Select Staff to View Profile</Card.Header>
						<Form>
							{addNewUserButton}
						<Form.Group as={Row} className="m-1 p-1">
						<Container>
							<Form.Label>
							Staff to update where you are Supervisor
							</Form.Label>
								{this.state.staffUsers.map((user, i) => (
								<Card key={i} value={user._id} name="staffMember" className="m-1 mb-3" onClick={(e) => {
									console.log('CLICKED')
									console.log(user)
									this.setState({changeType: 'Staff User Update'})
									e.preventDefault()
									this.findUser(user)
								}
							}>
									<Card.Header>{`${user.firstName} ${user.lastName}`}</Card.Header>
									<Card.Body>
										<Card.Title>{user.email}</Card.Title>
										<Card.Text>
											{`Permission Level ${user.permission}`}
										</Card.Text>
										<Button variant="primary" type="submit" >View User</Button>
									</Card.Body>
								</Card>
							))}
							</Container>
						</Form.Group>
						</Form>
				</Card>
				</Col>
      </Row>
    </Container>
			</>
			:
			<Redirect to="/" />
		);
  }
}

export default Profile;
