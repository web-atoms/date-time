import assert from "node:assert";
import TimeSpan from "../../TimeSpan.js";

export default function() {
    const ts = TimeSpan.parse("1:20 PM");
    assert.strictEqual(13, ts.hours);
    assert.strictEqual(20, ts.minutes);

    assert.strictEqual("01:20 PM", ts.toString(true));
    assert.strictEqual("13:20", ts.toString());    
}