function SimpleUnsubscribe() {}

SimpleUnsubscribe.prototype.render=function(options) {
	const{token}=options;
	if(!token) throw new Error();

	return `
		<html>
			<head>
				<title>Unsubscribe</title>
			</head>
			<body>
				<form action='/subscriptions/${token}/unsubscribeAll' method='POST'>
					<input type="submit" value="Click here to unsubscribe">
				</form>
			</body>
		</html>
	`;
}

module.exports=SimpleUnsubscribe;
