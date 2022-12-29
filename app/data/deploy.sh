
# entant que develott
export PGUSER=develott
export PGPASSWORD=develott
# je déploie la version develott sur develott
# sqitch deploy db:pg:NomBDD NomFichierDeploy

# v2
sqitch deploy db:pg:develott 1.init
sqitch deploy db:pg:develott 2.regex
sqitch deploy db:pg:develott 3.index
sqitch deploy db:pg:develott 4.data
sqitch deploy db:pg:develott 5.views