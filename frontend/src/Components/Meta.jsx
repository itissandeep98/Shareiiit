import { Helmet } from 'react-helmet';

function Meta(props) {
	const { head, description, url } = props;
	return (
		<Helmet>
			<title>{head ?? 'ShareIIITD'}</title>
			<meta name="description" content={description} />
			<meta name="twitter:description" content={description} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url ?? 'https://shareiiitd.tk'} />
			<meta name="twitter:site" content={url ?? 'https://shareiiitd.tk'} />
		</Helmet>
	);
}

export default Meta;
