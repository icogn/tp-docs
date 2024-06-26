import React, { useLayoutEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import img from '@site/static/img/homeBgPot.png';
import vid from '@site/static/video/homeBgPotCrf32g240.webm';
import vidmp4 from '@site/static/video/homeBgPotCrf26.mp4';

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
          <Link
            className={clsx(
              'button button--secondary button--lg',
              styles.button
            )}
            to="/docs/rando/blossom-race-rules"
          >
            Rando
          </Link>
          <Link
            className={clsx(
              'button button--secondary button--lg',
              styles.button
            )}
            to="/png-to-ci8"
          >
            PNG to BTI
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageBackground() {
  return (
    <div className={styles.bgWrapper}>
      <div
        className={styles.bgImg}
        style={{ backgroundImage: `url("${img}")` }}
      ></div>
      <video autoPlay muted loop className={styles.video}>
        <source src={vid} type="video/webm" />
        <source src={vidmp4} type="video/mp4" />
      </video>
      <div className={styles.bgOverlay}></div>
    </div>
  );
}

export default function Home() {
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
      <HomepageBackground />
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
          Plan to add more to this site over time.
        </div>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
