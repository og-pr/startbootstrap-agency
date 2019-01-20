#!/bin/bash

OUTPUT="pwd"
echo "${OUTPUT}"

IN=input.og;
OUT=output.og;
THEME=demo/themes/agency;
PUBLIC=public;
WORKSPACE=h.landingpages/ticket.503;
PROJECT=project.hostbin/h.workspace.themes;

clear && \

echo "..."
# build css
buildTool.sh -u og -g build -p themes -f $WORKSPACE -d none -t css -x $HOME/$PROJECT/$WORKSPACE/_build/gf.theme.js && \

# build local.js
buildTool.sh -u og -g build -p themes -f $WORKSPACE -d none -t js:minify -x $HOME/$PROJECT/$WORKSPACE/_build/gf.theme.js && \

# build vendor.js
buildTool.sh -u og -g build -p themes -f $WORKSPACE -d none -t vendor -x $HOME/$PROJECT/$WORKSPACE/_build/gf.theme.js && \

# build images
# do not use = raw / source images not provided
#buildTool.sh -u og -g build -p themes -f $WORKSPACE -d none -t resizeJpgs -x $HOME/$PROJECT/$WORKSPACE/_build/gf.theme.js && \
#buildTool.sh -u og -g build -p themes -f $WORKSPACE -d none -t optim -x $HOME/$PROJECT/$WORKSPACE/_build/gf.theme.js && \
buildTool.sh -u og -g build -p themes -f $WORKSPACE -d none -t copyImages -x $HOME/$PROJECT/$WORKSPACE/_build/gf.theme.js && \

# build html
buildTool.sh -u og -g build -p themes -f $WORKSPACE -d none -t htmlCopy -x $HOME/$PROJECT/$WORKSPACE/_build/gf.theme.js && \
buildTool.sh -u og -g build -p themes -f $WORKSPACE -d none -t htmlMinify -x $HOME/$PROJECT/$WORKSPACE/_build/gf.theme.js && \

# cleanup
echo "..."
echo "making changes to output.og"
rm -rf $HOME/$PROJECT/$WORKSPACE/$OUT/$THEME/css/agency.css*

# make public folder - does not use gulp (may in futura)
echo "..."
buildTool.sh -u og -g deploy -p themes -f $WORKSPACE -d public -t pre_deploy2fb -x $HOME/$PROJECT/$WORKSPACE/_build/gf.common.js 

echo "..."
echo ""
echo "finished"
echo ""
echo ""
