# assignment3
CS-648 Full Stack - Assignment 3


Run the following commands to start the server.
* cd server/
* Run **npm run start** to open a graphql server at port 4000. Open the url http://localhost:4000/graphql in your favuorite browser to open sever playground to send queries and mutations.

Following is the query to get the list of products.

```
{
  getProducts {
    id
    category
    name
    price
    image
  }
}
```

Following is the example mutation to add a new product.

```
mutation {
  addProduct(
    id: 20
    category: Shirts
    name: "T-Shirt"
    price: 5.33
    image: "https://instagram.com/"
  ) {
    id
    category
    name
    price
    image
  }
}
```

Run the following commands to create a client instance.

* cd client/
* Run **npm run start** to open a graphql client at port 3000.
* Open the url http://localhost:3000/ in your favuorite browser.