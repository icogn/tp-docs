import React, { useState, useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './CopyTextComp.module.css';
import clsx from 'clsx';

export default function CopyTextComp(props) {
  return (
    <BrowserOnly fallback={<p>Loading...</p>}>
      {() => {
        return <CopyTextCompInner {...props} />;
      }}
    </BrowserOnly>
  );
}

function CopyTextCompInner({ text }) {
  return (
    <div className={styles.root}>
      <div className={styles.copyBtnWrapper}>
        <CopyBtn text={text} />
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
}

function CopyBtn({ text }) {
  const { colorMode } = useColorMode();
  const [copiedMsgText, setCopiedMsgText] = useState('');
  const timeoutRef = useRef(null);

  const handleClick = () => {
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current);
    }

    window.navigator.clipboard.writeText(text).then(
      () => {
        setCopiedMsgText('Copied!');
      },
      (err) => {
        setCopiedMsgText('Copy failed');
      }
    );

    timeoutRef.current = setTimeout(() => {
      setCopiedMsgText('');
    }, 1500);
  };

  return (
    <div
      className={clsx(styles.copyBtn, {
        [styles.copyBtnLight]: colorMode !== 'dark',
      })}
      role="button"
      onClick={handleClick}
    >
      <div className={styles.svgWrapper}>
        <CopyIcon />
      </div>
      {copiedMsgText && <div className={styles.copiedMsg}>{copiedMsgText}</div>}
    </div>
  );
}

function CopyIcon() {
  const { colorMode } = useColorMode();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      fill={colorMode === 'dark' ? '#fff' : '#000'}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
    </svg>
  );
}
