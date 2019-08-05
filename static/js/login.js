$(function() {
    $("#btn").click (() => {
        var username = $("#user").val();
        var pwd = $("#pwd").val();
        if(username&&pwd){
            $.ajax({
                url:'/admin/login',
                type:'post',
                data:{
                    username:username,
                    password:pwd
                },
                success:(data)=>{
                    console.log(data)
                    
                    if(data == 1){
                        $(location).attr('href', './main.html');
                    }
                    // if(data.status ===0){
                    //     alert("用户未注册,请先注册！")
                    //     $(location).attr('href', './register.html');
                    // }else if(data.status ===1){
                    //     alert("用户密码错误！")
                    // }else if(data.status ===2){
                    //     alert("登录成功")
                    //     $(location).attr('href', './main.html');
                    // }
                }
            })
        }else{
            alert("请填写账号密码")
        }
  });
});
