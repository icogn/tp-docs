import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
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
  return (
    <Layout description="Twilight Princess at your fingertips">
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
    </Layout>
  );
}
