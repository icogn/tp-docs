import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import DocVideoInner from './DocVideoInner';

export default function DocVideo(props) {
  return (
    <BrowserOnly fallback={<p>Loading...</p>}>
      {() => {
        return <DocVideoInner {...props} />;
      }}
    </BrowserOnly>
  );
}
