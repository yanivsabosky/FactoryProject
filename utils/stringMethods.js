// stringUtils.js

// Normalize a string by trimming whitespace and converting to lowercase.
function normalize(str) {
  return str.trim().toLowerCase();
}

//  Convert a string to title case (first letter uppercase, rest lowercase).
function toTitleCase(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Flexibly compare two strings for equality.
function equalsFlexible(a, b) {
  const solutionA = normalize(a);
  const solutionB = normalize(b);
  return (
    solutionA === solutionB || 
    toTitleCase(solutionA) === toTitleCase(solutionB)
  );
}


// Exports
  module.exports = {
    normalize,
    toTitleCase,
    equalsFlexible
  };
