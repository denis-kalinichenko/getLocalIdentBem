# getLocalIdentBem
It makes BEM-like class names using a CSS Modules

### Webpack
```javascript
const getLocalIdentBem = require("getlocalidentbem");

module.exports = {
    module: {
        rules: [
            {
                test: /\.css?$/,
                loader: "css-loader",
                options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: "[name][local]",
                    getLocalIdent: getLocalIdentBem,
                },
            },
        ],
    },
};
```

### CSS
Underscore `_` says that this is a modifier. Example:

```css
/* Header.css */
.common {}
._hidden { composes: common; }
._sticky { composes: common; }

.button {}
.button_disabled { composes: button; }
.button_active { composes: button; }
```

#### Output
```css
.Header--hidden {}
.Header--sticky {}

.Header__button {}
.Header__button--disabled {}
.Header__button--active {}
```

####  JSX
```jsx harmony
import header from "Header.css";

export default function() {
    return (
        <div className={header._sticky}>
            <button className={header.button_active}>Button</button>
        </div>
    );
}
```

## Author

Tobias Koppers @sokra. Modified in 2017 by Denis Kalinichenko @denis-kalinichenko