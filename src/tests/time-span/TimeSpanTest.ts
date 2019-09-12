import Assert from "@web-atoms/unit-test/dist/Assert";
import Category from "@web-atoms/unit-test/dist/Category";
import Test from "@web-atoms/unit-test/dist/Test";
import TestItem from "@web-atoms/unit-test/dist/TestItem";
import DateTime from "../../DateTime";
import TimeSpan from "../../TimeSpan";

const d1 = new DateTime(2019, 0, 1, 2, 30, 40, 50);

@Category("TimeSpan")
export default class TimeSpanTest extends TestItem {

    @Test
    public time(): void {
        const d = new DateTime(2019, 0, 1, 3, 30, 20);
        const t = d.time;

        Assert.equals(3, t.hours);
        Assert.equals(30, t.minutes);
        Assert.equals(20, t.seconds);
        Assert.equals(0, t.milliseconds);
    }

    @Test
    public timeMS(): void {
        const d = new DateTime(2019, 0, 1, 3, 30, 20, 10);
        const t = d.time;

        Assert.equals(3, t.hours);
        Assert.equals(30, t.minutes);
        Assert.equals(20, t.seconds);
        Assert.equals(10, t.milliseconds);
    }

    @Test
    public diff(): void {
        const d2 = new DateTime(2019, 0, 2, 2, 30, 40, 50);

        const t = d2.diff(d1);

        Assert.equals(1, t.days);
    }

    @Test
    public add(): void {
        let r = d1.add(TimeSpan.fromDays(20));
        let e = new DateTime(2019, 0, 21, 2, 30, 40, 50);

        Assert.equals(e.toString(), r.toString());

        r = d1.add(1, 1, 10, 10, 10);

        e = new DateTime(2019, 0, 2, 3, 40, 50, 60);

        Assert.equals(e.toString(), r.toString());

        r = d1.add(-1, 1, 10, 10, 10);

        e = new DateTime(2018, 11, 31, 3, 40, 50, 60);

        Assert.equals(e.toString(), r.toString());
    }
}
