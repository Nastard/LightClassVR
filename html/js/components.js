// Player Spawner
AFRAME.registerComponent('spawn-in-circle', {
	schema: {
		radius: {type: 'number', default: 1}
	},

	init: function() {
		var el = this.el;
		var center = el.getAttribute('position');

		var angleRad = this.getRandomAngleInRadians();
		var circlePoint = this.randomPointOnCircle(this.data.radius, angleRad);
		var worldPoint = {x: circlePoint.x + center.x, y: center.y, z: circlePoint.y + center.z};
		el.setAttribute('position', worldPoint);

		var angleDeg = angleRad * 180 / Math.PI;
		var angleToCenter = -1 * angleDeg + 90;
		var rotationStr = '0 ' + angleToCenter + ' 0';
		el.setAttribute('rotation', rotationStr);
	},

	getRandomAngleInRadians: function() {
		return Math.random()*Math.PI*2;
	},

	randomPointOnCircle: function (radius, angleRad) {
		x = Math.cos(angleRad)*radius;
		y = Math.sin(angleRad)*radius;
		return {x: x, y: y};
	}
});

// Gaze
AFRAME.registerComponent('handle-events', {
	init: function () {
		var el = this.el;
		const scene = document.querySelector("a-scene");

		const box = document.createElement("a-box");
		box.setAttribute("color", "red");
		box.setAttribute("position", "0 1 3");
		box.setAttribute("id", "cube");
		box.setAttribute("visible",false);

		scene.appendChild(box);

		el.addEventListener('mouseenter', function () {
			el.setAttribute('color', '#24CAFF');
			box.setAttribute("visible",true);
		});
		el.addEventListener('mouseleave', function () {
			el.setAttribute('color', '#EF2D5E');
			box.setAttribute("visible",false);
		});
	},

});
