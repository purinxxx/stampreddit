<?php
$url = $_GET["url"];
$css = file_get_contents($url);
preg_match_all('/a\[href.*?="#(.*?)"]/',$css,$out);

foreach (array_unique($out[1]) as $key => $value){
  echo '<a href="#'.$value.'"></a>';
}