const loginValidator = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "请填写账号";
  }
});

const pwdValidator = new FieldValidator("txtLoginPwd", async function (val) {
  if (!val) {
    return "请填写密码";
  }
});

const form = $(".user-form");
form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieldValidator.validateAll(loginValidator, pwdValidator);
  if (!result) {
    return;
  }
  //传入表单 得到一个form表单数据对象
  const formData = new FormData(form);
  const formValue = Object.fromEntries(formData.entries());
  //    验证通过请求注册
  const res = await API.login(formValue);
  if (res.code === 0) {
    alert("登录成功");
    location.href = "./index.html";
  }else{
    alert(res.msg)
  }
};
