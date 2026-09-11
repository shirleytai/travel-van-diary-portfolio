const videos=[['東京扭蛋 Vol.04',211000],['東京必扭 Vol.07',66000],['紅磚倉庫',12000],['橫濱散步',3878],['POV 日常',1454],['橫濱車站',1018],['自由之丘',717],['吉祥寺',616],['淺草咖啡廳',271]];
document.getElementById('view-chart').innerHTML=videos.map(([name,value])=>`<div class="chart-row"><span>${name}</span><div class="bar-track"><div class="bar-fill" style="width:${value/211000*100}%"></div></div><b>${value.toLocaleString()}</b></div>`).join('');
document.querySelectorAll('video').forEach(video=>video.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause()})));
