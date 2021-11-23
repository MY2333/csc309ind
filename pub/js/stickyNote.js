function sticky() {
    this.note;
    this.background = "black"
    this.color = "white"
    this.height = 300
    this.width = 200
    this.fontSize = 15
    this.x = 0
    this.y = 0
    this.title = 'Sticky Note'
    this.italic = () => {
        // const text = document.getElementById("textArea").innerHTML
        // const selected = window.getSelection();
        // const start = selected.anchorOffset
        // const end = selected.focusOffset
        // const sub1 = text.substring(0, start)
        // const sub2 = '<i>' + selected.toString() + '</i>'
        // const sub3 = text.substring(end)
        // document.getElementById("textArea").innerHTML = sub1 + sub2 + sub3
        // console.log(start)
        // console.log(end)
        document.execCommand("italic")
    }
    this.underline=() => {
        document.execCommand("underline")
    }
    this.bold=() => {
        document.execCommand("bold")
    }
    this.zoom = (event) => {
        cur = event.target.parentElement
        cur.style.display = 'none'
        cur.parentElement.lastChild.style.display = 'block'
    }
    this.show = (event) => {
        cur = event.target
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

sticky.prototype = {
	create: function() {
        const n = document.createElement('div')
        n.style.backgroundColor = this.background
        n.style.position = "fixed"
        n.style.top = this.x
        n.style.left=this.y
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
        texta.style = 'width: 190px; height:180px; border-style: solid'
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