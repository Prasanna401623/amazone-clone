const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

// open() is used to setup the message. For that, two parameters are given to open.First parameter is what type of message we want to send, and second parameter is where do we want to send it (URL), Here, 'GET' means to get information from backend.
xhr.open('GET', 'https://supersimplebackend.dev');

// This code is asychronous. So, once the above code runs, it goes immediatly goes to next line. To get response, we need to use xhr.response. But it takes time to get the response back. So, we used event listener load to get the response. 
xhr.send();
