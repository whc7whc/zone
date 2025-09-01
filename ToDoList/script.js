document.addEventListener('DOMContentLoaded',()=>{
const taskInput=document.getElementById
('task-input');
const addTaskBtn=document.getElementById
('add-task-btn');
const taskList=document.getElementById
('task-list');
const emptyImage=document.querySelector('.empty-image');

const todosContainer=document.querySelector('.todos-container');

const progressBar=document.getElementById('progress');
const progressNumbers=document.getElementById('numbers');


const meteorCanvas = document.getElementById('meteorCanvas');
const ctx = meteorCanvas.getContext('2d');
meteorCanvas.width = window.innerWidth;
meteorCanvas.height = window.innerHeight;

const meteorColors = [
  'rgba(135, 206, 235, ALPHA)', // 天藍
  'rgba(30, 144, 255, ALPHA)',  // 深藍
  'rgba(255, 215, 0, ALPHA)',   // 金黃
  'rgba(221, 160, 221, ALPHA)', // 淡紫
  'rgba(255, 255, 255, ALPHA)'  // 白色
];

function createMeteor(x, y, dx, dy, length) {
  const colorTemplate = meteorColors[Math.floor(Math.random() * meteorColors.length)];
  return { x, y, dx, dy, length, colorTemplate, alpha: 1 };
}

let meteors = [];

function spawnMeteors(count = 5) {
  for (let i = 0; i < count; i++) {
    const startX = Math.random() * meteorCanvas.width;
    const startY = Math.random() * meteorCanvas.height * 0.3;
    const dx = Math.random() * 5 + 5;
    const dy = dx;
    const length = Math.random() * 80 + 50;
    meteors.push(createMeteor(startX, startY, dx, dy, length));
  }
}

function animateMeteors() {
  ctx.clearRect(0, 0, meteorCanvas.width, meteorCanvas.height);
  for (let i = meteors.length - 1; i >= 0; i--) {
    const m = meteors[i];
    ctx.beginPath();

    const headColor = m.colorTemplate.replace('ALPHA', m.alpha.toFixed(2));
    const tailColor = m.colorTemplate.replace('ALPHA', '0');

    const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.length, m.y - m.length);
    grad.addColorStop(0, headColor);
    grad.addColorStop(1, tailColor);
    ctx.strokeStyle = grad;

    ctx.lineWidth = 10;  // 流星尾巴加粗
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - m.length, m.y - m.length);
    ctx.stroke();

    m.x += m.dx;
    m.y += m.dy;
    m.alpha -= 0.02;

    if (m.alpha <= 0) {
      meteors.splice(i, 1);
    }
  }
  requestAnimationFrame(animateMeteors);
}

animateMeteors();


const toggleEmptyState=()=>{
    emptyImage.style.display=taskList.children.length===0?'block':'none';
    todosContainer.style.width=taskList.children.length>0?'100%':'50%'
};
const updateProgress = () => {
  const totalTasks = taskList.querySelectorAll('li').length;
  const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

  progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';
  progressNumbers.textContent = `${completedTasks}/${totalTasks}`;

  // ✅ 當所有任務完成時觸發流星特效
  if (totalTasks > 0 && completedTasks === totalTasks) {
    spawnMeteors(10); // 產生 10 顆流星
  }
};


const addTask = (event, text = '', completed = false, checkCompletion = true) => {
  if (event) event.preventDefault();

  const inputValue = text || taskInput.value;
  const taskText = inputValue.trim();

  if (!taskText) {
    taskInput.value = '';
    updateProgress();     // 總任務數即時更新
    return;
  }

      const li=document.createElement('li');
li.innerHTML=`
<input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
<span>${taskText}</span>
<div class="task-buttons">
<button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
<button class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
</div>
`;
const checkbox=li.querySelector('.checkbox')
const editBtn=li.querySelector('.edit-btn');

if(completed){
    li.classList.add('completed');
    editBtn.disabled=true;
    editBtn.style.opacity=0.5;
    editBtn.style.pointerEvents='none';

}
checkbox.addEventListener('change',()=>{
const isChecked =checkbox.checked;
li.classList.toggle('completed',isChecked);
editBtn.disabled=isChecked;
editBtn.style.opacity=isChecked ? '0.5':'1';
editBtn.style.pointerEvents=isChecked ? 'none':'auto';
updateProgress(); 
});



  // ✅ 編輯按鈕

editBtn.addEventListener('click',()=>{
   if(!checkbox.checked){
    taskInput.value=li.querySelector
    ('span').textContent;
    li.remove();
    toggleEmptyState();
    updateProgress(false); 
   }
})
  // ✅ 刪除按鈕

li.querySelector('.delete-btn').addEventListener('click',()=>{
    li.remove();
    toggleEmptyState();
    updateProgress(); 
})




    taskList.appendChild(li);
    taskInput.value='';
    toggleEmptyState();
    updateProgress(checkCompletion); 
}
// 點擊按鈕新增任務
addTaskBtn.addEventListener('click', (e) => addTask(e));

// 按下 Enter 鍵新增任務
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask(e);
  }
})});