
//loadFile().then(ids =>{
//  loadImages(ids).then(imageUrls)=>{
    // add imageUrls
 // }
//})

// all html tags
const loadingTag = document.querySelector("header p.loading")

const nextTag = document.querySelector("a.next") 
const previousTag = document.querySelector("a.previous") 

const stepsTag = document.querySelector("footer span")
const sliderTag = document.querySelector("div.slider")
const footerTag =  document.querySelector("footer")

let currentSlide = 0
let totalSlides = 0

const project = "9m4x67h2u4B2RGvfNt7HqT"

const apiKey = "364317-4000d0c7-f9f6-4384-ba1b-b86f946a4a16"
const apiHeaders = {
  headers:{
    "X-Figma-Token":apiKey
  }
}

const loadFile = function (key) {
  return fetch("https://api.figma.com/v1/files/" + key, apiHeaders)
  .then(response => response.json())
  .then(data=>{
    const ids = data.document.children[0].children.map(frame => {
      // return frame id in figma
      return frame.id
    })
   
          
    return {
      key : key, 
      title : data.name,
      ids : ids
    }
  })
  
}


const loadImages = function(obj){
  const key = obj.key
  const ids = obj.ids.join(",")
  
  return fetch("https://api.figma.com/v1/images/" + key + "?ids=" + ids + "&scale=1", apiHeaders)
  	.then(response => response.json())
  	.then(data => {
    	return obj.ids.map( id => {
        return data.images[id]
      })
  })
}

const addImagesToSite = function (urls) {
  
  sliderTag.innerHTML = ""
  totalSlides = urls.length
  
  footerTag.classList.add("show")
  
  urls.forEach(url => {
    sliderTag.innerHTML = sliderTag.innerHTML + `
		<div>
				<img src="${url}">
		</div>
		`
  })
}


loadFile(project)
	.then(file => {
  	loadingTag.innerHTML = file.title
		document.title = " Shenghong Zhong -" + file.title
  	return file
	})
	.then(file => loadImages(file))
	.then(imageUrls => addImagesToSite(imageUrls))


// lets add events for next and previous

const next = function () {
  currentSlide = currentSlide + 1
  if (currentSlide >= totalSlides) {
    currentSlide = 0
  }
  
  moveSlider()
}

const previous = function () { 
  currentSlide = currentSlide - 1 
  if (currentSlide <0) { 
    	currentSlide = totalSlides - 1 
  }
  
  moveSlider()
}

const moveSlider = function () { 
  sliderTag.style.transform = `translate(${currentSlide * -100}vw, 0)`
  stepsTag.innerHTML = `${currentSlide + 1} / ${totalSlides}`
}

nextTag.addEventListener("click", function() {
  	next()
})

previousTag.addEventListener("click", function() { 
  	previous() 
})













