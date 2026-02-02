import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Head from '@docusaurus/Head';
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
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Head>
        <link rel="canonical" href="https://zernikalos.dev/" />
        <meta name="robots" content="index,follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Zernikalos Engine" />
        <meta
          name="description"
          content="Zernikalos Engine is a Kotlin 3D engine for building multiplatform graphics apps on JVM, Android, iOS, and Web."
        />
        <script type="application/ld+json">
          {JSON.stringify(
            {
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  name: 'Zernikalos',
                  url: 'https://zernikalos.dev/',
                },
                {
                  '@type': 'SoftwareApplication',
                  name: 'Zernikalos Engine',
                  url: 'https://zernikalos.dev/',
                  applicationCategory: 'DeveloperApplication',
                  operatingSystem: ['Android', 'iOS', 'Web', 'JVM'],
                  programmingLanguage: 'Kotlin',
                  description:
                    'A Kotlin 3D engine for multiplatform graphics and interactive applications.',
                },
                {
                  '@type': 'SoftwareSourceCode',
                  name: 'Zernikalos Engine',
                  codeRepository: 'https://github.com/Zernikalos',
                  programmingLanguage: 'Kotlin',
                },
              ],
            },
            null,
            0
          )}
        </script>
      </Head>
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
