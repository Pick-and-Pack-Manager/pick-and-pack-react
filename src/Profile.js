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
			firstName: localStorage.userFirstName,
			lastName: localStorage.userLastName,
			email: localStorage.userEmail,
			setPermission: localStorage.storedAccess,
			userName: localStorage.userName,
			password: null,
			accessLevel: localStorage.storedAccess,
			supervisor: null
		},
		supervisors: [],
	}
	findSupervisors = async () => {
				let supervisors = await axios.get(`http://localhost:4420/users`,
					{
						permission: {
  						$gte: 'D'
						}
					}, {withCredentials: true})

					this.setState({
							supervisors: supervisors?.data || []
					})

	}
	componentDidMount() {
		this.findSupervisors()
	}
  render() {

    return (

			localStorage.storedAccess >= 'B' ?
			<>
			{/*NAVIGATION SECTION*/}
			<Nav />
			{/*FILTERS SECTION - ITS MISSING THE ICONS*/}
			<Card style={{ width: '45rem' }} className="m-3">
				<Card.Header as="h5">Create Profile</Card.Header>
						<Form onSubmit={(e) => {
							e.preventDefault();
						}
						}>
						<InputGroup className="mb-3" >
							<InputGroup.Text>First and Last name</InputGroup.Text>
							<Form.Control aria-label="First name" placeholder={this.state.user.firstName} readOnly={this.state.canUpdate} name="firstName" onChange={(e) => {
								let setSubState = this.state.users
								this.state.user.firstName = e.target.value
								this.setState({setSubState})}}/>
							<Form.Control aria-label="Last name" placeholder={this.state.user.lastName} readOnly={this.state.canUpdate} name="lastName" onChange={(e) => {
								let setSubState = this.state.users
								this.state.user.lastName = e.target.value
								this.setState({setSubState})}}/>
						</InputGroup>
				<Form.Group className="mb-3" controlId="formBasicEmail" style={{ width: '30rem' }}>
					<Form.Label>Email address</Form.Label>
					<InputGroup className="mb-3">
						<Form.Control
							placeholder={this.state.user.userName}
							aria-label="Recipient's username"
							aria-describedby="basic-addon2"
							readOnly={this.state.canUpdate}
							name="userName"
							onChange={(e) => {
								let setSubState = this.state.users
								this.state.user.userName = e.target.value
								this.setState({setSubState})}}
						/>
						<InputGroup.Text id="basic-addon2">{localStorage.emailService}</InputGroup.Text>
					</InputGroup>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '30rem' }}>
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" name="password" onChange={(e) => {
						let setSubState = this.state.users
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
								defaultChecked={this.state.user.setPermission = 'A' ? true : false}
								disabled={localStorage.storedAccess < 'C'}
								onClick={(e) => {
									let setSubState = this.state.users
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
								defaultChecked={this.state.user.setPermission = 'B' ? true : false}
								disabled={localStorage.storedAccess < 'C'}
								onClick={(e) => {
									let setSubState = this.state.users
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
								defaultChecked={this.state.user.setPermission = 'C' ? true : false}
								disabled={localStorage.storedAccess < 'C'}
								onClick={(e) => {
									let setSubState = this.state.users
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
								defaultChecked={this.state.user.setPermission = 'D' ? true : false}
								disabled={localStorage.storedAccess < 'D'}
								onClick={(e) => {
									let setSubState = this.state.users
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
								defaultChecked={this.state.user.setPermission > 'D' ? true : false}
								onClick={(e) => {
									let setSubState = this.state.users
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
					  <Form.Check key={i} type="radio" id={`formHorizontalRadios${i}`} label={`${user.email}`} name="supervisor" value={user._id}
						onClick={(e) => {
							let setSubState = this.state.users
							this.state.user.supervisor = e.target.value
							this.setState({setSubState})
						console.log(this.state.user)}}
						/>
					))}
	      </Form.Group>
				</Col>
      </Row>
    		</Container>

				<Form.Group as={Row}>
					<Col sm={{ span: 10, offset: 2 }}>
						<Button type="submit" variant="danger">Create New User. Email will be sent</Button>
						<Button type="submit" variant="primary">Update</Button>
					</Col>
				</Form.Group>
			</Form>
			</Card>
			</>
			:
			<Redirect to="/" />
		);
  }
}

export default Profile;
