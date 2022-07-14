const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

  type Character {
    id : ID!
    name: String
    image : String
    birth: String
    origin : String
    showTitle : String
  }
  # type Show {
  #  id :ID!
  #  title : String
  #  cover : String
  #  episodes : Int
  #  character : [Character]
  #}


  type Query {
    characters: [Character],
    #shows : [Show]
  }
  
  #type Mutation {
  #addBook(title: String, author: String): Book
#}

`;

const characters = [
  {
    id: 'char-0',
    name: 'character name',
    image: 'bf486967894c71cfa6338db68168a578.jpg',
    birth: 'February 10',
    origin: 'Konoha',
    showTitle: 'show name',
  },
];
// const shows = [
//   {
//     id: 'show-0',
//     title: 'show name',
//     cover: '1c1df98707aa0f22aa54342af725e48a1491245343_main.jpg',

//     character :{id : 'char-0'}
//   },
// ];
const resolvers = {
  Query: {
    characters: () => characters,
    // shows: () => shows
  },
  
  // Mutation: {
  //   addBook: (title,author) => {
  //     const newBook = {
  //       title: title, 
  //       author: author, 
  //     };
  //     books.push(newBook);
  //     return newBook;
  //   },
  // }
  //  Mutation: {
  //   // 2
  //   addBook: (parent, args) => {
  


  //      const newBook = {
  //       title: args.title,
  //       author: args.author,
  //     }
  //     books.push(newBook)
  //     return newBook
  //   }
  // },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
