import { CatsService } from '../services/cats.service.js';
import { DogsService } from '../services/dogs.service.js';

const catsService = new CatsService();
const dogsService = new DogsService();

// const books = [
//   {
//     title: "The Awakening",
//     author: "Kate Chopin",
//   },
//   {
//     title: "City of Glass",
//     author: "Paul Auster",
//   },
// ];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export default {
  Query: {
    // books: () => books,
    cat(id) {
      return catsService.getCat(id);
    },
    cats() {
      return catsService.getCats(6);
    },
    dog(id) {
      return dogsService.getDog(id);
    },
    dogs() {
      return dogsService.getDogs(6);
    },
    pets() {
      const dogs = dogsService.getDogs(4);
      const cats = catsService.getCats(4);
      return [...cats, ...dogs];
    },
    somebody() {
      return {
        name: 'Somebody',
        pets: [catsService.getCat('1'), dogsService.getDog('2')],
        friends: [
          {
            name: 'Somebody Else',
            pets: [catsService.getCat('3'), dogsService.getDog('4')],
          },
        ],
      };
    }
  },
  Pet: {
    __resolveType(obj, context, info){
      if(obj.mice){
        return 'Cat';
      }
      if(obj.bones){
        return 'Dog';
      }
      return null; // GraphQLError is thrown
    },
  },
  Somebody: {
    favoritePet(parent, args, context, info) {
      // console.log(parent, args, context, info);

      // TODO: copy the pet and create a new name for the pet based on the friend and his pet
      const { name, pets } = parent.friends.at(0);
      const favoritePet = pets.at(0);

      return {
        name: `${name}'s pet ${favoritePet.name}`
      };
    }
  }
};
