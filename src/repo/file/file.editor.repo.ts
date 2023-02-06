import { ContentDTO } from "dto";
import { promises as fs } from "fs";
import { Result, Guard } from "../../shared";
import { EditorRepo } from "../editor.repo";

export class FileEditorRepo implements EditorRepo {
  /**
   *
   */

  constructor(private file: string) {}

  /**
   *
   */
  async persistContent(content: string): Promise<Result<ContentDTO>> {
    try {
      const nullGuard = Guard.NullOrUndefined(
        content,
        "EditorRepo:persistContent:content"
      );

      if (nullGuard.successful) {
        await fs.writeFile(this.file, content, "utf8");
        const readContent = await fs.readFile(this.file, "utf8");
        return Result.ok({
          content: readContent,
          timestamp: Date.now().toString(),
        });
      }

      return Result.fail(nullGuard?.message);
    } catch (error: any) {
      return Result.fail(error?.message);
    }
  }

  /**
   *
   */
  async retrieveContent(): Promise<Result<ContentDTO>> {
    try {
      const content = await fs.readFile(this.file, "utf8");

      return Result.ok({
        content,
        timestamp: Date.now().toString(),
      });
    } catch (error: any) {
      return Result.fail(error?.message);
    }
  }
}
