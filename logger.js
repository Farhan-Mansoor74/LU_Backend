const logger = (req, res, next) => {
    const currentTime = new Date().toISOString(); // Get the current date and time
    console.log(`${currentTime} - ${req.method} Request to ${req.url}`);
    next(); // Move to the next middleware or route handler
};

export default logger;