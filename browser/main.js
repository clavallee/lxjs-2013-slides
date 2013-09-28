var shoe = require('shoe');
var fs = require('fs');
var path = require('path');
var marked = require('marked');

var sock = shoe('/sock');
var muxDemux = require('mux-demux');

var mx = muxDemux();
sock.pipe(mx).pipe(sock);

var slideIndex;
var terminals = {};
var slides = [];
var activeTerm;

var src = fs.readFileSync(__dirname + '/../readme.markdown', 'utf8');
(function (html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    [].forEach.call(div.querySelectorAll('img'), function (img, ix) {
        var slide = createSlide(img);
        var src = img.getAttribute('src');
        if (path.basename(src) === 'terminal.png') {
            createShell(ix, '/home/substack').appendTo(document.body);
        }
    });
})(marked(src));

show(0);

function createSlide (img) {
    var slide = document.createElement('div');
    slide.classList.add('slide');
    slide.appendChild(img);
    document.body.appendChild(slide);
    slides.push(slide);
    return slide;
}

function show (n) {
    if (n >= slides.length) n = slides.length - 1;
    if (n < 0) n = 0;
    var prev = document.querySelector('.slide.show');
    if (prev) prev.classList.remove('show');
    slides[n].classList.add('show');
    
    if (activeTerm) activeTerm.terminal.element.classList.remove('show');
    activeTerm = terminals[n];
    
    if (activeTerm) activeTerm.terminal.element.classList.add('show');
    slideIndex = n;
}

function createShell (n, cwd) {
    var term = require('exterminate')(80, 25);
    var sh = mx.createStream({ command: [ 'bash', '-i' ], cwd: cwd });
    sh.write('clear\n');
    
    term.pipe(sh).pipe(term);
    terminals[n] = term;
    
    function resize () {
        term.resize(window.innerWidth - 5, window.innerHeight - 2);
    }
    resize();
    window.addEventListener('resize', resize);
    return term;
}

window.addEventListener('keydown', function (ev) {
    if (ev.keyIdentifier === 'Right') {
        show(slideIndex + 1);
    }
    else if (ev.keyIdentifier === 'Left') {
        show(slideIndex - 1);
    }
    if (!activeTerm) return;
    activeTerm.terminal.keyDown(ev);
});

window.addEventListener('keypress', function (ev) {
    if (!activeTerm) return;
    activeTerm.terminal.keyPress(ev);
});
