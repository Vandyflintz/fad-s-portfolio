const pdfIframe = document.getElementById('pdf-iframe');

// Function to send a POST request
function sendPostRequest(url, requestData, callback) {
    const formData = new FormData();
    formData.append("request", "fetchcv");
    try {
        axios
          .post(
            url,
  
           
            formData,
            {
              responseType: 'arraybuffer', // Set response type to arraybuffer
            }
            
          )
          .then(async (res) => {
              //console.log(res);
              callback(res.data);
          })
          .catch((err) => {
            popSnackBar(err);
            enableClickEvents("staff-update-form");
            hideSpinner();
          });
      } catch (error) {
        console.error('Request error:', error);
       
      }

}

function fetchbiodata() {
    const formData = new FormData();
    formData.append("request", "fetchbio");
    try {
        axios
          .post(
            "https://www.emkapp.com/fad_s_portfolio/back-end/portfolio.php",
            formData,
            
          )
            .then(async (res) => {
                //console.log(res);
                const responseData = res.data;
                const bData = responseData.bioData; 
                populateInfo(bData);
          })
          .catch((err) => {
            popSnackBar(err);
          
          });
      } catch (error) {
        console.error('Request error:', error);
       
      }
}

function populateInfo(data) {
   // console.log(data);
    const imgUrl = "https://www.emkapp.com/fad_s_portfolio/back-end/images/cv/";
    data.forEach(bio => { 
        $("#portImg").attr('src', imgUrl + bio.display_profile);
        const fbanchor = document.createElement('a'); 
        fbanchor.href = bio.fb_link; 
        fbanchor.target = '_blank'; 
      
        fbanchor.textContent = bio.facebook_handle;

        const iganchor = document.createElement('a'); 
        iganchor.href = bio.ig_link; 
        iganchor.target = '_blank'; 
      
        iganchor.textContent = bio.ig_handle;

        const ytanchor = document.createElement('a'); 
        ytanchor.href = bio.youtube_link; 
        ytanchor.target = '_blank'; 
      
        ytanchor.textContent = bio.youtube_handle;
      
        const wAanchor = document.createElement('a'); 
        wAanchor.href = "https://wa.me/"+bio.whatsapp_link; 
        wAanchor.target = '_blank'; 
      
        wAanchor.textContent = bio.whatsapp_handle;

        const eManchor = document.createElement('a'); 
        eManchor.href = `mailto:${bio.email_address}`; 
        eManchor.target = '_blank'; 
      
        eManchor.textContent = bio.email_address;

        const pHanchor = document.createElement('a'); 
        pHanchor.href = `tel:${bio.contact}`; 
        pHanchor.target = '_blank'; 
      
        pHanchor.textContent = bio.contact;
      
        $("#about-div").text(bio.short_self_intro);
        $("#fb-span").append(fbanchor);
        $("#ig-span").append(iganchor);
        $("#yt-span").append(ytanchor);
        $("#gm-span").append(eManchor);
        $("#wp-span").append(wAanchor);
        $("#ph-span").append(pHanchor);
    });
}


// Function to load the PDF content into the iframe
function loadPDFContent(pdfData) {
    const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    pdfIframe.src = pdfUrl;
  }

$("#pdfBtnClose").on('click', () => {
    $("#pdfDiv").fadeOut(500); 
});
$("#cred-dev").on('click', () => {
    $("#pdfDiv").fadeIn(500); 
});
const requestData = {
    request: 'fetchcv',
};
fetchbiodata();
sendPostRequest('https://www.emkapp.com/fad_s_portfolio/back-end/portfolio.php', requestData, loadPDFContent);