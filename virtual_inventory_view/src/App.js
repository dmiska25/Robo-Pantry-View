import React, { Component } from "react";
import ItemFormModal from "./components/ItemForm";
import axios from "axios";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory : [],
      searchString : "",
      displayItemForm : false,
      activeItem: {
        product_name : "",
        purchase_date : "",
        quantity : null,
        unit_of_measure : "",
        barcode : null,
      },
    };
  }

  componentDidMount() {
    this.refreshInventory();
  }

  refreshInventory = () => {
    axios
      .get("/robo-pantry/products")
      .then((res) => this.setState({ inventory: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ displayItemForm:!this.state.displayItemForm});
  };

  handleSubmit = (item) => {
    this.toggle();

    axios
      .put(`/robo-pantry/products/`, item)
      .then((res) => this.refreshInventory());
    return;
  };


  handleDelete = (item) => {
    axios
      .delete(`/robo-pantry/products/${item.id}/`, item)
      .then((res) => this.refreshInventory());
  };

  handleSearch = (e) => {
    let { value } = e.target;
    this.setState({searchString:value});
    console.log("Ran Search");
  }

  createItem = () => {
    const item = { product_name: "", purchase_date: "", quantity:null, unit_of_measure:"",barcode:null };

    this.setState({ activeItem: item, displayItemForm: !this.state.displayItemForm});
  };

  editItem = (item) => {
    this.setState({ activeItem: item, displayItemForm: !this.state.displayItemForm});
  };

  search = (query) => {
    if(query==="") { return this.state.inventory; };
    return this.state.inventory.filter( item =>
      item.product_name.toLowerCase().includes(query.toLowerCase())
    );
  };


  renderItems = (items) => {
      return ( items.map((item) => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className="item-title mr-2"
          >
            {item.product_name}
          </span>
          <span>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => this.editItem(item)}
            >
              More Info
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.handleDelete(item)}
            >
              Remove
            </button>
          </span>
        </li>
      ))
    );

  };


  render() {
    return (
      <main className="container">
        <h1 className="text-black text-uppercase text-center my-4">My Virtual Pantry</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add Item
                </button>
              </div>
              <div className="mb-4">
                <label
                  for="search"
                >Search Inventory: </label>
                <input
                  id="search"
                  onChange={this.handleSearch}
                />
                  
              </div>
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems(this.search(this.state.searchString))}
              </ul>
            </div>
          </div>
        </div>
        {this.state.displayItemForm ? (
          <ItemFormModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }

}

export default App;
