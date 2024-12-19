class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        return point.x > this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y > this.y - this.h &&
            point.y <= this.y + this.h;
    }
}

class ExampleQuadtree {
    constructor(boundary, n) {
        this.boundary = boundary;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let nw = new Rectangle(x-w/2, y-h/2, w/2, h/2);
        this.northwest = new ExampleQuadtree(nw, this.capacity);
        let ne = new Rectangle(x+w/2, y-h/2, w/2, h/2);
        this.northeast = new ExampleQuadtree(ne, this.capacity);
        let sw = new Rectangle(x-w/2, y+h/2, w/2, h/2);
        this.southwest = new ExampleQuadtree(sw, this.capacity);
        let se = new Rectangle(x+w/2, y+h/2, w/2, h/2);
        this.southeast = new ExampleQuadtree(se, this.capacity);

        this.divided = true;
    }

    insert(point) {
        // if (!this.boundary.contains(point)) {
        //     return false;
        // }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }
        else {
            if (!this.divided) {
                this.subdivide();
            }
            // if (this.northwest.insert(point)) {
            //     return true;
            // }
            // else if (this.northeast.insert(point)) {
            //     return true;
            // }
            // else if (this.southwest.insert(point)) {
            //     return true;
            // }
            // else if (this.southeast.insert(point)) {
            //     return true;
            // }

            // I have an idea: e.g.
            if (this.northwest.boundary.contains(point)) {
                this.northwest.insert(point);
            }
            else if (this.northeast.boundary.contains(point)) {
                this.northeast.insert(point);
            }
            else if (this.southwest.boundary.contains(point)) {
                this.southwest.insert(point);
            }
            else if (this.southeast.boundary.contains(point)) {
                this.southeast.insert(point);
            }
        }
    }

    show() {
        stroke(255);
        noFill();
        strokeWeight(1);
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w*2, this.boundary.h*2);
        if (this.divided) {
            this.northwest.show();
            this.northeast.show();
            this.southwest.show();
            this.southeast.show();
        }
        // for (let p of this.points) {
        //     strokeWeight(1);
        //     point(p.x, p.y);
        // }
    }
}