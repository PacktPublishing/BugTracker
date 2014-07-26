function translate(text) { 
	var translations = {
		"Login": "Login",
		"User": "Usuario",
		"Password": "Contraseña",

		"Cancel": "Cancelar",
		"Submit": "Enviar"
	}
	return translations[text] || text
}