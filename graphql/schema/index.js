const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User{
    _id: ID!
    email: String!
    password: String
    createdProducts: [Product!]
  }    
  type Product{
    _id: ID!
    sku: String!
    name: String!
    quantity: Int!
    imageUrl: String!
    costPrice: String!
    lastUpdated: String!
    creator: User!
  }
  type Project {
    _id: ID! 
    name: String! 
    repoUrl: String!
    deployedUrl: String! 
    images: [String!]!
  }
  type AuthData {
    userId:ID! 
    token: String! 
    tokenExpiration: Int! 
  }

  input UserInput {
    email: String!
    password: String!
  } 
  input NewProductInput {
    sku: String!
    name: String!
    quantity: Int
    imageUrl: String!
    costPrice: String!
  }
  input DeleteProductInput {
    productId: String!
  }
  input SetProductInput {
    _id: String!
    sku: String
    name: String
    quantity: Int
    imageUrl: String
    costPrice: String
  }

  type RootQuery {
      products: [Product!]
      login(email:String!,password:String!): AuthData!
  }
  type RootMutation {
      createProduct(data: NewProductInput): Product 
      deleteProduct(data: DeleteProductInput): String
      setProduct(data: SetProductInput): Product
      createUser(data: UserInput): User 
  }
  schema {
      query:RootQuery
      mutation:RootMutation
  }
`);
