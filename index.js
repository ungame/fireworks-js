const fireworks = [];
const particles = [];

class Particle {
    constructor() {
        const colors = [
            'red',
            'yellow',
            'orange',
            'pink',
            'cyan',
            'green'
        ];

        this.x = 0;
        this.y = 0;

        this.speed = Math.random() * 2 + 3;
        this.angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = -Math.sin(this.angle) * this.speed;

        this.el = document.createElement('div');
        this.el.className = 'particle';
        this.el.style.top = this.y + 'px';
        this.el.style.left = this.x + 'px';
        this.el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(this.el);

        setTimeout(() => {
            this.el.remove();
            particles.splice(particles.indexOf(this), 1);
        }, 500);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.el.style.top = this.y + 'px';
        this.el.style.left = this.x + 'px';
    }

    update() {
        this.setPosition(this.vx + this.x, this.vy +this.y);
        this.vy += 0.15;
     }
}

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.speed = 15;
        this.angle = (Math.random() * Math.PI / 2) + Math.PI / 4;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = -Math.sin(this.angle) * this.speed;

        this.el = document.createElement('div');
        this.el.className = 'firework';
        this.el.style.top = this.y + 'px';
        this.el.style.left = this.x + 'px';
        document.body.appendChild(this.el);

        setTimeout(() => {
            this.el.remove();
            fireworks.splice(fireworks.indexOf(this), 1);
            this.explode();
        }, 800);
    }

    explode() {
        for(let i = 0; i < 50; i++) {
            const particle = new Particle();
            particle.setPosition(this.x, this.y);
            particles.push(particle);
        }
    }

    update() {
       this.x += this.vx;
       this.y += this.vy; 
       this.el.style.top = this.y + 'px';
       this.el.style.left = this.x + 'px';
       this.vy += 0.15;
    }
}

const showFireworksInterval = setInterval(() => {
    fireworks.forEach(firework => firework.update());
    particles.forEach(particle => particle.update());
}, 10);


const generateFireworksInterval = setInterval(() => {
    const middle = window.innerWidth / 2;
    fireworks.push(new Firework(middle, window.innerHeight - 10));
    fireworks.push(new Firework(middle / 2, window.innerHeight - 10));
    fireworks.push(new Firework(middle + (middle / 2), window.innerHeight - 10));
}, 400);

// setTimeout(() => {
//     clearInterval(showFireworksInterval);
//     clearInterval(generateFireworksInterval);
// }, 10000);