import Assert from "@web-atoms/unit-test/dist/Assert";
import Category from "@web-atoms/unit-test/dist/Category";
import Test from "@web-atoms/unit-test/dist/Test";
import TestItem from "@web-atoms/unit-test/dist/TestItem";
import DateTime from "../../DateTime";

export default class BasicTests extends TestItem {

    @Test
    public create(): void {
        const d = new DateTime();
        Assert.isTrue(d instanceof Date);
    }

    @Test
    public today(): void {
        const d = DateTime.today;
        Assert.isEmpty(d.date.time.milliseconds);
    }

    @Test
    public relativeTime(): void {
        const d = new DateTime(2010, 1, 1, 20, 50);
        const dOld = new DateTime(2010, 1, 1, 20, 50);
    }

    @Test
    public compare() {
        const d1 = new DateTime(2010, 1, 1, 20, 50);
        const d2 = new DateTime(2010, 2, 1, 20, 50);
        const dt1 = new Date(d1.msSinceEpoch);
        const dt2 = new Date(d1.msSinceEpoch);
        Assert.isTrue(d1 < d2);
        Assert.isFalse(dt1 < dt2);
        Assert.isTrue(d1.compare(d2) < 0);
    }

}
