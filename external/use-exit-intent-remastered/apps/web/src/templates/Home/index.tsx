import { Head, Header, Layout, LayoutSpacing } from 'components';
import { meta } from 'shared/constants';
import { OverviewSection } from './Overview';
import { PlaygroundSection } from './Playground';

export function HomeTemplate() {
	return (
		<Layout>
			<Head meta={meta} />
			<Header />

			<OverviewSection />
			<LayoutSpacing size="small" />
			<PlaygroundSection />
			<LayoutSpacing size="small" />
		</Layout>
	);
}
