import React from "react";

class Test extends React.Component {
  // STATE OF THE COMPONENT. WE JUST LOAD WITH A METHOD THE ITEMS IN THE STATE (INFO COMING FROM STATE.PROPS.ORDER ) ALL OTHER ORDER INFO STILL IN PROPS.
  state = {
    availableItems: [
      //all the Items not added to a package. Will be sent like potential free items to manifest.
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
      // Functional state to help in the process of picking and unclicking items. Not show in render
      {
        itemId: 111,
        itemQty: 10,
      },
      {
        itemId: 222,
        itemQty: 20,
      },
    ],
    inpacking: [], // Array: State that contains the items to be added to the packages
    packages: [], // Array: State that contains the packages already created
    packageCounter: 1, // Counter of packages created - Package id: OrderId-PackageCounter
  };
  // METHOD TO MOVE ITEMS FROM ITEMS STATE TO INPACKING STATE
  addRemovefromPack = (item) => {
    let items = this.state.items;
    let inpacking = this.state.inpacking;
    // We check if the items havent been packed, we move them to packing and take them out of Items
    if (this.state.items.find((el) => el.itemId === item.itemId)) {
      inpacking.push(item);
      items = items.filter((el) => {
        return el.itemId !== item.itemId;
      });
    } else {
      // It items are packed, we take them out of packing and move them to items again.
      items.push(item);
      inpacking = inpacking.filter((el) => {
        return el.itemId !== item.itemId;
      });
    }
    // We need items state to do this condition. The Item list showed needs to show all the packages not asigned a package even though they are in packing.
    this.setState({
      items: items,
      inpacking: inpacking,
    });
  };
  // METHOD TO ASIGN A PACKAGE NUMBER TO THE ITEMS AND SEND THEM TO PACKAGED STATE
  closePackage = (e) => {
    if (this.state.inpacking.length !== 0) {
      let packages = this.state.packages; // array of packages already finished (empty at the begging)
      let packageItems = this.state.inpacking; // items to be added to this new package (checked items bassically)
      let pack = {
        packageId: "docNum-`${this.state.packageCounter`",
        docNum: "order number", // should be this.props.order.DocNum
        userId: "userId", // COMES FROM THE AUTHORIZATION IN BACKEND?
        items: packageItems,
      };
      packages.push(pack); // We push the new pack into the packages array

      let availableItems = this.state.availableItems.filter(
        (x) => !this.state.inpacking.filter((y) => y.itemId === x.itemId).length
      );
      console.log(availableItems);
      this.setState({
        packages,
        inpacking: [],
        availableItems,
      });
    }
  };

  // METHOD TO CLOSE DE ORDER BY MOVING REPLACING THE ITEMS STATE THE PACKAGES AND LOOSE ITEMS THAT WILL HAVE PACKAGE 0 (NO PACKAGE)
  closeOrder = () => {
    console.log("prueba order");
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
              {this.state.availableItems.map((item, index) => (
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
        <button onClick={(e) => this.closePackage(e)}> Send to Package </button>
        {/* INPACKING TABLE */}
        <h3> Inpacking list </h3>
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
              {this.state.inpacking.map((item, index) => (
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
        {/* PACKAGE TABLE */}
        <h3> Package list </h3>
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
              {this.state.packages.map((item, index) => (
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
        <button onClick={(e) => this.closeOrder(e)}> Close the </button>
      </>
    );
  }

  // END OF RENDER
}
export default Test;
