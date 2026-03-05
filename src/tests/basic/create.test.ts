import DateTime from "../../DateTime.js";
import assert from "node:assert";

export default function() {
    const d = new DateTime();
    assert(d instanceof Date);
}