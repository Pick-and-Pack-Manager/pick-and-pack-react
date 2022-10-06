import React from "react";

class Test extends React.Component {
  // STATE OF THE COMPONENT. WE JUST LOAD WITH A METHOD THE ITEMS IN THE STATE (INFO COMING FROM STATE.PROPS.ORDER ) ALL OTHER ORDER INFO STILL IN PROPS.
  state = {
    ogItems: [
      {
        itemId: 111,
        itemQty: 10,
      },
      {
        itemId: 222,
        itemQty: 20,
      },
    ],
    items: [
      {
        itemId: 111,
        itemQty: 10,
      },
      {
        itemId: 222,
        itemQty: 20,
      },
    ],
    inpacking: [],
    packed: [],
  };
  // METHODS
  addRemovefromPack = (item) => {
    let items = this.state.items;
    let inpacking = this.state.inpacking;
    // IF THE ITEMS IS STILL IN THE ITEMS STATE, WE PUSH IT TO INPACKING AND DELETE IT FROM ITEMS
    if (this.state.items.find((el) => el.itemId === item.itemId)) {
      inpacking.push(item);
      items = items.filter((el) => {
        return el.itemId !== item.itemId;
      });
    } else {
      items.push(item);
      inpacking = inpacking.filter((el) => {
        return el.itemId !== item.itemId;
      });
    }
    console.log(items);
    console.log(inpacking);
    this.setState({
      items,
      inpacking,
    });
  };

  // RENDER THE HTML
  render() {
    return (
      <>
        {/* ITEM LIST */}
        <h3> Item list </h3>
        <form>
          <table>
            <thead>
              <tr>
                <td>Add Package</td>
                <td>Id Item</td>
                <td>Qty Item</td>
              </tr>
            </thead>
            <tbody>
              {this.state.ogItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      value={item.itemId}
                      onChange={(e) => this.addRemovefromPack(item)}
                    />
                  </td>
                  <td>{item.itemId}</td>
                  <td>{item.itemQty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
        {/* SEND TO PACKAGE BUTTON */}
        <button onClick={(e) => closePackage(e)}> Send to Package </button>
        {/* PACKAGE TABLE */}
        <h3> Packet list </h3>
        <form>
          <table>
            <thead>
              <tr>
                <td>Add Package</td>
                <td>Id Item</td>
                <td>Qty Item</td>
              </tr>
            </thead>
            <tbody>
              {this.state.packed.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      value={item.itemId}
                      onChange={(e) => this.addRemovefromPack(item)}
                    />
                  </td>
                  <td>{item.itemId}</td>
                  <td>{item.itemQty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
        {/* CLOSE THE ORDER PACKING AND BACK TO ORDERS LIST */}
        <button onClick={(e) => closePackage(e)}> Send to Package </button>
      </>
    );
  }

  // END OF RENDER
}
export default Test;
