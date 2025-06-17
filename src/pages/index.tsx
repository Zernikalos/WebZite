import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

type SvgType = React.ComponentType<React.ComponentProps<'svg'>>
//const Svg = require('@site/static/img/undraw_docusaurus_mountain.svg').default

import * as SvgModule from '@site/static/img/zklogo.svg'
import Logo from '../components/Logo';
import LandingHeader from '../components/landing/Header';
const Svg = SvgModule.default

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <>
      <header className={clsx('hero', styles.wipBanner)}>
        <span>
          🚧 This project is still in early stages of development, not suitable for production 🚧
        </span>
      </header>
      <LandingHeader siteConfig={siteConfig} />
    </>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Docs`}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
