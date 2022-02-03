import { Col } from 'reactstrap';
import { Button, Icon } from 'semantic-ui-react';

const thumb = {
	display: 'inline-flex',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	marginBottom: 8,
	marginRight: 8,
	width: 100,
	height: 100,
	padding: 2,
	boxSizing: 'border-box',
};

function Preview(props) {
	const { fileType, link } = props;

	return (
		<Col xs={12} sm={6} lg={4}>
			{link?.length > 5 && (
				<Col className="d-flex flex-row mt-3 justify-content-center text-center">
					<div style={thumb}>
						<div className="d-flex overflow-hidden">
							<Button
								icon
								style={{
									position: 'absolute',
									left: '35px',
									top: '-5px',
								}}
								className="rounded-pill p-2"
								onClick={props.deleteLink}>
								<Icon name="times" />
							</Button>
							<img src={link} alt="icon" />
						</div>
					</div>
				</Col>
			)}
		</Col>
	);
}

export default Preview;
