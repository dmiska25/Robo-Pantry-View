import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import '../component_css/itemForm.css'


export default class ItemFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      editMode: false,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]:value };
    this.setState({activeItem});
  }

  render() {
    const { toggle, onSave } = this.props;

    if (this.state.editMode) {
      return (
        <Modal isOpen={ true } toggle={ toggle }>
          <ModalHeader toggle={toggle}>Item Details</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="item-name">Product Name</Label>
                <Input
                  type="text"
                  id="item-name"
                  name="product_name"
                  value={this.state.activeItem.product_name}
                  onChange={this.handleChange}
                  placeholder="Enter Product Name"
                />
              </FormGroup>
              <FormGroup>
                <Label for="item-purchase-date">Purchase Date</Label>
                <Input
                  type="date"
                  id="item-purchase-date"
                  name="purchase_date"
                  value={this.state.activeItem.purchase_date}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="item-quantity">Quantity</Label>
                <Input
                  type="number"
                  id="item-quantity"
                  name="quantity"
                  value={this.state.activeItem.quantity}
                  onChange={this.handleChange}
                  min={0}
                  placeholder="Enter Quantity"
                />
              </FormGroup>
              <FormGroup>
                <Label for="item-unit-of-measure">Unit</Label>
                <br/>
                <select
                  id="item-unit-of-measure"
                  name="unit_of_measure"
                  onChange={this.handleChange}
                  value={this.state.activeItem.unit_of_measure}
                >
                  <option value="tsp">Teaspoon</option>
                  <option value="tbsp">Tablespoon</option>
                  <option value="oz">Ounce</option>
                  <option value="cup">Cup</option>
                  <option value="pt">Pint</option>
                  <option value="qt">Quart</option>
                  <option value="gal">Gallon</option>
                  <option value="lb">Pound</option>
                  <option value="g">Gram</option>
                  <option value="kg">KiloGram</option>
                  <option value="l">Liter</option>
                  <option value="ml">Milliliter</option>
                  <option value="unit">Unit</option>
                </select>
              </FormGroup>
              <FormGroup>
                <Label for="item-barcode">Barcode</Label>
                <Input
                  type="number"
                  id="item-barcode"
                  name="barcode"
                  value={this.state.activeItem.barcode}
                  onChange={this.handleChange}
                  min={0}
                  placeholder="Enter Barcode"
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={() => onSave(this.state.activeItem)}
            >
              Save
            </Button>
          </ModalFooter>
        </Modal>
      );
    }
    else {
      return (
          <Modal isOpen={ true } toggle={ toggle }>
          <ModalHeader toggle={toggle}>Item Details</ModalHeader>
          <ModalBody>
            <Label for="item-name">Product Name</Label>
            <p>{this.state.activeItem.product_name}</p>

            <Label for="item-purchase-date">Purchase Date</Label>
            <p>{this.state.activeItem.purchase_date}</p>

            <Label for="item-quantity">Quantity</Label>
            <p>{this.state.activeItem.quantity}</p>

            <Label for="item-unit-of-measure">Unit</Label>
            <p id="item-unit-of-measure">{this.state.activeItem.unit_of_measure}</p>

            <Label for="item-barcode">Barcode</Label>
            <p id="item-barcode">{this.state.activeItem.barcode}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="warning"
              onClick={() => this.setState({ editMode: !this.state.editMode }) }
            >
              Edit
            </Button>
            <Button
              color="success"
              onClick={() => toggle()}
            >
              Ok
            </Button>
          </ModalFooter>
        </Modal>

      );
    }
  }
}