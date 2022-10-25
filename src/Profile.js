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

class Profile extends React.Component {
  state = {
		canUpdate: localStorage.storedAccess > 'C' ? false : true,
		user: {
			id: localStorage.userId,
			firstName: localStorage.userFirstName,
			lastName: localStorage.userLastName,
			email: localStorage.userEmail,
			userName: localStorage.userName,
			password: localStorage.password,
			accessLevel: localStorage.storedAccess,
			userSupervisor: localStorage.supervisor,
			userFullName: localStorage.userFullName,
		},
		supervisors: [],
		staffUsers: [],
	}
	updateLocalState = async () => {
		await sessionStorage.clear()
		localStorage.removeItem("storedAccess")
		localStorage.removeItem("userFullName")
		localStorage.removeItem("userFirstName")
		localStorage.removeItem("userLastName")
		localStorage.removeItem("userId")
		localStorage.removeItem("userEmail")
		localStorage.removeItem("userName")
		localStorage.removeItem("supervisor")
		localStorage.removeItem("password")

		localStorage.setItem("storedAccess", this.state.user.accessLevel)
		localStorage.setItem("userFullName", this.state.user.userFullName)
		localStorage.setItem("userFirstName", this.state.user.firstName)
		localStorage.setItem("userLastName", this.state.user.lastName)
		localStorage.setItem("userId", this.state.user.id)
		localStorage.setItem("userEmail", this.state.user.email)
		localStorage.setItem("userName", this.state.user.userName)
		localStorage.setItem("supervisor", this.state.user.userSupervisor)
		localStorage.setItem("password", this.state.user.password)
	}
	findSupervisors = async () => {
				let supervisors = await axios.get(`http://localhost:4420/users/supervisors`,
					{}, {withCredentials: true})
					let filteredSupervisors = supervisors.data.filter(user => user._id != this.state.user.id)
					console.log(filteredSupervisors)
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
		console.log(user)
			let updateUser = await axios.patch(`http://localhost:4420/users`, {user}, {withCredentials: true})
				await this.setState({user: {
					id: updateUser.data.user._id,
					userFullName: `${updateUser.data.user.firstName} ${updateUser.data.user.lastName}`,
					firstName: updateUser.data.user.firstName,
					lastName: updateUser.data.user.lastName,
					email: updateUser.data.user.email,
					userName: updateUser.data.user.userName,
					password: updateUser.data.user.password,
					accessLevel: updateUser.data.user.permission,
					userSupervisor: updateUser.data.user.supervisor
				}
			})
			if (this.state.user.id == localStorage.userId) {await this.updateLocalState()}
				console.log(this.state.user)

}
	findUser = async (selectedUser) => {
			let findUser = await axios.post(`http://localhost:4420/users/getuser`, {selectedUser}, {withCredentials: true})
				console.log(findUser.data)
				let setSubState = this.state.user
				this.state.user.id = findUser.data._id
				this.state.user.userFullName = `${findUser.data.user.firstName} ${findUser.data.user.lastName}`
				this.state.user.firstName = findUser.data.firstName
				this.state.user.lastName = findUser.data.lastName
				this.state.user.email = findUser.data.email
				this.state.user.userName = findUser.data.userName
				this.state.user.password = findUser.data.password
				this.state.user.accessLevel = findUser.data.permission
				this.state.user.userSupervisor = findUser.data.supervisor
				this.setState({setSubState})
				this.findSupervisors()
				this.findStaffUsers()
			console.log(this.state.user)
			}
	componentDidMount() {
		this.findSupervisors()
		this.findStaffUsers()
	}
  render() {
    return (

			localStorage.storedAccess >= 'B' ?
			<>
			{/*NAVIGATION SECTION*/}
			<Nav />
			{/*FILTERS SECTION - ITS MISSING THE ICONS*/}
			<Container>
      <Row>
        <Col>
						<Card style={{ width: '35rem' }} className="m-3">
						<Card.Header as="h5">Profile</Card.Header>
						<Form onSubmit={(e) => {
							e.preventDefault()
							this.updateUser(this.state.user, e)
						}
					}>
					<InputGroup className="mb-3" >
					<InputGroup.Text>First and Last name</InputGroup.Text>
					<Form.Control aria-label="First name" value={this.state.user.firstName} placeholder="First Name"
					readOnly={this.state.canUpdate} name="firstName" onChange={(e) => {
						let setSubState = this.state.user
						this.state.user.firstName = e.target.value
						this.setState({setSubState})}}/>
						<Form.Control aria-label="Last name" value={this.state.user.lastName} placeholder="Last Name"  readOnly={this.state.canUpdate} name="lastName" onChange={(e) => {
							let setSubState = this.state.user
							this.state.user.lastName = e.target.value
							this.setState({setSubState})}}/>
							</InputGroup>
							<Form.Group className="mb-3" controlId="formBasicEmail" style={{ width: '30rem' }}>
							<Form.Label>Email address</Form.Label>
							<InputGroup className="mb-3">
							<Form.Control
							placeholder="User Name"
							aria-label="Recipient's username"
							aria-describedby="basic-addon2"
							readOnly={this.state.canUpdate}
							name="userName"
							value={this.state.user.userName}
							onChange={(e) => {
								let setSubState = this.state.user
								this.state.user.userName = e.target.value
								this.state.user.email = `${e.target.value}${localStorage.emailService}`
								this.setState({setSubState})}}
								/>
								<InputGroup.Text id="basic-addon2">{localStorage.emailService}</InputGroup.Text>
								</InputGroup>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '30rem' }}>
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" name="password" value={this.state.user.password} placeholder="Password" onChange={(e) => {
									let setSubState = this.state.user
									this.state.user.password = e.target.value
									this.setState({setSubState})}}/>
									<Form.Text className="text-muted">
									Your password is not encrypted
									</Form.Text>
									</Form.Group>
									<Container>
									<Row>
									<Col>
									<fieldset>
									<Form.Group as={Row} className="mb-3">
									<Form.Label>
									Permission Level
									</Form.Label>
									<Col sm={10}>

									<Form.Check
									type="radio"
									label="No Access"
									name="permission"
									id="formHorizontalRadios1"
									value='A'
									defaultChecked={this.state.user.accessLevel == 'A'}
									disabled={localStorage.storedAccess < 'C'}
									onClick={(e) => {
										let setSubState = this.state.user
										this.state.user.accessLevel = e.target.value
										this.setState({setSubState})
										console.log(this.state.user)}}
										/>
										<Form.Check
										type="radio"
										label="View Only"
										name="permission"
										id="formHorizontalRadios2"
										value='B'
										defaultChecked={this.state.user.accessLevel == 'B'}
										disabled={localStorage.storedAccess < 'C'}
										onClick={(e) => {
											let setSubState = this.state.user
											this.state.user.accessLevel = e.target.value
											this.setState({setSubState})
											console.log(this.state.user)}}
											/>
											<Form.Check
											type="radio"
											label="Storeperson"
											name="permission"
											id="formHorizontalRadios3"
											value='C'
											defaultChecked={this.state.user.accessLevel == 'C'}
											disabled={localStorage.storedAccess < 'C'}
											onClick={(e) => {
												let setSubState = this.state.user
												this.state.user.accessLevel = e.target.value
												this.setState({setSubState})
												console.log(this.state.user)}}
												/>
												<Form.Check
												type="radio"
												label="Supervisor"
												name="permission"
												id="formHorizontalRadios4"
												value='D'
												defaultChecked={this.state.user.accessLevel == 'D'}
												disabled={localStorage.storedAccess < 'D'}
												onClick={(e) => {
													let setSubState = this.state.user
													this.state.user.accessLevel = e.target.value
													this.setState({setSubState})
													console.log(this.state.user)}}
													/>
													<Form.Check
													type="radio"
													label="Full Admin"
													name="permission"
													id="formHorizontalRadios5"
													value='Z'
													disabled={localStorage.storedAccess !== 'Z'}
													defaultChecked={this.state.user.accessLevel == 'Z'}
													onClick={(e) => {
														let setSubState = this.state.user
														this.state.user.accessLevel = e.target.value
														this.setState({setSubState})
														console.log(this.state.user)}}
														/>
														</Col>
														</Form.Group>
														</fieldset>
														</Col>
														<Col>
														<Form.Group as={Row} className="mb-3">
														<Form.Label>
														Supervisor
														</Form.Label>
														{this.state.supervisors.map((user, i) => (
															<Form.Check key={i} type="radio" id={`formHorizontalRadios${i+10}`} label={`${user.email}`} name="supervisor"
															value={user._id}
															defaultChecked={this.state.user.userSupervisor == user._id}
															onClick={(e) => {
																let setSubState = this.state.user
																this.state.user.userSupervisor = e.target.value
																this.setState({setSubState})
																console.log(this.state.user)
															}}
															/>
														))}
														</Form.Group>
														</Col>
														</Row>
														</Container>

														<Form.Group as={Row}>
														<Col sm={{ span: 10, offset: 2 }}>

														<Button type="submit" variant="primary" type="submit">Update</Button>
														</Col>
														</Form.Group>
														</Form>
														</Card>

				</Col>
        <Col>
				<Card style={{ width: '20rem' }} className="m-3">
					<Card.Header as="h5">Select Staff</Card.Header>
						<Form>
						<Button type="submit" variant="danger">Create New User. Email will be sent</Button>
						<Form.Group as={Row} className="mb-3">
						<Container>
							<Form.Label>
							Staff to update where you are Supervisor
							</Form.Label>
								{this.state.staffUsers.map((user, i) => (
								<Card key={i} value={user._id} name="staffMember" onClick={(e) => {
									console.log('CLICKED')
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
										<Button variant="primary" type="submit" >Update User</Button>
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
