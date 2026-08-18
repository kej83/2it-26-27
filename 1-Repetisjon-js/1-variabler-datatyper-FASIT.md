# Teacher Answer Key
*(Do not distribute to students)*

### Part A – Multiple Choice
1. B  
2. C  
3. A  
4. B  
5. B  
6. A  
7. B  
8. A  

### Part B – Predict the Output
9. `Hello`  
10. `13`  
   `30`  
11. `55`  
   `0`  
12. `boolean`  
   `false`  
13. `Ola`  
   `17`  
14. `6`  
   `1`  

### Part C – Find the Error
15. Missing quotes around the string → should be `"Hello World"` or `'Hello World'`.  
16. The number is too large for the Number type (loses precision). Should use BigInt: `12345678901234567890n`.  
17. Missing comma between properties.  
18. Missing closing square bracket `]` before the semicolon.  
19. `scores[3]` is out of bounds → returns `undefined` (arrays are 0-indexed, last index is 2).  

### Part D – Fill in the Missing Code
20. `let` (or `const` / `var`)  
21. `100n`  
22. `brand: "Volvo",`  
   `year: 2020`  
   *(order of properties does not matter)*  
23. `7, 14, 21`  
   `2`  
24. `name: "Kari"`  
   `name`  

### Part E – Write the Code (example solutions)

**25.**
```js
let name = "Ola";
console.log(name);
```

**26.**
```js
let x = 8;
let y = 4;
console.log(x + y);
console.log(x * y);
```

**27.**
```js
let isOnline = true;
console.log(isOnline);
console.log(typeof isOnline);
```

**28.**
```js
let book = {
  title: "JavaScript Basics",
  pages: 120
};
console.log(book.title);
```

**29.**
```js
let temps = [18, 21, 19];
console.log(temps[1]);
```

**30.**
```js
let students = [
  { name: "Ola", age: 16 },
  { name: "Kari", age: 17 }
];
console.log(students[0].name);
console.log(students[1].age);
```

---
