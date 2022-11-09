
document.addEventListener("DOMContentLoaded", function() {
    // Create buttons
    const optionList = document.querySelectorAll(".sidebar__option")
    for (const button of optionList ) {
        button.addEventListener("click", () => changePage(button))
    }

    // Hide contents 
    document.querySelector('.main-body__contnt-page').style.display = 'none'
    document.querySelector('.main-body__contnt-page__actual-content').style.display = 'none'
    document.querySelector('.main-body__contnt-page__question').style.display = 'none'

    // Add event listener
    const lvlSelectList = document.querySelectorAll(".level-nav-bar__but")
    for (const but of lvlSelectList ) {
        but.addEventListener("click", () => selectLvl(but))
    }
    document.querySelector('.main-body__contnt-page__backBut').addEventListener("click", () => previPage())
    document.querySelector('.main-body__contnt-page__ExerciseBut').addEventListener("click", () => displayQuestion())
    document.querySelector('.main-body__contnt-page__question__actual-Page-container').addEventListener("mouseenter", () => {document.querySelector('.main-body__contnt-page__question__actual-Page-container').style.borderColor = currentColor })
    document.querySelector('.main-body__contnt-page__question__actual-Page-container').addEventListener("mouseleave", () => {document.querySelector('.main-body__contnt-page__question__actual-Page-container').style.borderColor = defualtTextColor})
    document.querySelector('.submit-btn').addEventListener("click", () => checkAnswer())
    document.querySelector('.question_return-btn').addEventListener("click", () => QuestionToContnt())

})

var currentPage = ''
var pages = ['Goi', 'Bunpo', 'Kanji']
const color = ['#DB4437', '#4885ed', '#FDCA58', '#3cba54']
const defaultLevel = 2
var level = ""
var currentDisplayingContent = "None"
var id = 0
var contentList = []
var currentColor = ""
var defualtTextColor = "#60698A"
var defualtTextColor_light = "#a2a2a2"
function changePage(but) {
    if (but != null) {
        if (currentPage != but.getAttribute('page')){
            currentPage = but.getAttribute('page')
            document.querySelector('.main-body__mesg').style.display = 'none'
            document.querySelector('.main-body__contnt-page').style.display = 'block'
            let optionList = document.querySelectorAll(".sidebar__option")
            let pageList = []
            for (const button of optionList){
                pageList.push(button.getAttribute('page'))
            }
            index = pageList.indexOf(but.getAttribute('page'))
            tempColor = color[index]
            currentColor = color[index]
            but.style.color = color[index]
            but.style.borderRightColor = `${color[index]}`
            for (const button of optionList) {
                if (button != but) {
                    button.style.color = "#B2BEC3"
                    button.style.borderRightColor = "#B2BEC3"
                }
            }
            fetch(`${currentPage}/0`)
            .then(response => response.json())
            .then(result => {
                //print result
                console.log(result)
                contentList = result
                //do something with the result.....
                for (const item of result) {
                    if (item.id == 5) {
                    const element = document.createElement('div');
                    element.innerHTML = item.content
                    element.className = "main-body__contnt-page__options__but"
                    element.setAttribute('id', item.id)
                    element.addEventListener('click', () => displayContent(element))
                    element.addEventListener('mouseover', () => buttonColorChange(element, true))
                    element.addEventListener('mouseleave', () => buttonColorChange(element, 0))
                    document.querySelector(".main-body__contnt-page__options").append(element)
                }}
                return contentList
            })
            }
    } else {
        alert('something went wrong')
    }
}


// Option Button Function
function buttonColorChange(butt, mouseOver) {
    if (mouseOver == true){
        index = pages.indexOf(currentPage)
        butt.style.color = color[index]
    } else {
        butt.style.color = '#60698A'
    }
}

// show Content/Examples/Explanation of a grammar function
function showSelectedGrammar(contents){
    const content = contents.content
    currentDisplayingContent = content
    const explanation = contents.explanation
    const examples = (contents.examples).split('|')
    const connection = contents.connection
    document.querySelector('.main-body__contnt-page__actual-content__Content').innerHTML = content
    document.querySelector('.main-body__contnt-page__actual-content__Explanation').innerHTML = `説明：<br>${explanation}`
    const exampleBlock = document.querySelector('.main-body__contnt-page__actual-content__Examples')
    exampleBlock.innerHTML = '例文：<br>'
    for (example of examples) {
        exampleBlock.innerHTML += `${example}<br>`
    }
    document.querySelector('.main-body__contnt-page__actual-content__Connections').innerHTML = `接続：<br>${connection}`
}

