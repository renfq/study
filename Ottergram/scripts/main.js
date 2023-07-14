const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
const HIDDEN_DETAIL_CLASS = 'hidden-detail';
const TINY_EFFECT_CLASS = 'is-tiny';
const ESC_KEY=27;

function setDetails(imageUrl,titleText){
  'use strict';
  var detailImage =document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src',imageUrl);
  var detailTitle =document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}
function imageFromThumb(thumbnail){
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}
function titleFromThumb(thumbnail){
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}
function setDetailsFromThumb(thumbnail){
    'use strict';
    setDetails(imageFromThumb(thumbnail),titleFromThumb(thumbnail));
}
/*监听缩略图上的鼠标点击事件，然后将缩略图的url属性和title属性给大图*/
function addThumbClickHandler(thumb){
  'use strict';
  thumb.addEventListener('click',function(event){/*捕获鼠标点击的事件，并作出响应*/
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();/*显示大图*/
  });
}
/*获取缩略图所在的a矛元素数组*/
function getThumbnailArray(){
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}
/*按ESC键 隐藏大图*，通过给body增加hidden-detail属性*/
function hideDetails(){
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}
function showDetails(){
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);/*给body增加属性*/
  frame.classList.add(TINY_EFFECT_CLASS);/*给frame增加属性*/
  setTimeout(function(){
    frame.classList.remove(TINY_EFFECT_CLASS);/*给frame增加属性*/
  },50);/*浏览器等待50ms后向执行队列加入一个匿名函数*/


}

function addKeyPressHandler(){
  'use strict';
  document.body.addEventListener('keyup',function(event){/*回调函数，获取event信息，然后调取该函数*/
    event.preventDefault();
    console.log(event.keyCode);
  if(event.keyCode== ESC_KEY){
      hideDetails();
    }
  })
}
function initializeEvents(){
  'use strict';
  var thumbnails = getThumbnailArray();
  thumbnails.forEach(addThumbClickHandler);/*给每个缩略图都加上监听*/
  addKeyPressHandler();
}
initializeEvents();
