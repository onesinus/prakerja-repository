function currentDate () {
	return new Date().toString()
}

function timezone(){
	return (new Date().getTimezoneOffset()/60).toString()
}

module.exports = {
	currentDate,
	timezone
}