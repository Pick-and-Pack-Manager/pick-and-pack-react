import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card'

class Login extends React.Component {
	state = {
		loginEmail: '',
		loginPassword: '',
		emailService: '@test.com'
	}
  render()
	{
    return (
			<Card style={{ width: '35rem' }} ClassName="m-3">
				<Card.Header as="h5">Login to Pick and Pack Manager</Card.Header>
						<Form onSubmit={(e) => {
							let user = {
								email: `${this.state.loginEmail}${this.state.emailService}`,
								password: this.state.loginPassword
							}
							console.log(user)
							e.preventDefault();
							this.props.searchUser(user
							, e)
						}
						}>
									<Form.Group className="mb-3" controlId="formBasicEmail" style={{ width: '30rem' }}>
										<Form.Label>Email address</Form.Label>
										<InputGroup className="mb-3" >
											<Form.Control
												placeholder="Recipient's username"
												aria-label="Recipient's username"
												aria-describedby="basic-addon2"
												name='loginEmail'
												value={this.state.loginEmail}
												onChange={(e) => { this.setState({loginEmail: e.target.value})}}
											/>
											<InputGroup.Text id="basic-addon2">{this.state.emailService}</InputGroup.Text>
										</InputGroup>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: '30rem' }}>
										<Form.Label>Password</Form.Label>
										<Form.Control type="password" placeholder="Password" name="loginPassword" value={this.state.loginPassword}
										onChange={(e) => { this.setState({ loginPassword: e.target.value })}} />
										<Form.Text className="text-muted">
											Your password is not encrypted
										</Form.Text>
									</Form.Group>
									<Button variant="primary" type="submit" >
										Login
									</Button>
								</Form>
							</Card>
		)
  }
}

export default Login;
