import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Meta from "../Meta";
import MainView from "./MainView";
import Tags from "./Tags";

function Technical() {
	const [selectedTags, setSelectedTags] = useState([]);
	const modifyTags = (tag) => {
		if (selectedTags.includes(tag)) {
			const index = selectedTags.indexOf(tag);
			setSelectedTags([
				...selectedTags.slice(0, index),
				...selectedTags.slice(index + 1),
			]);
		} else {
			setSelectedTags([...selectedTags, tag]);
		}
	};
	return (
		<Container fluid className="p-3 bg-light h-100">
			<Meta head="Skills | ShareIIITD" />
			<Row>
				<Col md={2} className="mb-2">
					<Tags tags={selectedTags} modifyTags={modifyTags} />
				</Col>
				<Col>
					<MainView tags={selectedTags} modifyTags={modifyTags} />
				</Col>
			</Row>
		</Container>
	);
}

export default Technical;
