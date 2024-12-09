const dialogArea = document.getElementById('dialog-area');
const rightBtn = document.getElementById('rightBtn');
const leftBtn = document.getElementById('leftBtn');
let userResponse = [];
let endSession = false;

const userAnswer = [['Да', 'Нет'], ['Граф. редакторы', 'Вычисления']];
const machineAnswer = [
    'Если ваш бюджет ограничен и стоимость видеокарты имеет для вас большое значение чем качество картинки, можем предложить офисные «затычки»',
    'Если ваш бюджет ограничен и вам не важно, чтобы видеокарта была новая, то можем предложить видеокарты б/у или после майнинга',
    'Если ваш бюджет ограничен и для вас важно качество картинки, то может предложить видеокарты в ценовом диапазоне 15000-25000 руб',
    'Если ваш бюджет ограничен и вам важно наличие трассировки лучей и/или CUDA ядер, то можем предложить Nvidia RTX 2060 super',
    'Если ваш бюджет неограничен, то вам могут быть доступны топовые решения, а также профессиональные видеокарты',
    'Если вам не нужны профессиональные решения, то можем предложить видеокарты фирм AMD и Nvidia',
    'Если ваш бюджет неограничен и вам важно наличие трассировки лучей и/или CUDA ядер, то можем предложить Nvidia RTX 4090Ti',
    'Если ваш бюджет неограничен и вам не важно наличий трассировки лучей, то можем предложить вам AMD Radeon RX6700XT',
    'Если ваш бюджет неограничен и вам нужны профессиональные решения для графических редакторов, то можем предложить Nvidia Quadro RTX 8000 за 738728 руб',
    'Если ваш бюджет вообще ничем ни ограничен, ну прям никак, прям вообще ничем, и вам нужно профессиональное решение для графических редакторов, то можем предложить Nvidia RTX 6000 Ada Generation за 1 130 400 руб',
    'Если ваш бюджет в жизни никогда ничем не будет ограничен и вообще вы шейх всея вселенная, и вам нужна профессиональная видеокарта для вычислений, можем предложить Nvidia H100 PCIe за 3 309 900 руб'
];
let questList = [
    'Важна ли вам новизна видеокарты?',
    'Нужен ли вам Ray Tracing?',
    'Важно ли вам качество картинки?',
    'Нужено ли вам проф решение?',
    'Вам нужна видекарта для вычислений или графических редакторов?'
];

function onLoad() {
    let el = document.createElement('p');
    el.className = 'dialog-element-machine';
    el.innerText = 'Приветствую, эта система создана для подбора видеокарт для ваших нужд. Скажите, ограничен ли ваш бюджет под видеокарту?';
    dialogArea.appendChild(el);
}

function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function createResponse() {
    if (arraysEqual(userResponse, [1])) {
        return questList[0];
    } else if (arraysEqual(userResponse, [1, 0])) {
        endSession = true;
        document.title = 'Я нуждаюсь в перезагрузке!'
        leftBtn.disabled = true;
        rightBtn.disabled = true;
        return machineAnswer[1];
    } else if (arraysEqual(userResponse, [1, 1])) {
        return questList[1];
    } else if (arraysEqual(userResponse, [1, 1, 1])) {
        endSession = true;
        document.title = 'Я нуждаюсь в перезагрузке!'
        leftBtn.disabled = true;
        rightBtn.disabled = true;
        return machineAnswer[3];
    } else if (arraysEqual(userResponse, [1, 1, 0])) {
        return questList[2];
    } else if (arraysEqual(userResponse, [1, 1, 0, 1])) {
        endSession = true;
        document.title = 'Я нуждаюсь в перезагрузке!'
        leftBtn.disabled = true;
        rightBtn.disabled = true;
        return machineAnswer[2];
    } else if (arraysEqual(userResponse, [1, 1, 0, 0])) {
        endSession = true;
        document.title = 'Я нуждаюсь в перезагрузке!'
        leftBtn.disabled = true;
        rightBtn.disabled = true;
        return machineAnswer[0];
    } else if (arraysEqual(userResponse, [0])) {
        return questList[3];
    } else if (arraysEqual(userResponse, [0, 1])) {
        return questList[4];
    } else if (arraysEqual(userResponse, [0, 1, 1])) {
        endSession = true;
        document.title = 'Я нуждаюсь в перезагрузке!'
        leftBtn.disabled = true;
        rightBtn.disabled = true;
        return machineAnswer[9];
    } else if (arraysEqual(userResponse, [0, 1, 0])) {
        endSession = true;
        document.title = 'Я нуждаюсь в перезагрузке!'
        leftBtn.disabled = true;
        rightBtn.disabled = true;
        return machineAnswer[10];
    } else if (arraysEqual(userResponse, [0, 0])) {
        return questList[1];
    } else if (arraysEqual(userResponse, [0, 0, 1])) {
        endSession = true;
        document.title = 'Я нуждаюсь в перезагрузке!'
        leftBtn.disabled = true;
        rightBtn.disabled = true;
        return machineAnswer[6];
    } else if (arraysEqual(userResponse, [0, 0, 0])) {
        endSession = true;
        document.title = 'Я нуждаюсь в перезагрузке!'
        leftBtn.disabled = true;
        rightBtn.disabled = true;
        return machineAnswer[7];
    } else {
        return 'У меня какая-то ошибка! Обратитесь в службу поддержки.';
    }
}

function machineAsnwer() {
    let el = document.createElement('p');
    el.className = 'dialog-element-machine';
    el.innerText = createResponse();
    dialogArea.appendChild(el);
    if (endSession) {
        let btn = document.createElement('button');
        btn.className = 'reset-button';
        btn.innerText = 'Перезагрузка!';
        btn.onclick = function() {
            location.reload();
        }
        dialogArea.appendChild(btn);
    }
}

function clickBtn(typeBtn) {
    //Добавление ответа пользователя на экран диалога
    let el = document.createElement('p');
    el.className = 'dialog-element-user';
    el.innerText = typeBtn === 'left' ? leftBtn.value : rightBtn.value;
    dialogArea.appendChild(el);

    if (userResponse == [0, 1]) {
        rightBtn.value = userAnswer[1][1];
        leftBtn.value = userAnswer[1][0];
    } else {
        rightBtn.value = userAnswer[0][1];
        leftBtn.value = userAnswer[0][0];
    }
    userResponse.push(typeBtn === 'left' ? 1 : 0);
    machineAsnwer();  
}
