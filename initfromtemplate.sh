#first clone like this: http://deanmalone.net/post/how-to-fork-your-own-repo-on-github/

if [[ $# -ne 1 ]] ; then
    echo 'usage: initfromtemplate.sh [CamelCaseDomainObject]'
    exit 1
fi

CC="${1^}" #set first letter uppercase

#Check equality of a variable with a string value

if [ $CC != $1 ]; then
  echo 'usage: initfromtemplate.sh [CamelCaseDomainObject]'
  echo 'supplied domain object name was not CamelCase'
  exit 1
fi


export CamelCaseDomain=$1
export pascalCaseDomain="${CamelCaseDomain,}"
export lowercasedomain="${CamelCaseDomain,,}"
echo $CamelCaseDomain
echo $pascalCaseDomain
echo $lowercasedomain

git mv server/adapter/rest/domain.adapter.js server/adapter/rest/$lowercasedomain.adapter.js
git mv server/application/domain.service.js server/application/$lowercasedomain.service.js
git mv server/application/persistence/domain.repository.js server/application/persistence/$lowercasedomain.repository.js
git mv server/domain/domain.js server/domain/$lowercasedomain.js

find . -name '*.js' -exec sed -i -e 's/CamelCaseDomain/'"$CamelCaseDomain"'/g' {} \;
find . -name '*.js' -exec sed -i -e 's/pascalCaseDomain/'"$pascalCaseDomain"'/g' {} \;
find . -name '*.js' -exec sed -i -e 's/lowercasedomain/'"$lowercasedomain"'/g' {} \;
find . -name 'Jenkinsfile' -exec sed -i -e 's/CamelCaseDomain/'"$CamelCaseDomain"'/g' {} \;
find . -name 'Jenkinsfile' -exec sed -i -e 's/pascalCaseDomain/'"$pascalCaseDomain"'/g' {} \;
find . -name 'Jenkinsfile' -exec sed -i -e 's/lowercasedomain/'"$lowercasedomain"'/g' {} \;

