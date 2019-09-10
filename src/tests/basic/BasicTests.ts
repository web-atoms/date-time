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

}