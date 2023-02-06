import { Result } from "../shared";

import { ContentDTO } from "../dto";

export interface EditorRepo {
  retrieveContent(): Promise<Result<ContentDTO>>;
  persistContent(content: string): Promise<Result<ContentDTO>>;
}
