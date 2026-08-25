# JavaScript Variables & Data Types – Written Test

**Name:** _______________________________  **Date:** _______________  **Class:** _______________

**Instructions**
- This test has **30 questions**.
- You may only use the knowledge of **variables** and these data types:  
  `String`, `Number`, `BigInt`, `Boolean`, `Object`, `Array`  
  (including nested combinations such as array of objects and array of arrays).
- **No** loops, `if`/`else`, functions, or other JavaScript features.
- Write all answers clearly on paper.
- For coding questions, write the complete code. You will later run your solutions with **Node.js** (`node filename.js`) to verify.
- Time allowed: 60–75 minutes.

---

## Part A – Multiple Choice (Questions 1–8)
Circle the **one** correct answer.

**1.** Which of the following correctly declares a string variable that stores the name `"Ola"`?

- A) `let name = Ola;`
- B) `let name = "Ola";`
- C) `let name = 'Ola;`
- D) `let name = Ola";`

**2.** What is the data type of the value `42n`?

- A) Number
- B) String
- C) BigInt
- D) Boolean

**3.** What does `typeof true` return?

- A) `"boolean"`
- B) `"Boolean"`
- C) `"true"`
- D) `"number"`

**4.** Which declaration creates a valid BigInt?

- A) `let big = 9007199254740991;`
- B) `let big = 9007199254740991n;`
- C) `let big = BigInt("9007199254740991n");`
- D) `let big = 9007199254740991N;`

**5.** What is the result of `typeof [1, 2, 3]`?

- A) `"array"`
- B) `"object"`
- C) `"list"`
- D) `"number"`

**6.** Which of the following is a correct object literal?

- A) `let person = { name: "Ola", age: 25 };`
- B) `let person = [ name: "Ola", age: 25 ];`
- C) `let person = ( name: "Ola", age: 25 );`
- D) `let person = "name: Ola, age: 25";`

**7.** How do you correctly access the second element of the array `let fruits = ["apple", "banana", "cherry"];`?

- A) `fruits[2]`
- B) `fruits[1]`
- C) `fruits.2`
- D) `fruits{1}`

**8.** Which statement correctly creates an **array of objects**?

- A) `let users = [ {name: "Ola"}, {name: "Kari"} ];`
- B) `let users = { {name: "Ola"}, {name: "Kari"} };`
- C) `let users = [ name: "Ola", name: "Kari" ];`
- D) `let users = ( {name: "Ola"}, {name: "Kari"} );`

---

## Part B – Predict the Output (Questions 9–14)
Write exactly what will be printed to the console.  
If there is an error, write **Error**.

**9.**
```js
let greeting = "Hello";
console.log(greeting);
```

**Output:** _______________________________

**10.**
```js
let a = 10;
let b = 3;
console.log(a + b);
console.log(a * b);
```

**Output:**  
_______________________________  
_______________________________

**11.**
```js
let x = 5;
let y = "5";
console.log(x + y);
console.log(x - y);
```

**Output:**  
_______________________________  
_______________________________

**12.**
```js
let isStudent = true;
let isTeacher = false;
console.log(typeof isStudent);
console.log(isTeacher);
```

**Output:**  
_______________________________  
_______________________________

**13.**
```js
let person = {
  name: "Ola",
  age: 17
};
console.log(person.name);
console.log(person.age);
```

**Output:**  
_______________________________  
_______________________________

**14.**
```js
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
console.log(matrix[1][2]);
console.log(matrix[0][0]);
```

**Output:**  
_______________________________  
_______________________________

---

## Part C – Find the Error (Questions 15–19)
Each snippet contains **one** error.  
Circle or underline the error and briefly explain what is wrong.

**15.**
```js
let message = Hello World;
console.log(message);
```

**Error:** _______________________________________________________________

**16.**
```js
let bigNumber = 12345678901234567890;
console.log(typeof bigNumber);
```
*(Hint: the number is larger than the safe integer limit)*

**Error:** _______________________________________________________________

**17.**
```js
let user = {
  name: "Ola"
  age: 25
};
console.log(user.name);
```

**Error:** _______________________________________________________________

**18.**
```js
let colors = ["red", "green", "blue";
console.log(colors[1]);
```

**Error:** _______________________________________________________________

**19.**
```js
let scores = [10, 20, 30];
console.log(scores[3]);
```

**Error / Unexpected result:** _______________________________________________________________

---

## Part D – Fill in the Missing Code (Questions 20–24)
Complete the code so that it works as described.

**20.** Declare a variable `city` that stores the string `"Oslo"` and then print it.
```js
________________ city = "Oslo";
console.log(city);
```

**21.** Create a BigInt that holds the value `100` and print its type.
```js
let big = ________;
console.log(typeof big);
```

**22.** Create an object `car` with the properties `brand: "Volvo"` and `year: 2020`. Then print the brand.
```js
let car = {
  ________________
  ________________
};
console.log(car.brand);
```

**23.** Create an array of three numbers: 7, 14 and 21. Print the last number.
```js
let numbers = [____, ____, ____];
console.log(numbers[__]);
```

**24.** Create an array that contains two objects. The first object has `name: "Ola"`, the second has `name: "Kari"`. Print the name of the second object.
```js
let people = [
  { name: "Ola" },
  { ____________ }
];
console.log(people[1].________);
```

---

## Part E – Write the Code (Questions 25–30)
Write complete, working JavaScript code for each task.  
Use `let` (or `const`) and `console.log`.

**25.** Declare a variable that stores the string `"Ola"` and print it to the console.

```js
// Write your code here


```

**26.** Declare two number variables `x = 8` and `y = 4`.  
Print their sum and their product (two separate console.log statements).

```js
// Write your code here


```

**27.** Create a boolean variable `isOnline` with the value `true`.  
Print both the value and its type (`typeof`).

```js
// Write your code here


```

**28.** Create an object called `book` with the properties:
- `title`: `"JavaScript Basics"`
- `pages`: `120`  
Print the title of the book.

```js
// Write your code here


```

**29.** Create an array called `temps` that contains the numbers `18`, `21` and `19`.  
Print the second temperature (index 1).

```js
// Write your code here


```

**30.** Create an **array of objects**. The array should contain two objects representing students:
- First student: `name: "Ola"`, `age: 16`
- Second student: `name: "Kari"`, `age: 17`  

Print the name of the first student and the age of the second student (two console.log statements).

```js
// Write your code here


```

---

## End of Test
Check that you have answered all 30 questions.  
Good luck!

---

