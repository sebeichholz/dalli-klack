imagelist=$(ls *.jpg | sed "s/\([0-9]*\)\.jpg/'\1.jpg',/")
echo "var imagelist = [\n$imagelist\n];" > ../imagelist.js
