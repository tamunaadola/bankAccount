"use srtict";

/// BANKIST APP 

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Adola Tamunashvili',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 5555,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// ELEMENTS 
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const footer = document.querySelector('.footer');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovemenets = function (movements, sort = false) {
    containerMovements.innerHTML = "";

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function (move, i) {
        const type = move > 0 ? 'deposit' : 'withdrawal';

        const html = `
        <div class="movements__row">
            <div class="left_side">
                <div class="movements__type movements__type--${type}">${i + 1} ${type} </div>
            </div>
                <div class="movements__value">${move}€</div>
        </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html);

    })
}

const createUserNames = function (names) {
    names.forEach(function (acc) {
        acc.userName = acc.owner
            .toLowerCase()
            .split(" ")
            .map(name => name[0]).
            join("");
    })
}
createUserNames(accounts);

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance}€`
}


const calcDisplaySummery = function (acc) {
    const inCome = acc.movements
        .filter(move => move > 0)
        .reduce((acc, move) => acc + move, 0);
    labelSumIn.textContent = `${inCome}€`

    const sumOut = acc.movements
        .filter(move => move < 0)
        .reduce((acc, move) => acc + move, 0);
    labelSumOut.textContent = `${Math.abs(sumOut)}€`;

    const interest = acc.movements
        .filter(move => move > 0)
        .map(deposit => (deposit * 1.2) / 100)
        .filter(move => move >= 1)
        .reduce((acc, move) => acc + move, 0);
    labelSumInterest.textContent = `${interest}€`;

}

const apdateUI = function (acc) {
    // display movemenets 
    displayMovemenets(acc.movements);

    // display Balance
    calcDisplayBalance(acc);

    // display Summery
    calcDisplaySummery(acc);
};

let currenAccount;

btnLogin.addEventListener('click', function (e) {
    e.preventDefault();

    currenAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);
    console.log(currenAccount);


    if (currenAccount?.pin === Number(inputLoginPin.value)) {
        labelWelcome.textContent = `Welcome back, ${currenAccount.owner.split(" ")[0]}`;
        containerApp.style.opacity = 100;
        containerApp.style.transition = 'all 1.5s';
        footer.style.opacity = 100;
        footer.style.transition = 'all 1.5s';
    }

    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    apdateUI(currenAccount);

})

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value);

    inputTransferAmount.value = inputTransferTo.value = "";

    if (amount > 0 &&
        receiverAcc &&
        currenAccount.balance >= amount &&
        receiverAcc.userName !== currenAccount.userName) {

        // doing the transfer
        currenAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        console.log(currenAccount);
        // update UI 
        apdateUI(currenAccount);
    }

})

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if (amount > 0 && currenAccount.movements.some(mov => mov >= amount * 0.1)) {
        // add element 
        currenAccount.movements.push(amount);

        // display UI 
        apdateUI(currenAccount);
    }
    inputLoanAmount.value = "";

})


btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    const pinNumb = Number(inputClosePin.value);

    if (currenAccount.userName === inputCloseUsername.value &&
        currenAccount.pin === pinNumb) {
        // delate account 

        // const index = accounts.findIndex(acc => acc.userName === currenAccount.userName);
        // console.log(index);
        // accounts.splice(index, 1);

        // hide UI
        containerApp.style.opacity = 0;
        footer.style.opacity = 0;
        labelWelcome.textContent = `Log in to get started`;

    }
    inputCloseUsername = inputClosePin = "";

})

let sorted = false;
btnSort.addEventListener("click", function (e) {
    e.preventDefault();

    displayMovemenets(currenAccount.movements, !sorted);
    sorted = !sorted;

});

const movs = account1.movements.slice().sort((a, b) => a - b);
console.log(movs);

console.log(account1.movements);
console.log(account1.movements.slice());








/// LECTURES 

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];













