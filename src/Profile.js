import React from "react";
import "./App.css";
import Nav from "./NavComponent.js";
import {BrowserRouter, Switch, Route, Redirect, Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert'

class Profile extends React.Component {
  state = {
		canUpdate: localStorage >= 'C' ? true : false,
		user: {
			firstName: localStorage.userFirstName,
			lastName: localStorage.userLastName,
			email: localStorage.userEmail,
			setPermission: localStorage.storedAccess
		}
	};
  render() {
		console.log(localStorage)
    return (
			localStorage.storedAccess >= 'C' ?
			<>
			{/*NAVIGATION SECTION*/}
			<Nav />
			{/*FILTERS SECTION - ITS MISSING THE ICONS*/}
			<Card style={{ width: '45rem' }} className="m-3">
				<Card.Header as="h5">Create Profile</Card.Header>
						<Form>
						<InputGroup className="mb-3" >
							<InputGroup.Text>First and Last name</InputGroup.Text>
							<Form.Control aria-label="First name" placeholder={this.state.user.firstName} readOnly={this.state.canUpdate} />
							<Form.Control aria-label="Last name" placeholder={this.state.user.lastName} readOnly={this.state.canUpdate}/>
						</InputGroup>
				<Form.Group className="mb-3" controlId="formBasicEmail" style={{ width: '30rem' }}>
					<Form.Label>Email address</Form.Label>
					<InputGroup className="mb-3">
						<Form.Control
							placeholder={this.state.user.email}
							aria-label="Recipient's username"
							aria-describedby="basic-addon2"
							readOnly={this.state.canUpdate}
						/>
						<InputGroup.Text id="basic-addon2">{localStorage.emailService}</InputGroup.Text>
					</InputGroup>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '30rem' }}>
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
					<Form.Text className="text-muted">
						Your password is not encrypted
					</Form.Text>
				</Form.Group>
				<fieldset>
					<Form.Group as={Row} className="mb-3">
						<Form.Label as="legend" column sm={2}>
							Permission Level
						</Form.Label>
						<Col sm={10}>
							<Form.Check
								type="radio"
								label="No Access"
								name="formHorizontalRadios"
								id="formHorizontalRadios1"
								value='A'
							/>
							<Form.Check
								type="radio"
								label="View Only"
								name="formHorizontalRadios"
								id="formHorizontalRadios2"
								value='B'
							/>
							<Form.Check
								type="radio"
								label="Storeperson"
								name="formHorizontalRadios"
								id="formHorizontalRadios3"
								value='C'
							/>
							<Form.Check
								type="radio"
								label="Supervisor"
								name="formHorizontalRadios"
								id="formHorizontalRadios2"
								value='D'
							/>
							<Form.Check
								type="radio"
								label="Full Admin"
								name="formHorizontalRadios"
								id="formHorizontalRadios2"
								value='Z'
							/>
						</Col>
					</Form.Group>
				</fieldset>
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
