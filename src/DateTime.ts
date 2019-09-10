import TimeSpan from "./TimeSpan";

export default class DateTime extends Date {

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
            return new DateTime(this.getTime(), t.milliseconds );
        }
        if (t instanceof Date) {
            return new DateTime(this.getTime(), t.getTime());
        }
        const ts = new TimeSpan(t, hours, minutes, seconds, milliseconds);
        return new DateTime(this.getTime() + ts.milliseconds);
    }

}
