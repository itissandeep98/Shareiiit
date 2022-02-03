import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollReveal from './utils/ScrollReveal';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import FeaturesTiles from './components/sections/FeaturesTiles';
import FeaturesSplit from './components/sections/FeaturesSplit';
import './assets/scss/style.scss';

const Index = () => {
	const childRef = useRef();
	let location = useLocation();

	useEffect(() => {
		document.body.classList.add('is-loaded');
		childRef.current.init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	return (
		<ScrollReveal
			ref={childRef}
			children={() => (
				<div id="landing">
					<Header navPosition="right" className="reveal-from-bottom" />
					<main className="site-content">
						<Hero className="illustration-section-01" />
						<FeaturesTiles />
						<FeaturesSplit
							invertMobile
							topDivider
							imageFill
							className="illustration-section-02"
						/>
					</main>
				</div>
			)}
		/>
	);
};

export default Index;
