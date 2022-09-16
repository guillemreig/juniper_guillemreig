function isEven(number) {
    return number % 2 == 0;
}

function isOdd(number) {
    return !isEven(number);
}

const PI = 3.1416;

// Export single elements

// module.exports.isEven = isEven;
// module.exports.PI = 3.1416; // Defined and exported at the same time

// Export multiple elements

module.exports = {
    isEven,
    isOdd,
    PI,
};

/*
module.exports = {
    isOdd: isOdd,
    isEven: isEven,
    PI: PI,
};
*/
