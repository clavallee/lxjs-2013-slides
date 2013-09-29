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
            var sh = createShell(ix, '/home/substack');
            sh.appendTo('#slides');
            var size = getSize();
            sh.resize(size.width, size.height);
        }
    });
})(marked(src));

show(0);

function createSlide (img) {
    var slide = document.createElement('div');
    slide.classList.add('slide');
    slide.appendChild(img);
    
    slide.style.backgroundImage = 'url(' + img.getAttribute('src') + ')';
    
    document.querySelector('#slides').appendChild(slide);
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
    var sh = mx.createStream({
        command: [ 'bash', '-i' ],
        cwd: cwd,
        columns: 120,
        rows:35 
    });
    sh.write('clear\n');
    
    term.pipe(sh).pipe(term);
    terminals[n] = term;
    
    function resize () {
        var size = getSize();
        term.resize(size.width, size.height);
        term.terminal.element.style.left = (window.innerWidth - size.width) / 2;
        term.terminal.element.style.width = size.width;
    }
    resize();
    window.addEventListener('resize', resize);
    return term;
}

function getSize () {
    var h = parseInt(window.innerHeight);
    return {
        height: h - 150,
        width: h * 4 / 3 - 200
    };
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
