import React from "react";
import axios from "axios";
import "./App.css";
import { Table } from "react-bootstrap";

class Inventory extends React.Component {
  state = {
    inventory: null,
    inventoryCount: 0,
    totalInventoryValue: 0,
    whsTotals: null,
  };

  getInventory = async () => {
    try {
      const inventoryData = await axios.get("http://localhost:4420/inventory", {
        withCredentials: true,
      });

      const totalValue = inventoryData.data.reduce(
        (acc, item) => acc + item.StockValue,
        0
      );

      const whsTotals = {};
      inventoryData.data.forEach((item) => {
        if (!whsTotals[item.WhsCode]) {
          whsTotals[item.WhsCode] = 0;
        }
        whsTotals[item.WhsCode] += item.StockValue;
      });

      this.setState({
        inventory: inventoryData.data,
        inventoryCount: inventoryData.data.length,
        totalInventoryValue: totalValue,
        whsTotals: whsTotals,
      });
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  componentDidMount() {
    this.getInventory();
  }

  render() {
    const warehouseEntries = this.state.whsTotals
      ? Object.entries(this.state.whsTotals)
      : [];

    return (
      <body>
        <h1>
          Returned Items: {this.state.inventoryCount},
          Inventory Value: $
          {this.state.totalInventoryValue.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h1>
        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Warehouse Code</th>
              <th>Total Stock Value</th>
            </tr>
          </thead>
          <tbody>
            {warehouseEntries.map(([whsCode, totalValue], index) => (
              <tr key={index}>
                <td>{whsCode}</td>
                <td>
                  ${totalValue.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          {this.state.inventory &&
            this.state.inventory.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  marginBottom: "20px",
                  border: "1px solid #000",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    borderRight: "1px solid #000",
                    padding: "10px",
                  }}
                >
                  <p style={{ margin: "2px" }}>
                    WhseItemkey: {item.WhsCode + "-" + item.ItemCode}
                  </p>
                  <b style={{ margin: "2px" }}>Code: {item.ItemCode}</b>
                  <p style={{ margin: "2px" }}>
                    Description: {item.itemName}
                  </p>
                  <p style={{ margin: "2px" }}>Group: {item.itmsGrpNam}</p>
                  <p style={{ margin: "2px" }}>Whse: {item.WhsCode}</p>
                  <b style={{ margin: "2px" }}>Qty: {item.OnHand}</b>
                  <p style={{ margin: "2px" }}>
                    StockValue: {item.StockValue}
                  </p>
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: "10px",
                  }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Warehouse</th>
                        <th>Quantity</th>
                        <th>Stock Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.inventory
                        .filter((otherItem) => otherItem.ItemCode === item.ItemCode)
                        .map((otherItem, otherIndex) => (
                          <tr key={otherIndex}>
                            <td>{otherItem.WhsCode}</td>
                            <td>{otherItem.OnHand}</td>
                            <td>${otherItem.StockValue}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            ))}
        </div>
      </body>
    );
  }
}

export default Inventory;
