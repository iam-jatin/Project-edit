var date = new Date();
        const elementDate = document.getElementById("printDate");
        
        function printDate(){
          var day = date.getDate();
          var month = date.getMonth();
          var year =  date.getFullYear();
  
          elementDate.innerHTML = day + " / " + month +" / " + year;
        }
  
          setInterval(function(){
            printDate();
          }, 1000);