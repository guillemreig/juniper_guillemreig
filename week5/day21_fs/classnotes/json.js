const weather = {
    hot: true,
    sunny: false,
    wind: 3,
};

// you can pass in a 3rd argument for **spaces**.
// the generated JSON will be indented with that amount of spaces.
const json = JSON.stringify(weather, null, 4);
console.log(json);
