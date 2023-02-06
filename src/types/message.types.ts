import { Enum, AlphaNumeric, Guard, isNumeric } from "../shared";

export class MessageTypes extends Enum<number> {
  private static items = new Array<MessageTypes>();

  public static readonly ERRORED = new MessageTypes("ERRORED", -1);
  public static readonly UNSPECIFIED = new MessageTypes("UNSPECIFIED", 0);
  public static readonly LOAD_CONTENT = new MessageTypes("LOAD_CONTENT", 1);
  public static readonly SAVE_CONTENT = new MessageTypes("SAVE_CONTENT", 2);
  public static readonly NEW_CONTENT = new MessageTypes("NEW_CONTENT", 3);

  private constructor(name: string, value: number) {
    super(name, value);

    MessageTypes.items.push(this);
  }

  /**
   *
   */

  static find(criteria: AlphaNumeric): MessageTypes | undefined {
    if (isNumeric(criteria)) {
      return MessageTypes.items.find((v: any) => v._value === criteria);
    }

    return MessageTypes.items.find((v: MessageTypes) => v.name === criteria);
  }

  /**
   *
   */

  static contains(criteria: AlphaNumeric): boolean {
    const status = MessageTypes.find(criteria);

    return !!status;
  }

  /**
   *
   */

  static get(criteria: AlphaNumeric): MessageTypes {
    return MessageTypes.find(criteria) || MessageTypes.UNSPECIFIED;
  }
}
