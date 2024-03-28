import React from "react";
import axios from "axios";
import "./App.css";
import Nav from "./NavComponent.js";

class Inventory extends React.Component {
  state = {
	};
	getInventory = async () => {
				let inventoryData = await axios.get(`http://localhost:4420/inventory`,
					{}, {withCredentials: true})
					this.setState({
							inventory: {inventoryData}
					})

			}
			componentDidMount() {
				this.getInventory()
				console.log(this.state)
			}
			render() {
			return <div>Inventory</div>;
			}
			}

export default Inventory;
