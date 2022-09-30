const sum = require("./sum");

test("add 1 + 2 equals 3", () => {
    expect(sum(1, 2)).tobe(3);
});

test("try to add non-number values", () => {
    expect(() => {
        sum("foo", 1);
    }).toThrowError("Both arguments must be numbers");
});
