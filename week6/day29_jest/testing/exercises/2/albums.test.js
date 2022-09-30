const { getAlbumNames } = require("./albums");
const spotify = require("./spotify");

jest.mock("./spotify");

test("album names are in alphabetical order", () => {
    spotify.search.mockResolvedValue({ albums: { items: [{ name: "meat" }, { name: "loaf" }] } });

    return getAlbumNames("meat loaf").then((albumNames) => {
        expect(albumNames).toEqual(albumNames.slice().sort());
    });
});
