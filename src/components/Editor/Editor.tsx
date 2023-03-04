import * as Editor from './EditorTypes';
import styles from './style.module.css';
import { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import {
  MonacoLanguageClient,
  CloseAction,
  ErrorAction,
  MonacoServices,
  MessageTransports,
} from 'monaco-languageclient';

import {
  toSocket,
  WebSocketMessageReader,
  WebSocketMessageWriter,
} from 'vscode-ws-jsonrpc';

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

import { lspUrl } from '../../config/config';

import {
  dcCode,
  changeDcCode,
} from '../../store/DailyChallenge/dailyChallenge';
import { buildWorkerDefinition } from 'monaco-editor-workers';
import { Uri } from 'vscode';

buildWorkerDefinition(
  '../../node_modules/monaco-editor-workers/dist/workers',
  new URL('', window.location.href).href,
  false,
);

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
  const [filePath, setFilePath] = useState<string>('');
  const [currWebsocket, setCurrWebSocket] = useState<WebSocket>();
  let wsClient: WebSocket;

  const keyboardHandler = useAppSelector(KeyboardHandler);

  const language = props.language;

  let monacoModel: monaco.editor.ITextModel;

  monaco.languages.register({
    id: 'cpp',
    extensions: ['.cpp'],
    aliases: ['CPlusPlus', 'cpp', 'CPP', 'C++', 'c++'],
  });

  function createLanguageClient(
    transports: MessageTransports,
  ): MonacoLanguageClient {
    return new MonacoLanguageClient({
      name: 'Sample Language Client',
      clientOptions: {
        documentSelector: ['cpp'],
        errorHandler: {
          error: () => ({ action: ErrorAction.Continue }),
          closed: () => ({ action: CloseAction.DoNotRestart }),
        },
      },
      connectionProvider: {
        get: () => {
          return Promise.resolve(transports);
        },
      },
    });
  }

  useEffect(() => {
    if (language == 'c_cpp') {
      const url = `${lspUrl}/${
        props.language == 'c_cpp' ? 'cpp' : props.language
      }`;
      wsClient = new WebSocket(url);
      setCurrWebSocket(wsClient);
      wsClient.onopen = () => {
        const updater = {
          operation: 'fileUpdate',
          code: userCode,
        };
        wsClient.send(JSON.stringify(updater));

        const filePathRequest = {
          operation: 'getAbsPath',
        };
        wsClient.send(JSON.stringify(filePathRequest));
        const socket = toSocket(wsClient);
        const reader = new WebSocketMessageReader(socket);
        reader.listen(message => {
          const currmsg = JSON.parse(JSON.stringify(message));
          console.log(message);
          setFilePath(message.message);
          reader.dispose();
          // socket.dispose()
        });
      };
      return () => {
        wsClient?.close();
      };
    }
  }, []);

  useEffect(() => {
    if (divCodeEditor.current) {
      editor = monaco.editor.create(divCodeEditor.current, {
        model: monaco.editor.createModel(
          userCode,
          language == 'c_cpp' ? 'cpp' : language,
          monaco.Uri.parse(filePath + '/player.cpp'),
        ),
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
        lightbulb: {
          enabled: true,
        },
      });

      if (language == 'c_cpp' && filePath != '' && currWebsocket != undefined) {
        MonacoServices.install({
          workspaceFolders: [
            {
              uri: Uri.parse(filePath),
              name: 'my folder',
              index: 1,
            },
          ],
        });

        const socket = toSocket(currWebsocket);
        const reader = new WebSocketMessageReader(socket);
        const writer = new WebSocketMessageWriter(socket);
        const languageClient = createLanguageClient({
          reader,
          writer,
        });
        languageClient.start();
        reader.onClose(() => languageClient.stop());
      }

      editor.onDidChangeModelContent(() => {
        if (currWebsocket != undefined) {
          const currUpdater = {
            operation: 'fileUpdate',
            code: editor.getValue(),
          };
          currWebsocket.send(JSON.stringify(currUpdater));
        }
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

      editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
        function () {
          props.SaveRef.current?.click();
        },
      );

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
    }

    return () => {
      monaco.editor.getModels().forEach(model => model.dispose());
      editor?.dispose();
    };
  }, [
    fontSize,
    theme,
    language,
    keyboardHandler,
    props.page,
    filePath,
    currWebsocket,
  ]);

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
