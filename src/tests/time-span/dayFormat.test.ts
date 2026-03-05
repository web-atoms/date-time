import assert from "node:assert";
import TimeSpan from "../../TimeSpan";

export default function() {
    const ts = TimeSpan.parse("1:1:20:0");
    assert.strictEqual(1, ts.days);
    assert.strictEqual(1, ts.hours);
    assert.strictEqual(20, ts.minutes);
}