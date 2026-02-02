import React from 'react';
import Head from '@docusaurus/Head';
import {useLocation} from '@docusaurus/router';
import DocItem from '@theme-original/DocItem';

type DocItemProps = React.ComponentProps<typeof DocItem>;

function isApiIndexPath(pathname: string): boolean {
  return pathname === '/api' || pathname === '/api/' || pathname === '/api/index/';
}

export default function ApiDocItem(props: DocItemProps): JSX.Element {
  const {pathname} = useLocation();

  const shouldNoIndex =
    (pathname === '/api/index' || pathname.startsWith('/api/')) && !isApiIndexPath(pathname);

  return (
    <>
      {shouldNoIndex ? (
        <Head>
          <meta name="robots" content="noindex,follow" />
        </Head>
      ) : null}
      <DocItem {...props} />
    </>
  );
}

