(async function () {
  const res = await API.profile();

  const user = res.data;
  console.log(user);
  if (!user) {
    alert(res.msg);
    location.href = "./login.html";
  }

  const doms = {
    aside: {
      nickname: $("#nickname"),
      loginId: $("#loginId"),
    },
    close: $(".close"),
    chatContainer: $(".chat-container"),
    input: $("#txtMsg"),
    msgContainer: $(".msg-container"),
  };
  setUserInfo();
  // 设置用户信息
  function setUserInfo() {
    doms.aside.nickname.innerText = user.nickname;
    doms.aside.loginId.innerText = user.loginId;
  }
  // 注销事件
  doms.close.onclick = function () {
    API.close();
    location.href = "./login.html";
  };

  /**
   * 
   *  content: "今年你几岁了？"
      createdAt: 1657161671856
      from: "joker"
   */
  // 根据消息对象 添加到页面
  function addChat(chatInfo) {
    const div = $$$("div");
    div.classList.add("chat-item");
    if (chatInfo.from) {
      div.classList.add("me");
    }
    const img = $$$("img");
    img.src = chatInfo.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";
    img.className = "chat-avatar";

    const content = $$$("div");
    content.className = "chat-content";
    content.innerText = chatInfo.content;

    const date = $$$("div");
    date.className = "chat-date";
    date.innerText = formatDate(chatInfo.createdAt);

    div.appendChild(img);
    div.appendChild(content);
    div.appendChild(date);
    doms.chatContainer.appendChild(div);
  }
  // 时间搓格式化
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const day = date.getDate().toString().padStart(2, 0);
    const hour = date.getHours().toString().padStart(2, 0);
    const minute = date.getMinutes().toString().padStart(2, 0);
    const second = date.getSeconds().toString().padStart(2, 0);

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  loadHistory();
  // 加载历史记录
  async function loadHistory() {
    const resp = await API.getHistory();
    for (const item of resp.data) {
      addChat(item);
    }
    scrollBottom();
  }


  async function sendChat() {
    const content = doms.input.value.trim();
    if (!content) {
      return;
    }
    addChat({
      from: user.loginId,
      to: null,
      createdAt: Date.now(),
      content,
    });
    doms.input.value = ''
    scrollBottom();
    const resp = await API.sendChat(content);
    addChat({
      from: null,
      to: user.loginId,
      ...resp.data,
    });
    scrollBottom();
  }

  // 发送消息事件

  doms.msgContainer.onsubmit =function(e){
    e.preventDefault();
    sendChat();
  }


  // 滚动到底部
  function scrollBottom() {
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
  }
})();
