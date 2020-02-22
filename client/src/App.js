import React, {Component} from 'react';
import ApolloClient, {gql} from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import './App.css';

const RESET_VALUES = {name: '', price: '$', category: 'Shirts', image: ''}

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

const getProductsQuery = gql`
{
  getProducts {
    id
    category
    name
    price
    image
  }
}
`

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      formData: null
    }
    this.handleSave = this.handleSave.bind(this)
  }
  componentDidMount() {
    client
    .query({
      query: getProductsQuery
    })
    .then(response => {
      if(!response.loading && response.data) {
        this.setState({
          products: response.data.getProducts || []
        })
      }
    });
  }
  handleSave(product) {
    // product['price'] = product['price'].substring(1)
    // this.setState((prevState) => {
    //   let products = prevState.products
    //   products[Math.floor((Math.random() * 1000000) + 1)] = product
    //   return { products }
    // })
    // window.console.log(JSON.stringify(this.state.products))
  }
  render() {
    return (
      <div>
      <ProductTable products={this.state.products}/>
      <h3> Add a new product to inventory </h3>
      <hr/>
      <ProductForm
        key={JSON.stringify(this.state.formData || {})} formInput={this.state.formData} onSave={this.handleSave}/>
      </div>
    )
  }
}

class ProductRow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <tr>
        <td> {this.props.product.name || ' '} </td>
        <td> ${this.props.product.price || ' '} </td>
        <td> {this.props.product.category || ' '} </td>
        <td> <a href = {this.props.product.image || '#'} target="__blank"> View </a> </td>
      </tr>
    )
  }
}

class ProductTable extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const rows = this.props.products.map(productInfo => {
      return <ProductRow key={productInfo.id} product={productInfo}/>
    })
    return (
      <table>
        <thead>
          <tr>
            <th> Product Name </th>
            <th> Price </th>
            <th> Category </th>
            <th> Image </th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

class ProductForm extends React.Component {
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

  handleSave(e) {
      this.props.onSave(this.state.product);
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

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h1> My Company Inventory </h1>
          <h3> Showing all available products </h3>
          <hr/>
          <ProductList/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
