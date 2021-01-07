ssh tomestry@tomestry.com "rm -rvf build/*"
rsync -rvP build "tomestry@tomestry.com:/home/tomestry/"
gzip build/static/js/*
gzip build/static/css/*
gzip build/*js
ssh tomestry@tomestry.com "sudo systemctl restart nginx"

