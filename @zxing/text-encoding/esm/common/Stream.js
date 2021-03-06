import { end_of_stream } from "../encoding/terminology";
/**
 * A stream represents an ordered sequence of tokens.
 */
var Stream = /** @class */ (function () {
    /**
     *
     * @constructor
     * @param {!(Array.<number>|Uint8Array)} tokens Array of tokens that provide
     * the stream.
     */
    function Stream(tokens) {
        /** @type {!Array.<number>} */
        this.tokens = Array.from(tokens);
        // Reversed as push/pop is more efficient than shift/unshift.
        this.tokens.reverse();
    }
    /**
     * @return {boolean} True if end-of-stream has been hit.
     */
    Stream.prototype.endOfStream = function () {
        return !this.tokens.length;
    };
    /**
     * When a token is read from a stream, the first token in the
     * stream must be returned and subsequently removed, and
     * end-of-stream must be returned otherwise.
     *
     * @return {number} Get the next token from the stream, or
     * end_of_stream.
     */
    Stream.prototype.read = function () {
        if (!this.tokens.length)
            return end_of_stream;
        return this.tokens.pop();
    };
    /**
     * When one or more tokens are prepended to a stream, those tokens
     * must be inserted, in given order, before the first token in the
     * stream.
     *
     * @param {(number|!Array.<number>)} token The token(s) to prepend to the
     * stream.
     */
    Stream.prototype.prepend = function (token) {
        if (Array.isArray(token)) {
            var tokens = (token);
            while (tokens.length)
                this.tokens.push(tokens.pop());
        }
        else {
            this.tokens.push(token);
        }
    };
    /**
     * When one or more tokens are pushed to a stream, those tokens
     * must be inserted, in given order, after the last token in the
     * stream.
     *
     * @param {(number|!Array.<number>)} token The tokens(s) to push to the
     * stream.
     */
    Stream.prototype.push = function (token) {
        if (Array.isArray(token)) {
            var tokens = (token);
            while (tokens.length)
                this.tokens.unshift(tokens.shift());
        }
        else {
            this.tokens.unshift(token);
        }
    };
    return Stream;
}());
export { Stream };
//# sourceMappingURL=Stream.js.map