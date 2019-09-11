function isEmpty(n: number): boolean {
    return n === undefined || n === null || n === 0 || isNaN(n);
}

export const msMinutes = 60000;

export const msSeconds = 1000;

export const msHours = 3600000;

export const msDays = 24 * msHours;

const timeSpanFormat = /(?<hours>\d{1,2}):(?<mins>\d{1,2})(:(?<seconds>\d{1,2}))?(?<ampm>\s+(am|pm)?)/gi;

function padLeft(n: number, c: number, t: string = "0"): string {
    let s = n.toString();
    if (s.length < c) {
       s = t + s;
    }
    return s;
}

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
        const ag = a ? a.groups : null;
        if (!ag) {
            throw new Error("Invalid time format");
        }
        let h = parseInt(ag.hours || "0", 10);
        const m = parseInt(ag.mins || "0", 10);
        const s = parseInt(ag.seconds || "0", 10);
        const ampm = ag.ampm;
        if (ampm && /pm/i.test(ampm)) {
            h += 12;
        }
        return new TimeSpan(0, h, m, s);
    }

    public milliseconds: number;

    public get totalSeconds(): number {
        return this.milliseconds / msSeconds;
    }

    public get totalMinutes(): number {
        return this.milliseconds / msMinutes;
    }

    public get totalHours(): number {
        return this.milliseconds / msHours;
    }

    public get totalDays(): number {
        return this.milliseconds / msDays;
    }

    /**
     * Duration is always positive TimeSpan
     */
    public get duration(): TimeSpan {
        const t = this.milliseconds;
        return new TimeSpan(t > 0 ? t : -t);
    }

    /**
     * Removes days and only trims given TimeSpan to TimeOfDay
     */
    public get trimmedTime(): TimeSpan {
        return new TimeSpan(Math.ceil(this.milliseconds % msDays));
    }

    constructor(ms: number);
    // tslint:disable-next-line: unified-signatures
    constructor(days: number, hours: number, minutes?: number, seconds?: number, milliseconds?: number)
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

    /**
     * Format the TimeSpan as time format
     * @param formatAs24 Display time as 24 hours
     */
    public toString(formatAs24: boolean = false): string {
        if (this.milliseconds > msDays) {
            return this.trimmedTime.toString(formatAs24);
        }

        let h = Math.floor(this.totalHours);
        const m = Math.floor(this.totalMinutes);
        const s = Math.floor(this.totalSeconds);

        let postFix = "";
        if (!formatAs24) {
            if (h > 12) {
                postFix = " PM";
                h -= 12;
            } else {
                postFix = " AM";
            }
        }
        if (s > 0) {
            return `${padLeft(h, 2)}:${padLeft(m, 2)}:${padLeft(s, 2)}${postFix}`;
        }
        return `${padLeft(h, 2)}:${padLeft(m, 2)}${postFix}`;
    }
}
