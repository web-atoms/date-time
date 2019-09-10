import TimeSpan from "./TimeSpan";

declare interface IXDateType extends Date {

    // tslint:disable-next-line: no-misused-new
    new ( ... a: any[] ): IXDateType;

    toString(): string;
    toDateString(): string;
    toTimeString(): string;
    toLocaleString(): string;
    // tslint:disable-next-line: unified-signatures
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toLocaleDateString(): string;
    // tslint:disable-next-line: unified-signatures
    toLocaleDateString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    toLocaleTimeString(): string;
    // tslint:disable-next-line: unified-signatures
    toLocaleTimeString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    valueOf(): number;
    getTime(): number;
    getFullYear(): number;
    getUTCFullYear(): number;
    getMonth(): number;
    getUTCMonth(): number;
    getDate(): number;
    getUTCDate(): number;
    getDay(): number;
    getUTCDay(): number;
    getHours(): number;
    getUTCHours(): number;
    getMinutes(): number;
    getUTCMinutes(): number;
    getSeconds(): number;
    getUTCSeconds(): number;
    getMilliseconds(): number;
    getUTCMilliseconds(): number;
    getTimezoneOffset(): number;
    setTime(time: number): number;
    setMilliseconds(ms: number): number;
    setUTCMilliseconds(ms: number): number;
    setSeconds(sec: number, ms?: number): number;
    setUTCSeconds(sec: number, ms?: number): number;
    setMinutes(min: number, sec?: number, ms?: number): number;
    setUTCMinutes(min: number, sec?: number, ms?: number): number;
    setHours(hours: number, min?: number, sec?: number, ms?: number): number;
    setUTCHours(hours: number, min?: number, sec?: number, ms?: number): number;
    setDate(date: number): number;
    setUTCDate(date: number): number;
    setMonth(month: number, date?: number): number;
    setUTCMonth(month: number, date?: number): number;
    setFullYear(year: number, month?: number, date?: number): number;
    setUTCFullYear(year: number, month?: number, date?: number): number;
    toUTCString(): string;
    toISOString(): string;
    toJSON(key?: any): string;
    [Symbol.toPrimitive](hint: "default"): string;
    // tslint:disable-next-line: unified-signatures
    [Symbol.toPrimitive](hint: "string"): string;
    [Symbol.toPrimitive](hint: "number"): number;
    [Symbol.toPrimitive](hint: string): string | number;

}

// tslint:disable-next-line
function XDate(a, b, c, d, e, f, g) {}

// (XDate.prototype as any).__proto__ = Date.prototype;

export default class DateTime extends ((XDate as any) as IXDateType) {

    public static get today(): DateTime {
        const a = new DateTime();
        return a.date;
    }

    public static get utcNow(): DateTime {
        const now = new Date();
        return new DateTime(now.getTime() + now.getTimezoneOffset());
    }

    public get day(): number {
        return this.getDate();
    }

    public get dayOfWeek(): number {
        return this.getDay();
    }

    public get month(): number {
        return this.getMonth();
    }

    public get year(): number {
        return this.getFullYear();
    }

    /**
     * Strips time of the day and returns Date only
     */
    public get date(): DateTime {
        const d = new DateTime(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0);
        return d;
    }

    /**
     * Gets time of the day in TimeSpan format
     */
    public get time(): TimeSpan {
        return new TimeSpan(0, this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
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
            super();
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
     * Returns a new DateTime after adding given time span
     * @param t TimeSpan to add
     */
    public add(d: DateTime): DateTime;
    // tslint:disable-next-line: unified-signatures
    public add(t: TimeSpan): DateTime;
    public add(days: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): DateTime;
    public add(
        t: DateTime | TimeSpan | Date | number,
        hours?: number,
        minutes?: number,
        seconds?: number,
        milliseconds?: number): DateTime {
        if (t instanceof TimeSpan) {
            return new DateTime(this.getTime() + t.milliseconds );
        }
        if (t instanceof Date) {
            return new DateTime(this.getTime() + t.getTime());
        }
        const ts = new TimeSpan(t, hours, minutes, seconds, milliseconds);
        return new DateTime(this.getTime() + ts.milliseconds);
    }

    /**
     * Returns a new DateTime after adding given time span
     * @param t TimeSpan to add
     */
    public subtract(d: DateTime): DateTime;
    // tslint:disable-next-line: unified-signatures
    public subtract(t: TimeSpan): DateTime;
    public subtract(days: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): DateTime;
    public subtract(
        t: DateTime | TimeSpan | Date | number,
        hours?: number,
        minutes?: number,
        seconds?: number,
        milliseconds?: number): DateTime {
        if (t instanceof TimeSpan) {
            return new DateTime(this.getTime() - t.milliseconds );
        }
        if (t instanceof Date) {
            return new DateTime(this.getTime() - t.getTime());
        }
        const ts = new TimeSpan(t, hours, minutes, seconds, milliseconds);
        return new DateTime(this.getTime() - ts.milliseconds);
    }

    /**
     * Returns difference between this date and supplied date
     * @param d date to subtract
     */
    public diff(d: DateTime): TimeSpan {
        return new TimeSpan(this.getTime() - d.getTime());
    }

}

// hack !! for ES5
(DateTime.prototype as any).__proto__ = Date.prototype;
