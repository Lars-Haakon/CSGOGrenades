function search()
{
  var videotest = document.getElementById('videotest');
  console.log(videotest);

	var search = {
		maps:getMap(),
		sides:GetFilters("side"),
		sites:GetFilters("site"),
		grenades:GetFilters("grenade")
	};
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  console.log(this.responseText);

      var imagesList = document.getElementById('imagesList');

      while (imagesList.firstChild) {
          imagesList.removeChild(imagesList.firstChild);
      }

      var images = JSON.parse(this.responseText);

      for(var i = 0; i < images.length; i++)
      {
        var div = document.createElement('div');
        div.className = "col-md-4";
        div.innerHTML = "                    <div class=\"card mb-4 box-shadow\" onclick ='onImageClick(this)'>\n" +
            "                        <img class=\"card-img-top\" src="+images[i].src+">\n" +
            "                        <div class=\"card-body card-description\">\n" +
            "                            <p class=\"card-text\">"+"<b>" + images[i].id + "-</b>" +images[i].description+"</p>\n" +
            "                        </div>\n" +
            "                    </div>"
          imagesList.appendChild(div);

      }
		}
	};
	xhttp.open("GET", "search.php?search=" + JSON.stringify(search), true);
	xhttp.send();
}
