document.addEventListener("DOMContentLoaded", function() {
    let form = document.querySelector(".calculator-container-form");
    let nameArray = [];

    function generateClassName(base, index) {
        return `${base}-${index}`;
    }

    function createPersonInput(i, numPersons) {
        let personInputHTML = `
            <div class="calculator-form-name">
                <h3 class="personName-${i + 1}">Person number ${i + 1}</h3>
                <div class="name-box">
                    <input type="text" class="${generateClassName('form-name', i + 1)}" name="form-name" required>
                </div> 
                <h3 class="personIncomeLabel-${i + 1}">Enter the income of person number ${i + 1}</h3>
                <div class="name-box">
                    <input type="text" class="${generateClassName('form-name-income', i + 1)}" name="form-name" required>
                </div> 
            </div> 
        `;

        return personInputHTML;
    }

    function updatePersonInfo(i) {
        let nameInput = document.querySelector(`.${generateClassName('form-name', i + 1)}`);
        let incomeInput = document.querySelector(`.${generateClassName('form-name-income', i + 1)}`);
        let personName = document.querySelector(`.personName-${i + 1}`);
        let personIncomeLabel = document.querySelector(`.personIncomeLabel-${i + 1}`);

        if (nameInput && incomeInput && personName && personIncomeLabel) {
            nameInput.addEventListener('input', function() {
                personName.textContent = nameInput.value.trim() !== '' ? nameInput.value : `Person number ${i + 1}`;
                personIncomeLabel.textContent = `Enter the income of ${nameInput.value.trim() !== '' ? nameInput.value : `person number ${i + 1}`}`;
            });

            incomeInput.addEventListener('input', function() {
                personIncomeLabel.textContent = `Enter the income of ${nameInput.value.trim() !== '' ? nameInput.value : `person number ${i + 1}`}`;
            });
        }
    }

    function pressNext() {
        let numPersons = parseFloat(document.querySelector("[name='numPersons']").value);
        let existingAlert = form.querySelector('.form-alert');

        // Remove existing alert
        if (existingAlert) {
            existingAlert.remove();
        }

        // Eliminar formularios anteriores
        form.querySelector('.all-forms').innerHTML = '';

        if (!isNaN(numPersons) && numPersons > 0) {
            // Save numPersons to localStorage
            localStorage.setItem('numPersons', numPersons);

            for (let i = 0; i < numPersons; i++) {
                form.querySelector('.all-forms').insertAdjacentHTML('beforeend', createPersonInput(i, numPersons));
                updatePersonInfo(i); // Llama a la función para actualizar la información en tiempo real
            }

            // Agregar un solo botón submit después de agregar todos los formularios
            form.querySelector('.all-forms').insertAdjacentHTML('beforeend', `
                <button type="submit" class="calculate-button">Calculate percentage</button>
            `);
        } else {
            // Create and append a new alert
            let alertDiv = document.createElement('div');
            alertDiv.className = 'form-alert';
            alertDiv.innerHTML = `<p>Please enter a valid number of persons.</p>`;
            form.querySelector('.calculator-form').appendChild(alertDiv);
        }

        return numPersons;
    }

    function calculatePercentage(event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        let numPersons = parseFloat(localStorage.getItem('numPersons'));
        let totalIncome = 0;

        // Crear un array para almacenar nombres e ingresos
        let personData = [];

        for (let i = 1; i <= numPersons; i++) {
            let name = document.querySelector(`.${generateClassName('form-name', i)}`).value;
            let income = parseFloat(document.querySelector(`.${generateClassName('form-name-income', i)}`).value);

            // Verificar si el ingreso es un número válido
            if (!isNaN(income)) {
                totalIncome += income;
                personData.push({ name, income });
            }
        }

        // Eliminar formularios y mostrar el resultado directamente en la interfaz
        document.querySelector('.calculator-container-form').innerHTML = `
            <div class="result-container">
                <h3>Result:</h3>
                ${personData.map(({ name, income }, i) => {
                    let percentage = (income / totalIncome) * 100;
                    return `<p>${name} earns: ${percentage.toFixed(2)}%</p>`;
                }).join('')}
                <p>The total income is: ${totalIncome}</p>
            </div>
        `;
    }

    // Agregar event listener al formulario para el evento submit
    form.addEventListener("submit", calculatePercentage);

    // Agregar event listeners al botón de personas
    document.querySelector(".buttonNumPersons").addEventListener("click", function() {
        const numPersons = pressNext();
        document.querySelector('.calculate-button').addEventListener("click", function() {
            addInfo(numPersons);
        });
    });

    document.querySelector(".numPersons").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const numPersons = pressNext();
            document.querySelector('.calculate-button').addEventListener("click", function() {
                addInfo(numPersons);
            });
        }
    });
});


