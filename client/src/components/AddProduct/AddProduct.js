import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addNewProduct } from "../../store/actions/product";
import { getMyCompany } from "../../store/actions/company";
import FileUpload from '../../utils/FileUpload';

class AddProduct extends Component {
  state = {
    productName: "",
    productQuantity: "",
    productSmallPrice: "",
    productBigPrice: "",
    images: {
      value: []
    }
  };

  componentDidMount() {
    this.props.getMyCompany();
  }

  imagesHandler = (images) => {
    const updatedState = {
      ...this.state
    }
    updatedState.images.value = images;
    this.setState({ images: updatedState.images })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createProduct = (e, cid) => {
    e.preventDefault();

    const data = { ...this.state };
    this.props.addNewProduct(cid, data, this.props.history);
  };

  render() {
    const companyId = this.props.match.params.cid;
    const { productError } = this.props.product;

     return (
      <div>
        <Link to="/home"> Go to the Home Page </Link>
        <form
          className="signUp"
          onSubmit={e => this.createProduct(e, companyId)}
          autoComplete="off"
        >
          <div className="signUpContainer">
            <div className="createAccount">
              <h1>Create a product for your company</h1>
            </div>
            <div className="formContainer">
              <div className="input">
                <input
                  value={this.state.productName}
                  onChange={this.onChange}
                  name="productName"
                  placeholder="Name of the Product"
                  type="text"
                />
                <i className="fas fa-user icon"></i>
                {productError ? (
                  <div className="error">
                    {productError.productName ? (
                      <span>{productError.productName}</span>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="input">
                <input
                  value={this.state.productQuantity}
                  onChange={this.onChange}
                  name="productQuantity"
                  placeholder="Quantity (kg)"
                  type="number"
                />
                <i className="fas fa-user icon"></i>
                {productError ? (
                  <div className="error">
                    {productError.productQuantity ? (
                      <span>{productError.productQuantity}</span>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="input">
                <input
                  value={this.state.productSmallPrice}
                  onChange={this.onChange}
                  name="productSmallPrice"
                  placeholder="Price ($), Starting from"
                  type="number"
                />
                <i className="fas fa-user icon"></i>
                {productError ? (
                  <div className="error">
                    {productError.productSmallPrice ? (
                      <span>{productError.productSmallPrice}</span>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="input">
                <input
                  value={this.state.productBigPrice}
                  onChange={this.onChange}
                  name="productBigPrice"
                  placeholder="Price ($), Ending to"
                  type="number"
                />
                <i className="fas fa-user icon"></i>
                {productError ? (
                  <div className="error">
                    {productError.productBigPrice ? (
                      <span>{productError.productBigPrice}</span>
                    ) : null}
                  </div>
                ) : null} 
              </div>
              <FileUpload
            imagesHandler={images => this.imagesHandler(images)}
            />
            </div>
            <button className="signUpBtn">CREATE PRODUCT</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product,
  user: state.user
});

export default connect(mapStateToProps, { addNewProduct, getMyCompany })(
  AddProduct
);
