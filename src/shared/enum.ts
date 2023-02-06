export type AlphaNumeric = string | number;

export abstract class Enum<T> {
  private static _values = new Array();

  /**
   *
   *
   */
  protected constructor(
    private readonly _name: string,
    private readonly _value: T
  ) {
    Enum._values.push(this);
  }

  /**
   *
   */

  toString(): string {
    return `${this._name}`;
  }

  /**
   *
   */

  get value(): T {
    return this._value;
  }

  /**
   *
   */

  get name(): string {
    return this.toString();
  }
}
