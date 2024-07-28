// main.js
var Knob = require('knob');

// Initialize knobs
document.addEventListener('DOMContentLoaded', () => {
    initializeKnobs();
});

function initializeKnobs() {
    const knobElements = document.querySelectorAll('.knob');
    knobElements.forEach(el => {
        const knob = Knob({
            label: el.dataset.label,
            value: el.dataset.value,
            angleOffset: el.dataset.angleOffset,
            angleArc: el.dataset.angleArc,
            min: el.dataset.min,
            max: el.dataset.max,
            width: el.dataset.width
        });
        el.appendChild(knob);
    });
}
