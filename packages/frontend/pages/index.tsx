import Head from 'next/head';
import MainLayout from '../layouts/MainLayout';

const Home = () => (
	<>
		<Head>
			<title>Create Next App</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<MainLayout>
			<h1 className="title text-center pt-5">Main</h1>
		</MainLayout>
	</>
);

export default Home;
