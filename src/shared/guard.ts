export interface IGuardResult {
  successful: boolean;
  message?: string;
}

/**
 *
 */

export class Guard {
  /**
   *
   */

  public static NullOrUndefined(
    argument: any,
    argumentName: string
  ): IGuardResult {
    if (argument === null || argument === undefined) {
      return {
        successful: false,
        message: `${argumentName} is null or undefined`,
      };
    }

    return { successful: true };
  }
}
