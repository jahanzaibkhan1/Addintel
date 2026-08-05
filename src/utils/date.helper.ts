export class DateHelper {
    static today(): Date {
        return new Date();
    }

    static addDays(days: number): Date {
        return new Date(Date.now() + days * 86400000);
    }

    static format(d: Date): string {
        return d.toISOString().split('T')[0];
    }
}