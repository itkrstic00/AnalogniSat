let canvas, ctx;

function draw () {
    let vreme = (function () {
            let trenutnoVreme = new Date();
            trenutnoVreme.setHours(0);
            trenutnoVreme.setMinutes(0);
            trenutnoVreme.setSeconds(0);
            trenutnoVreme.setMilliseconds(0);
            return Date.now() - trenutnoVreme.getTime();
        })(),
        sati = vreme / (60 * 60 * 1000),
        minutes = sati * 60 % 60,
        seconds = minutes * 60 % 60,
        c = {x: canvas.width / 2, y: canvas.height / 2};

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineCap = 'square';

    KazaljkaSekundara();
    KazaljkaMinutara();
    KazaljkaSatnica();
    Sat();

    function Sat () {  
        ctx.lineWidth = 7;
        ctx.strokeStyle = '#4e068a';
        ctx.beginPath();
        ctx.arc(c.x, c.y, 140, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.lineWidth = 6;
        for (let i = 0; i < 60; i++) {
            let r = 135,
                l = 5;
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
            if (i % 5 === 0)
                r -= l,
                l *= 2,
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            let v = new Vector(r, Math.PI * 2 * (i / 60) - Math.PI / 2);
            ctx.beginPath();
            ctx.moveTo(v.getX() + c.x, v.getY() + c.y);
            v.setMag(r + l);
            ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
            ctx.stroke();
        }
          
        ctx.font = '30px cursive';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let i = 1; i <= 12; i++) {
            let v = new Vector(113, Math.PI * 2 * (i / 12) - Math.PI / 2);
            ctx.fillText(i, v.getX() + c.x, v.getY() + c.y);
        }   
        ctx.beginPath();
        ctx.arc(c.x, c.y, 3.75, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();
    }

    function KazaljkaSekundara () {
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        let a = Math.PI * 2 * (seconds / 60) - Math.PI / 2;
        let v = new Vector(95, a);
        let v2 = new Vector(-20, a);
        ctx.moveTo(v2.getX() + c.x, v2.getY() + c.y);
        ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
        ctx.stroke();
    }

    function KazaljkaMinutara () {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        let a = Math.PI * 2 * (minutes / 60) - Math.PI / 2;
        let v = new Vector(95, a);
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
        ctx.stroke();
    }

    function KazaljkaSatnica () {
        ctx.lineWidth = 9;
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        let a = Math.PI * 2 * (sati / 12) - Math.PI / 2;
        let v = new Vector(60, a);
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
        ctx.stroke();
    }
}

function init () {
    canvas = document.getElementById('clock');
    canvas.width = canvas.height = 300;
    ctx = canvas.getContext('2d');

    setInterval(draw, 10);
}

init();
