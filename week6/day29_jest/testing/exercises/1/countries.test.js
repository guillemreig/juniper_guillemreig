const countries = require("./countries");

test("When find is passed an empty string, it returns an empty array", () => {
    const received = countries.find("");
    expect(received).toEqual([]);
});

test("The array that it returns contains no more than four matches", () => {
    const received = countries.find("B");
    expect(received.length <= 4);
});

test("The search is case insensitive", () => {
    const received1 = countries.find("r");
    const received2 = countries.find("R");
    expect(received1).toEqual(received2);
});

test("If there are no matching countries, an empty array is returned", () => {
    const received = countries.find("W");
    expect(received).toEqual([]);
});
