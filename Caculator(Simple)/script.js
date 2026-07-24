function calculate(operator) {
    let num1Input = document.getElementById("num1").value;
    let num2Input = document.getElementById("num2").value;

    if (num1Input === "" || num2Input === "") {
        document.getElementById("result").textContent = "Result: Please enter both numbers";
        return;
    }

    let num1 = Number(num1Input);
    let num2 = Number(num2Input);

    let result;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 !== 0) {
                result = num1 / num2;
            } else {
                result = "Cannot divide by zero";
            }
            break;
        default:
            result = "Invalid operator";
    }

    document.getElementById("result").textContent = "Result: " + result;
}