import assert from "node:assert";
import DateTime from "../../DateTime";

export default function() {
    const d = new DateTime(2019, 0, 1, 3, 30, 20, 10);
    const t = d.time;

    assert.strictEqual(3, t.hours);
    assert.strictEqual(30, t.minutes);
    assert.strictEqual(20, t.seconds);
    assert.strictEqual(10, t.milliseconds);
}