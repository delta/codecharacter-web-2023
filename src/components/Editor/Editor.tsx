import * as Editor from './EditorTypes';
import styles from './style.module.css';
import { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { CodeApi, Language } from '@codecharacter-2023/client';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import Toast from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  EnableSnippets,
  FontSize,
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

const codeAPI = new CodeApi(apiConfig);

self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: any, label: string) {
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
  const divEl = useRef<HTMLDivElement>(null);
  let editor: monaco.editor.IStandaloneCodeEditor;
  const userCode = useAppSelector(UserCode);
  const fontSize = useAppSelector(FontSize);
  const theme = useAppSelector(Theme);
  const dispatch = useAppDispatch();

  const keyboardHandler = useAppSelector(KeyboardHandler);
  const enableSnippets = useAppSelector(EnableSnippets);

  const language = props.language;
  const commit: () => void = props.commit;
  console.log(keyboardHandler);

  useEffect(() => {
    if (divEl.current) {
      editor = monaco.editor.create(divEl.current, {
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
        theme: theme,
        snippetSuggestions: enableSnippets ? 'inline' : 'none',
        cursorBlinking: 'smooth',
      });
    }

    editor.onDidChangeModelContent(() => {
      const codeNlanguage: CodeAndLanguage = {
        currentUserCode: editor.getValue(),
        currentUserLanguage: language,
      };
      dispatch(updateUserCode(codeNlanguage));
    });

    //Keybinding for save CTRL+S

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function () {
      let languageType: Language = Language.Cpp;
      if (language === 'c_cpp') languageType = Language.Cpp;
      else if (language === 'python') languageType = Language.Python;
      else if (language === 'java') languageType = Language.Java;

      codeAPI
        .updateLatestCode({
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

    //Keybinding for Simulate CTRL+ALT+N

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

    //Keybinfding for Commit CTRL+K

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, function () {
      commit();
    });

    return () => {
      editor.dispose();
    };
  }, [fontSize, theme, language, keyboardHandler]);

  return (
    <div
      className={styles.Editor}
      ref={divEl}
      onChange={() => {
        const codeNlanguage: CodeAndLanguage = {
          currentUserCode: editor.getValue(),
          currentUserLanguage: language,
        };
        dispatch(updateUserCode(codeNlanguage));
      }}
    ></div>
  );
}

// import('monaco-themes/themes/Monokai.json')
// 	.then(data => {
// 		monaco.editor.defineTheme('Monokai', data);
// 		// monaco.editor.setTheme('Monokai');
// 	});
// import('monaco-themes/themes/GitHub.json')
// 	.then(data => {
// 		monaco.editor.defineTheme('GitHub', data);
// 	});

// import('monaco-themes/themes/Tomorrow.json')
// 	.then(data => {
// 		monaco.editor.defineTheme('Tomorrow', data);
// 	});

// import('monaco-themes/themes/Kuroir Theme.json')
// 	.then(data => {
// 		monaco.editor.defineTheme('Kuroir Theme', data);
// 	});

// import('monaco-themes/themes/Twilight.json')
// 	.then(data => {
// 		monaco.editor.defineTheme('Twilight', data);
// 	});

// import('monaco-themes/themes/Xcode_default.json')
// 	.then(data => {
// 		monaco.editor.defineTheme('Xcode_default', data);
// 	});

// // import('monaco-themes/themes/Textmate.json')
// // 	.then(data => {
// // 		monaco.editor.defineTheme('Textmate', data);
// // 	});

// import('monaco-themes/themes/Solarized-dark.json')
// 	.then(data => {
// 		monaco.editor.defineTheme('Solarized-dark', data);
// 	});

// import('monaco-themes/themes/Solarized-light.json')
// 	.then(data => {
// 		monaco.editor.defineTheme('Solarized-light', data);
// 	});

// import('monaco-themes/themes/Nord.json')
// 	.then(data => {
// 		monaco.editor.defineTheme('Nord', data);
// 	});

// // import('monaco-themes/themes/Chrome.json')
// // 	.then(data => {
// // 		monaco.editor.defineTheme('Chrome', data);
// // 	});

// import('monaco-themes/themes/IDLE.json')
// 	.then(data => {
// 		monaco.editor.defineTheme('IDLE', data);
// 	});

// // import('monaco-themes/themes/Eclipse.json')
// // 	.then(data => {
// // 		monaco.editor.defineTheme('Eclipse', data);
// // 	});

// import('monaco-themes/themes/Dracula.json')
// 	.then(data => {
// 		monaco.editor.defineTheme('Dracula', data);
// 	});
