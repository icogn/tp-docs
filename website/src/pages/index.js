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
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={clsx(
              'button button--secondary button--lg',
              styles.button
            )}
            to="/docs/save-file/save-file-introduction"
          >
            Save File
          </Link>
          <Link
            className={clsx(
              'button button--secondary button--lg',
              styles.button
            )}
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

  // TODO: try different video file, cut weird pixels off edge(s)
  // TODO: use first frame of video as image background behind video
  // TODO: see if can make overlay really big so doesn't show on the edge when
  // you resize
  useLayoutEffect(() => {
    // Prevent scrollbar from flashing if it isn't needed
    const htmlEl = window.document.documentElement;
    const docusaurusEl = document.querySelector('#__docusaurus');
    const docHeight = docusaurusEl ? docusaurusEl.offsetHeight : -1;

    if (docHeight >= 0 && docHeight <= window.innerHeight) {
      htmlEl.style.overflowY = 'hidden';
    }

    function handleResize() {
      htmlEl.style.overflowY = '';
      window.removeEventListener('resize', handleResize);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      htmlEl.style.overflowY = '';
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout
      description="Twilight Princess at your fingertips"
      wrapperClassName={styles.root}
    >
      <video autoPlay muted loop className={styles.video}>
        <source src={vid} type="video/mp4" />
      </video>
      <div className={styles.videoOverlay}></div>
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
