#!/bin/bash

source config.sh

if [ -z $db_name ] || [ -z $db_user ] || [ -z $db_password ] || [ -z $db_host ] || [ -z $db_root_pass ] || [ -z $daytona_install_dir ] || [ -z $daytona_data_dir ] || [ -z $ui_admin_pass ] || [ -z $email_user ] || [ -z $email_domain ] || [ -z $smtp_server ] || [ -z $smtp_port ]; then
  echo 'one or more variables are undefined in config.sh'
  echo 'Please configure config.sh'
  echo 'For details that are unknown, enter some dummy values'
  exit 1
fi

cd $daytona_install_dir/Scheduler+Agent

# Setup scheduler config file
rm -rf config.ini
printf "[DH]\ndh_root:"$daytona_data_dir"\nport:52222\nmysql-user:"$db_user"\nmysql-db:"$db_name"\nmysql-host:"$db_host"\nmysql-password:"$db_password"\n" >> config.ini
printf "email-user:"$email_user"\nemail-server:"$email_domain"\nsmtp-server:"$smtp_server"\nsmtp-port:"$smtp_port"\n\n" >> config.ini
printf "[AGENT]\nagent-root:/tmp/daytona_root/test_data_AGENT/\nmon-path:/tmp/daytona_sarmonitor/bin/\nport:52223" >> config.ini

# Installin python and sendmail
echo -e "Installing python and sendmail... \n"
sudo apt-get install python -y
sudo apt-get install python-mysql.connector -y
sudo apt-get install sendmail -y
sudo apt-get install python-requests -y

# Start Scheduler
nohup python ./scheduler.py > scheduler_nohup.out 2>&1 &

cd -
