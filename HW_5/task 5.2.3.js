// 3.  Вам нужно вывести в консоль числа от 1 до 100.
//     Если число делится без остатка на 3, то выведете в консоль “число - делится на 3”.
//     Если число делится на 5 без остатка, то то выведете в консоль “число - делится на 5”.
//     Если число делится и на 3 и на 5 без остатка, то то выведете в консоль “число - делится и на 3 на 5”.
//     Число 15 делится без остатка на 3 и на 5 -- пример сообщения в консоле.

for (let i = 1; i <= 100; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
    console.log(`Число ${i} - делится без остатка и на 3, и на 5`);
    }
    else if (i % 3 == 0) {
    console.log(`Число ${i} - делится без остатка на 3`);
    }
    else if (i % 5 == 0) {
    console.log(`Число ${i} - делится без остатка на 5`);
    } else {
    console.log(`Число ${i} - не делится без остатка ни на 3, ни на 5`);
    }
}