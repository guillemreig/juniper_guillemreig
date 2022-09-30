const actors = require("./actors");
const request = require("./request");

jest.mock("./request");

test("test average age", () => {
    request.get.mockResolvedValue([
        {age: 21},
        {age: 32},
        {age: 12}
    ])
})