//show the list of bunpo/kanji/goi buttons
function listOfContentButton(result){
    document.querySelector(".main-body__contnt-page__options").innerHTML = ''
    for (const item of result) {
        const element = document.createElement('div');
        element.innerHTML = item.content
        element.className = "main-body__contnt-page__options__but"
        element.setAttribute('id', item.id)
        element.addEventListener('click', () => displayContent(element))
        element.addEventListener('mouseover', () => buttonColorChange(element, true))
        element.addEventListener('mouseleave', () => buttonColorChange(element, 0))
        document.querySelector(".main-body__contnt-page__options").append(element)
    }
    if (document.querySelector(".main-body__contnt-page__options").style.display == 'none') {
        document.querySelector(".main-body__contnt-page__options").style.display = 'block'
    }
}

// Display Content of selected grammar
function displayContent(butt) {
    document.querySelector('.main-body__contnt-page__options').style.display = 'none'
    document.querySelector('.main-body__contnt-page__question').style.display = 'none'
    var indexOf = butt.getAttribute('id')-1
    const contents = contentList[indexOf]
    showSelectedGrammar(contents)
    document.querySelector('.main-body__contnt-page__actual-content').style.display = 'block'
}

// Back button function
function previPage(){
    document.querySelector('.main-body__contnt-page__options').style.display = 'block'
    document.querySelector('.main-body__contnt-page__actual-content').style.display = 'none'
    resetQuestionPage()
}

// Level button function
var currentLvl = 5
var questions = []
function selectLvl(but) {
    but.className += " level-nav-bar__but__selected"
    const lvlSelectList = document.querySelectorAll(".level-nav-bar__but")
    for (const button of lvlSelectList ) {
        if (button != but) {
            button.className = "level-nav-bar__but inner-option-button"
        }
    }
    currentLvl = but.getAttribute('level')
    console.log(currentLvl)
    const contents = []
    for (const bunpo of contentList) {
        if (bunpo.level == currentLvl) {
            contents.push(bunpo)
        }
    }
    if (document.querySelector('.main-body__contnt-page__actual-content').style.display == 'block') {
        document.querySelector('.main-body__contnt-page__actual-content').style.display = 'none'
    }
    if (document.querySelector('.main-body__contnt-page__question').style.display == 'block') {
        document.querySelector('.main-body__contnt-page__question').style.display = 'none'
    }
    listOfContentButton(contents)

    fetch(`questions/${currentPage}/${currentLvl}`)
    .then(response => response.json())
    .then(result => {
        questions = result
    })

    //Resetting question
    resetQuestionPage()
}

function resetQuestionPage(){
    linkQuestion = document.querySelector('.link-question__questions')
    savingElement = document.querySelector('.dropdown-content-container')
    document.querySelector('.dropdown-container').appendChild(savingElement)
    linkAnswer = document.querySelector('.link-question__answers')
    linkQuestion.innerHTML = ''
    linkAnswer.innerHTML = ''
    for (boxes of document.querySelectorAll('.question_box')){
        boxes.innerHTML = ''
    }

}



