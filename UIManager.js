
class UIManager {

    constructor(
        shapeManager
    ){
        this.shapeManager = shapeManager
    }

  updateShapeList() {
    const list = $('#shapeList');
    list.empty();
    this.shapeManager.shapes.forEach((shape, index) => {
        list.append(`<li id="shape-${index}" class="ui-state-default">${shape.constructor.name}</li>`);
    });
    list.sortable({
        update: function(event, ui) {
            let newOrder = $(this).sortable('toArray');
            this.shapeManager.shapes.sort((a, b) => {
                let aIndex = newOrder.indexOf(`shape-${this.shapeManager.shapes.indexOf(a)}`);
                let bIndex = newOrder.indexOf(`shape-${this.shapeManager.shapes.indexOf(b)}`);
                return aIndex - bIndex;
            });
            updateShapeList();  // Rebuild list to reflect new order
        }
    });
    list.disableSelection();
}


updateShapeDetails() {
    const detailsDiv = document.getElementById('shapeDetails');
    detailsDiv.innerHTML = '';  // Clear previous details

    if (this.shapeManager.activeShape) {
        const shape = this.shapeManager.activeShape;
        const properties = ['x', 'y', 'stroke', 'strokeWeight', 'fill']; // Common properties
        properties.forEach(prop => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = shape[prop];
            input.onchange = function() {
                // Update the shape property when the input value changes
                shape[prop] = this.value;
            };
            const label = document.createElement('label');
            label.textContent = prop + ': ';
            label.appendChild(input);
            detailsDiv.appendChild(label);
            detailsDiv.appendChild(document.createElement('br'));
        });
    } else {
        detailsDiv.innerHTML = '<div>No active shape</div>';  // Show message when no shape is active
}
}



}
