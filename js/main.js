
(function(){

  const $ = query => document.querySelectorAll(".js--" + query);

  const [ input ] = $("input");
  const [ submit ] = $("submit");
  const [ messages ] = $("messages");
  const [ symbol ] = $("symbol");
  let faceless = true;
  let responding = false;

  function sendMessage(isResponse){
    const message = input.value;
    if(((message && message !== "") || isResponse) && !responding){

      !isResponse && (input.value = "");
      const messageElement = Object.assign(document.createElement("li"), {
        innerHTML: isResponse
          ?("<p class='response'>i am groot</p>")
          :("<p>"+ message +"</p>")
      });
      messages.appendChild(messageElement);
      messages.parentNode.scrollTo(0, messages.parentNode.scrollHeight);
      !(isResponse) && sendResponse();
    }
  }

  function sendResponse(){
    const suspenseTime = ((Math.random() * 5) * 1000) + 3;
    responding = true;
    messages.classList.add("responding");
    setTimeout(function(){
      responding = false;
      messages.classList.remove("responding");
      sendMessage(true);
      if(faceless){
        console.log("test")
        symbol.src = "/media/symbol.svg";
        faceless = false;
      }
    }, suspenseTime);
  }

  submit.addEventListener("click", function(){sendMessage()});
  input.addEventListener("keyup", function(evt){
    if(evt.key === "Enter") sendMessage();
  });


})();

