import assert from "assert";
import DateTime from "../../DateTime";

export default function() {
    const d = DateTime.today;
    assert(!d.date.time.milliseconds);
}