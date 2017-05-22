/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Tobias Koppers @sokra (Modified by Denis Kalinichenko)
 */
const loaderUtils = require("loader-utils");
const path = require("path");

module.exports = function getLocalIdent(loaderContext, localIdentName, localName, options) {
    if (!options.context) {
        options.context = loaderContext.options && typeof loaderContext.options.context === "string" ?
            loaderContext.options.context : loaderContext.context;
    }
    const request = path.relative(options.context, loaderContext.resourcePath);
    options.content = options.hashPrefix + request + "+" + localName;
    var modifier = localName.replace(/_/g, "--");
    modifier = (modifier.charAt(0) !== "-") ? "__" + modifier : modifier;
    localIdentName = localIdentName.replace(/\[local\]/gi, modifier);
    const hash = loaderUtils.interpolateName(loaderContext, localIdentName, options);
    return hash.replace(new RegExp("[^a-zA-Z0-9\\-_\u00A0-\uFFFF]", "g"), "-").replace(/^((-?[0-9])|--)/, "_$1");
};
