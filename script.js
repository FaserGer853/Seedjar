let seeds = 0;
let hyperclickCount = 0;
let hyperclickTimeout;
let clickTimestamps = [];
let detectionThreshold = 50;
let intervalThreshold = 200;

function detectAutoclicker() {
	if (clickTimestamps.length >= detectionThreshold) {
		let intervals = [];
		for (let i = 1; i < clickTimestamps.length; i++) {
			intervals.push(clickTimestamps[i] - clickTimestamps[i - 1]);
		}

		let sumOfIntervals = intervals.reduce((acc, val) => acc + val, 0);
		let averageInterval = sumOfIntervals / intervals.length;

		clickTimestamps = [];

		if (averageInterval < intervalThreshold) {
			increment = function(){}
			disableClicking();
		}
	}
}

function disableClicking() {
	const subtextElement = document.getElementById('subtext');
	const hyperclickElement = document.getElementById('hyperclick');
	const jarElement = document.getElementById('jar');

	subtextElement.classList.add('fade-in');
	subtextElement.innerText = "it isnt fun when you cheat"

	jarElement.style.transform = 'translateY(-999999px)';

	clearTimeout(hyperclickTimeout);
	
	hyperclickElement.innerText = "respect sggzhs"

	seeds = 0
}

function increment() {
	const currentTime = Date.now();
	clickTimestamps.push(currentTime);
	detectAutoclicker();
	
	const counterElement = document.getElementById('counter');

	if (seeds === 0) {
		const subtextElement = document.getElementById('subtext');
		const textElement = document.getElementById('text');

		subtextElement.classList.add('fade-out');
		textElement.classList.add('fade-out');
	}

	const likeElement = document.createElement('div');

	if (hyperclickCount > 0) {
		likeElement.textContent = "+" + (hyperclickCount + 1);
		seeds = seeds + (hyperclickCount + 1);
	} else {
		likeElement.textContent = "+1";
		seeds++;
	}

	counterElement.textContent = `seeds: ${seeds}`;

	likeElement.className = 'like-pop';
	likeElement.style.cursor = 'pointer';
	document.body.appendChild(likeElement);

	const jarElement = document.getElementById('jar');
	const jarRect = jarElement.getBoundingClientRect();

	const randomX = Math.random() * jarRect.width + jarRect.left;
	const randomY = Math.random() * jarRect.height + jarRect.top;

	likeElement.style.left = `${randomX}px`;
	likeElement.style.top = `${randomY}px`;

	likeElement.addEventListener('click', () => {
		hyperclickCount++;
		clearTimeout(hyperclickTimeout);
		hyperclick();
	});

	setTimeout(() => document.body.removeChild(likeElement), 1000);

	jarElement.classList.add('pop');
	setTimeout(() => jarElement.classList.remove('pop'), 100);
}

function hyperclick() {
	const hyperclickElement = document.getElementById("hyperclick");

	if (hyperclickCount > 1) {
		hyperclickElement.innerText = "hyperclicks: " + hyperclickCount;
	}

	hyperclickTimeout = setTimeout(() => {
		hyperclickCount = 0;
		hyperclickElement.innerText = "hyperclicks: 0";
	}, 1000);
}

function main() {
	const jarElement = document.getElementById('jar');
	jarElement.addEventListener('click', increment);
	jarElement.style.cursor = 'pointer';

	const subtextElement = document.getElementById('subtext');
	subtextElement.textContent = 'click the bucket!!';
}

window.addEventListener('load', function() {
	main()
});