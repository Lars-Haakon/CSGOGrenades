function search()
{
  var videotest = document.getElementById('videotest');
  console.log(videotest);

	var search = {
		maps:GetFilters("mapdd"), 
		sides:GetFilters("sidedd"), 
		sites:GetFilters("sitedd"), 
		grenades:GetFilters("grenadedd")
	};
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  console.log(this.responseText);

      var imagesBody = document.getElementById('images');
      while (imagesBody.firstChild) {
        imagesBody.removeChild(imagesBody.firstChild);
      }

      var images = JSON.parse(this.responseText);

      for(var i = 0; i < images.length; i++)
      {
        var newDiv = document.createElement("div"); 
        newDiv.style = "width: 350px;float: left;margin-right: 5px;";

        var img = new Image(); 
        img.src = images[i].src;
        img.style = "width: inherit;";
        newDiv.appendChild(img);

        newDiv.appendChild(document.createElement("br"));

        var newLabel = document.createElement("p");
        newLabel.innerHTML = "<b>" + images[i].id + "</b>-" + images[i].description;
        newDiv.appendChild(newLabel);

        imagesBody.appendChild(newDiv);
      }
		}
	};
	xhttp.open("GET", "search.php?search=" + JSON.stringify(search), true);
	xhttp.send();
}

    function myDocumentClickHandler(event) {

      var bodyClick = true;
      element = event.srcElement;
      while(element != null)
      {
        if(element.className == 'dropdown')
        {
          bodyClick = false;
          break;
        }
        element = element.parentElement;
      }

      if(bodyClick) // if document is pressed
      {
        var ddfilters = document.getElementsByClassName("dropdown-content");

        var doSearch = false;
        for(var i = 0; i < ddfilters.length; i++){
          var first = ddfilters[i].classList.contains("show");

          ddfilters[i].classList.remove("show");

          var second = ddfilters[i].classList.contains("show");
          if(first && !second)
          {
            doSearch = true;
          }
        }

        if(doSearch)
        {
          search();
        }
      }
    }

    document.onclick = myDocumentClickHandler;