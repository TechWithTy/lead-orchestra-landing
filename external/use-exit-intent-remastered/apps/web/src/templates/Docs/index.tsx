import { useMDXComponents } from '@mdx-js/react';
import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useMatchMedia } from 'hooks';
import { library, sizes } from 'shared/constants';

import { Article, Content, Header, MenuButton, Section, Sidebar, Title } from './styles';

import {
	DocLinkTree,
	ExternalLink,
	FixedHeader,
	GitHubIcon,
	Layout,
	LayoutSpacing,
	LibraryVersion,
	Menu,
	OuterClickArea,
	PaginationNavigator,
} from 'components';

import type { DocProps } from 'shared/types';

export function DocsTemplate({ doc, links, pagination }: DocProps) {
	const route = useRouter();
	const MDXComponents = useMDXComponents();
	const [menuOpen, setMenuOpen] = useState(false);

	const matchesMobileWidth = useMatchMedia(`(max-width: ${sizes.breakpoints.mobile}px)`);

	function handleMenuVisibility() {
		setMenuOpen(!menuOpen);
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setMenuOpen(false);
	}, [matchesMobileWidth, route.asPath]);

	return (
		<Layout>
			<LayoutSpacing>
				<FixedHeader>
					<Header>
						<div>
							<MenuButton
								active={menuOpen}
								onClick={handleMenuVisibility}
								title={menuOpen ? 'Close menu' : 'Open menu'}
							>
								<Menu />
							</MenuButton>

							<Link href="/" passHref>
								<a href="/" title="Go Back to Home">
									<Title>useExitIntent</Title>
								</a>
							</Link>
						</div>

						<div>
							<LibraryVersion />

							<Link href="/#playground" passHref>
								<a href="/#playground">Playground</a>
							</Link>

							<ExternalLink href={library.url}>
								<GitHubIcon />
							</ExternalLink>
						</div>
					</Header>
				</FixedHeader>
			</LayoutSpacing>

			<Section>
				<Sidebar visibility={menuOpen}>
					<DocLinkTree links={links} />
				</Sidebar>

				{menuOpen && <OuterClickArea onClick={handleMenuVisibility} />}

				<Content>
					{doc?.source && (
						<Article>
							<MDXRemote {...doc.source} components={MDXComponents} />
						</Article>
					)}

					<PaginationNavigator pagination={pagination} />
				</Content>
			</Section>
		</Layout>
	);
}
