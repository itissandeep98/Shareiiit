import { useEffect, useState } from 'react';
import { Row } from 'reactstrap';
import Preview from './Preview';
import UploadSingle from './UploadSingle';

function MultiUpload(props) {
	const { content, changeState } = props;

	let extensions = '.png, .jpeg, .jpg';

	const temp = content?.split(',')?.filter(con => con.length > 5) ?? [];
	const [files, setFiles] = useState(temp);

	useEffect(() => {
		changeState(files?.toString());
	}, [files]);

	const updateLink = links => {
		setFiles([...files, ...links]);
	};

	const deleteLink = (e, index) => {
		e.preventDefault();
		setFiles([...files.slice(0, index), ...files.slice(index + 1)]);
	};

	return (
		<Row>
			{files.length < 5 && (
				<UploadSingle
					extensions={extensions}
					setLink={updateLink}
					len={files.length}
				/>
			)}

			<Row className="w-100">
				{files?.map((file, index) => (
					<Preview
						key={index}
						link={file}
						deleteLink={e => deleteLink(e, index)}
					/>
				))}
			</Row>
		</Row>
	);
}
export default MultiUpload;
