import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from '../../pages/index.module.css';

import LandingHeader from './Header';
import BackgroundBlobs from './BackgroundBlobs';
import MultiplatformSection from './sections/Multiplatform';
import BlazingFastSection from './sections/BlazingFast';
import PoweredByKotlinSection from './sections/PoweredByKotlin';
import SimpleSampleSection from './SimpleSampleSection';

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
          <MultiplatformSection />
          <BlazingFastSection />
          <SimpleSampleSection />
          <PoweredByKotlinSection />
        </main>
      </BackgroundBlobs>
    </Layout>
  );
}
