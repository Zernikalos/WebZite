import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import BlazingFast from '../BlazingFast';

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  imgUrl?: string
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Batteries included',
    imgUrl: '/img/batteries.webp',
    description: (
      <>
        Packed with powerful development tools: Nest App, the desktop asset generator, 
        and ZDebugger for seamless debugging integration. Everything you need, right out of the box.
      </>
    ),
  },
  {
    title: 'Blazing Fast',
    imgUrl: '/img/blazing_fast.webp',
    description: (
      <>
        Built with a unified core and minimal dependencies, Zernikalos delivers 
        lightning-fast development and runtime performance across all platforms.
      </>
    ),
  },
  {
    title: 'Multiplatform',
    imgUrl: '/img/multiplatform.webp',
    description: (
      <>
        Want to develop for Android, iOS, and Web? We got you! With Zernikalos engine, 
        you can build amazing applications using a single unified API across all platforms.
      </>
    ),
  },
  {
    title: 'Powered by Kotlin',
    imgUrl: '/img/zkkotlin.webp',
    description: (
      <>
        The Zernikalos engine is implemented with Kotlin Multiplatform, an amazing 
        technology for both developers and contributors alike.
      </>
    ),
  },
];

function Feature({title, Svg, imgUrl, description}: FeatureItem) {
  return (
    <div className={clsx('col col--3')}>
      <div className="tw:text-center">
        {imgUrl ? 
        (<img className={styles.featureSvg} src={imgUrl}></img>) :
        (<Svg className={styles.featureSvg} role="img" />)
        }
      </div>
      <div className="tw:text-center tw:px-4">
        <Heading as="h3">{title}</Heading>
        {description}
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <div className="row">
          <BlazingFast />
        </div>
      </div>
    </section>
  );
}
