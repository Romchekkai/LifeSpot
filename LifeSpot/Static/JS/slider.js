let items = document.querySelectorAll('.carousel .item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function () {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function () {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.control.left').addEventListener('click', function () {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.control.right').addEventListener('click', function () {
	if (isEnabled) {
		nextItem(currentItem);
	}
});

const swipedetect = (el) => {

	let surface = el;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;
	let startTime = 0;
	let elapsedTime = 0;

	let threshold = 150;
	let restraint = 100;
	let allowedTime = 300;

	surface.addEventListener('mousedown', function (e) {
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	surface.addEventListener('mouseup', function (e) {
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime) {
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
				if ((distX > 0)) {
					if (isEnabled) {
						previousItem(currentItem);
					}
				} else {
					if (isEnabled) {
						nextItem(currentItem);
					}
				}
			}
		}
		e.preventDefault();
	}, false);
}

var el = document.querySelector('.carousel');
swipedetect(el);



/*document.querySelector('.manual-btn.btn1').addEventListener('click', function () {
	showSlides(1);
});
document.querySelector('.manual-btn.btn2').addEventListener('click', function () {
	showSlides(2);
});
document.querySelector('.manual-btn.btn3').addEventListener('click', function () {
	showSlides(3);
});



function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName("item");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}

	slides[n - 1].style.display = "block";

}* Не могу пока разобраться с тем как сделать это рабочим вместе со свайпом/

*/