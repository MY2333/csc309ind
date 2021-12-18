"use strict";

(function(global, document, $) {
    function stickyNote() {
    this.note;
    this.divID = ''
    this.background = "black"
    this.color = "white"
    this.height = 300
    this.width = 200
    this.type = ''
    this.fontSize = 15
    this.x = 0
    this.y = 0
    this.title = 'Sticky Note'
    this.italic = () => {
        document.execCommand("italic")
    }
    this.underline=() => {
        document.execCommand("underline")
    }
    this.bold=() => {
        document.execCommand("bold")
    }
    this.zoom = (event) => {
        var cur = event.target.parentElement
        cur.style.display = 'none'
        cur.parentElement.lastChild.style.display = 'block'
    }
    this.show = (event) => {
        var cur = event.target
        cur.style.display = 'none'
        cur.parentElement.firstChild.style.display = 'block'
    }
}

function changeColorDom(n, color){
    n.note.style.backgroundColor = color;
}

function changeTitleDom(n, title){
    n.note.children[0].children[1].innerHTML=title
}
function changePositionDom(n, x, y){
    n.note.style.top = x + "px";
    n.note.style.left = y + "px";
}
function changeSizeDom(n, h, w){
    n.note.children[0].style.width = w +"px"
    n.note.children[0].style.height = h +"px"
    n.note.children[0].children[5].style.width = w - 5 + "px"
    n.note.children[0].children[5].style.height = h - 100 + "px"
}
function changeFontSizeDom(n, size){
    n.note.style.fontSize = size + "px"
}
function changeFontColorDom(n, color){
    n.note.style.color = color
}

stickyNote.prototype = {
	create: function(divID, width, height, type) {
        this.divID = divID
        this.width = width
        this.height = height
        this.type = type

        const n = document.createElement('div')
        n.id = this.divID
        n.style.backgroundColor = this.background
        n.style.position = "fixed"
        n.style.top = this.x
        n.style.left= this.y
        n.style.color=this.color

		const note = document.createElement('div')
        note.style.width = this.width
        note.style.height = this.height
        note.style.padding = '10px'
        const b3 = document.createElement('button')
        b3.style = "width:30px; height: 20px; float:right"

        b3.innerHTML = "-"
        b3.onclick = this.zoom
        note.append(b3)

        const title = document.createElement('p')
        title.innerHTML = this.title
        title.style.cursor = 'move'        
        note.append(title)

		const b1 = document.createElement('button')
        b1.innerHTML = "<u>U</u>"
        b1.style = "width:30px; height: 20px; margin:5px"
        b1.onclick = this.underline
        note.append(b1)

        const b2 = document.createElement('button')
        b2.onclick = this.italic
        b2.style = "width:30px; height: 20px; margin: 5px"
        b2.innerHTML = "<i>I</i>"
        note.append(b2)

        const b4 = document.createElement('button')
        b4.onclick = this.bold
        b4.style = "width:30px; height: 20px; margin: 5px"
        b4.innerHTML = "<b>B</b>"
        note.append(b4)

        const texta = document.createElement('div')
        texta.setAttribute("contenteditable", true);
        texta.style = 'border-style: solid; overflow-y: scroll;'
        if(this.type == 'bullets'){
            texta.innerHTML = '<ul><li></li></ul>'
        }else if(this.type == 'numbers'){
            texta.innerHTML = '<ol><li></li></ol>'
        }
        note.append(texta)
        n.append(note)

        const show = document.createElement('button')
        show.onclick = this.show
        show.style = "width:30px; height: 20px; margin: 5px; display: none"
        show.innerHTML = "+"
        n.append(show)
		this.note = n
		const body = $('body')
        body.append(n)
        
        this.changeSize(this.height, this.width)
        
        var isDown = false
        var offset = [0, 0]
        title.addEventListener('mousedown', function(event) {
            isDown = true;
            offset = [
                title.parentElement.parentElement.offsetLeft - event.clientX,
                title.parentElement.parentElement.offsetTop - event.clientY
            ];
            
        }, true);
        
        title.addEventListener('mouseup', function() {
            isDown = false;
        }, true);
        
        title.addEventListener('mousemove', function(event) {
            event.preventDefault();
            if (isDown) {
                title.parentElement.parentElement.style.left = (event.clientX + offset[0]) + 'px';
                title.parentElement.parentElement.style.top  = (event.clientY + offset[1]) + 'px';
            }
        }, true);

	},

	changeColor: function(color) {
		this.background = color
        changeColorDom(this, color)
	},

    changeTitle: function(title){
        this.title = title
        changeTitleDom(this, title)
    },
    changePosition: function(x, y){
        this.x = x;
        this.y = y;
        changePositionDom(this, x, y)
    },
    changeSize: function(h, w){
        this.height = h
        this.width = w
        changeSizeDom(this, h, w)
    },
    changeFontSize: function(size){
        this.size = size
        changeFontSizeDom(this, size)
    },
    changeFontColor: function(color){
        this.color = color
        changeFontColorDom(this, color)
    }
}
global.stickyNote = global.stickyNote || stickyNote
})(window, window.document, $);