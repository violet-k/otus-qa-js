/// <reference types='codeceptjs' />
type steps_file = typeof import('../steps_file');
type EditorPage = typeof import('../pages/StackEdit.io/EditorPage');

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    EditorPage: EditorPage;
  }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
