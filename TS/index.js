"use strict";
// JS & TS number limit, bringing the birth of BigInt
// const maxInt = Number.MAX_SAFE_INTEGER;
// console.log(maxInt);
Object.defineProperty(exports, "__esModule", { value: true });
// Initialize the user object
const user = {
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
//# sourceMappingURL=index.js.map