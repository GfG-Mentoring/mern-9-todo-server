const { Router } = require('express');

const userRouter = Router();



// Define a route to handle GET requests to the root path
userRouter.get('/', (req, res) => {
    // Send a simple response
    res.send('Hello, this is the user route!');
});

// Define a route to handle GET requests to the /profile path
userRouter.post('/', (req, res) => {
    // Send a simple response
    res.send('Hello, this is the user profile route!');
});


userRouter.get('/:id', (req, res) => {
    // Extract the user ID from the request parameters
    const userId = req.params.id;

    // Send a response with the user ID
    res.send(`User ID: ${userId}`);
});


module.exports = userRouter;


