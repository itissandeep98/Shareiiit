import { Col, Container, Row } from 'reactstrap';
import { Tab } from 'semantic-ui-react';
import Meta from '../../../Meta';
import PostList from './PostList';

function MyPosts(props) {
	const panes = [
		{
			menuItem: 'Books',
			render: () => (
				<Tab.Pane attached={false} className="p-0 border-0">
					<PostList category="book" />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Electronic Items',
			render: () => (
				<Tab.Pane attached={false} className="p-0 border-0">
					<PostList category="electronic" />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Group',
			render: () => (
				<Tab.Pane attached={false} className="p-0 border-0">
					<PostList category="group" />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Other Items',
			render: () => (
				<Tab.Pane attached={false} className="p-0 border-0">
					<PostList category="other" />
				</Tab.Pane>
			),
		},
	];
	return (
		<Container fluid className="p-3 bg-light h-100">
			<Meta head="My Posts | ShareIIITD" />
			<Container>
				<Row className="shadow my-3 py-4 rounded_lg bg-white ">
					<Col>
						<h1>View Your Posts</h1>
						<Tab
							menu={{ secondary: true, pointing: true }}
							panes={panes}
							className="top_menu"
						/>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

export default MyPosts;
