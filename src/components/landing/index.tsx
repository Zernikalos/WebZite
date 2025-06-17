import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/landing/HomePageFeatures';

import styles from '../../pages/index.module.css';

import * as SvgModule from '@site/static/img/zklogo.svg';
import LandingHeader from './Header';
import BackgroundBlobs from './BackgroundBlobs';
const Svg = SvgModule.default;

type SvgType = React.ComponentType<React.ComponentProps<'svg'>>;

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

export default function Landing(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Docs`}
      description={siteConfig.tagline}
    >
      <BackgroundBlobs>
        <HomepageHeader />
        <main>
          <HomepageFeatures />
        </main>
      </BackgroundBlobs>
    </Layout>
  );
}
