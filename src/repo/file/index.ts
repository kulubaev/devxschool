import { FileEditorRepo } from "./file.editor.repo";

// singleton
const fileEditorRepo = new FileEditorRepo("db.txt");

export { FileEditorRepo, fileEditorRepo };
