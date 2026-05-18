import { usersresolvers } from "./resolvers/users.resolvers.js";
import { typeDefs } from "./typeDefs/typeDefs.js";
import { prestadorresolvers } from "./resolvers/prestador.resolvers.js";


export const resolvers = {
   Query:{
    ...usersresolvers.Query,
    ...prestadorresolvers.Query,
   },
   Mutation:{
    ...usersresolvers.Mutation,
   }
}
export {typeDefs}