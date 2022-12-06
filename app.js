const {knex} = require('./connection')
const {ApolloServer, gql} = require('apollo-server')


async function getTasks() {
    let tasks = await knex.select().table('tasks')
    return tasks
}

async function getTask(id) {
    let task = await knex.select().table('tasks').where('id', id)
    return task
}

async function addTask(task) {
    try{
        let result = await knex('tasks').insert(task)
        return result.toString()
    }catch(err){
        return err.toString();
    }
}

async function updateTask(id, task) {
    let result = await knex('tasks').where('id', id).update(task)
    return result.toString()
}

async function deleteTask(id) {
    let result = await knex('tasks').where('id', id).del()
    return result.toString()
}

// module.exports = { getTasks, getTask, addTask, updateTask, deleteTask }

const typeDefs = gql`
    type Task {
        id: ID!
        name: String!
        description: String!
    }
    type Error{
        message: String!
    }
    type Query {
        tasks: [Task],
        task(id: ID!): [Task!],
        
    }
    type Mutation {
        updateTask(id: ID!, name: String!, description: String!): String!,
        deleteTask(id: ID!): String!,
        createTask(name: String!, description: String!): String!
    }
`;

const resolvers = {
    Query: {
        tasks: async () => await getTasks(),
        task: async (parent, args) => await getTask(args.id),

    },
    Mutation: {
        updateTask: async (parent, args) => await updateTask(args.id, args),
        deleteTask: async (parent, args) => await deleteTask(args.id),
        createTask: async (parent, args) => await addTask(args),
    }
}


const server = new ApolloServer({
    typeDefs, resolvers, csrfPrevention: true,
})
server
    .listen()
    .then(({url}) => console.log(`Server started at ${url}`))


//
// (async () => {
//     let tasks = await getTasks()
//     console.log(tasks)
// })();