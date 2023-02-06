import { UseCase, Result, Guard } from "../../../shared";
import { PersistContentRequest } from "./persist.content.request.dto";
import { EditorRepo } from "../../../repo";
import { ContentDTO } from "dto";

export class PersistContentUseCase
  implements UseCase<PersistContentRequest, Result<ContentDTO>>
{
  /**
   *
   */
  constructor(private readonly repo: EditorRepo) {}
  /**
   *
   */
  async execute(request: PersistContentRequest): Promise<Result<ContentDTO>> {
    try {
      const nullGuard = Guard.NullOrUndefined(
        request?.content,
        "PersistContentUseCase:execute:content"
      );

      if (nullGuard.successful) {
        const persistResult = await this.repo.persistContent(request?.content);

        if (persistResult.isSuccess) {
          const content = persistResult.getValue()!;

          return Result.ok(content);
        }

        return Result.fail(persistResult.errorValue()?.toString());
      }

      return Result.fail(nullGuard.message);
    } catch (error: any) {
      return Result.fail(error?.message);
    }
  }
}
