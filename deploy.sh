ssh getit@getitfoodie.com "rm -rvf build/*"
rsync -rvP build "getit@getitfoodie.com:/home/getit/"
gzip build/static/js/*
gzip build/static/css/*
gzip build/*js
ssh getit@getitfoodie.com "sudo systemctl restart nginx"

