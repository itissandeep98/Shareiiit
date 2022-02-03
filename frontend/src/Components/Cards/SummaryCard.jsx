import { Col, Container, Row } from 'reactstrap';
import { Icon, Image, List } from 'semantic-ui-react';

function SummaryCard(props) {
	const { image, title } = props;
	const details = [
		{
			type: 'Anmol',
			value: 10,
		},
		{
			type: 'Naman',
			value: 25,
		},
		{
			type: 'Sudhir',
			value: 'Books',
		},
	];
	return (
		<Container className="shadow bg-white py-4 rounded_lg  my-3 h-100">
			<Row className="text-center">
				<Col xs={12}>
					<h3>{title}</h3>
				</Col>
				<Col className="justify-content-center d-flex">
					<Image src={image} size="tiny" />
				</Col>
			</Row>
			<Row className="mt-3">
				<Col>
					<List>
						{details.map(det => (
							<List.Item key={Math.random()}>
								<Icon name="user circle" size="large" />
								<List.Content>
									<List.Header>{det.type}</List.Header>
									<List.Description>
										This text will always have a left margin to make sure it
										sits alongside your icon
									</List.Description>
								</List.Content>
							</List.Item>
						))}
					</List>
				</Col>
			</Row>
			<p className="float-right text-info">See more....</p>
		</Container>
	);
}

export default SummaryCard;
