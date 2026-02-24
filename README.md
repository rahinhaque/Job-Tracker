# Job Application Tracker

A simple and interactive Job Application Tracker built with HTML, Tailwind CSS, DaisyUI, and vanilla JavaScript. It allows users to track job applications, mark them as interviewed or rejected, filter by status, and delete entries.

---

## Questions & Answers:-

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

- **`getElementById`** — Selects a single element by its `id`. Returns one element because IDs are unique.
- **`getElementsByClassName`** — Selects all elements that share the same class name. Returns a live HTMLCollection (it updates automatically if the DOM changes).
- **`querySelector`** — Selects the **first** element that matches a CSS selector (like `#id`, `.class`, `div > p`). Returns a single element.
- **`querySelectorAll`** — Selects **all** elements that match a CSS selector. Returns a static NodeList (it does NOT update automatically).

The main difference is that `getElementById` and `getElementsByClassName` only work with IDs and class names, while `querySelector` / `querySelectorAll` can use any CSS selector which makes them more flexible.

---

### 2. How do you create and insert a new element into the DOM?

You can create a new element using `document.createElement()` and then insert it into the page using methods like `appendChild()` or `append()`.

```js
let newDiv = document.createElement("div");
newDiv.innerText = "Hello World!";
document.body.appendChild(newDiv);
```

- `createElement("div")` — creates a new `<div>` element in memory.
- `innerText` — sets the text content inside the element.
- `appendChild()` — adds the new element as the last child of a parent element.

---

### 3. What is Event Bubbling? And how does it work?

Event Bubbling means when an event happens on an element, it first runs on that element, then moves **upward** to its parent, then to the parent's parent, and so on — all the way up to the `document`.

For example, if you click a `<button>` inside a `<div>`, the click event fires on the button first, then "bubbles up" to the div, then to the body, and so on.


---

### 4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation is a pattern where you attach **one** event listener to a **parent** element instead of adding separate listeners to each child element.

It works because of Event Bubbling — when a child is clicked, the event bubbles up to the parent where the listener catches it. You can then check `event.target` to know exactly which child was clicked.



---

### 5. What is the difference between `preventDefault()` and `stopPropagation()` methods?

- **`preventDefault()`** — Stops the browser's **default action** for that event. For example, clicking a link normally navigates to a URL. Using `preventDefault()` will stop that navigation. The event still bubbles up normally.

- **`stopPropagation()`** — Stops the event from **bubbling up** to parent elements. The default browser action still happens, but parent elements won't know the event occurred.


