import * as Editor from './EditorTypes';
import styles from './style.module.css';
import { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import {
  CodeApi,
  DailyChallengesApi,
  Language,
} from '@codecharacter-2023/client';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import Toast from 'react-hot-toast';

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

const codeAPI: CodeApi = new CodeApi(apiConfig);
const DcApi = new DailyChallengesApi(apiConfig);

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
      let languageType: Language = Language.Cpp;
      if (language === 'c_cpp') languageType = Language.Cpp;
      else if (language === 'python') languageType = Language.Python;
      else if (language === 'java') languageType = Language.Java;
      codeAPI
        .updateLatestCode({
          codeType: props.page == 'Dashboard' ? 'NORMAL' : 'DAILY_CHALLENGE',
          code: userCode,
          lock: false,
          language: languageType,
        })
        .then(() => {
          Toast.success('Code Saved');
        })
        .catch(err => {
          if (err instanceof ApiError) Toast.error(err.message);
        });
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
        let languageType: Language = Language.Cpp;
        if (language === 'c_cpp') languageType = Language.Cpp;
        else if (language === 'python') languageType = Language.Python;
        else if (language === 'java') languageType = Language.Java;

        codeAPI
          .updateLatestCode({
            codeType: props.page == 'Dashboard' ? 'NORMAL' : 'DAILY_CHALLENGE',
            code: userCode,
            lock: true,
            language: languageType,
          })
          .then(() => {
            Toast.success('Code Submitted');
          })
          .catch(err => {
            if (err instanceof ApiError) Toast.error(err.message);
          });

        if (props.page == 'Dailychallenge') {
          DcApi.createDailyChallengeMatch({
            value: editor.getValue(),
            language: language == 'c_cpp' ? 'CPP' : language.toUpperCase(),
          })
            .then(() => {
              Toast.success('Daily Challenge submitted successfully');
            })
            .catch(() => {
              Toast.error('Couldnt submit challenge');
            });
        }
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
