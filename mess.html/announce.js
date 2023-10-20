var announcementContainer = document.querySelector("#last-announcement");

function updateAnnouncement() {
  // Make an AJAX request to get the announcement
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/get_announcement", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      var announcement = response.announcement;
      announcementContainer.innerHTML = announcement;
    }
  };

  xhr.send();
}

// Call the updateAnnouncement function to fetch the announcement initially
updateAnnouncement();

// Set an interval to update the announcement every 5 seconds
setInterval(updateAnnouncement, 5000);