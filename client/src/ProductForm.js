import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {gql} from 'apollo-boost';

const RESET_VALUES = {name: '', price: '$', category: 'Shirts', image: ''}

const addProductMutation = gql `
mutation addProduct ($id: Int!, $category: Category!, $name: String!, $price: Float!, $image: String!){
  addProduct(
    id: $id
    category: $category
    name: $name
    price: $price
    image: $image
  ) {
    id
    category
    name
    price
    image
  }
}
`

class ProductForm extends Component {
    constructor(props) {
      super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.state = {
            product: this.props.formInput || Object.assign({}, RESET_VALUES),
            errors: {}
      }
    }
  
    handleChange(e) {
      const target = e.target
      const value = target.value
      const name = target.name
      this.setState((prevState) => {
          prevState.product[name] = value
          return { product: prevState.product }
      })
    }
  
    handleSave(e){
        this.props.onSave(this.state.product);
        const {category, name, image} = this.state.product;
        const id = Math.floor((Math.random() * 1000000) + 1);
        const price = parseFloat(this.state.product.price.substring(1));
        this.props.addProduct({
          variables: {
              id,
              category,
              name,
              price,
              image
          }
        })
        // reset the form values to blank after submitting
        this.setState({
            product: Object.assign({}, RESET_VALUES), 
            errors: {}
        })
        // prevent the form submit event from triggering an HTTP Post
        e.preventDefault()
    }
  
    render () {
      return (
          <form>
              <label>Category</label>
              <label>Price Per Unit </label>
              <select name="category" onChange={this.handleChange}>
                <option value="Shirts">Shirts</option>
                <option value="Jeans">Jeans</option>
                <option value="Jackets">Jackets</option>
                <option value="Sweaters">Sweaters</option>
                <option value="Accessories">Accessories</option>
              </select>
              <input type="text" name="price" onChange={this.handleChange} value={this.state.product.price} />
              <label>Product Name </label>
              <label>Image URL </label>
              <input type="text" name="name" onChange={this.handleChange} value={this.state.product.name} />
              <input type="text" name="image" onChange={this.handleChange} value={this.state.product.image} />
              <input type="submit" value="Add Product" onClick={this.handleSave}></input>
          </form>
      )
    }
  }

export default graphql(addProductMutation, {name: 'addProduct'}) (ProductForm)