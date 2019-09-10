function isEmpty(n: number): boolean {
    return n === undefined || n === null || n === 0 || isNaN(n);
}

export const msMinutes = 60000;

export const msSeconds = 1000;

export const msHours = 3600000;

export const msDays = 24 * msHours;

export default class TimeSpan {

    public milliseconds: number;

    constructor(ms: number);
    constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds: number)
    constructor(days: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number) {
        if (arguments.length === 1) {
                this.milliseconds = days;
        } else {
            this.milliseconds =
                (days || 0) * msDays +
                (hours || 0) * msHours +
                (minutes || 0) * msMinutes +
                (seconds || 0) * msSeconds +
                (milliseconds || 0);
        }
    }

    public totalSeconds(): number {
        return this.milliseconds / msSeconds;
    }

    public totalMinutes(): number {
        return this.milliseconds / msMinutes;
    }

    public totalHours(): number {
        return this.milliseconds / msHours;
    }

    public totalDays(): number {
        return this.milliseconds / msDays;
    }

}
