/*
const retrieveMessages=function(){
    $.get('/messages',(messages)=>{
        $('#messages'.empty()
        messages.forEach(function(message){

            console.log(message)
        })
    })
}
*/

$(document).ready(function(){
    console.log('Ready')
    $('#btnMessage').click(()=>{
        let message=$('#messageBox').val()
        let data={
            message
        }
        $.get('/message',data,function(){
            
        })
    })
    setInterval(()=>{
    $.get('/messages', function(messages){
        $('#messages').empty()
        messages.forEach((message)=>{
            $('#messages').append('<div class="row">'+message.message+'</div>')
        
        })
    })
},1000)

})