const loginValidator = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "请填写账号";
  }
  const resp = await API.exists(val);
  if (resp.data) {
    return "账号已经存在，请重新输入";
  }
});
const nicknameValidator = new FieldValidator("txtNickname", function (val) {
  if (!val) {
    return "请填写昵称";
  }
});

const pwdValidator = new FieldValidator("txtLoginPwd", async function (val) {
  if (!val) {
    return "请填写密码";
  }
});

const pwdConfirmValidator = new FieldValidator(
  "txtLoginPwdConfirm",
  async function (val) {
    if (!val) {
      return "请填写确认密码";
    }
    if (val !== pwdValidator.input.value) {
      return "两次密码不一样";
    }
  }
);

const form = $(".user-form");
form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieldValidator.validateAll(
    loginValidator,
    nicknameValidator,
    pwdValidator,
    pwdConfirmValidator
  );
  if (!result) {
    return;
  }
  //传入表单 得到一个form表单数据对象
  const formData =  new FormData(form);
  const formValue = Object.fromEntries(formData.entries());

  //    验证通过请求注册
  const res = await API.reg(formValue);
  if(res.code === 0 ){
    alert("注册成功")
    location.href = "./login.html"
  }
};
