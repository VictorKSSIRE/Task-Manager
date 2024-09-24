// Variables

//var life = 100; // Life bar

//life = life - 10;

var name = "Victor"; // This is the name displayed


var checkout = false; 

var box; // Undefined variable type

//Object, Synbol


// New way

const lives = 100; // constant

let life = 100;

life = life - 50

console.log(life) ;
// Functions

function toUpper(text) {
    const upperCased = text.toUpperCase();
    console.log(upperCased);
}

toUpper(name);

const toUpper2 = (text) => {
    const upperCased = text.toUpperCase();
    console.log(upperCased);
}

toUpper2(name);

// String concat

console.log(`I am ${name}, your creator.`)

// If statements

// Arrays

const nums = [0, 1, 2, 3, 4]

nums.push(5)
console.log(nums)

nums.pop()
console.log(nums)

console.log(nums.indexOf(1))

console.log(nums[4])
