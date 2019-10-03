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

}
