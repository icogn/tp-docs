import React, { useLayoutEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import vid from '@site/static/video/as500k.mp4';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner)}
      style={{
        backgroundColor: 'transparent',
        color: '#fff',
      }}
    >
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/save-file/save-file-introduction"
            style={{ marginRight: 16 }}
          >
            Save File
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/technical-explanations/ostickstocalendartime"
          >
            Technical Explanations
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  // TODO: need to handle screen resizes
  // TODO: clean styling and make sure works on different screen sizes,
  // no video on mobile, also handle light and dark mode
  // TODO: try different video file
  useLayoutEffect(() => {
    // Prevent scrollbar from flashing if it isn't needed
    const htmlEl = window.document.documentElement;
    let docHeight = document.querySelector('#__docusaurus').offsetHeight;
    htmlEl.style.overflowY = 'hidden';

    if (docHeight > window.innerHeight) {
      htmlEl.style.overflowY = '';
    }

    return () => {
      htmlEl.style.overflowY = '';
    };
  }, []);

  return (
    <Layout
      description="Twilight Princess at your fingertips"
      style={{
        overflowY: 'hidden',
      }}
    >
      <video
        autoPlay
        muted
        loop
        style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          minWidth: '100%',
          minHeight: '100%',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        <source src={vid} type="video/mp4" />
      </video>
      <div
        style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          minWidth: '100%',
          minHeight: '100%',
          zIndex: -1,
          backgroundColor: 'rgba(0,0,0,0.35)',
          // backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      ></div>
      <div
        style={{
          // position: 'absolute',
          left: 0,
          width: '100%',
          top: 0,
          bottom: 0,
        }}
      >
        <HomepageHeader />
        <main>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              boxSizing: 'border-box',
              padding: '16px 32px',
            }}
          >
            Not looking for PRs just yet. Select a button above to see some
            documentation.
            <br />
            Plan to add more and more to this site over time.
          </div>
          <HomepageFeatures />
        </main>
      </div>
    </Layout>
  );
}
