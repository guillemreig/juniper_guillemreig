module.exports = function fn(data) {
    if (typeof data === "string") {
        return data.split("").reverse().join("");
    } else if (Array.isArray(data)) {
        return data.map((item) => fn(item));
    } else {
        return null;
    }
};
