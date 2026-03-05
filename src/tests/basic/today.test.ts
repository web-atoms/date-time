import assert from "assert";
import DateTime from "../../DateTime.js";

export default function() {
    const d = DateTime.today;
    assert(!d.date.time.milliseconds);
}