ssh getit@getitfoodie.xyz "rm -rvf build/*"
rsync -rvP build "getit@getitfoodie.xyz:/home/getit/"
gzip build/static/js/*
gzip build/static/css/*
gzip build/*js
ssh getit@getitfoodie.xyz "sudo systemctl restart nginx"

