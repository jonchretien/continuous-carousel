# Code Style

## Control Flow

Prefer early returns / guard clauses over nested conditionals. Eliminate `else` blocks via early returns.

```js
// Bad
function process(items) {
  if (items.length > 0) {
    if (items[0].isValid) {
      doWork(items);
    } else {
      handleInvalid(items[0]);
    }
  }
}

// Good
function process(items) {
  if (items.length === 0) return;
  if (!items[0].isValid) {
    handleInvalid(items[0]);
    return;
  }
  doWork(items);
}
```

## Function Extraction

Break complex multi-branch functions into small single-responsibility helpers.
