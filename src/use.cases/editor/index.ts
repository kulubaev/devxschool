import { PersistContentUseCase } from "./persist.content";
import { LoadContentUseCase } from "./load.content";
import { fileEditorRepo } from ".././../repo";

const persistContentUseCase = new PersistContentUseCase(fileEditorRepo);
const loadContentUseCase = new LoadContentUseCase(fileEditorRepo);

export {
  persistContentUseCase,
  loadContentUseCase,
  LoadContentUseCase,
  PersistContentUseCase,
};
