import clsx from 'clsx';
import Heading from '@theme/Heading';

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
];

function Feature({title, Svg, imgUrl, description}: FeatureItem) {
  return (
    <div className={clsx('col col--3')}>
      <div className="tw:text-center">
        {imgUrl ? 
        (<img className="tw:h-[200px] tw:w-[200px]" src={imgUrl}></img>) :
        (<Svg className="tw:h-[200px] tw:w-[200px]" role="img" />)
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
    <section className="tw:flex tw:items-center tw:py-8 tw:w-full">
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
