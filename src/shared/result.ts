export class Result<T> {
  private _value?: T;
  public error?: T | string;
  public isSuccess: boolean;
  public isFailure: boolean;

  /**
   *
   */

  public constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        "invalid operation: a result can not be successful and contain an error"
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        "invalied operation: a failing result needs to contain an error message"
      );
    }

    this._value = value;
    this.error = error;

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;

    Object.freeze(this);
  }

  /**
   *
   */

  public getValue(): T | undefined {
    if (!this.isSuccess) {
      throw new Error(
        'can not get the value of an error result. use "error value" instead'
      );
    }

    return this._value;
  }

  /**
   *
   */

  public errorValue(): T | undefined {
    return this.error ? (this.error as T) : undefined;
  }

  /**
   *
   */

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  /**
   *
   */

  public static fail<U>(error?: string): Result<U> {
    return new Result<U>(false, error);
  }

  /**
   *
   */

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result;
    }

    return Result.ok();
  }
}
