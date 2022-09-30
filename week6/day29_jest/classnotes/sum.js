// npm i jest --save-dev

const sum = (a, b) => {
    if (!isNaN(a) && !isNaN(b)) {
        return a + b;
    }
    throw new Error("Both arguments must be numbers");
};

module.exports = sum;
