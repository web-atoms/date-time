import assert from "assert";
import DateTime from "../../DateTime.js";

export default function() {
    const d1 = new DateTime(2010, 1, 1, 20, 50);
    const d2 = new DateTime(2010, 2, 1, 20, 50);
    const dt1 = new Date(d1.msSinceEpoch);
    const dt2 = new Date(d1.msSinceEpoch);
    assert(d1 < d2);
    assert(!(dt1 < dt2));
    assert(d1.compare(d2) < 0);
}