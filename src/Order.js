import React from "react";
import "./App.css";
import Nav from "./NavComponent.js";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Order extends React.Component {
  state = {
    order: {
      docNum: 1,
      docDueDate: "docDueDate",
      kittingDate: "kittingDate",
      completingDate: "completingDate",
      Customer: {
        CardName: "Company 1",
      },
      orderComments: "Comment of the Order",
      orderCategory: "Category of Order	",
      orderItems: [
        {
          lineNum: 1,
          itemCode: 2,
          itemDescription: 3,
          qtyReq: 4,
          invWhse: 5,
          delWhse: 6,
          issued: 5,
          issuedQty: 4,
          issuedBalance: 4,
          freeText: 4,
          shippingType: 4,
          shippingProvider: 4,
          shippingDestination: 4,
          packageId: 4,
          manifestId: 3,
        },
        {
          lineNum: 1,
          itemCode: 2,
          itemDescription: 3,
          qtyReq: 4,
          invWhse: 5,
          delWhse: 6,
          issued: 5,
          issuedQty: 4,
          issuedBalance: 4,
          freeText: 4,
          shippingType: 4,
          shippingProvider: 4,
          shippingDestination: 4,
          packageId: 4,
          manifestId: 3,
        },
      ],
    },
  };

  // AT THE MOUNT WE PUT THE ORDER (COMING FROM A PROP) INTO THE STATE.
  // componentWillMount() {
  //   this.setState({
  //     order: this.props.order,
  //     orderOriginal: this.props.order,
  //   });
  // }

  render() {
    return (
      <>
        <Nav />
        {/*ORDER DATE*/}
        <Container className="text-center">
          <Row>
            <Col>Consumer Order {this.state.order.docNum}</Col>
          </Row>
          <Row>
            <Col>Customer: {this.state.order.Customer.CardName}</Col>
            <Col>Kitting Date: {this.state.order.kittingDate}</Col>
          </Row>
          <Row>
            <Col>Order Comment: {this.state.order.orderComments}</Col>
            <Col>Due Date: {this.state.order.docDueDate}</Col>
          </Row>
          <Row>
            <Col>Order Category: {this.state.order.orderCategory}</Col>
            <Col>Competing Date: {this.state.order.completingDate}</Col>
          </Row>
        </Container>

        <div className="container mt-5">
          <h1> Items to pack in the order </h1>
          <form>
            <Table striped bordered hover sm responsive="xl">
              {/*TABLE HEAD AND COLUMNS DEFINITION*/}
              <thead>
                <tr>
                  <th>Add to Package</th>
                  <th>lineNum</th>
                  <th>itemCode</th>
                  <th>itemDescription</th>
                  <th>qtyReq</th>
                  <th>invWhse</th>
                  <th>delWhse</th>
                  <th>issued</th>
                  <th>issuedQty</th>
                  <th>issuedBalance</th>
                  <th>freeText</th>
                  <th>shippingType</th>
                  <th>shippingProvider</th>
                  <th>shippingDestination</th>
                  <th>packageId</th>
                  <th>manifestId</th>
                </tr>
              </thead>
              <tbody>
                {this.state.order.orderItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Group className="mb-3">
                        <Form.Check type="checkbox" />
                      </Form.Group>
                    </td>
                    <td>
                      <a href="/packing/order/{{this.state.order.docNum}}">
                        {item.lineNum}
                      </a>
                    </td>
                    <td>
                      <a href="/packing/order/{{this.props.order.id}}">
                        {item.itemCode}
                      </a>
                    </td>
                    <td>
                      <a href="/packing/order/{{this.props.order.id}}">
                        {item.itemDescription}
                      </a>
                    </td>
                    <td>
                      <a href="/packing/order/{{this.props.order.id}}">
                        {item.qtyReq}
                      </a>
                    </td>
                    <td>
                      <a href="/packing/order/{{this.props.order.id}}">
                        {item.invWhse}
                      </a>
                    </td>
                    <td>
                      <a href="/packing/order/{{this.props.order.id}}">
                        {item.delWhse}
                      </a>
                    </td>
                    <td>
                      <a href="/packing/order/{{this.props.order.id}}">
                        {item.issued}
                      </a>
                    </td>
                    <td>
                      <a href="/packing/order/{{this.props.order.id}}">
                        {item.issuedQty}
                      </a>
                    </td>
                    <td>
                      <a href="/packing/order/{{this.props.order.id}}">
                        {item.issuedBalance}
                      </a>
                    </td>
                    <td>
                      <a href="/packing/order/{{this.props.order.id}}">
                        {item.freeText}
                      </a>
                    </td>
                    <td>
                      <a href="/packing/order/{{this.props.order.id}}">
                        {item.shippingType}
                      </a>
                    </td>
                    <td>
                      <a href="/packing/order/{{this.props.order.id}}">
                        {item.shippingProvider}
                      </a>
                    </td>
                    <td>
                      <a href="/packing/order/{{this.props.order.id}}">
                        {item.shippingDestination}
                      </a>
                    </td>
                    <td>
                      <a href="/packing/order/{{this.props.order.id}}">
                        {item.packageId}
                      </a>
                    </td>
                    <td>
                      <a href="/packing/order/{{this.props.order.id}}">
                        {item.manifestId}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button variant="primary" type="submit">
              Add to Package
            </Button>
          </form>
        </div>
      </>
    );
  }
}

export default Order;
