String.prototype.sprintf = function (...params) {

    var current_string = this;

    const matchException = "No available match for this value";

    var codes = current_string.match(/%b|%[\d*dfsc]/g);

    if (params.length !== codes.length) {
        throw "Arguments quantity doesn't match formatting";
    }

    for (let param of params) {
        let match;

        if ((match = current_string.match(/%b/)) && (typeof param === "boolean" || [0, 1].includes(param))) {
            param = Boolean(param).toString();
            current_string = current_string.replace(match[0], param);

            continue;
        }

        if ((match = current_string.match(/%\d*d/)) && typeof param === "number") {
            param = getRepeats(param, match[0]);
            current_string = current_string.replace(match[0], param);

            continue;
        }

        if ((match = current_string.match(/%\d*f/)) && typeof param === "number") {
            let precision = match[0].match(/\d+/);

            precision = precision ? Number(precision[0]) : 1;
            param = parseFloat(String(param)).toFixed(precision);
            current_string = current_string.replace(match[0], param);

            continue;
        }

        if ((match = current_string.match(/%\d*c/)) && typeof param === "string") {
            param = param.charAt(0);
            param = getRepeats(param, match[0]);
            current_string = current_string.replace(match[0], param);

            continue;
        }

        if ((match = current_string.match(/%\d*s/)) && typeof param === "string") {
            param = getRepeats(param, match[0]);
            current_string = current_string.replace(match[0], param);

            continue;
        }

        throw matchException;
    }

    function getRepeats(value, match) {
        const repeats = match.match(/\d+/);

        return String(value).repeat(repeats ? Number(repeats[0]) : 1);
    }

    return current_string;
}