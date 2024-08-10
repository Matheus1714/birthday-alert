export enum BirthdayCases {
  TODAY = 1,
  IN_THIS_MONTH,
  NEXT_WEEK,
}

export class Person {
  name: string;
  birthday: Birthday;

  constructor(name: string, birthday: Birthday) {
    this.name = name;
    this.birthday = birthday;
  }

  private getStartOfWeek(today: Date): Date {
    const day = today.getDate();
    const weekDay = today.getDay();
    const startOfWeek = day - weekDay + (weekDay === 0 ? -6 : 1);
    return new Date(today.getFullYear(), today.getMonth(), startOfWeek);
  }

  private getEndOfWeek(startOfWeek: Date): Date {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return endOfWeek;
  }

  private isDateInRange(date: Date, start: Date, end: Date): boolean {
    return date >= start && date <= end;
  }

  private isBirthdayToday(today: Date): boolean {
    return (
      this.birthday.month === today.getMonth() + 1 &&
      this.birthday.day === today.getDate()
    );
  }

  private isBirthdayThisMonth(today: Date): boolean {
    return this.birthday.month === today.getMonth() + 1;
  }

  private isBirthdayNextWeek(today: Date): boolean {
    const startOfWeek = this.getStartOfWeek(today);
    const endOfWeek = this.getEndOfWeek(startOfWeek);

    let birthdayDate = new Date(
      today.getFullYear(),
      this.birthday.month - 1,
      this.birthday.day
    );

    if (birthdayDate < startOfWeek) {
      birthdayDate.setFullYear(today.getFullYear() + 1);
    }

    return this.isDateInRange(birthdayDate, startOfWeek, endOfWeek);
  }

  hasBirthday(birthdayCases?: BirthdayCases): boolean {
    const today = new Date();

    switch (birthdayCases) {
      case BirthdayCases.IN_THIS_MONTH:
        console.log("test");
        return this.isBirthdayThisMonth(today);
      case BirthdayCases.NEXT_WEEK:
        return this.isBirthdayNextWeek(today);
      case BirthdayCases.TODAY:
      default:
        console.log("today");
        return this.isBirthdayToday(today);
    }
  }

  get age(): number {
    const now = new Date();

    if (!this.birthday?.year) {
      return -1;
    }

    const age = now.getFullYear() - this.birthday.year;

    const hasBirthdayPassedThisYear =
      now.getMonth() > this.birthday.month ||
      (now.getMonth() === this.birthday.month &&
        now.getDate() >= this.birthday.day);

    return hasBirthdayPassedThisYear ? age : age - 1;
  }
}
