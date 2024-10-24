require('./string_formatter'); // Ensure the prototype method is loaded

describe("String.prototype.sprintf", () => {
    test("substitute formatting sign in a string with value in the function", () => {
        expect("Hello%dWorld".sprintf(4)).toBe("Hello4World");
        expect("Hello%fWorld".sprintf(4)).toBe("Hello4.0World");
        expect("%cello%corld".sprintf("Hel", "W")).toBe("HelloWorld");
        expect("%sWorld".sprintf("Hello")).toBe("HelloWorld");
        expect("%bWorld".sprintf(true)).toBe("trueWorld");
    });

    test("for float format the amount of signs after comma must be adjusted.", () => {
        expect("Hello%3fWorld".sprintf(20)).toBe("Hello20.000World");
    });

    test("check boolean values", () => {
        expect("It is %b!".sprintf(1===1)).toBe("It is true!");
        expect("It is %b!".sprintf(1)).toBe("It is true!");
        expect("It is %b!".sprintf(0)).toBe("It is false!");
        expect("It is %b!".sprintf(false)).toBe("It is false!");

    });

    test("must put value in the right order.", () => {
        expect("%d something %c another one %d something else".sprintf(20, "A", 14)).toBe("20 something A another one 14 something else");
    });

    test("A number may be inserted between % and the letter code (except % and f) to indicate the number of times that particular argument should be displayed.", () => {
        expect("%5d%2d%d".sprintf(1,0,1)).toBe("11111001");
    });

    test("If codes and arguments don't match, throw an error.", () => {
        expect(() => "%d,%d,%s,%s".sprintf(1,2,3,"GO!")).toThrow("No available match for this value");
    });

    test("Strings arguments may only be used for %s & %c, while number arguments may only be used for %d and %(n)f. 0, 1, true or false may only be used for %b", () => {
        expect(() => "Hello%dWorld".sprintf("H")).toThrow("No available match for this value");
        expect(() => "Hello%dWo%brld".sprintf(4, 'J')).toThrow("No available match for this value");
    });

    test("% signs that appear but that are not part of a proper format code should be displayed as they appear", () => {
        expect("%HelloWorld%d%f".sprintf(1, 2.0)).toBe("%HelloWorld12.0");
    });

    test("If there are more codes than arguments or arguments than codes, throw an exception", () => {
        expect(() => "HelloWorld%c%d".sprintf('P')).toThrow("Arguments quantity doesn't match formatting");
        expect(() => "HelloWorld%d".sprintf(1,2,3)).toThrow("Arguments quantity doesn't match formatting");
    });
});
