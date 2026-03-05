import assert from "node:assert";
import DateTime from "../../DateTime";

export default function() {
    const d = new DateTime(2019, 0, 1, 3, 30, 20);
    const t = d.time;

    assert.strictEqual(3, t.hours);
    assert.strictEqual(30, t.minutes);
    assert.strictEqual(20, t.seconds);
    assert.strictEqual(0, t.milliseconds);
}