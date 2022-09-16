// Part 1
// Write a function that takes an array as an argument and returns a new array containing
// all of the items that are in the array that was passed in but in reverse order.

const arr1 = [1, 2, 3];

function reverseArray(arr) {
    const arr2 = [...arr]; // You can use ... to insert all of the items in an array into another array you are creating.
    return arr2.reverse(); // Reverse method returns reverses the contents of an array
}

arr2 = reverseArray(arr1);

console.log(arr1);
console.log(arr2);

// Part 2
// Write a function that takes two arrays as arguments and returns a new array containing
// all of the items in the two arrays passed to it.

const arr3 = [1, 2, 3];
const arr4 = [4, 5, 6];

function joinArrays(arrA, arrB) {
    // Method 1
    return arrA.concat(arrB); // The concat() method joins two or more arrays and returns a new array. Does not change the existing arrays.
    // Method 2
    //const joinArr = [...arrA, ...arrB];
    //return joinArr;
}

const arr5 = joinArrays(arr3, arr4);

console.log(arr3);
console.log(arr4);
console.log(arr5);

// Part 3
// Rewrite the following function to use destructuring assignment for the three variables it creates:

function logInfo(city) {
    const { name, country, population: numPeople } = city;
    /*
    const name = city.name;
    const country = city.country;
    const numPeople = city.population;
    */
    console.log(`${name} is in ${country} and has ${numPeople} inhabitants in it.`);
}

logInfo({ name: "Marseille", country: "France", population: 861635 });

// Part 4
// Pretend that it is 2002 and rewrite the following hipster Javascript so it will work in Internet Explorer 5 and Netscape 4.

//let getNameAndCountry = ({ name, country }) => [name, country];

let getRelocatedCity = (city1, city2 = { country: "Germany" }) => {
    console.log("Test :", city2);
    let [, country] = getNameAndCountry(city2);
    return {
        ...city1,
        country,
    };
};

////////
function getNameAndCountry(object) {
    return [object.name, object.country];
} // Takes an object as an argument and returns an array with its 'name' and 'country' property values

const cityA = {
    name: "Barcelona",
    country: "Spain",
};

console.log(getNameAndCountry(cityA)); // [ 'Barcelona', 'Spain' ]

/////////

let cityB;
/*
const cityB = {
    name: "Paris",
    country: "France",
};
*/
/*
function getRelocatedCity(city1, city2) {
    // 1st. redefines city2 as { country: "Germany" } regardless of its original content/value
    city2 = { country: "Germany" };

    let country = getNameAndCountry(city2)[1]; // 2nd. Assigns "Germany" to 'country' variable. The return was [ undefined, 'Germany' ].

    return {
        name: city1.name,
        country: country,
    }; // 3rd. Returns an object with city1 properties, but replaces its 'country' property value for "Germany"
}
*/
console.log("Checkpoint", getRelocatedCity(cityA, cityB)); // { name: "Barcelona", country: "Germany" }

console.log("cityA :", cityA);
console.log("cityB :", cityB);
// console.log("city2 :", city2);
