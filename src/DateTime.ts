import TimeSpan from "./TimeSpan";

/**
 * DateTime differs from Date in following cases,
 * 1. DateTime is immutable, however underlying object is Date
 *    but all methods specific to DateTime are immutable
 * 2. DateTime has readonly properties for `day, month, year etc`
 * 3. DateTime is derived from Date so passing DateTime to existing
 *    code will not change anything, however intellisense does not display
 *    any methods of Date unless you explicity cast as Date, but instanceof
 *    works correctly
 * 4. DateTime does not modify underlying Date prototype or add any methods to it
 * ``` typescript
 * DateTime dt = DateTime.now();
 * (dt instanceof Date) // is true
 * (dt instanceof DateTime) // is also true
 * ```
 */
export default class DateTime {

    public static get today(): DateTime {
        const a = new DateTime();
        return a.date;
    }

    public static get utcNow(): DateTime {
        const now = new Date();
        return new DateTime(now.getTime() + now.getTimezoneOffset());
    }

    public static get now(): DateTime {
        return new DateTime();
    }

    public static parse(s: string): DateTime {
        return new DateTime(s);
    }

    public get day(): number {
        return (this as any as Date).getDate();
    }

    public get dayOfWeek(): number {
        return (this as any as Date).getDay();
    }

    public get month(): number {
        return (this as any as Date).getMonth();
    }

    public get year(): number {
        return (this as any as Date).getFullYear();
    }

    public get timeZoneOffset(): TimeSpan {
        return TimeSpan.fromMinutes((this as any as Date).getTimezoneOffset());
    }

    /**
     * Milliseconds since EPOCH, ie total number of milliseconds
     * of underlying Date object
     */
    public get msSinceEpoch(): number {
        return (this as any as Date).getTime();
    }

    /**
     * Strips time of the day and returns Date only
     */
    public get date(): DateTime {
        const d = new DateTime(
            (this as any as Date).getFullYear(),
            (this as any as Date).getMonth(),
            (this as any as Date).getDate(), 0, 0, 0, 0);
        return d;
    }

    /**
     * Just for convenience, avoid using this, instead use methods of DateTime
     * or suggest better method at our github repo
     */
    public get asJSDate(): Date {
        return (this as any as Date);
    }

    /**
     * Gets time of the day in TimeSpan format
     */
    public get time(): TimeSpan {
        return new TimeSpan(
            0,
            (this as any as Date).getHours(),
            (this as any as Date).getMinutes(),
            (this as any as Date).getSeconds(),
            (this as any as Date).getMilliseconds());
    }

    constructor();
    // tslint:disable-next-line: unified-signatures
    constructor(time?: number | string);
    constructor(
        year?: number, month?: number, date?: number, hours?: number,
        // tslint:disable-next-line: unified-signatures
        minutes?: number, seconds?: number, ms?: number);
    constructor(
        a?: any, b?: number, c?: number, d?: number,
        e?: number, f?: number, g?: number) {
        // super();
        // tslint:disable-next-line: no-string-literal
        this["__proto__"] = DateTime.prototype;
        let rd: any;
        switch (arguments.length) {
            case 0:
            rd = new Date() as any;
            break;
            case 1:
            rd = new Date(a) as any;
            break;
            case 2:
            rd = new Date(a, b) as any;
            break;
            case 3:
            rd = new Date(a, b, c) as any;
            break;
            case 4:
            rd = new Date(a, b, c, d) as any;
            break;
            case 5:
            rd = new Date(a, b, c, d, e) as any;
            break;
            case 6:
            rd = new Date(a, b, c, d, e, f) as any;
            break;
            default:
            rd = new Date(a, b, c, d, e, f, g) as any;
        }
        rd.__proto__ = DateTime.prototype;
        return rd as any;
    }

    /**
     * Adds date or TimeSpan to current date and returns a new DateTime
     * @returns DateTime
     * @param d DateTime or TimeSpan
     */
    public add(d: DateTime | TimeSpan): DateTime;

    /**
     * Adds (or removes -ve values specified) and returns newly created DateTime
     * @returns DateTime
     * @param days number of days
     * @param hours number of hours
     * @param minutes number of minutes
     * @param seconds number of seconds
     * @param milliseconds number of milliseconds
     */
    public add(days: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): DateTime;
    public add(
        t: DateTime | TimeSpan | Date | number,
        hours?: number,
        minutes?: number,
        seconds?: number,
        milliseconds?: number): DateTime {
        if (t instanceof Date) {
            return new DateTime(
                (this as any as Date).getTime() + t.getTime());
        }
        let days: number = 0;
        if (t instanceof TimeSpan) {
            days = t.days;
            hours = t.hours;
            minutes = t.minutes;
            seconds = t.seconds;
            milliseconds = t.milliseconds;
        } else {
            days = t as number;
        }
        const d = new Date((this as any as Date).getTime());
        if (days !== 0) { d.setDate(d.getDate() + days); }
        if (hours !== 0) { d.setHours(d.getHours() + hours); }
        if (minutes !== 0) { d.setMinutes(d.getMinutes() + minutes); }
        if (seconds !== 0) { d.setSeconds(d.getSeconds() + seconds); }
        if (milliseconds !== 0) { d.setMilliseconds(d.getMilliseconds() + milliseconds); }
        (d as any).__proto__ = DateTime.prototype;
        return d as any as DateTime;
    }

    /**
     * Returns TimeSpan from subtracting rhs from this,
     * `const ts = lhs.diff(rhs); // ts = lhs - rhs`
     * @param rhs Right hand side
     * @returns TimeSpan
     */
    public diff(rhs: Date | DateTime): TimeSpan {
        return new TimeSpan(
            (this as any as Date).getTime() - (rhs as Date).getTime());
    }

    public equals(d: DateTime): boolean {
        return (this as any as Date).getTime() === (d as any as Date).getTime();
    }

}

// hack !! for ES5
(DateTime.prototype as any).__proto__ = Date.prototype;

if (typeof Window !== "undefined") {
    (window as any).DateTime = DateTime;
}
