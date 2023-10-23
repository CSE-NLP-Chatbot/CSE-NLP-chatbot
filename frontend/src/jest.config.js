// jest.config.js
{
  /* 
- Ignore this warning "File is a CommonJS module; it may be converted to an ES module."
- Typically occurs when you're using the ES6 import and export syntax in a JavaScript file that Node.js
 identifies as a CommonJS module. Node.js can handle both CommonJS and ES6 modules.
- module.exports is the correct way to configure Jest for CommonJS modules.
  */
}

module.exports = {
  // ... other Jest config options ...
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
  moduleFileExtensions: ["js", "jsx", "json", "node"],
};
