import assert from "node:assert";
import DateTime from "../../DateTime";
import TimeSpan from "../../TimeSpan";

export default function() {
    const d1 = new DateTime(2019, 0, 1, 2, 30, 40, 50);    
    let r = d1.add(TimeSpan.fromDays(20));
    let e = new DateTime(2019, 0, 21, 2, 30, 40, 50);

    assert.strictEqual(e.toString(), r.toString());

    r = d1.add(1, 1, 10, 10, 10);

    e = new DateTime(2019, 0, 2, 3, 40, 50, 60);

    assert.strictEqual(e.toString(), r.toString());

    r = d1.add(-1, 1, 10, 10, 10);

    e = new DateTime(2018, 11, 31, 3, 40, 50, 60);

    assert.strictEqual(e.toString(), r.toString());
}