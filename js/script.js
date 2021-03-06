const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

// Functions

function showError(input, message) {
	const formControl = input.parentElement
	formControl.className = 'form-control error'
	const small = formControl.querySelector('small')
	small.innerText = message
}

function showSuccess(input) {
	const formControl = input.parentElement
	formControl.className = 'form-control success'
}

// Check Email

function checkEmail(input) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (re.test(input.value.trim())) {
		showSuccess(input)
	} else {
		showError(input, 'Email is not valid')
	}
}

// Check required fields

function checkRequired(inputArr) {
	inputArr.forEach(function (input) {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input)} is required`)
		} else {
			showSuccess(input)
		}
	})
}

// Check Password 2

function checkConfirmPasswordRequired(input) {
	if (input.value.trim() === '') {
		showError(input, 'Please confirm password')
	} else {
		showSuccess(input)
	}
}

// Check passwords match

function checkPasswordsMatch(input1, input2) {
	if (input1.value !== input2.value) {
		showError(input2, 'Passwords do not match')
	}
}

// Check input length

function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at least ${min} characters`
		)
	} else if (input.value.length > max) {
		showError(
			input,
			`${getFieldName(input)} must be less than ${max} characters`
		)
	} else {
		showSuccess(input)
	}
}

// Password 2

function checkConfirmPassword(input, min, max) {
	if (input.value.length < min) {
		showError(input, `Password must be at least ${min} characters`)
	} else if (input.value.length > max) {
		showError(input, `Password must be less than ${max} characters`)
	} else {
		showSuccess(input)
	}
}

// Get Field Name

function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Event Listeners

form.addEventListener('submit', function (e) {
	e.preventDefault()

	checkRequired([username, email, password])
	checkConfirmPasswordRequired(password2)
	checkLength(username, 3, 20)
	checkLength(password, 6, 25)
	checkEmail(email)
	checkConfirmPassword(password2, 6, 25)
	checkPasswordsMatch(password, password2)
})
