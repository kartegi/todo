const btn = document.querySelector(".btn");
const content = document.querySelector(".content");
let arr;
const setItemToArr = () => {
    if (localStorage.getItem("arr") === null) {
        arr = [];
    }
    else {
        arr = JSON.parse(localStorage.getItem("arr"));
    }
}

const printItem = () => {
    setItemToArr();
    if (arr.length > 0) {
        content.innerHTML = "";
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            content.insertAdjacentHTML("afterbegin", item.div);
        }
    } else
        return;
}

printItem();

btn.addEventListener("click", () => {
    setItemToArr();

    const inputVal = document.querySelector(".inp").value;
    let i;

    if (!inputVal) { alert("NO TEXT!"); return; }

    if (arr.length === 0)
        i = 0;
    else
        i = arr[arr.length - 1].num + 1;

    let newDiv = `<div class='item'>${inputVal}<input class='box ${i}id' type='checkbox'></div>`;
    let newItem = {
        div: newDiv,
        num: i,
    };
    arr.push(newItem);
    let json = JSON.stringify(arr);
    localStorage.setItem("arr", json);
    printItem();
});

content.addEventListener("click", (e) => {
    if (e.target.className[0] == "b") { // b is first letter of box class
        setItemToArr();
        let divClass = e.target.className.split(" ");
        let numInStor = parseInt(divClass[1], 10);

        console.log(e.target.parentNode.parentNode.removeChild(e.target.parentNode));

        //remove from storage
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].num == numInStor) {
                arr.splice(i, 1);
                let json = JSON.stringify(arr);
                localStorage.setItem("arr", json);
            }
        }
    }
});

// localStorage.clear();
