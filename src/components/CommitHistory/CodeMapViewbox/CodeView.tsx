import { CodeRevision } from '@codecharacter-2023/client';
import { CodeBlock, irBlack } from 'react-code-blocks';
type PropsType = {
  code: CodeRevision['code'];
  codeLang: string;
};

export default function CodeView(props: PropsType): JSX.Element {
  return (
    <CodeBlock
      text={props.code}
      language={props.codeLang}
      showLineNumbers={props.code != '' ? true : false}
      theme={irBlack}
    />
  );
}
