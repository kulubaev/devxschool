import { UseCase, Result, Guard } from "../../../shared";
import { EditorRepo } from "../../../repo";
import { ContentDTO } from "dto";

export class LoadContentUseCase implements UseCase<void, Result<ContentDTO>> {
  /**
   *
   */
  constructor(private readonly repo: EditorRepo) {}
  /**
   *
   */
  async execute(): Promise<Result<ContentDTO>> {
    try {
      const loadResult = await this.repo.retrieveContent();

      if (loadResult.isSuccess) {
        const content = loadResult.getValue()!;

        return Result.ok(content);
      }

      return Result.fail(loadResult.errorValue()?.toString());
    } catch (error: any) {
      return Result.fail(error?.message);
    }
  }
}
