"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static getLink(body) {
        let patt = /href\=\"(.+)\"\>Click\shere/gi, match = patt.exec(body);
        // pretty null check.
        // but no error is thrown
        //return match![1];
        if (!match)
            throw new Error("Couldn't find link");
        return match[1];
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map