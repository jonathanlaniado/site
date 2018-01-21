header('Content-Type: text/javascript; charset=UTF-8');

$imageFolder = 'img/';

$imageTypes = '{*.jpg,*.JPG,*.jpeg,*.JPEG,*.png,*.PNG,*.gif,*.GIF}';

$sortByImageName = false;

$newestImagesFirst = true;

$images = glob($imageFolder . $imageTypes, GLOB_BRACE);

if ($sortByImageName) {
    $sortedImages = $images;
    natsort($sortedImages);
} else {
    $sortedImages = array();
    $count = count($images);
    for ($i = 0; $i < $count; $i++) {
        $sortedImages[date('YmdHis', filemtime($images[$i])) . $i] = $images[$i];
    }
    if ($newestImagesFirst) {
        krsort($sortedImages);
    } else {
        ksort($sortedImages);
    }
}

writeHtml('<ul class="ins-imgs">');
foreach ($sortedImages as $image) {

    $name = 'Image name: ' . substr($image, strlen($imageFolder), strpos($image, '.') - strlen($imageFolder));

    $lastModified = '(last modified: ' . date('F d Y H:i:s', filemtime($image)) . ')';

    writeHtml('<li class="ins-imgs-li">');
    writeHtml('<div class="ins-imgs-img" onclick=this.classList.toggle("zoom");><a name="' . $image . '" href="#' . $image . '">');
    writeHtml('<img src="' . $image . '" alt="' . $name . '" title="' . $name . '">');
    writeHtml('</a></div>');
    writeHtml('<div class="ins-imgs-label">' . $name . ' ' . $lastModified . '</div>');
    writeHtml('</li>');
}
writeHtml('</ul>');

writeHtml('<link rel="stylesheet" type="text/css" href="ins-imgs.css">');

function writeHtml($html) {
    echo "document.write('" . $html . "');\n";
}
