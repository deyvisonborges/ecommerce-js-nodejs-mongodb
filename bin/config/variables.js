const variables = {
    Api: {
        port: process.env.port || 3000 
    },
    Database: {
        connection: process.env.connection || "mongodb://localhost:27017/"
    },
    AuthJson: {
        secret: '232ioh3po4u23h42e23e03023ieh230he23'
    }
}

module.exports = variables