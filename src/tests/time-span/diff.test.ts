import assert from "node:assert";
import DateTime from "../../DateTime.js";

export default function() {
    const d1 = new DateTime(2019, 0, 1, 2, 30, 40, 50);
    const d2 = new DateTime(2019, 0, 2, 2, 30, 40, 50);

    const t = d2.diff(d1);

    assert.strictEqual(1, t.days);
}