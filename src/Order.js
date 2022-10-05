import React from "react";
import "./App.css";
import Nav from "./NavComponent.js";

class Order extends React.Component {
  state = {
    orders: [
      {
        docNum: 1,
        docDueDate: 2,
        kittingDate: "10-10-2022",
        completingDate: 4,
        Customer: {
          CardName: 5,
        },
        orderComments: 6,
        orderCategory: "C",
        orderItems: {
          lineNum: 1,
          itemCode: 2,
          itemDescription: 3,
          qtyReq: 4,
          invWhse: 5,
          delWhse: 6,
          issued: "",
          issuedQty: "",
          issuedBalance: "",
          freeText: "",
          shippingType: "",
          shippingProvider: "",
          shippingDestination: "",
          packageId: "",
          manifestId: "",
        },
      },
      {
        docNum: 1,
        docDueDate: 2,
        kittingDate: 10000,
        completingDate: 4,
        Customer: {
          CardName: 5,
        },
        orderComments: 6,
        orderCategory: "D",
        orderItems: {
          lineNum: 1,
          itemCode: 2,
          itemDescription: 3,
          qtyReq: 4,
          invWhse: 5,
          delWhse: 6,
          issued: "",
          issuedQty: "",
          issuedBalance: "",
          freeText: "",
          shippingType: "",
          shippingProvider: "",
          shippingDestination: "",
          packageId: "",
          manifestId: "",
        },
      },
    ],
    ordersOriginal: [
      {
        docNum: 1,
        docDueDate: 2,
        kittingDate: 3,
        completingDate: 4,
        Customer: {
          CardName: 5,
        },
        orderComments: 6,
        orderCategory: "C",
        orderItems: {
          lineNum: 1,
          itemCode: 2,
          itemDescription: 3,
          qtyReq: 4,
          invWhse: 5,
          delWhse: 6,
          issued: "",
          issuedQty: "",
          issuedBalance: "",
          freeText: "",
          shippingType: "",
          shippingProvider: "",
          shippingDestination: "",
          packageId: "",
          manifestId: "",
        },
      },
      {
        docNum: 1,
        docDueDate: 2,
        kittingDate: 10000,
        completingDate: 4,
        Customer: {
          CardName: 5,
        },
        orderComments: 6,
        orderCategory: "D",
        orderItems: {
          lineNum: 1,
          itemCode: 2,
          itemDescription: 3,
          qtyReq: 4,
          invWhse: 5,
          delWhse: 6,
          issued: "",
          issuedQty: "",
          issuedBalance: "",
          freeText: "",
          shippingType: "",
          shippingProvider: "",
          shippingDestination: "",
          packageId: "",
          manifestId: "",
        },
      },
    ],
  };
  render() {
    return;

    {
      /*ITEMS TABLE SECTION*/
    }
    <div className="container mt-5">
      <Table striped bordered hover>
        {/*TABLE HEAD AND COLUMNS DEFINITION*/}
        <thead>
          <tr>
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
          {this.state.orders.orderItems.map((item, index) => (
            <tr key={index}>
              <td>
                <a href="/packing/order/{{this.state.order.docNum}}`">
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
    </div>;
  }
}
export default Order;
