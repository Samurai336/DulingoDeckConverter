// express middleware for setting up our clients. 
/**
 * 
 * @param {*} app express app object 
 * @param {*} config object from our config.json file containing configuration settings for the service. 
 */
module.exports = ({ app, config:{selfUrl,port,clients} }) => {
    // set up a self url for self links ease
    // it probably should not include the port in a production version 
    app.selfUrl = `http://${selfUrl}:${port}`; 
    
    // add clients for external resources here. 
    app.use((req, res, next) => { 
        return next();
    }); 
}