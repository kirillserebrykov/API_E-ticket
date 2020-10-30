let get = document.querySelector('#Get_query')
let get_spoiler = document.querySelector('#Get_spoiler')
let put = document.querySelector('#Put_query')
let put_spoiler = document.querySelector('#Put_spoiler')
let post = document.querySelector('#Post_query')
let post_spoiler = document.querySelector('#Post_spoiler')


console.log()
let hidden = (el) =>{
	el.classList.toggle("hidden")
}

let click = (el,funcParams = el) =>{
	 el.addEventListener("click",function(){hidden(funcParams)},  true);
}

click(get)
click(get_spoiler,get )
click(put)
click(put_spoiler,put )
click(post)
click(post_spoiler,post )