import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { Menu, Tab } from 'semantic-ui-react';
import Meta from '../../../Meta';
import PostList from './PostList';

function MyPosts(props) {
	const active = props.active || 0;
	const panes = [
		{
			menuItem: (
				<Menu.Item key="books" as={NavLink} to="books">
					Books
				</Menu.Item>
			),
			render: () => (
				<Tab.Pane attached={false} className="p-0 border-0">
					<PostList category="book" />
				</Tab.Pane>
			),
		},
		{
			menuItem: (
				<Menu.Item key="electronics" as={NavLink} to="electronics">
					Electronics
				</Menu.Item>
			),
			render: () => (
				<Tab.Pane attached={false} className="p-0 border-0">
					<PostList category="electronic" />
				</Tab.Pane>
			),
		},
		{
			menuItem: (
				<Menu.Item key="groups" as={NavLink} to="groups">
					Group
				</Menu.Item>
			),
			render: () => (
				<Tab.Pane attached={false} className="p-0 border-0">
					<PostList category="group" />
				</Tab.Pane>
			),
		},
		{
			menuItem: (
				<Menu.Item key="others" as={NavLink} to="others">
					Other
				</Menu.Item>
			),
			render: () => (
				<Tab.Pane attached={false} className="p-0 border-0">
					<PostList category="other" />
				</Tab.Pane>
			),
		},
	];
	return (
		<Container fluid className="p-3 bg-light h-100">
			<Meta head="My Posts | ShareIIIT" />
			<Container>
				<Row className="shadow my-3 py-4 rounded_lg bg-white ">
					<Col>
						<h1>View Your Posts</h1>
						<Tab
							menu={{ secondary: true, pointing: true }}
							panes={panes}
							className="top_menu"
							activeIndex={active}
						/>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

export default MyPosts;
