import { useEffect, useRef, useState } from 'react';
import hljs from '../../lib/highlight';
import Clipboard from 'clipboard';

import 'highlight.js/styles/github.css';
import './style.scss'
// eslint-disable-next-line react/prop-types
export default function CodeBlock({ language = "java", code }) {
  console.log('language:', language)
  const preRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // if (preRef.current) {
    hljs.highlightBlock(preRef.current);

    // 创建 clipboard 实例并保存到变量中
    const clipboard = new Clipboard(`#${language}copy_btn`, {
      text: () => code,
    });

    // 监听复制成功事件
    clipboard.on('success', () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });

    // 销毁 clipboard 实例
    return () => {
      clipboard.destroy();
    };
    // }
  }, [code]);

  return (
    <div className="code-block" style={{ position: 'relative', marginTop: 8 }}>
      <pre>
        <code id={language} ref={preRef} className={language}>
          {code}
        </code>
      </pre>
      <button id={`${language}copy_btn`} style={{ position: 'absolute', top: 4, right: 4, lineHeight: '14px' }} className="code-block__button" data-clipboard-target={`#${language}`} >
        {copied ? '已复制' : '复制'}
      </button>
    </div>
  );
}