// Display Question based on question selected for either the grammar, kanji or goi
var currentQuestionArray = []
var currentQuestionId = ''
var currentQuestionType = ''
function displayQuestion() {
    document.querySelector('.main-body__contnt-page__actual-content').style.display = "none"
    document.querySelector('.main-body__contnt-page__question').style.display = "block"
    if (questions == []) {
        alert('something went wrong')
    } else {
        console.log(questions)
        element = document.querySelector('.main-body__contnt-page__question__actual-Page')
        for (const question of questions) {
            if (question['questioning about'] == currentDisplayingContent) {
                var id = question['id']
                if(id == currentQuestionId) {
                    document.querySelector('.main-body__contnt-page__actual-content').style.display = "none"
                    document.querySelector('.main-body__contnt-page__question').style.display = "block"
                } else {
                    currentQuestionArray = question
                    currentQuestionId = question['id']
                    const questionType = question['question type']
                    currentQuestionType = questionType
                    console.log(questionType)
                    if (questionType == 'Link') {
                        var mainCont = question['question Content']
                        mainCont = mainCont.split('**')
                        for (let i=0; i<2; i++){
                            mainCont[i] = mainCont[i].substring(1, (mainCont[i].length)-2)
                            mainCont[i] = mainCont[i].split('|')
                        }
                        var element = document.querySelector('.link-question__questions')
                        element.innerHTML = ''
                        dropdownBtn = document.querySelector('.dropbtn')
                        dropdownBtn = document.querySelector('.dropbtn-container').innerHTML
                        //Add options
                        for (const questionOpts of mainCont[0]){
                            element.innerHTML += `<p id='questionOpt${mainCont[0].indexOf(questionOpts)}' style="display:inline-block;">${questionOpts}<div style='display:inline-block; margin:0px; padding:0px;'>${dropdownBtn}</div></p><br>`
                        }
                        //add buttons
                        var btnList = document.querySelectorAll('.dropbtn')
                        console.log(btnList)
                        let i = 0
                        for (btn of btnList){
                            if (btn != btnList[btnList.length-1]) {
                                btn.setAttribute('id', i)
                                btn.className += ` btn_${i}`
                                btn.parentElement.className += `Answer_${i}`
                                btn.setAttribute('onmouseenter', `showDropdown(${i})`)
                                btn.setAttribute('onmouseleave', `hideDropdown(${i})`)
                                i += 1
                            }
                        }
                        //Add answers
                        element = document.querySelector('.link-question__answers')
                        element.innerHTML = ''
                        for (const answerOpts of mainCont[1]){
                            element.innerHTML += `<p id='answerOpt${mainCont[1].indexOf(answerOpts)}'>${answerOpts}</p>`
                        }
                    } else if (questionType == 'Multiple Choice') {
                        if (document.querySelector('.link-question__questions').innerHTML != 'none') {
                            resetQuestionPage()
                        }
                        console.log(question)
                        var mainCont = question['question Content']
                        mainCont = mainCont.split('**')
                        var questionContent = mainCont[0].substring(1, (mainCont[0].length)-1)
                        var answerOpts = mainCont[1].substring(1, (mainCont[1].length)-1)
                        answerOpts = answerOpts.split('|')
                        document.querySelector('.multiChoice__question').innerHTML = questionContent
                        var element = document.querySelector('.multiChoice__answers')
                        listAnswerBtns = []
                        for (var answer of answerOpts){
                            var answerBut = document.createElement('div')
                            answerBut.classList.add('multi-choice-btn')
                            var index = answerOpts.indexOf(answer)
                            answerBut.classList.add(`multi-choice-btn-${index}`)
                            var answerContnt = document.createTextNode(`${answer}`)
                            answerBut.appendChild(answerContnt)
                            element.append(answerBut)
                            listAnswerBtns.push(answerBut)
                            answerBut.setAttribute('onmouseover', `multiChoiceAnswerMouse(${index}, 'in')`)
                            answerBut.setAttribute('onmouseleave', `multiChoiceAnswerMouse(${index}, 'out')`)
                            answerBut.setAttribute('onclick', `multiChoiceAnswerSelected(${index})`)
                        }
                        document.querySelector('.multiChoice__question').style.marginTop = '13%'

                    }
                }
            }
        }
    }
}
// Drop down function
function hideDropdown(optionId){
    document.querySelector('.dropdown-content-container').style.display = 'none'
    var element = document.querySelector(`.btn_${optionId}`)
    element.style.borderColor = defualtTextColor
    if (element.innerHTML == 'Select an option'){
        element.style.color = defualtTextColor_light
    } else {
        element.style.color = defualtTextColor
    }
}


function showDropdown(optionId){
    console.log(optionId)
    btn = document.querySelector(`.btn_${optionId}`)
    btn.style.borderColor = currentColor
    btn.style.color = currentColor
    btn.style.backgroundColor = 'white'
    element = document.querySelector(`.Answer_${optionId}`)
    dropdownList = document.querySelector('.dropdown-content-container')
    dropdownList.style.display = 'block'
    dropdownList.addEventListener('mouseenter', () => { document.querySelector('.dropdown-content-container').style.display = 'block' })
    dropdownList.addEventListener('mouseleave', () => { document.querySelector('.dropdown-content-container').style.display = 'none ' })
    dropdownList.style.float = 'initial'
    document.querySelector(".dropdown-content").style.display = 'block'
    element.appendChild(dropdownList)
    for (var answerOpt of document.querySelectorAll('A')){
        answerOpt.className = `Answer_${answerOpt.innerHTML}`
        answerOpt.setAttribute('onmouseover', `mouseOverAnswer('${answerOpt.innerHTML}', 'in', ${optionId})`)
        answerOpt.setAttribute('onmouseleave', `mouseOverAnswer('${answerOpt.innerHTML}', 'out', ${optionId})`)
        answerOpt.setAttribute('onclick', `selectAnswer('${answerOpt.innerHTML}', ${optionId})`)
    }
}
// Answer functions
function mouseOverAnswer(but_para, status, optionId){
    but = document.querySelector(`.Answer_${but_para}`)
    but.style.borderStyle = 'solid'
    but.style.borderWidth = '0.2px'
    if (status == 'in'){
        but.style.color = currentColor
        document.querySelector(`.btn_${optionId}`).style.borderColor = currentColor
        document.querySelector(`.btn_${optionId}`).style.color = currentColor
    } else {
        but.style.color = defualtTextColor
        element = document.querySelector(`.btn_${optionId}`)
        element.style.borderColor = defualtTextColor
        if (element.innerHTML == 'Select an option'){
            element.style.color = defualtTextColor_light
        } else {
            element.style.color = defualtTextColor
        }
    }
}

