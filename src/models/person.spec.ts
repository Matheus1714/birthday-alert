import { describe, it, expect } from "vitest";
import { Person, BirthdayCases } from "./person";

const todayDate = new Date(2024, 7, 3);

const createPerson = (day: number, month: number, year?: number) =>
  new Person("Test Person", { day, month, year });

describe("Person class", () => {
  describe("hasBirthday method", () => {
    it("should return true if birthday is today", () => {
      const person = createPerson(
        todayDate.getDate(),
        todayDate.getMonth() + 1
      );
      expect(person.hasBirthday(BirthdayCases.TODAY)).toBe(true);
    });

    it("should return false if birthday is not today", () => {
      const person = createPerson(
        todayDate.getDate() + 1,
        todayDate.getMonth() + 1
      );
      expect(person.hasBirthday(BirthdayCases.TODAY)).toBe(false);
    });

    it("should return true if birthday is in this month", () => {
      const person = createPerson(
        todayDate.getDate(),
        todayDate.getMonth() + 1
      );
      expect(person.hasBirthday(BirthdayCases.IN_THIS_MONTH)).toBe(true);
    });

    it("should return false if birthday is not in this month", () => {
      const person = createPerson(todayDate.getDate(), todayDate.getMonth());
      expect(person.hasBirthday(BirthdayCases.IN_THIS_MONTH)).toBe(false);
    });

    it("should return true if birthday is next week", () => {
      const startOfNextWeek = new Date(todayDate);
      startOfNextWeek.setDate(todayDate.getDate() + (7 - todayDate.getDay()));
      const person = createPerson(
        startOfNextWeek.getDate(),
        startOfNextWeek.getMonth() + 1
      );
      expect(person.hasBirthday(BirthdayCases.NEXT_WEEK)).toBe(true);
    });

    it("should return false if birthday is not next week", () => {
      const person = createPerson(
        todayDate.getDate(),
        todayDate.getMonth() - 1
      );
      expect(person.hasBirthday(BirthdayCases.NEXT_WEEK)).toBe(false);
    });
  });

  describe("age property", () => {
    it("should return the correct age if birthday has passed this year", () => {
      const person = createPerson(1, 1, 2000);
      expect(person.age).toBe(todayDate.getFullYear() - 2000);
    });

    it("should return the correct age if birthday has not passed this year", () => {
      const person = createPerson(
        todayDate.getDate() + 1,
        todayDate.getMonth() + 1,
        2000
      );
      expect(person.age).toBe(todayDate.getFullYear() - 2000 - 1);
    });

    it("should return -1 if the birthday year is not provided", () => {
      const person = createPerson(
        todayDate.getDate(),
        todayDate.getMonth() + 1
      );
      expect(person.age).toBe(-1);
    });
  });

  describe("getStartOfWeek and getEndOfWeek methods", () => {
    it("should correctly calculate the start of the week", () => {
      const person = createPerson(1, 1);
      const startOfWeek = person["getStartOfWeek"](todayDate);
      expect(startOfWeek).toEqual(
        new Date(
          todayDate.getFullYear(),
          todayDate.getMonth(),
          todayDate.getDate() - todayDate.getDay() + 1
        )
      );
    });

    it("should correctly calculate the end of the week", () => {
      const person = createPerson(1, 1);
      const startOfWeek = person["getStartOfWeek"](todayDate);
      const endOfWeek = person["getEndOfWeek"](startOfWeek);
      expect(endOfWeek).toEqual(
        new Date(
          todayDate.getFullYear(),
          todayDate.getMonth(),
          todayDate.getDate() - todayDate.getDay() + 7
        )
      );
    });
  });
});
