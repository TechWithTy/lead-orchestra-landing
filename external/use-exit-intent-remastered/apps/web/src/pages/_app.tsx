import { AnimatePresence, motion } from 'framer-motion';

import { Background, Footer, RootContainer } from 'components';

import type { AppProps } from 'next/app';

import 'styles/global';

export default function MyApp({ Component, pageProps, router }: AppProps) {
	return (
		<RootContainer>
			<AnimatePresence mode="wait">
				<motion.div
					key={router.route}
					initial="hidden"
					animate="enter"
					exit="exit"
					variants={{
						hidden: { opacity: 0 },
						enter: { opacity: 1 },
						exit: { opacity: 0 },
					}}
				>
					<Component {...pageProps} />
					<Footer />
				</motion.div>
			</AnimatePresence>

			<Background />
		</RootContainer>
	);
}