function selectAnswer(option, btnId){
    console.log(`${option}`)
    document.querySelector(`.btn_${btnId}`).innerHTML = `${option}`
    hideDropdown(btnId)
}

// check Answer function
var finishedCorrect = false
function checkAnswer(){
    console.log(currentQuestionType)
    if (currentQuestionType == "Link"){
        var answersSelected = []
        for (btn of document.querySelectorAll('.dropbtn')){
            if (btn.getAttribute('id') != 4){
                answersSelected.push(btn.innerHTML)
            }
        }
        answer = currentQuestionArray.answer
        console.log(answersSelected)
        console.log(answer)
        answer = answer.replace(/\s/g, '');
        answer = answer.substring(1, (answer.length)-1)
        answer = answer.split(',')
        console.log(answer)
        var wrongAnswer = 0
        for (var i=0; i<4; i++){
            if (answersSelected[i] == answer[i]){
                correctBtn(document.querySelector(`.btn_${i}`))
            } else {
                wrongBtn(document.querySelector(`.btn_${i}`))
                wrongAnswer += 1
            }
        }
        if (wrongAnswer != 0){
            finishedCorrect = false
        } else {
            finishedCorrect = true
        }
    } else if (currentQuestionType == "Multiple Choice"){
        answer = currentQuestionArray.answer
        console.log(answer)
        var answerSeleceted = multiChoiceSelectedBtn.innerHTML.substring(0,1)
        console.log(answer)
        if (answer == answerSeleceted){
            correctBtn(multiChoiceSelectedBtn)
        } else {
            wrongBtn(multiChoiceSelectedBtn)
        }
    }

}
function correctBtn(btn){
    btn.style.borderColor = '#B0D9C4'
    btn.style.backgroundColor = '#FCFFFA'
    btn.className += ' correct-btn'
    btn.style.color = '#76DA97'
    btn.removeAttribute('onmouseover')
    btn.removeAttribute('onmouseenter')
    btn.removeAttribute('onmouseleave')
    btn.removeAttribute('onclick')
}
function wrongBtn(btn){
    btn.style.borderColor = '#F78DAD'
    btn.style.backgroundColor = '#F7D5D5'
}


//question to content back function
function QuestionToContnt(){
    document.querySelector('.main-body__contnt-page__actual-content').style.display = "block"
    document.querySelector('.main-body__contnt-page__question').style.display = "none"
    if (finishedCorrect == true) {
        resetQuestionPage()
    }
}

//multichoice btn funciton
function multiChoiceAnswerMouse(index, status){
    btn = document.querySelector(`.multi-choice-btn-${index}`)
    if (status == "in"){
        btn.style.color = currentColor
        btn.style.cursor = 'pointer'
        btn.style.borderColor = currentColor
        btn.style.backgroundColor = "white"
    } else if (status == "out"){
        if (!btn.classList.contains('selected')){
            btn.style.color = defualtTextColor
            btn.style.borderColor = defualtTextColor
        }
    }
}

var multiChoiceSelectedBtn = ""
function multiChoiceAnswerSelected(index){
    btn = document.querySelector(`.multi-choice-btn-${index}`)
    for (var btns of listAnswerBtns){
        if (btns != btn) {
            if(!btns.classList.contains('correct-btn')){
                btns.classList.remove('selected')
                btns.style.color = defualtTextColor
                btns.style.borderColor = defualtTextColor    
            }
        } else {
            btn.style.borderBottom = 'solid'
            btn.style.borderColor = currentColor
            btn.style.borderWidth = '1px'
            btn.style.color = currentColor
            btn.classList.add('selected')
            multiChoiceSelectedBtn = btn
        }
    }
}

//Note display the questions and answers on multiple choice page