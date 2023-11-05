// Function to calculate equitable payments and compare salaries for multiple persons
function calculateAndCompareForMultiplePersons(numPersons) {
    let totalIncome = 0;
    let salaryArray = new Array(numPersons);

    // Prompt for salary input and calculate total income
    for (let i = 0; i < salaryArray.length; i++) {
        salaryArray[i] = parseFloat(prompt(`Enter the salary for person ${i + 1}:`));
        totalIncome += salaryArray[i];
    }

    let totalExpense = parseFloat(prompt(`Enter the total expense:`));

    // Calculate and display payments
    for (let i = 0; i < salaryArray.length; i++) {
        let percentage = calculatePercentage(salaryArray[i], totalIncome);
        let payment = (percentage / 100) * totalExpense;

        alert(`Person ${i + 1} must pay: $${payment.toFixed(2)}`);
    }

    // Compare salaries and find the person with the highest salary
    let highestSalaryPerson = findHighestSalary(salaryArray);
    alert(`Person ${highestSalaryPerson + 1} has the highest salary.`);
}

// Function to find the index of the person with the highest salary
function findHighestSalary(salaryArray) {
    let highestSalaryIndex = 0;

    for (let i = 1; i < salaryArray.length; i++) {
        if (salaryArray[i] > salaryArray[highestSalaryIndex]) {
            highestSalaryIndex = i;
        }
    }

    return highestSalaryIndex;
}

// Function to calculate the percentage in relation to income
function calculatePercentage(income, totalIncome) {
    return (income / totalIncome) * 100;
}

// Call the function to calculate and compare for multiple persons (in this example, 2 persons)
function howManyPeople() {
    let numPersons = document.getElementByName('numPersons');
    calculateAndCompareForMultiplePersons(numPersons);
}

// Call the function to start the program
howManyPeople();