import './styles.css'
import {ClicksModule, ClicksModule2 } from './modules/clicks.module'


//1 вариант
const clicksModule = new ClicksModule("clicks", "total clicks");
const btn = document.createElement('button')
btn.textContent = 'press me'
document.querySelector('body').append(btn)
btn.style.margin = '20px'

//2 вариант
const clicksModule2 = new ClicksModule2("clicks", "total clicks");
const btn2 = document.createElement('button')
btn2.textContent = 'press me 2'
document.querySelector('body').append(btn2)

//1 вариант
btn.addEventListener('click', event => {
    clicksModule.hide(), clicksModule.trigger();
})

//2 вариант
btn2.addEventListener('click', event => {
    clicksModule2.trigger();
})