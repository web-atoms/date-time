function isEmpty(n: number): boolean {
    return n === undefined || n === null || n === 0 || isNaN(n);
}

export const msMinutes = 60000;

export const msSeconds = 1000;

export const msHours = 3600000;

export const msDays = 24 * msHours;

const timeSpanFormat = /(?<hours>\d{1,2}):(?<mins>\d{1,2})(?<ampm>\s+(am|pm)?)/gi;

export default class TimeSpan {

    public static fromDays(n: number): TimeSpan {
        return new TimeSpan(n * msDays);
    }

    public static fromHours(n: number): TimeSpan {
        return new TimeSpan(n * msHours);
    }

    public static fromMinutes(n: number): TimeSpan {
        return new TimeSpan(n * msMinutes);
    }

    public static fromSeconds(n: number): TimeSpan {
        return new TimeSpan(n * msSeconds);
    }

    public static parse(text: string): TimeSpan {
        const a = timeSpanFormat.exec(text) as any;
        if (a.groups) {
            
        }
    }

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

    /**
     * Duration is always positive TimeSpan
     */
    public duration(): TimeSpan {
        const t = this.milliseconds;
        return new TimeSpan(t > 0 ? t : -t);
    }
}
