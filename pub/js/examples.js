"use strict"; 
const sn1 = new stickyNote()
sn1.create('one', 200, 300, 'bullets')
sn1.changeColor("green")
sn1.changeTitle("Question 1: Introduce yourself")
sn1.changePosition(450, 450)
sn1.changeSize(400, 300)
sn1.changeFontSize(20)

const sn2 = new stickyNote()
sn2.create('two', 200, 300, '')
sn2.changePosition(450, 50)

const sn3 = new stickyNote()
sn3.create('three', 200, 300, 'numbers')
sn3.changePosition(450, 950)
sn3.changeColor("lightBlue")
sn3.changeFontColor("black")
sn3.changeTitle("Write down what you think")