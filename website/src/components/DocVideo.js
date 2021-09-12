import React, { useState, useRef } from 'react';
import styles from './DocVideo.module.css';

export default function DocVideo({ src, maxHeight = 360 }) {
  const [maxWidth, setMaxWidth] = useState(null);

  const isPhone = useRef(null);
  if (isPhone.current == null) {
    isPhone.current = window.innerWidth < 576;
  }

  function handleMetadata(e) {
    const { videoWidth, videoHeight } = e.target;
    setMaxWidth((maxHeight * videoWidth) / videoHeight);
  }

  let wrapperStyle;
  if (maxWidth) {
    wrapperStyle = { maxWidth };
  } else if (!isPhone.current) {
    wrapperStyle = { height: maxHeight, maxWidth: (maxHeight * 16) / 9 };
  }

  return (
    <div className={styles.videoWrapper} style={wrapperStyle}>
      <video
        controls
        onLoadedMetadata={handleMetadata}
        className={styles.video}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
