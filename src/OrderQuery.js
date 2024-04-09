import React from "react";
import axios from "axios";
import "./App.css";
import Nav from "./NavComponent.js";

import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';
import Table from "react-bootstrap/Table";

class OrderQuery extends React.Component {
    state = {
        orderData: null
    };

    getOrders = async () => {
        try {
            const orderData = await axios.get(`http://localhost:4420/orderQuery`, {}, { withCredentials: true });
            this.setState({ orderData: orderData.data });
						console.log(this.state.orderData)
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    componentDidMount() {
        this.getOrders()
				console.log(this.state.orderData);
    }

		render() {
    return (
        <div>
            {/* Existing Inventory Items List */}
            <div>
                {this.state.orderData !== null && this.state.orderData.map(order => (
                    <div key={order.docEntry}>
                        <p style={{ margin: '2px' }}>
                            <span>{order.orderNumber}</span>
                            <span style={{ marginLeft: '10px' }}>{order.dealerName}</span>
                        </p>
                        {/* Display orderLines for the current order */}
                        {order.orderLines && (
                            <div>
                                <p>Order Lines:</p>
                                <ul>
                                    {order.orderLines.map(line => (
                                        <li key={line.lineDocEntry}>
                                            <span>{line.itemCode}</span>
                                            <span style={{ margin: '2px' }}>Description: {line.itemDescription}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {/* Add additional properties rendering as needed */}
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
	}
}

export default OrderQuery;
