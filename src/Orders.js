import React from "react";
import "./App.css";
import Nav from "./NavComponent.js";
import Table from "react-bootstrap/Table";

class Orders extends React.Component {
  state = {
    initialDate: "",
    finalDate: "",
    typeOrder: "",
  };
	{/*FUNCTIONAS THAT UPDATE THE STATE WITH THE FILTERS*/}
  updateInitialDate = () => {

	}
  render() {
    return (
      <>
        {/*NAVIGATION SECTION*/}
        <Nav />
        {/*FILTERS SECTION NEED TO ADD ICONS TO THE PROJECT*/}
        <section className="bg-light">
          <div className="container text-center bg-light py-3">
            <form method="get" action="/houses">
              <div className="row">
                {/* FILTRO DE FECHA INICIAL*/}
                <div class="col">
                  <div class="input-group flex-nowrap">
                    <input
                      type="date"
                      class="form-control"
                      placeholder="Initial date"
                      name="InitialDateFilter"
                      onChange={(e) => this.updateInitialDate(e)}
                    />
                  </div>
                </div>
                {/*Fin del filtro*/}
                {/* FILTRO DE FECHA FINAL*/}
                <div class="col">
                  <div class="input-group flex-nowrap">
                    <input
                      type="date"
                      class="form-control"
                      placeholder="Final date"
                      name="FinalDateFilter"
                      onChange={(e) => this.updateFinalDate(e)}
                    />
                  </div>
                </div>
                {/*Fin del filtro*/}
                {/* FILTRO DE FECHA TYPE COMMERCIAL OR LOCAL*/}
                <div class="col">
                  <div class="input-group">
                    <label class="input-group-text">K. Route</label>
                    <select
                      class="form-control"
                      name="kittingRouteFilter"
                      onChange={(e) => this.updateKittingDate(e)}
                    >
                      <option value="Domestic">Domestic</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                </div>
                {/*Fin del filtro*/}
                {/*FILTER BUTTON*/}
                <div class="col">
                  <button class="btn btn-success">Filter</button>
                </div>
                {/*End of Filter Button*/}
              </div>
            </form>
          </div>
        </section>
        {/*TABLE SECTION*/}
        <div className="container mt-5">
          <Table striped bordered hover>
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
              <tr>
                <td>
                  <a href="/packing/order/{{this.props.order.id}}">Blah Blah</a>
                </td>
                <td>
                  <a href="/packing/order/{{this.props.order.id}}">1234567</a>
                </td>
                <td>
                  <a href="/packing/order/{{this.props.order.id}}">more text</a>
                </td>
                <td>
                  <a href="/packing/order/{{this.props.order.id}}">more text</a>
                </td>
                <td>
                  <a href="/packing/order/{{this.props.order.id}}">more text</a>
                </td>
                <td>
                  <a href="/packing/order/{{this.props.order.id}}">more text</a>
                </td>
                <td>
                  <a href="/packing/order/{{this.props.order.id}}">more text</a>
                </td>
                <td>
                  <a href="/packing/order/{{this.props.order.id}}">more text</a>
                </td>
                <td>
                  <a href="/packing/order/{{this.props.order.id}}">more text</a>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

export default Orders;
