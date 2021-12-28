import { Row, Col } from "reactstrap";
import { Icon } from "semantic-ui-react";
import classNames from "classnames";
import { Tooltip } from "@mui/material";

function Reaction({ num_upvotes, liked, saved, dismiss, Vote }) {
	return (
		<Row>
			<Col>
				<hr />
				<div className="d-flex justify-content-around mb-1 w-100">
					<Tooltip title="Upvote" placement="top">
						<p>
							<Icon
								name="arrow up circle"
								className={classNames({ "text-success": liked })}
								onClick={() => Vote(1)}
								style={{ cursor: "pointer" }}
								size="large"
							/>
							<small> {num_upvotes > 0 && num_upvotes}</small>
						</p>
					</Tooltip>
					<Tooltip title="Save" placement="top">
						<p>
							<Icon
								name="bookmark outline"
								className={classNames({ "text-info": saved })}
								onClick={() => Vote(2)}
								style={{ cursor: "pointer" }}
								size="large"
							/>
						</p>
					</Tooltip>
					<Tooltip title="Dismiss" placement="top">
						<p>
							<Icon
								name="times"
								className={classNames({ "text-danger": dismiss })}
								onClick={() => Vote(3)}
								style={{ cursor: "pointer" }}
								size="large"
							/>
						</p>
					</Tooltip>
				</div>
			</Col>
		</Row>
	);
}

export default Reaction;
