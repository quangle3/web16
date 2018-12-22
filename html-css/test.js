function con_tho_an_co(callback007) {
    setTimeout(function() {
      console.log('con thỏ ăn cỏ, uống nước');
      callback007(); // đây là lúc điệp viên báo cáo cho sếp !
    }, 3000);
  }
  
  // con thỏ chui vô hang
  function hotel() {
    console.log('chui vô hotel');
  }
   
con_tho_an_co(function() {
    hotel();
});

  