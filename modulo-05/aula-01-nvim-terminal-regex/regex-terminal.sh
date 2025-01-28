# a partir da pasta raíz
find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt
find . -name *.js -not -path '*node_modules**' | ipt

# Desafio
cp -r ../../modulo-01/projeto .

CONTENT="'use strict';"
find . -name *.js -not -path '*node_modules**' \
  | ipt -o \
  | xargs -I '{file}' sed -i "" -e "1s/^/$CONTENT\n/g" {file}

# 1s -> primeira linha
# ^ -> 
