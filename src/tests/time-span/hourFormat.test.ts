import assert from "assert";
import TimeSpan from "../../TimeSpan.js";

export default function() {
    const ts = TimeSpan.parse("1:20");
    assert.strictEqual(1, ts.hours);
    assert.strictEqual(20, ts.minutes);

    assert.strictEqual("01:20 AM", ts.toString(true));
    assert.strictEqual("01:20", ts.toString());
}