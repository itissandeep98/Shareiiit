import React from 'react';
import { Icon } from 'semantic-ui-react';
import { showAlert } from '../../Utils/showAlert';

function Contact({ telegram_url, linkedin_url, phone_number }) {
	const copyToClipboard = textToCopy => {
		if (navigator.clipboard && window.isSecureContext) {
			return navigator.clipboard.writeText(textToCopy);
		} else {
			// text area method
			let textArea = document.createElement('textarea');
			textArea.value = textToCopy;
			// make the textarea out of viewport
			textArea.style.position = 'fixed';
			textArea.style.left = '-999999px';
			textArea.style.top = '-999999px';
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			return new Promise((res, rej) => {
				// here the magic happens
				document.execCommand('copy') ? res() : rej();
				textArea.remove();
			});
		}
	};
	return (
		<div className="float-right d-inline">
			{telegram_url && (
				<a href={telegram_url} target="_blank" rel="noopener noreferrer">
					<Icon name="telegram" size="big" />
				</a>
			)}
			{linkedin_url && (
				<a href={linkedin_url} target="_blank" rel="noopener noreferrer">
					<Icon name="linkedin" size="big" />
				</a>
			)}
			{phone_number && (
				<buton
					onClick={() => {
						copyToClipboard(`${phone_number}`);
						showAlert('Phone Number Copied to Clipboard');
					}}>
					<a>
						<Icon name="phone" size="big" />
					</a>
				</buton>
			)}
		</div>
	);
}

export default Contact;
