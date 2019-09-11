import Assert from "@web-atoms/unit-test/dist/Assert";
import Category from "@web-atoms/unit-test/dist/Category";
import Test from "@web-atoms/unit-test/dist/Test";
import TestItem from "@web-atoms/unit-test/dist/TestItem";
import TimeSpan from "../../TimeSpan";

@Category("TimeSpan Format Test")
export default class FormatTest extends TestItem {

    @Test
    public hourFormat(): void {
        const ts = TimeSpan.parse("1:20");
        Assert.equals(1, ts.hours);
        Assert.equals(20, ts.minutes);

        Assert.equals("01:20 AM", ts.toString(true));
        Assert.equals("01:20", ts.toString());
    }

    @Test
    public hour12Format(): void {
        const ts = TimeSpan.parse("1:20 PM");
        Assert.equals(13, ts.hours);
        Assert.equals(20, ts.minutes);

        Assert.equals("01:20 PM", ts.toString(true));
        Assert.equals("13:20", ts.toString());
    }

    @Test
    public dayFormat(): void {
        const ts = TimeSpan.parse("1:1:20:0");
        Assert.equals(1, ts.days);
        Assert.equals(1, ts.hours);
        Assert.equals(20, ts.minutes);
    }
}
