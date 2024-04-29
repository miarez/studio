
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
        list.append(`<li id="shape-${index}" class="ui-state-default">${shape.name}</li>`);
    });
    list.sortable({
        update: (event, ui) => {
            let newOrder = $(event.target).sortable('toArray');
            this.shapeManager.shapes.sort((a, b) => {
                let aIndex = newOrder.indexOf(`shape-${this.shapeManager.shapes.indexOf(a)}`);
                let bIndex = newOrder.indexOf(`shape-${this.shapeManager.shapes.indexOf(b)}`);
                return aIndex - bIndex;
            });
            this.updateShapeList(); 
        }
    });
    list.disableSelection();
}


updateShapeDetails() {
    const detailsDiv = document.getElementById('shapeDetails');
    detailsDiv.innerHTML = '';

    if (this.shapeManager.activeShape) {
        const shape = this.shapeManager.activeShape;
        const properties = ['name', 'x', 'y', 'w', 'h', 'r', 'stroke', 'strokeWeight', 'fill']; // Common properties
        properties.forEach(prop => {
            const label = document.createElement('label');
            label.textContent = prop + ': ';
            detailsDiv.appendChild(label);

            // todo add validation for available inputs based on shape time (r for circle, w/h for rect, etc)

            if (prop === 'stroke' || prop === 'fill') {
                const input = document.createElement('input');
                input.type = 'color';
                // Convert RGB object to CSS color format
                const color = shape[prop];
                input.value = `#${this.rgbToHex(color.r, color.g, color.b)}`;
                input.onchange = (element) => {
                    // Update the shape property when the color value changes
                    const rgb = this.hexToRGB(element.target.value);
                    shape[prop].r = rgb.r;
                    shape[prop].g = rgb.g;
                    shape[prop].b = rgb.b;
                    this.updateShapeList();
                };
                label.appendChild(input);
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = shape[prop];
                input.onchange = (element) => {
                    // Update the shape property when the input value changes
                    if(prop == "name"){
                        shape[prop] = element.target.value;
                    } else {
                        shape[prop] = parseInt(element.target.value);
                    }

                    this.updateShapeList();
                };
                label.appendChild(input);
            }
            detailsDiv.appendChild(document.createElement('br'));
        });
    } else {
        detailsDiv.innerHTML = '<div>No active shape</div>'; // Show message when no shape is active
    }
}

// Helper method to convert RGB to hex format for color input
rgbToHex(r, g, b) {
    return [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// Helper method to convert hex format to RGB
hexToRGB(hex) {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    return { r, g, b };
}




}
