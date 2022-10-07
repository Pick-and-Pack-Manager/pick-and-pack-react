import React from "react";
import "./App.css";
import Nav from "./NavComponent.js";
import Table from "react-bootstrap/Table";
import {BrowserRouter, Switch, Route, Redirect, Link} from "react-router-dom";

class Orders extends React.Component {
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
        Lines: [1, 2, 3],
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
        Lines: [1, 2, 3],
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
        Lines: [1, 2, 3],
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
        Lines: [1, 2, 3],
      },
    ],
		loggedIn: this.props.loggedIn
  };
  // AT THE MOUNT WE CREATE ORDERS AND ORIGINAL ORDERS IN THE STATE
  // {/*componentWillMount() {
  //   this.setState({
  //     orders: this.props.orders,
  //     ordersOriginal: this.props.orders,
  //   });
  // }*/}

  // METHODS THAT SET THE STATE TO THE FILTER SELECTION, SO WHEN YOU COME BACK IN THIS WEBSITE, YOU HAVE THE TABLE FILTERED.
  filterByInitialDate = (e) => {
    let orders = this.state.orders;
    let initialDateFilter = orders.filter((order) => order.kittingDate >= e);
    this.setState({
      orders: initialDateFilter,
    });
  };
  filterByFinalDate = (e) => {
    this.setState({
      finalDate: e.target.value,
    });
  };
  // THIS FILTER BY TYPE YOU HAVE TO BACK TO ALL TO SEARCH AGAIN. NEED TO FIX THIS BUG
  filterByOrderCategory = (e) => {
    if (e === "All") {
      this.setState({
        orders: this.state.ordersOriginal,
      });
    } else {
      let orders = this.state.orders;
      let orderCategoryFilter = orders.filter(
        (order) => order.orderCategory == e
      );
      this.setState({
        orders: orderCategoryFilter,
      });
    }
  };

  render() {
    return (
			sessionStorage.loggedIn = true && sessionStorage.loggedIn != undefined ?
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
                      onChange={(e) => this.filterByInitialDate(e.target.value)}
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
                      onChange={(e) => this.filterByFinalDate(e.target.value)}
                    />
                  </div>
                </div>
                {/*END OF FILTER*/}
                {/* KITTING DATE FILTER*/}
                <div className="col">
                  <div className="input-group">
                    <label className="input-group-text">Category</label>
                    <select
                      className="form-control"
                      name="CategoryOrKittingRoute"
                      onChange={(e) =>
                        this.filterByOrderCategory(e.target.value)
                      }
                    >
                      <option value="All">All</option>
                      <option value="D">D</option>
                      <option value="C">C</option>
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
										<Link to="/packing/order/{{this.state.order.docNum}}`">{order.docNum}</Link>
                  </td>
                  <td>
                    <Link to="/packing/order/{{this.props.order.id}}">
                      {order.docDueDate}
                    </Link>
                  </td>
                  <td>
                    <Link to="/packing/order/{{this.props.order.id}}">
                      {order.kittingDate}
                    </Link>
                  </td>
                  <td>
                    <Link to="/packing/order/{{this.props.order.id}}">
                      {order.completingDate}
                    </Link>
                  </td>
                  <td>
                    <Link to="/packing/order/{{this.props.order.id}}">
                      {order.Customer.CardName}
                    </Link>
                  </td>
                  <td>
                    <Link to="/packing/order/{{this.props.order.id}}">
                      {order.orderComments}
                    </Link>
                  </td>
                  <td>
                    <Link to="/packing/order/{{this.props.order.id}}">
                      {order.orderCategory}
                    </Link>
                  </td>
                  <td>
                    <Link to="/packing/order/{{this.props.order.id}}">
                      {order.Lines.length}
                    </Link>
                  </td>
                  <td>
                    <Link to="/packing/order/{{this.props.order.id}}">
                      {" "}
                      {order.Lines.length * 0.75}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </>
			:
			<Redirect to="" />
    );
  }
}

export default Orders;
