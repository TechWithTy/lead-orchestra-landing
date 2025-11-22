import Link from 'next/link';

import { useElementIntersection } from 'hooks';
import type { RefObject } from 'react';
import { intersection, library } from 'shared/constants';

import {
	Description,
	ExternalLink,
	FixedHeader,
	GitHubIcon,
	InstallationBox,
	LayoutSpacing,
	LibraryVersion,
	Title,
} from 'components';

import { Layout } from './styles';

export function Header() {
	const { ref, onIntersect } = useElementIntersection<HTMLDivElement>({
		...intersection.options,
		offset: 0,
	});

	onIntersect('home', () => {
		history.replaceState(null, '', '#');
	});

	return (
		<Layout ref={ref as RefObject<HTMLDivElement>}>
			<LayoutSpacing>
				<FixedHeader>
					<LibraryVersion />

					<Link href="/docs/getting-started/overview" passHref>
						<a href="/docs/getting-started/overview">Docs</a>
					</Link>

					<Link href="/docs/getting-started/installation" passHref>
						<a href="/docs/getting-started/installation">Install</a>
					</Link>

					<a href="#playground">Playground</a>

					<ExternalLink href={library.url}>
						<GitHubIcon />
					</ExternalLink>
				</FixedHeader>
			</LayoutSpacing>

			<LayoutSpacing size="small" />

			<Title>useExitIntent</Title>

			<Description>🐠 {library.description}</Description>

			<LayoutSpacing size="small" />

			<InstallationBox />

			<LayoutSpacing size="medium" />
		</Layout>
	);
}
