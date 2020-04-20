RED='\033[0;31m'
NC='\033[0m' # No Color

edited_migration_files=`git diff --name-only --cached --diff-filter=M HEAD ./modules/*/migrations/*`
total=`git diff --name-only --cached --diff-filter=M HEAD ./modules/*/migrations/* | wc -l | xargs`

if [ $total -ne "0" ]
then
	printf "${RED}modifying existing migration files is prohibited${NC}:\n"
	echo ""
	echo "$edited_migration_files"
	echo ""
	echo "revert these changes and create new migration files"
	echo
	exit 1
fi
