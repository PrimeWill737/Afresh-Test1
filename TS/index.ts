// JS & TS number limit, bringing the birth of BigInt
// const maxInt = Number.MAX_SAFE_INTEGER;
// console.log(maxInt);

// let bigint = BigInt(20);
// console.log(bigint);


// Define the User type alias
type User = {
    readonly id: number; // read-only
    name: string;
    age?: number; // optional
    contact: {
        email: string;
        phone?: string; // optional
    };
    preferences: {
        theme: "light" | "dark";
        language: "English" | "Spanish";
        [key: string]: any; // index signature
    };
};

// Initialize the user object
const user: User = {
    id: 1,
    name: "John Doe",
    // age is optional, so we skip initializing it
    contact: {
        email: "john@example.com",
        // phone is optional, so we skip it too
    },
    preferences: {
        theme: "dark",
        language: "English",
        additionalInfo: "This is an example of an index signature property",
    },
};

console.log(user.preferences.additionalInfo);




