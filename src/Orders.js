import React from "react";
import "./App.css";
import Nav from "./NavComponent.js";
import Table from "react-bootstrap/Table";

class Orders extends React.Component {
  state = {
    initialDate: "",
    finalDate: "",
    kittingRoute: "",
    orders: [
      {
        docNum: 1,
        docDueDate: 2,
        kittingDate: 3,
        completingDate: 4,
        Customer: {
          CardName: 5,
        },
        orderComments: 6,
        orderCategory: 7,
        Lines: [1, 2, 3],
      },
      {
        docNum: 1,
        docDueDate: 2,
        kittingDate: 3,
        completingDate: 4,
        Customer: {
          CardName: 5,
        },
        orderComments: 6,
        orderCategory: 7,
        Lines: [1, 2, 3],
      },
    ],
  };
  // METHODS THAT SET THE STATE TO THE FILTER SELECTION, SO WHEN YOU COME BACK IN THIS WEBSITE, YOU HAVE THE TABLE FILTERED.
  updateInitialDate = (e) => {
    this.setState({
      initialDate: e.target.value,
    });
  };
  updateFinalDate = (e) => {
    this.setState({
      finalDate: e.target.value,
    });
  };
  updateKittingRoute = (e) => {
    this.setState({
      kittingRoute: e.target.value,
    });
  };
  render() {
    return (
      <>
        {/*NAVIGATION SECTION*/}
        <Nav />
        {/*FILTERS SECTION - ITS MISSING THE ICONS*/}
        <section className="bg-light">
          <div className="container text-center bg-light py-3">
            <form method="get" action="/houses">
              <div className="row">
                {/* INITIAL DATE FILTER*/}
                <div className="col">
                  <div className="input-group flex-nowrap">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Initial date"
                      name="InitialDateFilter"
                      onChange={(e) => this.updateInitialDate(e)}
                    />
                  </div>
                </div>
                {/*END OF FILTER*/}
                {/* FINAL DATE FILTER*/}
                <div className="col">
                  <div className="input-group flex-nowrap">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Final date"
                      name="FinalDateFilter"
                      onChange={(e) => this.updateFinalDate(e)}
                    />
                  </div>
                </div>
                {/*END OF FILTER*/}
                {/* KITTING DATE FILTER*/}
                <div className="col">
                  <div className="input-group">
                    <label className="input-group-text">K. Route</label>
                    <select
                      className="form-control"
                      name="kittingRouteFilter"
                      onChange={(e) => this.updateKittingRoute(e)}
                    >
                      <option value="Domestic">Domestic</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                </div>
                {/*Fin del filtro*/}
                {/*FILTER BUTTON*/}
                <div className="col">
                  <button className="btn btn-success">Filter</button>
                </div>
                {/*End of Filter Button*/}
              </div>
            </form>
          </div>
        </section>
        {/*TABLE SECTION*/}
        <div className="container mt-5">
          <Table striped bordered hover>
            {/*TABLE HEAD AND COLUMNS DEFINITION*/}
            <thead>
              <tr>
                <th>docNum</th>
                <th>docDueDate</th>
                <th>kittingDate</th>
                <th>completingDate</th>
                <th>Customer.CardName</th>
                <th>orderComments</th>
                <th>orderCategory</th>
                <th>Lines</th>
                <th>Min</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <a href="/packing/order/{{this.props.order.id}}">
                      {order.docNum}
                    </a>
                  </td>
                  <td>
                    <a href="/packing/order/{{this.props.order.id}}">
                      {order.docDueDate}
                    </a>
                  </td>
                  <td>
                    <a href="/packing/order/{{this.props.order.id}}">
                      {order.kittingDate}
                    </a>
                  </td>
                  <td>
                    <a href="/packing/order/{{this.props.order.id}}">
                      {order.completingDate}
                    </a>
                  </td>
                  <td>
                    <a href="/packing/order/{{this.props.order.id}}">
                      {order.Customer.CardName}
                    </a>
                  </td>
                  <td>
                    <a href="/packing/order/{{this.props.order.id}}">
                      {order.orderComments}
                    </a>
                  </td>
                  <td>
                    <a href="/packing/order/{{this.props.order.id}}">
                      {order.orderCategory}
                    </a>
                  </td>
                  <td>
                    <a href="/packing/order/{{this.props.order.id}}">
                      {order.Lines}
                    </a>
                  </td>
                  <td>
                    <a href="/packing/order/{{this.props.order.id}}">MIN</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

export default Orders;
