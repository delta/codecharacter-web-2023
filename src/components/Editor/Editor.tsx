import * as Editor from './EditorTypes';
import styles from './style.module.css';
import { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  FontSize,
  isCommitModalOpened,
  KeyboardHandler,
  Theme,
} from '../../store/EditorSettings/settings';

import {
  updateUserCode,
  CodeAndLanguage,
  UserCode,
} from '../../store/editor/code';

import {
  codeCommitIDChanged,
  codeCommitNameChanged,
  isSelfMatchModalOpened,
  mapCommitIDChanged,
  mapCommitNameChanged,
} from '../../store/SelfMatchMakeModal/SelfMatchModal';

import {
  dcCode,
  changeDcCode,
} from '../../store/DailyChallenge/dailyChallenge';
import { useTour } from '@reactour/tour';
import { CurrentUserApi } from '@codecharacter-2023/client';
import { apiConfig } from '../../api/ApiConfig';

self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: string, label: string) {
    if ((label = 'cpp')) {
      return './cpp.worker.bundle.js';
    }
    if ((label = 'java')) {
      return './java.worker.bundle.js';
    }
    if (label === 'python') {
      return './python.worker.bundle.js';
    }
    return './editor.worker.bundle.js';
  },
};

export default function CodeEditor(props: Editor.Props): JSX.Element {
  const currentUserapi = new CurrentUserApi(apiConfig);
  const divCodeEditor = useRef<HTMLDivElement>(null);
  let editor: monaco.editor.IStandaloneCodeEditor;
  const userCode: string =
    props.page == 'Dashboard'
      ? useAppSelector(UserCode)
      : useAppSelector(dcCode);
  const fontSize: number = useAppSelector(FontSize);
  const theme: string = useAppSelector(Theme);
  const dispatch: React.Dispatch<unknown> = useAppDispatch();

  const keyboardHandler = useAppSelector(KeyboardHandler);

  const language = props.language;

  const { setIsOpen } = useTour();

  useEffect(() => {
    currentUserapi.getCurrentUser().then(response => {
      setTimeout(() => {
        if (response.isTutorialComplete === false) {
          if (response.tutorialLevel == 1) setIsOpen(true);
        }
      }, 200);
    });
  }, []);

  useEffect(() => {
    if (divCodeEditor.current) {
      editor = monaco.editor.create(divCodeEditor.current, {
        value: userCode,
        language: language == 'c_cpp' ? 'cpp' : language,
        fontSize: fontSize,
        cursorStyle:
          keyboardHandler == 'emacs'
            ? 'block-outline'
            : keyboardHandler == 'vim'
            ? 'block'
            : 'line',
        scrollBeyondLastLine: true,
        wrappingIndent: 'same',
        wrappingStrategy: 'advanced',
        lineNumbers: 'on',
        lineNumbersMinChars: 3,
        lineDecorationsWidth: 10,
        automaticLayout: true,
        theme:
          theme == 'high-contrast-black'
            ? 'hc-black'
            : theme == 'vs-light'
            ? 'vs'
            : 'vs-dark',
        cursorBlinking: 'smooth',
      });
    }

    editor.onDidChangeModelContent(() => {
      const codeNlanguage: CodeAndLanguage = {
        currentUserCode: editor.getValue(),
        currentUserLanguage: language,
      };
      if (props.page == 'Dashboard') {
        dispatch(updateUserCode(codeNlanguage));
      } else {
        dispatch(changeDcCode(codeNlanguage));
      }
    });

    //Keybinding for save -> CTRL+S

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function () {
      props.SaveRef.current?.click();
    });

    //Keybinding for Simulate -> CTRL+ALT+N

    if (props.page == 'Dashboard') {
      editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyN,
        function () {
          dispatch(isSelfMatchModalOpened(true));
          dispatch(codeCommitNameChanged('Current Code'));
          dispatch(codeCommitIDChanged(null));
          dispatch(mapCommitNameChanged('Current Map'));
          dispatch(mapCommitIDChanged(null));
        },
      );

      //Keybinding for Commit -> CTRL+K

      editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK,
        function () {
          dispatch(isCommitModalOpened(true));
        },
      );
    }

    //Keybinding for Submit -> CTRL+SHIFT+S

    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyS,
      function () {
        props.SubmitRef.current?.click();
      },
    );

    return () => {
      editor.dispose();
    };
  }, [fontSize, theme, language, keyboardHandler, props.page]);

  const userCodeChangeHandler = () => {
    const codeNlanguage: CodeAndLanguage = {
      currentUserCode: editor.getValue(),
      currentUserLanguage: language,
    };
    dispatch(updateUserCode(codeNlanguage));
  };

  const dailyChallengeCodechange = () => {
    const codeNlanguage: CodeAndLanguage = {
      currentUserCode: editor.getValue(),
      currentUserLanguage: language,
    };
    dispatch(changeDcCode(codeNlanguage));
  };

  return (
    <div
      className={styles.Editor}
      ref={divCodeEditor}
      onChange={
        props.page == 'Dashboard'
          ? userCodeChangeHandler
          : dailyChallengeCodechange
      }
    ></div>
  );
}
