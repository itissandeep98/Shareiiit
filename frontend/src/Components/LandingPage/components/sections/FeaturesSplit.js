import React from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";

const propTypes = {
	...SectionSplitProps.types,
};

const defaultProps = {
	...SectionSplitProps.defaults,
};

const FeaturesSplit = ({
	className,
	topOuterDivider,
	bottomOuterDivider,
	topDivider,
	bottomDivider,
	hasBgColor,
	invertColor,
	invertMobile,
	invertDesktop,
	alignTop,
	imageFill,
	...props
}) => {
	const outerClasses = classNames(
		"features-split section",
		topOuterDivider && "has-top-divider",
		bottomOuterDivider && "has-bottom-divider",
		hasBgColor && "has-bg-color",
		invertColor && "invert-color",
		className
	);

	const innerClasses = classNames(
		"features-split-inner section-inner",
		topDivider && "has-top-divider",
		bottomDivider && "has-bottom-divider"
	);

	const splitClasses = classNames(
		"split-wrap",
		invertMobile && "invert-mobile",
		invertDesktop && "invert-desktop",
		alignTop && "align-top"
	);

	const sectionHeader = {
		title: "Workflow that just works",
		paragraph:
			"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.",
	};

	return (
		<section {...props} className={outerClasses}>
			<div className="container">
				<div className={innerClasses}>
					<SectionHeader
						data={sectionHeader}
						className="center-content"
					/>
					<div className={splitClasses}>
						<div className="split-item">
							<div
								className="split-item-content center-content-mobile reveal-from-left"
								data-reveal-container=".split-item"
							>
								<div className="text-xxs text-color-primary fw-600 tt-u mb-8">
									OSA Integrated Login System
								</div>
								<h3 className="mt-0 mb-12">Login Page</h3>
								<p className="m-0">
									Register on the OSA app and login with the
									same credentials.
								</p>
							</div>
							<div
								className={classNames(
									"split-item-image center-content-mobile reveal-from-bottom",
									imageFill && "split-item-image-fill"
								)}
								data-reveal-container=".split-item"
							>
								<Image
									src="assets/landing/features-split-image-01.png"
									alt="Features split 01"
									width={528}
									height={396}
								/>
							</div>
						</div>

						<div className="split-item">
							<div
								className="split-item-content center-content-mobile reveal-from-right"
								data-reveal-container=".split-item"
							>
								<div className="text-xxs text-color-primary fw-600 tt-u mb-8">
									Create Post Interface
								</div>
								<h3 className="mt-0 mb-12">Post Creation</h3>
								<p className="m-0">
									Create a post about book, groups,
									electronics and other items. Attach photos
									and be specific with more details.
								</p>
							</div>
							<div
								className={classNames(
									"split-item-image center-content-mobile reveal-from-bottom",
									imageFill && "split-item-image-fill"
								)}
								data-reveal-container=".split-item"
							>
								<Image
									src="assets/landing/features-split-image-02.png"
									alt="Features split 02"
									width={528}
									height={396}
								/>
							</div>
						</div>

						<div className="split-item">
							<div
								className="split-item-content center-content-mobile reveal-from-left"
								data-reveal-container=".split-item"
							>
								<div className="text-xxs text-color-primary fw-600 tt-u mb-8">
									Customize your profile
								</div>
								<h3 className="mt-0 mb-12">User Profile</h3>
								<p className="m-0">
									Set your bio, profile picture and role at
									IIITD. Add your phone number or Telegram ID
									to make it easier for others to connect. Add
									your LinkedIn profile and skills.
								</p>
							</div>
							<div
								className={classNames(
									"split-item-image center-content-mobile reveal-from-bottom",
									imageFill && "split-item-image-fill"
								)}
								data-reveal-container=".split-item"
							>
								<Image
									src="assets/landing/features-split-image-03.png"
									alt="Features split 03"
									width={528}
									height={396}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
