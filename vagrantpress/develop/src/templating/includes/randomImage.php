<?php // header('Content-type: text/json'); ?>
<?php
// module("enhanced_array");
$files = array();
$image_path = get_stylesheet_directory() . '/assets/images';
$dir = opendir(get_stylesheet_directory() . '/assets/images');
while ($file = readdir($dir)) {
    if ($file == '.' || $file == '..') {
        continue;
    } else {

    }

    $files[] = $file;
}


/*BROWSER VIEW SOURCE DEBUG METHOD*/
//header('Content-type: application/json');

/*POST FOLDER CONTET IN BROWSER*/
$fh = fopen("data_out.json", 'w')
      or die("Error opening output file");
fwrite($fh, json_encode($files,JSON_UNESCAPED_UNICODE));
fclose($fh);
echo json_encode($files);
//echo $image_path;
?>
<!-- 
 <script type="text/javascript">
  $(document).ready(function() {

    var bgArray = <?php // echo json_encode($files); ?>;
    var bg = bgArray[Math.floor(Math.random() * bgArray.length)];
    var bgLengt = bgArray.length;
    var path = 'content/themes/Apollo/assets/images/';
    var isrc = path+bg;
    
    // console.log("start");
    // for(var i = 0; i < bgArray.length; i++){
    //     console.log(i + " = " + bgArray[i]);
    // }
    // console.log("end");


    // console.log(bgArray);

    console.log(bgArray);
    // for (var i=0; i < bgArray.length; i++){
    //     console.log(i);
    // }

    // a = new EnhancedArray(bgArray);

    // If you have defined a path for the images

    console.log(bg);

    // then you can put it right before the variable 'bg'
    $('#bg-holder').css('background-image', 'url(' + isrc + ')'); 

}); 
</script>  -->