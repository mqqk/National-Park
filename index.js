const apiKey='f4C6B746YK1H2t7yxNw11yxeUN4hob7gQ2EwjOh6';

const searchUrl = 'https://developer.nps.gov/api/v1/parks?api_key=';


function displayInfo(responseJson){
  console.log("displayInfo");
  console.log(responseJson);
  for(let i=0;i<responseJson.data.length;i++){
    let parkInfo=responseJson.data;
    $('#js-results').append(`
        <div>Park #${[i+1]}
          <ul>${parkInfo[i].name}
            <li>Full Name:${parkInfo[i].fullName}</li>
            <li>Description:${parkInfo[i].description}</li>
            <li> <a href='${parkInfo[i].url}'>${parkInfo[i].name}'s Website</a>
          </ul>
          
        </div>
    `)}
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function getResponse(state,maxResults){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "AWSALB=FusVsfX29Ch6JuG9/bh4fvSEIOGgJ0y5c5QhXQHmfnasWeE7pARdgS+5QLnBvaf0PsQb2jcOTYkomzH3Wluq8MKANVBardEuNmKH/M7kJv8kWKrcD2AmG8JzzWYI; AWSALBCORS=FusVsfX29Ch6JuG9/bh4fvSEIOGgJ0y5c5QhXQHmfnasWeE7pARdgS+5QLnBvaf0PsQb2jcOTYkomzH3Wluq8MKANVBardEuNmKH/M7kJv8kWKrcD2AmG8JzzWYI");
   
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      console.log(requestOptions);

      const params={
        stateCode:state,
        limit:maxResults
    };

    const queryString=formatQueryParams(params)
    const url=searchUrl+apiKey+'&'+queryString;
    

    console.log(url);
    
    fetch(url, requestOptions)
  .then(response => {
    if(response.ok){return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayInfo(responseJson))
  .catch(error => console.log('error', error));
    
}



function readyFunction(){
    $('form').submit(event =>{
        event.preventDefault();
        //console.log("we are off!");
        $('#js-results').empty();
        const state=$('#js-stateName').val();
        const maxResults=parseInt($('#js-maxResults').val());
        $('#js-stateName').val('');
        $('#js-maxResults').val('');
        //console.log(state);
        //console.log(maxResults);
        getResponse(state,maxResults);
    })
}
$(readyFunction);