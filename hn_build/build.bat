cd .
cd ../
rm -rf ../../Apps/KISSr/hapnote.kissr.com
cd  hn_build
node ../r.js -o app.build.js
cd ../../../Apps/KISSr/hapnote.kissr.com
mv build.txt ../../../controlled_projects/hapnote-g2/build.txt
rm -rf css/bootstrap.css  
rm -rf css/buttons.css 
rm -rf css/fonts.css 
rm -rf css/forms.css 
rm -rf css/glyphs.css 
rm -rf css/jquery-ui-1.10.2.custom.css 
rm -rf css/layout.css 
rm -rf css/style.css 
rm -rf js/app/Collection/
rm -rf js/app/model/ 
rm -rf js/app/view/ 
rm -rf js/app/router.js 
rm -rf js/lib 
rm -rf templates/ 
cd ../../../controlled_projects/hapnote-g2/