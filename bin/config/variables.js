const variables = {
    Api: {
        port: process.env.port || 3000 
    },
    Database: {
        connection: process.env.connection || 'mongodb://admin:eCommerce123456@ds157574.mlab.com:57574/ecommerce'
    },
    AuthJson: {
        secret: '232ioh3po4u23h42e23e03023ieh230he23'
    }
}

module.exports = variables