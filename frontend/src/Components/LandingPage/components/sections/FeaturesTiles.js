import React from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";

const propTypes = {
	...SectionTilesProps.types,
};

const defaultProps = {
	...SectionTilesProps.defaults,
};
const FeaturesTiles = ({
	className,
	topOuterDivider,
	bottomOuterDivider,
	topDivider,
	bottomDivider,
	hasBgColor,
	invertColor,
	pushLeft,
	...props
}) => {
	const outerClasses = classNames(
		"features-tiles section",
		topOuterDivider && "has-top-divider",
		bottomOuterDivider && "has-bottom-divider",
		hasBgColor && "has-bg-color",
		invertColor && "invert-color",
		className
	);

	const innerClasses = classNames(
		"features-tiles-inner section-inner pt-0",
		topDivider && "has-top-divider",
		bottomDivider && "has-bottom-divider"
	);

	const tilesClasses = classNames(
		"tiles-wrap center-content",
		pushLeft && "push-left"
	);

	const sectionHeader = {
		title: "The more we share, the more we have",
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
					<div className={tilesClasses}>
						<div className="tiles-item reveal-from-bottom">
							<div className="tiles-item-inner">
								<div className="features-tiles-item-header">
									<div className="features-tiles-item-image mb-16">
										<Image
											src="assets/landing/feature-tile-icon-01.svg"
											alt="Features tile icon 01"
											width={64}
											height={64}
										/>
									</div>
								</div>
								<div className="features-tiles-item-content">
									<h4 className="mt-0 mb-8">Books</h4>
									<p className="m-0 text-sm">
										Connect with people who have the books
										you need and need the books you have.
									</p>
								</div>
							</div>
						</div>

						<div
							className="tiles-item reveal-from-bottom"
							data-reveal-delay="200"
						>
							<div className="tiles-item-inner">
								<div className="features-tiles-item-header">
									<div className="features-tiles-item-image mb-16">
										<Image
											src="assets/landing/feature-tile-icon-02.svg"
											alt="Features tile icon 02"
											width={64}
											height={64}
										/>
									</div>
								</div>
								<div className="features-tiles-item-content">
									<h4 className="mt-0 mb-8">Groups</h4>
									<p className="m-0 text-sm">
										Whether a game of football, PUBG or a
										course project--someone is always
										interested. Join and form groups here.
									</p>
								</div>
							</div>
						</div>

						<div
							className="tiles-item reveal-from-bottom"
							data-reveal-delay="400"
						>
							<div className="tiles-item-inner">
								<div className="features-tiles-item-header">
									<div className="features-tiles-item-image mb-16">
										<Image
											src="assets/landing/feature-tile-icon-03.svg"
											alt="Features tile icon 03"
											width={64}
											height={64}
										/>
									</div>
								</div>
								<div className="features-tiles-item-content">
									<h4 className="mt-0 mb-8">Electronics</h4>
									<p className="m-0 text-sm">
										Ask for the charger you forgot at home
										or borrow an extension cord. ShareIIITD
										finally provides an easy way of sharing
										electronics in college.
									</p>
								</div>
							</div>
						</div>

						<div className="tiles-item reveal-from-bottom">
							<div className="tiles-item-inner">
								<div className="features-tiles-item-header">
									<div className="features-tiles-item-image mb-16">
										<Image
											src="assets/landing/feature-tile-icon-04.svg"
											alt="Features tile icon 04"
											width={64}
											height={64}
										/>
									</div>
								</div>
								<div className="features-tiles-item-content">
									<h4 className="mt-0 mb-8">
										Create Other Post
									</h4>
									<p className="m-0 text-sm">
										Duis aute irure dolor in reprehenderit
										in voluptate velit esse cillum dolore eu
										fugiat nulla pariatur. Excepteur sint
										occaecat cupidatat.
									</p>
								</div>
							</div>
						</div>

						<div
							className="tiles-item reveal-from-bottom"
							data-reveal-delay="200"
						>
							<div className="tiles-item-inner">
								<div className="features-tiles-item-header">
									<div className="features-tiles-item-image mb-16">
										<Image
											src="assets/landing/feature-tile-icon-05.svg"
											alt="Features tile icon 05"
											width={64}
											height={64}
										/>
									</div>
								</div>
								<div className="features-tiles-item-content">
									<h4 className="mt-0 mb-8">Skills</h4>
									<p className="m-0 text-sm">
										Use your skills to collaborate on
										projects, seek help with learning new
										technologies or mentor those starting
										out.
									</p>
								</div>
							</div>
						</div>

						<div
							className="tiles-item reveal-from-bottom"
							data-reveal-delay="400"
						>
							<div className="tiles-item-inner">
								<div className="features-tiles-item-header">
									<div className="features-tiles-item-image mb-16">
										<Image
											src="assets/landing/feature-tile-icon-06.svg"
											alt="Features tile icon 06"
											width={64}
											height={64}
										/>
									</div>
								</div>
								<div className="features-tiles-item-content">
									<h4 className="mt-0 mb-8">And Much More</h4>
									<p className="m-0 text-sm">
										Duis aute irure dolor in reprehenderit
										in voluptate velit esse cillum dolore eu
										fugiat nulla pariatur. Excepteur sint
										occaecat cupidatat.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

FeaturesTiles.propTypes = propTypes;
FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;
