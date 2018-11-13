const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 8080;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('message', (text) => {
	console.log(text)
	return text.toUpperCase();
})

app.use((request, response, next) => {
	var time = new Date().toString();
	var log = `${time}: ${request.method} ${request.url}`;

	fs.appendFile('server.log', log + '\n', (error) =>{
		if (error) {
			console.log('Unable to log message');
		}

	});

	// response.render('maintenance.hbs', {
	// 	title: 'maintenance Page',
	// 	welcome: 'The site is currently down for maintenance'
	// });
	next();
});

app.get('/maintenance', (request, response) => {
	response.render('maintenance.hbs', {
		title: 'maintenance Page',
		welcome: 'The site is currently down for maintenance'
	});
});

// app.get('/', (request, response) => {
// 	// response.send('<h1>Hello Express!</h1>');
// 	response.send({
// 		name: 'Your Name',
// 		school: [
// 			'BCIT',
// 			'SFU',
// 			'UBC'
// 		]
// 	})
// });


app.get('/', (request, response) => {
	response.render('about.hbs', {
		title: 'About Page',
		year: new Date().getFullYear(),
		welcome: 'welcome to the info page!'
	});
});

app.get('/about', (request, response) => {
	response.render('about.hbs', {
		title: 'About Page',
		year: new Date().getFullYear(),
		welcome: 'welcome to the about page!',
	});
});

app.get('/image', (request, response) => {
	response.render('image.hbs', {
		welcome: 'welcome to the image page!',
		year: new Date().getFullYear(),
		image: '/fish.jpeg'
	});
});

app.get('/menu', (request, response) => {
	response.render('menu.hbs', {
		welcome: 'welcome!',

		link: {
			about: '/about',
			image: '/image'
		}
	});
});

app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'
	})
})

app.listen(port, () => {
	console.log('Server is up on the ${port}');
});