module.exports = function handleError(err, res) {
    if (err.statusCode) {
        return res.status(err.statusCode).send(err.message);
    } else {
        console.error(err.stack);
        return res.status(500).send("Internal server error");
    }
}