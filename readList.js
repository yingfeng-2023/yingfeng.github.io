function toggleMenu() {
    const leftColumn = document.querySelector('.left-column');
    leftColumn.classList.toggle('collapsed');
  }
  
  function scrollTo(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为
    const searchQuery = document.getElementById('searchInput').value;
    // 在这里添加搜索逻辑，例如过滤文章列表
    // 以下代码是一个简单的示例，实际实现可能需要根据你的具体需求进行调整
    const articles = document.querySelectorAll('.article-option');
    articles.forEach(article => {
      const title = article.querySelector('h2').textContent.toLowerCase();
      const isMatch = title.includes(searchQuery.toLowerCase());
      article.style.display = isMatch ? 'block' : 'none';
    });
  });

  const barrageMessages = [
    '欢迎来到我的网站！',
    '你好，希望你喜欢这里的内容',
    '不要再点击了，这里什么都没有了'
  ];

  let barrageTimer = null; // 用于控制弹幕触发的定时器

  // 点击section1时显示弹幕
  document.getElementById('section1').addEventListener('click', function() {
    // 如果定时器正在运行，忽略此次点击
    if (barrageTimer !== null) return;

    // 设置定时器，冷却时间内不允许再次触发
    barrageTimer = setTimeout(() => {
      barrageTimer = null; // 重置定时器
      showBarrage();
    }, 1000); // 设置1秒的冷却时间
  });

  function showBarrage() {
    const barrage = document.createElement('div');
    barrage.className = 'barrage';
    barrage.textContent = barrageMessages[Math.floor(Math.random() * barrageMessages.length)]; // 弹幕内容
    document.body.appendChild(barrage);

    // 设置弹幕的初始位置在屏幕右侧
    const screenWidth = window.innerWidth;
    const textWidth = barrage.offsetWidth; // 获取弹幕元素的宽度
    const x = screenWidth + textWidth; // 初始位置在屏幕右侧之外
    const y = Math.random() * (window.innerHeight - 50); // 垂直位置随机
    barrage.style.left = x + 'px';
    barrage.style.top = y + 'px';

    // 弹幕动画
    const animateBarrage = () => {
      const newX = parseFloat(barrage.style.left) - 5; // 向左移动
      barrage.style.left = newX + 'px';
      if (newX > -textWidth) {
        requestAnimationFrame(animateBarrage); // 继续动画
      } else {
        barrage.remove(); // 完全移出屏幕后移除弹幕
      }
    };
    requestAnimationFrame(animateBarrage); // 开始动画
  }