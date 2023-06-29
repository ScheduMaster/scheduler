docker exec -it scheduler-database-1 /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Thisisasecret6969
CREATE DATABASE scheduler;
GO
USE scheduler;  
GO
ALTER TABLE invitations NOCHECK CONSTRAINT FK_invitations_users_partner_id;
GO
QUIT